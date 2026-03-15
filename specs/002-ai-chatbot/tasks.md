# Tasks: AI-Powered Conversational Todo Chatbot

**Input**: Design documents from `/specs/002-ai-chatbot/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Not explicitly requested in spec — test tasks are omitted. Manual validation via quickstart.md.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization, backend structure, and dependency management

- [x] T001 Create backend project directory structure per plan.md (`backend/`, `backend/config/`, `backend/models/`, `backend/schemas/`, `backend/api/`, `backend/mcp_server/`, `backend/agent/`, `backend/services/`, `backend/utils/`) with `__init__.py` files
- [x] T002 Create `backend/requirements.txt` with dependencies: fastapi, uvicorn, sqlalchemy[asyncio], asyncpg, openai-agents, mcp, python-jose[cryptography], passlib[bcrypt], pydantic, python-dotenv
- [x] T003 [P] Create `backend/.env.example` with placeholders for `DATABASE_URL`, `OPENAI_API_KEY`, `JWT_SECRET`
- [x] T004 [P] Create frontend chat route directory and page file at `frontend/app/chat/page.tsx` (empty placeholder)
- [x] T005 [P] Create frontend chat component directory `frontend/components/chat/` (empty placeholder files for ChatInterface.tsx, MessageBubble.tsx, ChatInput.tsx)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T006 Implement app settings in `backend/config/settings.py` — load DATABASE_URL, OPENAI_API_KEY, JWT_SECRET from environment using pydantic BaseSettings and python-dotenv
- [x] T007 Implement database engine and async session factory in `backend/config/database.py` — create SQLAlchemy async engine from DATABASE_URL, create async sessionmaker, create `get_db` dependency, add `create_tables()` startup function
- [x] T008 [P] Implement User model in `backend/models/user.py` — SQLAlchemy model with fields: id (UUID PK), name (VARCHAR 100), email (VARCHAR 254 UNIQUE), password_hash (VARCHAR 255), created_at, updated_at per data-model.md
- [x] T009 [P] Implement Task model in `backend/models/task.py` — SQLAlchemy model with fields: id (UUID PK), user_id (FK users.id), title (VARCHAR 200), description (TEXT nullable), is_completed (BOOLEAN default false), created_at, updated_at, completed_at (nullable) per data-model.md
- [x] T010 [P] Implement Conversation model in `backend/models/conversation.py` — SQLAlchemy model with fields: id (UUID PK), user_id (FK users.id), created_at, updated_at per data-model.md
- [x] T011 [P] Implement Message model in `backend/models/message.py` — SQLAlchemy model with fields: id (UUID PK), conversation_id (FK conversations.id), role (VARCHAR 10 CHECK user/assistant), content (TEXT), created_at per data-model.md
- [x] T012 Implement models `__init__.py` in `backend/models/__init__.py` — import and export all models (User, Task, Conversation, Message) so create_tables() discovers them
- [x] T013 [P] Implement Pydantic schemas in `backend/schemas/chat.py` — ChatRequest (message: str), ChatResponse (response: str, conversation_id: UUID) per chat-api.md contract
- [x] T014 [P] Implement Pydantic schemas in `backend/schemas/task.py` — TaskCreate (title, description), TaskUpdate (title, description), TaskResponse (id, title, description, is_completed, created_at, updated_at, completed_at) per chat-api.md contract
- [x] T015 [P] Implement Pydantic schemas in `backend/schemas/user.py` — RegisterRequest (name, email, password with validation), LoginRequest (email, password), AuthResponse (id, name, email, token) per chat-api.md contract
- [x] T016 [P] Implement password hashing utilities in `backend/utils/security.py` — bcrypt hash_password() and verify_password() functions
- [x] T017 Implement auth service in `backend/services/auth_service.py` — JWT create_token(user_id), verify_token(token) → user_id, register_user(), login_user() using utils/security.py and models
- [x] T018 Implement auth dependency in `backend/api/auth.py` — `get_current_user` FastAPI dependency that extracts and validates JWT from Authorization header, returns user_id
- [x] T019 Implement auth endpoints in `backend/api/auth.py` — POST /api/auth/register (201 response) and POST /api/auth/login (200 response) per chat-api.md contract
- [x] T020 Implement task service in `backend/services/task_service.py` — CRUD functions: create_task(), list_tasks(), complete_task(), delete_task(), update_task() — all async, all take db session + user_id, enforce user isolation
- [x] T021 Implement task REST endpoints in `backend/api/tasks.py` — GET/POST /api/{user_id}/tasks, PUT /api/{user_id}/tasks/{task_id}, PATCH /api/{user_id}/tasks/{task_id}/complete, DELETE /api/{user_id}/tasks/{task_id} per chat-api.md contract, with JWT auth + user_id match check
- [x] T022 Implement FastAPI app entry point in `backend/main.py` — create FastAPI app, include auth and task routers, add CORS middleware for localhost:3000, call create_tables() on startup event
- [x] T023 Implement frontend API client in `frontend/lib/api.ts` — base URL config, helper functions for register(), login(), sendMessage(), getConversation(), with JWT header injection from localStorage
- [x] T024 Update frontend auth context in `frontend/context/auth-context.tsx` — replace localStorage mocks with real API calls to POST /api/auth/register and POST /api/auth/login, store JWT token and user data in localStorage

**Checkpoint**: Foundation ready — auth works end-to-end, task REST API works, database tables created. User story implementation can now begin.

---

## Phase 3: User Story 1 — Manage Todos via Chat (Priority: P1) 🎯 MVP

**Goal**: Users can create, list, complete, update, and delete todos entirely through natural language chat messages. The AI agent interprets intent and invokes MCP tools.

**Independent Test**: Open the chat, send "Add a task: finish homework", receive a confirmation, then send "Show my tasks" and see the newly created task in the response.

### Implementation for User Story 1

- [x] T025 [US1] Implement MCP server in `backend/mcp_server/server.py` — use FastMCP from `mcp` SDK to create a stdio-based MCP server, register 5 tool handlers (add_task, list_tasks, complete_task, delete_task, update_task) that each call the corresponding function from task_service.py, pass user_id and db session via context
- [x] T026 [US1] Implement MCP tool definitions in `backend/mcp_server/tools.py` — define the 5 tool functions with proper type annotations matching MCP tool schemas from chat-api.md: add_task(user_id, title, description), list_tasks(user_id), complete_task(user_id, task_id), delete_task(user_id, task_id), update_task(user_id, task_id, title, description); each returns a string confirmation
- [x] T027 [US1] Implement AI chat agent in `backend/agent/chat_agent.py` — use OpenAI Agents SDK, create agent with system prompt instructing it to be a task management assistant, connect to MCP server via MCPServerStdio, implement run_agent(messages, user_id) that executes Runner.run() and returns agent response text
- [x] T028 [US1] Implement chat endpoint in `backend/api/chat.py` — POST /api/{user_id}/chat per contract: validate JWT + user_id match, accept ChatRequest, call agent with user message, return ChatResponse with agent reply and conversation_id
- [x] T029 [US1] Register chat router in `backend/main.py` — add the chat router to the FastAPI app
- [x] T030 [P] [US1] Implement ChatInput component in `frontend/components/chat/ChatInput.tsx` — text input with send button, calls onSend callback with message text, clears input after send, disabled state while loading
- [x] T031 [P] [US1] Implement MessageBubble component in `frontend/components/chat/MessageBubble.tsx` — displays a single message with role-based styling (user = right-aligned, assistant = left-aligned), shows message content and timestamp
- [x] T032 [US1] Implement ChatInterface component in `frontend/components/chat/ChatInterface.tsx` — main chat container that holds message list and ChatInput, manages local messages state, calls POST /api/{user_id}/chat on send, appends user message immediately and agent response when received, auto-scrolls to bottom
- [x] T033 [US1] Implement chat page in `frontend/app/chat/page.tsx` — protected page (redirect to login if not authenticated), renders ChatInterface, gets user_id from auth context, includes navigation back to dashboard

**Checkpoint**: At this point, User Story 1 should be fully functional — user can chat with the AI agent to manage tasks via natural language. Tasks created via chat should also appear in the Phase II task list.

---

## Phase 4: User Story 2 — Persistent Conversation History (Priority: P2)

**Goal**: Conversation history persists across browser sessions. Returning users see prior messages and the agent retains context from previous interactions.

**Independent Test**: Send "Add a task: read a book", close the browser tab, reopen the chat, and see the previous conversation including the agent's confirmation. A follow-up message like "What did I add last?" returns accurate context.

### Implementation for User Story 2

- [x] T034 [US2] Implement conversation service in `backend/services/conversation_service.py` — get_or_create_conversation(db, user_id), add_message(db, conversation_id, role, content), get_messages(db, conversation_id, limit=20) — all async, loads last N messages ordered by created_at
- [x] T035 [US2] Update chat endpoint in `backend/api/chat.py` — integrate conversation_service: load/create conversation, load last 20 messages as context, store user message before agent call, store agent response after agent call, pass full message history to agent
- [x] T036 [US2] Update chat agent in `backend/agent/chat_agent.py` — accept conversation history as input messages list (not just single message), pass full history to Runner.run() so agent has prior context
- [x] T037 [US2] Implement GET /api/{user_id}/conversations endpoint in `backend/api/chat.py` — returns conversation_id and messages array per chat-api.md contract, with JWT auth + user_id match
- [x] T038 [US2] Update ChatInterface in `frontend/components/chat/ChatInterface.tsx` — on mount, call GET /api/{user_id}/conversations to load previous messages, populate message list, show loading state while fetching
- [x] T039 [US2] Update frontend API client in `frontend/lib/api.ts` — add getConversation(userId) function that calls GET /api/{user_id}/conversations

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently. Conversations persist and agent retains context across sessions.

---

## Phase 5: User Story 3 — Error Handling and Graceful Degradation (Priority: P3)

**Goal**: The agent responds helpfully to ambiguous or invalid requests. MCP tool failures are communicated clearly to the user.

**Independent Test**: Send a nonsensical message like "blahblah task maybe" and the agent responds with a helpful clarification prompt rather than crashing.

### Implementation for User Story 3

- [x] T040 [US3] Update agent system prompt in `backend/agent/chat_agent.py` — enhance instructions to handle ambiguous messages by asking for clarification with examples, handle tool errors gracefully, suggest alternatives when tasks are not found
- [x] T041 [US3] Add error handling in chat endpoint `backend/api/chat.py` — catch agent processing errors, MCP tool failures, and database errors; return appropriate HTTP status codes (400, 500) with user-friendly error messages per contract
- [x] T042 [US3] Add error handling in MCP tools `backend/mcp_server/tools.py` — catch task-not-found errors in complete_task/delete_task/update_task, return descriptive error strings instead of raising exceptions
- [x] T043 [US3] Add empty message validation in chat endpoint `backend/api/chat.py` — return 400 with "Message cannot be empty" if message is empty or whitespace
- [x] T044 [US3] Add frontend error display in `frontend/components/chat/ChatInterface.tsx` — show error messages in chat when API calls fail (network error, 500 response), display as system message bubble with error styling

**Checkpoint**: All user stories should now be independently functional. Agent handles edge cases gracefully.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [x] T045 [P] Add chat link to dashboard navigation in `frontend/app/dashboard/layout.tsx` — add "Chat" link/button to navigate to /chat page
- [x] T046 [P] Update frontend task context in `frontend/context/task-context.tsx` — replace localStorage mocks with real API calls to GET/POST/PUT/PATCH/DELETE task endpoints, use JWT auth headers
- [x] T047 Validate full flow using `specs/002-ai-chatbot/quickstart.md` verification steps — register user, test chat, test persistence, test Phase II compatibility
- [x] T048 [P] Add CORS and environment configuration review in `backend/main.py` — verify CORS origins are correct, verify all env vars are loaded, add startup logging

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — can start immediately
- **Foundational (Phase 2)**: Depends on Phase 1 completion — BLOCKS all user stories
- **User Story 1 (Phase 3)**: Depends on Phase 2 completion
- **User Story 2 (Phase 4)**: Depends on Phase 3 (US1) — builds on chat endpoint and ChatInterface
- **User Story 3 (Phase 5)**: Depends on Phase 3 (US1) — adds error handling to existing chat flow
- **Polish (Phase 6)**: Depends on Phase 3 minimum, ideally Phase 4+5

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Phase 2 — No dependencies on other stories
- **User Story 2 (P2)**: Depends on US1 — extends the chat endpoint and ChatInterface created in US1
- **User Story 3 (P3)**: Depends on US1 — adds error handling to chat endpoint and agent from US1. Can be done in parallel with US2 (different concerns, mostly different code paths)

### Within Each User Story

- Models/schemas before services
- Services before endpoints/agent
- Backend before frontend (frontend calls backend APIs)
- Core implementation before integration

### Parallel Opportunities

- T003, T004, T005 can run in parallel (different files, no dependencies)
- T008, T009, T010, T011 can run in parallel (independent model files)
- T013, T014, T015, T016 can run in parallel (independent schema/utility files)
- T030, T031 can run in parallel (independent frontend components)
- T045, T046, T048 can run in parallel (independent polish tasks)
- US3 (Phase 5) can run in parallel with US2 (Phase 4) after US1 is complete

---

## Parallel Example: Phase 2 Foundational

```bash
# Launch all models in parallel:
Task T008: "Implement User model in backend/models/user.py"
Task T009: "Implement Task model in backend/models/task.py"
Task T010: "Implement Conversation model in backend/models/conversation.py"
Task T011: "Implement Message model in backend/models/message.py"

# Launch all schemas in parallel:
Task T013: "Implement chat schemas in backend/schemas/chat.py"
Task T014: "Implement task schemas in backend/schemas/task.py"
Task T015: "Implement user schemas in backend/schemas/user.py"
Task T016: "Implement security utilities in backend/utils/security.py"
```

## Parallel Example: User Story 1 Frontend

```bash
# Launch frontend components in parallel:
Task T030: "Implement ChatInput in frontend/components/chat/ChatInput.tsx"
Task T031: "Implement MessageBubble in frontend/components/chat/MessageBubble.tsx"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (T001–T005)
2. Complete Phase 2: Foundational (T006–T024)
3. Complete Phase 3: User Story 1 (T025–T033)
4. **STOP and VALIDATE**: Test US1 independently — chat with agent, create/list/complete/delete tasks
5. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy/Demo (**MVP!**)
3. Add User Story 2 → Test independently → Deploy/Demo (conversations persist)
4. Add User Story 3 → Test independently → Deploy/Demo (errors handled gracefully)
5. Polish phase → Final validation

### Suggested MVP Scope

**User Story 1 only** (Phases 1–3, tasks T001–T033). This delivers the core value proposition: managing todos through natural language chat.

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- No test tasks included — manual validation via quickstart.md
- MCP tools are the ONLY interface between agent and database (constitution mandate)
- Backend is fully stateless — conversation loaded from DB per request
