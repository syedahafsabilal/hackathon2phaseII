"""
AI Chat Agent using Google Gemini API with function calling.

The agent uses Gemini's native function calling to deterministically invoke
MCP tool functions based on user intent. Tools are called directly from
the MCP server module (same process, no subprocess needed).

Fallback behaviour when Gemini is unavailable:
- Simple greetings ("hi", "hello", …) receive a canned reply.
- "list / show tasks" is executed directly against the database.
- "add task <title>" is executed directly against the database.
- Everything else receives a friendly "service unavailable" message.
"""

import logging
import uuid
from typing import Optional

import google.genai as genai
from google.genai import types

from backend.config.settings import settings
from backend.config.database import async_session
from backend.services import task_service
from backend.mcp_server.server import (
    add_task,
    list_tasks,
    complete_task,
    delete_task,
    update_task,
)

logger = logging.getLogger(__name__)

# ---------------------------------------------------------------------------
# Constants
# ---------------------------------------------------------------------------

SYSTEM_PROMPT = """You are a helpful task management assistant. You help users manage their todo tasks through natural language conversation.

CAPABILITIES:
You have access to these tools:
- add_task: Create a new task (requires title, optional description)
- list_tasks: Show all tasks for the user
- complete_task: Mark a task as completed (requires task_id)
- delete_task: Delete a task (requires task_id)
- update_task: Update a task's title or description (requires task_id)

IMPORTANT RULES:
1. ALWAYS use the tools to perform task operations. Never pretend to do something without calling the tool.
2. The user_id is provided in context — always pass it to every tool call.
3. When the user asks to create a task, use add_task with a clear title.
4. When the user asks to see tasks, use list_tasks.
5. When the user wants to complete/finish/mark done a task, use complete_task with the task_id.
6. When the user wants to delete/remove a task, use delete_task with the task_id.
7. When the user wants to change/update/rename a task, use update_task.
8. If the task_id is unknown, first call list_tasks to find it, then perform the operation.
9. ALWAYS confirm what you did after a tool call completes.
10. If a request is ambiguous, ask for clarification with examples like:
    - "I can help with that! Could you be more specific? For example: 'Add a task to buy groceries' or 'Show my tasks'"
11. If a tool returns an error, explain it clearly and suggest what the user can do.
12. Keep responses concise but friendly.
13. When listing tasks, format them clearly so the user can reference them.

RESPONSE STYLE:
- Be concise and helpful
- Confirm actions with clear messages
- Use friendly tone
- When showing tasks, use a clear numbered format
"""

# Words we treat as simple greetings (no AI needed)
_GREETING_WORDS = {"hi", "hello", "hey", "howdy", "greetings", "hiya", "sup", "yo", "good morning", "good afternoon", "good evening"}

# Message shown when AI is down and the request isn't a known simple command
_AI_UNAVAILABLE_MSG = (
    "Sorry, I can't reach the AI service right now. Please try again in a moment.\n\n"
    "While the AI is unavailable, you can still use these direct commands:\n"
    "• \"list tasks\" or \"show my tasks\" — see all your tasks\n"
    "• \"add task: <title>\" — create a new task\n"
    "• \"delete task: <title>\" or \"remove task: <title>\" — delete a task\n"
    "• \"complete task: <title>\" or \"done task: <title>\" — mark a task as done"
)

# Gemini function declarations for the 5 MCP tools
TOOL_DECLARATIONS = types.Tool(
    function_declarations=[
        types.FunctionDeclaration(
            name="add_task",
            description="Create a new task for the user",
            parameters=types.Schema(
                type="OBJECT",
                properties={
                    "user_id": types.Schema(type="STRING", description="The UUID of the user"),
                    "title": types.Schema(type="STRING", description="The title of the task"),
                    "description": types.Schema(type="STRING", description="Optional description for the task"),
                },
                required=["user_id", "title"],
            ),
        ),
        types.FunctionDeclaration(
            name="list_tasks",
            description="List all tasks for the user",
            parameters=types.Schema(
                type="OBJECT",
                properties={
                    "user_id": types.Schema(type="STRING", description="The UUID of the user"),
                },
                required=["user_id"],
            ),
        ),
        types.FunctionDeclaration(
            name="complete_task",
            description="Mark a task as completed",
            parameters=types.Schema(
                type="OBJECT",
                properties={
                    "user_id": types.Schema(type="STRING", description="The UUID of the user"),
                    "task_id": types.Schema(type="STRING", description="The UUID of the task to complete"),
                },
                required=["user_id", "task_id"],
            ),
        ),
        types.FunctionDeclaration(
            name="delete_task",
            description="Delete a task",
            parameters=types.Schema(
                type="OBJECT",
                properties={
                    "user_id": types.Schema(type="STRING", description="The UUID of the user"),
                    "task_id": types.Schema(type="STRING", description="The UUID of the task to delete"),
                },
                required=["user_id", "task_id"],
            ),
        ),
        types.FunctionDeclaration(
            name="update_task",
            description="Update a task's title or description",
            parameters=types.Schema(
                type="OBJECT",
                properties={
                    "user_id": types.Schema(type="STRING", description="The UUID of the user"),
                    "task_id": types.Schema(type="STRING", description="The UUID of the task to update"),
                    "title": types.Schema(type="STRING", description="New title for the task"),
                    "description": types.Schema(type="STRING", description="New description for the task"),
                },
                required=["user_id", "task_id"],
            ),
        ),
    ]
)

# Map function names to their implementations (MCP tool functions)
TOOL_FUNCTIONS = {
    "add_task": add_task,
    "list_tasks": list_tasks,
    "complete_task": complete_task,
    "delete_task": delete_task,
    "update_task": update_task,
}


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

async def _execute_tool(name: str, args: dict) -> str:
    """Execute an MCP tool function by name with the given arguments."""
    func = TOOL_FUNCTIONS.get(name)
    if func is None:
        return f"Unknown tool: {name}"
    try:
        result = await func(**args)
        return result
    except Exception as e:
        logger.error("Tool execution error (%s): %s: %s", name, type(e).__name__, e)
        return f"Tool error ({name}): {str(e)}"


def _is_greeting(text: str) -> bool:
    """Return True if the message is a short greeting with no task intent."""
    cleaned = text.lower().strip().rstrip("!?.,").strip()
    # Exact match against known greetings
    if cleaned in _GREETING_WORDS:
        return True
    # First word is a greeting and message is short (≤ 4 words)
    words = cleaned.split()
    return len(words) <= 4 and words[0] in _GREETING_WORDS


async def _find_task_id_by_title(user_id: str, title: str) -> Optional[str]:
    """
    Look up a task by title (case-insensitive) and return its UUID string.
    Returns None if no matching task is found.
    """
    try:
        uid = uuid.UUID(user_id)
        async with async_session() as db:
            tasks = await task_service.list_tasks(db, uid)
        title_lower = title.lower()
        for task in tasks:
            if task.title.lower() == title_lower:
                return str(task.id)
        # Partial match fallback
        for task in tasks:
            if title_lower in task.title.lower():
                return str(task.id)
        return None
    except Exception as e:
        logger.error("Error finding task by title %r: %s", title, e)
        return None


async def _fallback_response(message: str, user_id: str) -> str:
    """
    Handle a request without calling Gemini.

    Covers:
    - Simple greetings
    - List-tasks requests (keyword based)
    - Add-task requests in the form "add task: <title>" or "add task <title>"
    - Delete-task requests in the form "delete task: <title>" or "remove task <title>"
    - Complete-task requests in the form "complete task: <title>" or "done task <title>"
    - Everything else: a helpful "service unavailable" message
    """
    msg_lower = message.lower().strip()

    # --- greeting ---
    if _is_greeting(message):
        logger.info("Fallback: greeting detected, returning canned response")
        return (
            "Hi! I'm your task assistant. "
            "I can help you manage your tasks. "
            "The AI service is currently unavailable, but you can still:\n"
            "• Type \"list tasks\" to see your tasks\n"
            "• Type \"add task: <title>\" to add a new task\n"
            "• Type \"delete task: <title>\" to delete a task\n"
            "• Type \"complete task: <title>\" to mark a task done"
        )

    # --- list tasks ---
    list_keywords = ["list tasks", "show tasks", "show my tasks", "list my tasks",
                     "what are my tasks", "see my tasks", "view tasks", "get tasks"]
    if any(kw in msg_lower for kw in list_keywords):
        logger.info("Fallback: list_tasks detected, calling tool directly")
        return await _execute_tool("list_tasks", {"user_id": user_id})

    # --- add task ---
    add_prefixes = ["add task:", "add task ", "create task:", "create task ",
                    "new task:", "new task "]
    for prefix in add_prefixes:
        if msg_lower.startswith(prefix):
            title = message[len(prefix):].strip()
            if title:
                logger.info("Fallback: add_task detected, title=%r", title)
                return await _execute_tool("add_task", {"user_id": user_id, "title": title})

    # --- delete task ---
    delete_prefixes = ["delete task:", "delete task ", "remove task:", "remove task "]
    for prefix in delete_prefixes:
        if msg_lower.startswith(prefix):
            title = message[len(prefix):].strip()
            if title:
                logger.info("Fallback: delete_task detected, title=%r", title)
                task_id = await _find_task_id_by_title(user_id, title)
                if task_id is None:
                    return f"I couldn't find a task matching \"{title}\". Type \"list tasks\" to see your tasks."
                return await _execute_tool("delete_task", {"user_id": user_id, "task_id": task_id})

    # --- complete task ---
    complete_prefixes = ["complete task:", "complete task ", "done task:", "done task ",
                         "finish task:", "finish task ", "mark done:", "mark done "]
    for prefix in complete_prefixes:
        if msg_lower.startswith(prefix):
            title = message[len(prefix):].strip()
            if title:
                logger.info("Fallback: complete_task detected, title=%r", title)
                task_id = await _find_task_id_by_title(user_id, title)
                if task_id is None:
                    return f"I couldn't find a task matching \"{title}\". Type \"list tasks\" to see your tasks."
                return await _execute_tool("complete_task", {"user_id": user_id, "task_id": task_id})

    # --- everything else ---
    logger.info("Fallback: unrecognized request, returning service-unavailable message")
    return _AI_UNAVAILABLE_MSG


async def _call_gemini(
    client: genai.Client,
    contents: list,
    system_instruction: str,
) -> Optional[types.GenerateContentResponse]:
    """
    Make a single Gemini generate_content call.

    Returns the response object on success, or None if the call fails.
    Logs the exception detail so it appears in the server console.
    """
    try:
        response = await client.aio.models.generate_content(
            model="gemini-2.0-flash",
            contents=contents,
            config=types.GenerateContentConfig(
                system_instruction=system_instruction,
                tools=[TOOL_DECLARATIONS],
                temperature=0.2,
            ),
        )
        return response
    except Exception as e:
        logger.error("Gemini API call failed — %s: %s", type(e).__name__, e)
        return None


# ---------------------------------------------------------------------------
# Public entry point
# ---------------------------------------------------------------------------

async def run_agent(messages: list[dict], user_id: str) -> str:
    """
    Run the Gemini-powered agent with conversation history and tool calling.

    Args:
        messages: List of {"role": "user"|"assistant", "content": "..."} dicts
        user_id: The user's UUID string, passed to all tool calls

    Returns:
        The agent's response text
    """
    # ------------------------------------------------------------------ #
    # 1. Validate API key before touching Gemini                          #
    # ------------------------------------------------------------------ #
    api_key = settings.google_api_key  # GOOGLE_API_KEY preferred, GEMINI_API_KEY as fallback
    if not api_key:
        logger.error(
            "No Gemini API key configured. "
            "Set GOOGLE_API_KEY (or GEMINI_API_KEY) in backend/.env and restart."
        )
        last_user_msg = next(
            (m["content"] for m in reversed(messages) if m["role"] == "user"), ""
        )
        return await _fallback_response(last_user_msg, user_id)

    client = genai.Client(api_key=api_key)

    # ------------------------------------------------------------------ #
    # 2. Build conversation history for Gemini                           #
    # ------------------------------------------------------------------ #
    contents = []
    for msg in messages:
        role = "user" if msg["role"] == "user" else "model"
        contents.append(types.Content(role=role, parts=[types.Part.from_text(text=msg["content"])]))

    system_instruction = (
        SYSTEM_PROMPT
        + f"\n\nCurrent user_id: {user_id}\nALWAYS pass this user_id to every tool call."
    )

    # Track whether any tools were executed so fallback messages are accurate
    tools_executed = False

    # ------------------------------------------------------------------ #
    # 3. Agentic loop: call Gemini → execute tools → repeat until text   #
    # ------------------------------------------------------------------ #
    max_iterations = 5
    for iteration in range(max_iterations):
        logger.info(
            "Gemini request: iteration=%d, model=gemini-2.0-flash, messages=%d",
            iteration, len(contents),
        )

        response = await _call_gemini(client, contents, system_instruction)

        if response is None:
            # Gemini call failed — use fallback
            logger.warning("Gemini unavailable on iteration %d, routing to fallback", iteration)
            if tools_executed:
                return (
                    "I've completed the requested actions, but I'm having trouble generating "
                    "a full response right now. Please check your task list to confirm the changes."
                )
            # Use the last user message for fallback keyword matching
            last_user_msg = next(
                (m["content"] for m in reversed(messages) if m["role"] == "user"), ""
            )
            return await _fallback_response(last_user_msg, user_id)

        logger.info("Gemini response received: iteration=%d", iteration)

        # Check if the response contains function calls
        candidate = response.candidates[0]
        parts = candidate.content.parts
        function_calls = [p for p in parts if p.function_call is not None]

        if not function_calls:
            # No tool calls — extract and return the text response
            text_parts = [p.text for p in parts if p.text]
            return " ".join(text_parts) if text_parts else "I'm sorry, I couldn't process that request."

        # Append the model's tool-call response to contents
        contents.append(candidate.content)

        # Execute each function call
        function_response_parts = []
        for part in function_calls:
            fc = part.function_call
            args = dict(fc.args) if fc.args else {}
            if "user_id" not in args:
                args["user_id"] = user_id
            logger.info("Executing tool: %s with args keys=%s", fc.name, list(args.keys()))
            result = await _execute_tool(fc.name, args)
            logger.info(
                "Tool result (%s): %s",
                fc.name,
                result[:120] if len(result) > 120 else result,
            )
            tools_executed = True
            function_response_parts.append(
                types.Part.from_function_response(
                    name=fc.name,
                    response={"result": result},
                )
            )

        # Append function responses so Gemini can summarise them
        contents.append(types.Content(role="user", parts=function_response_parts))

    # Exhausted max_iterations
    return "I completed the requested actions. Is there anything else you'd like to do?"
