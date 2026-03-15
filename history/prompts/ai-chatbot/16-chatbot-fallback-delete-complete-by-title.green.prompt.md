---
id: 16
title: Chatbot Fallback Delete Complete By Title
stage: green
date: 2026-03-06
surface: agent
model: claude-sonnet-4-6
feature: ai-chatbot
branch: 002-ai-chatbot
user: Ali
command: /sp.implement
labels: ["fallback","chatbot","gemini","task-management","resilience"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - backend/agent/chat_agent.py
tests:
  - none
---

## Prompt

Goal: Update the FastAPI /chat endpoint so the chatbot fully functions as a TODO assistant even if the AI (Google Gemini) is down.

Requirements:
1. Detect if the AI call fails or returns an error.
2. Do not show raw API errors to the user.
3. Implement local command handling for fallback mode:
   - "add task: <title>" → adds a task
   - "delete task: <title>" → deletes a task
   - "list tasks" or "show my tasks" → lists tasks
   - Simple greetings like "hi" → returns a default message
4. Return clear, user-friendly fallback messages if AI is unavailable.
5. Keep logging of AI errors internally for debugging.
6. Ensure clean, modular, readable Python code, ideally by separating AI calls and fallback command handling into functions.

Output: Full implementation code for the /chat endpoint and the AI-calling function with this fallback mechanism.

## Response snapshot

Updated `backend/agent/chat_agent.py`:

1. Added `import uuid` and imports for `async_session` + `task_service` at the top.
2. Added `_find_task_id_by_title(user_id, title)` helper — looks up tasks by exact then partial title match using `task_service.list_tasks` directly.
3. Expanded `_fallback_response` to handle:
   - `delete task: <title>` / `remove task: <title>` — finds task by title, calls `delete_task` MCP tool
   - `complete task: <title>` / `done task: <title>` / `finish task: <title>` — finds task by title, calls `complete_task` MCP tool
   - Returns user-friendly "not found" message if title doesn't match any task
4. Updated `_AI_UNAVAILABLE_MSG` and greeting reply to list all four fallback commands.
5. Pre-existing AI wrapping (`_call_gemini` with try/except returning None) and fallback routing in `run_agent` were already correct — no changes needed there.

## Outcome

- ✅ Impact: Chatbot now handles delete and complete commands by task title when Gemini is down
- 🧪 Tests: Manual testing via /chat endpoint with Gemini key removed
- 📁 Files: backend/agent/chat_agent.py
- 🔁 Next prompts: Add unit tests for fallback command parsing
- 🧠 Reflection: Reused existing MCP tool layer; title lookup does exact-then-partial match for usability

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): none
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): Add fuzzy title matching (e.g. difflib) for better UX
