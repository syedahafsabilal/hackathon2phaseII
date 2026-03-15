# Implementation Plan: AI-Powered Conversational Todo Chatbot

**Branch**: `002-ai-chatbot` | **Date**: 2026-02-14 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/002-ai-chatbot/spec.md`

## Summary

Implement an AI-powered conversational Todo chatbot that allows users to manage tasks via natural language chat. The system uses the OpenAI Agents SDK with MCP tools as the bridge between the AI agent and the database. A new FastAPI backend is created with a stateless chat endpoint, MCP server with 5 task tools, PostgreSQL persistence for conversations and tasks, and a frontend chat UI integrated into the existing Next.js app.

## Technical Context

**Language/Version**: Python 3.11+ (backend), TypeScript/Next.js 14 (frontend)
**Primary Dependencies**: FastAPI, OpenAI Agents SDK, MCP SDK (Python), SQLAlchemy/SQLModel, Next.js 14
**Storage**: PostgreSQL (Neon Serverless) — conversations, messages, users, tasks
**Testing**: pytest (backend), manual validation (frontend)
**Target Platform**: Web application (browser + server)
**Project Type**: Web application (frontend + backend)
**Performance Goals**: Agent response within 5 seconds, chat history load < 1 second
**Constraints**: Fully stateless backend, no in-memory state, agent MUST NOT access DB directly
**Scale/Scope**: Single-user demo scale, ~1 concurrent user, ~100 tasks per user

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Evidence |
|-----------|--------|----------|
| Clean Architecture | PASS | Frontend, backend, database in separate layers; MCP tools as clean boundary |
| Secure Authentication | PASS | JWT from Phase II reused for chat endpoint user identification |
| Persistent Data Storage | PASS | PostgreSQL for conversations, messages, and tasks |
| Beginner-Readable Code | PASS | Simple flat module structure, clear naming, no complex abstractions |
| Technology Stack Adherence | PASS | Next.js frontend, FastAPI backend, PostgreSQL, JWT, REST |
| User-Centric Design | PASS | Natural language chat is intuitive; confirmation messages for every action |
| Statelessness | PASS | All endpoints stateless; conversation loaded from DB per request |
| Agent Constraints | PASS | Agent uses only MCP tools; no direct DB access |
| MCP Authority | PASS | 5 MCP tools are sole interface for task operations |
| Conversation Integrity | PASS | History loaded from DB, responses stored back to DB |

**Gate result**: ALL PASS — proceed to Phase 0.

## Project Structure

### Documentation (this feature)

```text
specs/002-ai-chatbot/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output
│   └── chat-api.md      # Chat endpoint contract
└── tasks.md             # Phase 2 output (/sp.tasks)
```

### Source Code (repository root)

```text
backend/
├── main.py                  # FastAPI application entry point
├── requirements.txt         # Python dependencies
├── .env.example             # Environment variable template
├── config/
│   ├── settings.py          # App settings (DB URL, API keys)
│   └── database.py          # SQLAlchemy engine + session
├── models/
│   ├── __init__.py
│   ├── user.py              # User model
│   ├── task.py              # Task model (Phase II)
│   ├── conversation.py      # Conversation model (Phase III)
│   └── message.py           # Message model (Phase III)
├── schemas/
│   ├── __init__.py
│   ├── chat.py              # Chat request/response schemas
│   ├── task.py              # Task schemas
│   └── user.py              # User schemas
├── api/
│   ├── __init__.py
│   ├── auth.py              # Auth endpoints (register, login)
│   ├── tasks.py             # REST task endpoints (Phase II)
│   └── chat.py              # Chat endpoint (Phase III)
├── mcp_server/
│   ├── __init__.py
│   ├── server.py            # MCP server setup
│   └── tools.py             # 5 MCP task tools
├── agent/
│   ├── __init__.py
│   └── chat_agent.py        # OpenAI Agents SDK agent setup
├── services/
│   ├── __init__.py
│   ├── auth_service.py      # JWT creation/validation
│   ├── task_service.py      # Task CRUD (used by MCP tools)
│   └── conversation_service.py  # Conversation persistence
└── utils/
    ├── __init__.py
    └── security.py          # Password hashing, JWT helpers

frontend/
├── app/
│   └── chat/
│       └── page.tsx         # Chat page (new)
├── components/
│   └── chat/
│       ├── ChatInterface.tsx    # Main chat container
│       ├── MessageBubble.tsx    # Individual message display
│       └── ChatInput.tsx        # Message input bar
├── context/
│   ├── auth-context.tsx     # Updated: real API calls
│   └── task-context.tsx     # Updated: real API calls
└── lib/
    └── api.ts               # API client for backend calls
```

**Structure Decision**: Web application pattern with `backend/` (new FastAPI server) and `frontend/` (existing Next.js app extended with chat page). The backend is flat and simple — no nested `src/` directory — to maintain beginner readability per constitution.

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| MCP server as separate module | Constitution mandates MCP Authority — agent MUST NOT access DB directly | Direct DB access from agent would violate Agent Constraints principle |
| OpenAI Agents SDK dependency | Provides agent loop, tool calling, and natural language understanding out of the box | Building custom NLU would be far more complex and less reliable |
