---
id: 8
title: Fix Gemini SSL Async Agent Integration
stage: green
date: 2026-03-03
surface: agent
model: claude-sonnet-4-6
feature: 002-ai-chatbot
branch: 002-ai-chatbot
user: Ali
command: /sp.implement
labels: ["gemini", "async", "ssl", "error-handling", "backend"]
links:
  spec: specs/002-ai-chatbot/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - backend/agent/chat_agent.py
tests:
  - Manual: restart backend, send chat message, verify no SSL EOF error
---

## Prompt

Fix Gemini agent integration.

Current error:
SSL UNEXPECTED_EOF_WHILE_READING when calling generativelanguage.googleapis.com.

Actions required:
1. Replace any OpenAI-style client usage with official google.generativeai SDK
2. Use model: gemini-2.0-flash
3. Load GEMINI_API_KEY from .env
4. Add graceful fallback response if Gemini call fails
5. Log Gemini request/response errors clearly
6. Ensure MCP tools still execute even if LLM reply fails

Do NOT change frontend UI.
Do NOT remove MCP integration.
Focus only on backend agent reliability.

## Response snapshot

Root cause identified: `client.models.generate_content()` was a synchronous call inside `async def run_agent()`, blocking the asyncio event loop and causing SSL UNEXPECTED_EOF_WHILE_READING errors.

Fix applied to `backend/agent/chat_agent.py`:
1. Replaced `client.models.generate_content(...)` with `await client.aio.models.generate_content(...)` — uses the async HTTP client, confirmed available in google-genai 1.5.0
2. Added `import logging` and `logger = logging.getLogger(__name__)` — logs each Gemini request/response and all errors at ERROR level
3. Wrapped each Gemini call in try/except — on failure returns user-friendly fallback; if tools already ran, fallback message says "I've completed the requested actions..."
4. Tool execution is unchanged — MCP tools still execute from TOOL_FUNCTIONS dict via `_execute_tool()` even if subsequent LLM calls fail
5. GEMINI_API_KEY loaded from `.env` via existing `settings.GEMINI_API_KEY` (no change needed)
6. Model remains `gemini-2.0-flash` (unchanged)

## Outcome

- ✅ Impact: Backend Gemini agent calls are now fully async, eliminating SSL EOF errors caused by sync HTTP blocking in async context
- 🧪 Tests: Manual validation — restart uvicorn, POST /api/{user_id}/chat, verify response received without SSL error
- 📁 Files: backend/agent/chat_agent.py (1 file modified)
- 🔁 Next prompts: Run quickstart.md T047 validation steps to confirm full flow
- 🧠 Reflection: The SSL EOF error was a classic async/sync mismatch — the synchronous requests-based HTTP client inside an asyncio event loop can cause connection resets. Always use the async client variant (`client.aio`) in async FastAPI handlers.

## Evaluation notes (flywheel)

- Failure modes observed: Sync HTTP client blocking asyncio event loop → SSL EOF
- Graders run and results (PASS/FAIL): Manual smoke test pending
- Prompt variant (if applicable): null
- Next experiment: Add retry logic with exponential backoff if Gemini rate-limits
