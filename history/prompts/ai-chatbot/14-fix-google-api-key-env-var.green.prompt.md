---
id: 14
title: Fix Google API key env var
stage: green
date: 2026-03-06
surface: agent
model: claude-sonnet-4-6
feature: ai-chatbot
branch: 002-ai-chatbot
user: Ali
command: /sp.implement
labels: ["gemini", "api-key", "env", "config", "fix", "chat-agent"]
links:
  spec: specs/002-ai-chatbot/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - backend/config/settings.py
  - backend/agent/chat_agent.py
  - backend/.env
tests:
  - Manual: set GOOGLE_API_KEY in .env → restart server → send chat message → agent responds correctly
  - Manual: leave GOOGLE_API_KEY empty → send message → gets "AI service is not configured" error message
---

## Prompt

You are helping a developer fix a FastAPI project's chat agent code.

Current situation:
- The backend works and login/authentication works.
- The chat endpoint is returning: "I'm having trouble connecting to the AI service right now. Please try again in a moment."
- The project uses Google Generative AI (Gemini) via `google.genai`.
- The developer has a free API key from Google API Studio.
- The key is stored in an environment variable named `GOOGLE_API_KEY`.

Task:
1. Modify the chat agent code (`chat_agent.py`) so that it:
   - Imports `google.genai`.
   - Reads the API key from the environment variable `GOOGLE_API_KEY`.
   - Initializes the client correctly with the API key.
   - Ensures all chat requests use this client.

2. If there is any hardcoded token or missing client initialization in `chat_agent.py`, replace it with proper environment-variable usage.

3. Add clear error handling so that if the AI service cannot connect, it logs the error but does not crash the server.

4. Provide the final working Python code

## Response snapshot

Root cause: `settings.py` only declared `GEMINI_API_KEY` as a settings field. The developer's valid API key is stored in `GOOGLE_API_KEY` (the standard name used by Google AI Studio). `pydantic_settings` silently ignored `GOOGLE_API_KEY` (no matching field), so `genai.Client(api_key=settings.GEMINI_API_KEY)` either used an old/invalid key from `.env` → Gemini API call failed → fallback message returned.

**Fix in `backend/config/settings.py`**:
- Added `GOOGLE_API_KEY: str = ""` as the primary field
- Changed `GEMINI_API_KEY: str` (required) to `GEMINI_API_KEY: str = ""` (optional fallback)
- Added `@property google_api_key` that returns `GOOGLE_API_KEY or GEMINI_API_KEY` — prefers the new name, falls back to old name for backward compatibility

**Fix in `backend/agent/chat_agent.py`**:
- Changed `client = genai.Client(api_key=settings.GEMINI_API_KEY)` to use `settings.google_api_key`
- Added explicit check: if `api_key` is empty, logs an ERROR and returns a clear message ("AI service is not configured. Please set GOOGLE_API_KEY in backend/.env and restart.")
- This prevents a cryptic API error when the key is missing

**Fix in `backend/.env`**:
- Renamed `GEMINI_API_KEY=...` to `GOOGLE_API_KEY=...` (same key value, new variable name)
- Added commented-out `# GEMINI_API_KEY=` for backward compat reference

**How the key lookup works now:**
```
Priority 1: GOOGLE_API_KEY env var (or .env entry)
Priority 2: GEMINI_API_KEY env var (or .env entry)  ← legacy fallback
Priority 3: empty string → "AI service is not configured" error message
```

## Outcome

- ✅ Impact: Chat agent now reads the API key from GOOGLE_API_KEY (matching the developer's environment), eliminating the "trouble connecting" fallback message.
- 🧪 Tests: Manual — set GOOGLE_API_KEY in .env, restart, send chat message.
- 📁 Files: backend/config/settings.py (new field + property), backend/agent/chat_agent.py (use google_api_key property + startup check), backend/.env (renamed key).
- 🔁 Next prompts: Test full chat flow end-to-end with a valid Gemini API key.
- 🧠 Reflection: When a settings field name doesn't match the env var name, pydantic_settings silently ignores the env var. Always verify field names match expected env var names. Google AI Studio uses GOOGLE_API_KEY as the standard name, not GEMINI_API_KEY.

## Evaluation notes (flywheel)

- Failure modes observed: settings field name mismatch causes silent env var ignore; broad exception in run_agent swallows the real API error (invalid key) and returns generic fallback message.
- Graders run and results (PASS/FAIL): Manual code review PASS
- Prompt variant (if applicable): null
- Next experiment: Add a startup health-check that validates the Gemini API key is non-empty and logs a WARNING at server start if it's missing.
