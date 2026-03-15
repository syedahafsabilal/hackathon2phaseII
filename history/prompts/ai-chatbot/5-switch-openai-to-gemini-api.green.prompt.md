---
id: 5
title: Switch OpenAI to Gemini API
stage: green
date: 2026-02-15
surface: agent
model: claude-opus-4-6
feature: 002-ai-chatbot
branch: 002-ai-chatbot
user: Ali
command: /sp.implement
labels: ["gemini", "agent", "refactor", "api-switch"]
links:
  spec: specs/002-ai-chatbot/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - backend/agent/chat_agent.py
  - backend/config/settings.py
  - backend/requirements.txt
  - backend/.env.example
tests:
  - Manual validation pending
---

## Prompt

Important:
- Use Google Gemini API for AI responses (NOT OpenAI)
- Do NOT use OpenAI Agents SDK
- Implement agent logic compatible with Gemini models
- MCP server and tools remain unchanged
- Agent must call MCP tools deterministically based on intent

## Response snapshot

Switched AI backend from OpenAI Agents SDK to Google Gemini API. Four files changed:

1. **requirements.txt**: Replaced `openai-agents==0.0.16` with `google-genai==1.5.0`
2. **config/settings.py**: Changed `OPENAI_API_KEY` to `GEMINI_API_KEY`
3. **.env.example**: Updated placeholder to `GEMINI_API_KEY`
4. **agent/chat_agent.py**: Complete rewrite using `google-genai` SDK:
   - Uses Gemini's native function calling with 5 tool declarations
   - Imports MCP tool functions directly from `mcp_server/server.py` (same process)
   - Agentic loop: calls Gemini → if function_call → execute tool → feed result back → repeat until text response
   - `user_id` injected into every tool call automatically
   - Low temperature (0.2) for deterministic intent parsing
   - Model: `gemini-2.0-flash` for fast responses
   - MCP server module unchanged — tools still use task_service → database

## Outcome

- Impact: AI provider switched from OpenAI to Google Gemini; no other files affected
- Tests: Manual validation pending
- Files: 4 files modified
- Next prompts: Set GEMINI_API_KEY in .env, pip install updated requirements, test chat flow
- Reflection: Gemini function calling integrates cleanly — tools defined as FunctionDeclarations, executed via direct import from MCP server module.

## Evaluation notes (flywheel)

- Failure modes observed: None
- Graders run and results (PASS/FAIL): N/A
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): End-to-end test with real Gemini API key
