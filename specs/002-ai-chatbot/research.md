# Research: AI-Powered Conversational Todo Chatbot

**Feature**: 002-ai-chatbot
**Date**: 2026-02-14

## Research Areas

### 1. OpenAI Agents SDK + MCP Integration

**Decision**: Use `openai-agents` Python SDK with MCP server integration for the AI agent.

**Rationale**:
- The OpenAI Agents SDK provides built-in support for MCP (Model Context Protocol) servers as tool providers
- Agent loop handles: intent parsing, tool selection, tool execution, response generation
- Stateless by design — each `Runner.run()` call is independent when given conversation history
- The SDK connects to MCP servers and automatically discovers available tools

**Alternatives considered**:
- **LangChain**: More complex, heavier dependency, overkill for 5 tools
- **Custom agent loop**: More work, less reliable tool calling, harder to maintain
- **Direct OpenAI function calling**: No MCP integration, would need manual tool dispatch

**Integration pattern**:
```
User message → FastAPI endpoint → Load conversation from DB
→ Build agent with MCP server → Runner.run(messages)
→ Agent calls MCP tools as needed → Return response
→ Store messages to DB
```

### 2. MCP Server Implementation

**Decision**: Use `mcp` Python SDK to create a stdio-based MCP server with 5 task tools.

**Rationale**:
- The `mcp` Python package provides `FastMCP` for quick server creation
- Tools are defined as decorated Python functions with type-annotated parameters
- The OpenAI Agents SDK can connect to MCP servers via `MCPServerStdio`
- Each tool function calls the task service layer which accesses the database

**Tool definitions**:
| Tool | Parameters | Returns |
|------|-----------|---------|
| `add_task` | `user_id: str, title: str, description: str` | Created task confirmation |
| `list_tasks` | `user_id: str` | List of all tasks for user |
| `complete_task` | `user_id: str, task_id: str` | Completion confirmation |
| `delete_task` | `user_id: str, task_id: str` | Deletion confirmation |
| `update_task` | `user_id: str, task_id: str, title: str, description: str` | Update confirmation |

### 3. Database Strategy

**Decision**: Use PostgreSQL (Neon Serverless) with SQLAlchemy async for all persistence.

**Rationale**:
- Consistent with Phase II architecture plan (PostgreSQL + Neon)
- SQLAlchemy provides async support with `asyncpg` driver
- New tables: `conversations`, `messages` alongside existing `users`, `tasks`
- Alembic for migrations

**Alternatives considered**:
- **SQLModel**: Simpler but less flexible for async patterns
- **Raw SQL**: Too error-prone, no migration support
- **SQLite**: Not production-ready, doesn't match constitution (PostgreSQL required)

### 4. Frontend Chat UI

**Decision**: Build a simple chat page at `/chat` within the existing Next.js app.

**Rationale**:
- Minimal new components needed: ChatInterface, MessageBubble, ChatInput
- Uses existing auth context for user identification
- Calls `POST /api/{user_id}/chat` with message body
- Loads conversation history on page mount via `GET /api/{user_id}/conversations`

**Alternatives considered**:
- **Third-party chat widget**: Adds dependency, less control, harder to integrate
- **WebSocket-based**: Overkill for request-response pattern; adds state complexity

### 5. Authentication Integration

**Decision**: Reuse JWT from Phase II. Frontend sends JWT in Authorization header; backend validates and extracts user_id.

**Rationale**:
- Constitution requires JWT-based authentication
- Phase II planned JWT but frontend currently uses localStorage mocks
- Backend will implement real JWT creation/validation
- Frontend auth context will be updated to call real API endpoints

**Key change**: Frontend `auth-context.tsx` must switch from localStorage mocks to real API calls to `POST /api/auth/register` and `POST /api/auth/login`.

### 6. Statelessness Pattern

**Decision**: Each chat request is fully self-contained after loading state from DB.

**Flow per request**:
1. Receive `POST /api/{user_id}/chat` with `{ message: string }`
2. Load or create conversation for user from DB
3. Load last N messages from DB (context window)
4. Construct agent with conversation history
5. Run agent (may invoke MCP tools)
6. Store user message + agent response to DB
7. Return response

No server-side caching, no session objects, no in-memory conversation state.
