# API Contract: Chat & Auth Endpoints

**Feature**: 002-ai-chatbot
**Date**: 2026-02-14

## Base URL

`http://localhost:8000`

## Authentication

All protected endpoints require:
```
Authorization: Bearer <jwt_token>
```

---

## Auth Endpoints

### POST /api/auth/register

Register a new user.

**Request**:
```json
{
  "name": "string (required, 2-100 chars)",
  "email": "string (required, valid email)",
  "password": "string (required, min 8 chars, uppercase+lowercase+number)"
}
```

**Response 201**:
```json
{
  "id": "uuid",
  "name": "string",
  "email": "string",
  "token": "jwt_string"
}
```

**Error 400**: `{ "detail": "Email already registered" }`
**Error 422**: `{ "detail": "Validation error description" }`

---

### POST /api/auth/login

Authenticate and receive JWT.

**Request**:
```json
{
  "email": "string (required)",
  "password": "string (required)"
}
```

**Response 200**:
```json
{
  "id": "uuid",
  "name": "string",
  "email": "string",
  "token": "jwt_string"
}
```

**Error 401**: `{ "detail": "Invalid credentials" }`

---

## Chat Endpoint

### POST /api/{user_id}/chat

Send a message to the AI agent and receive a response.

**Auth**: Required (JWT must match user_id)

**Path Parameters**:
- `user_id` (UUID) — The authenticated user's ID

**Request**:
```json
{
  "message": "string (required, non-empty)"
}
```

**Response 200**:
```json
{
  "response": "string (agent's reply)",
  "conversation_id": "uuid"
}
```

**Error 400**: `{ "detail": "Message cannot be empty" }`
**Error 401**: `{ "detail": "Not authenticated" }`
**Error 403**: `{ "detail": "User ID mismatch" }`
**Error 500**: `{ "detail": "Agent processing error" }`

**Behavior**:
1. Loads or creates conversation for user_id
2. Loads last 20 messages as context
3. Appends user message to DB
4. Runs AI agent with MCP tools
5. Appends agent response to DB
6. Returns response

---

### GET /api/{user_id}/conversations

Load conversation history for display.

**Auth**: Required (JWT must match user_id)

**Path Parameters**:
- `user_id` (UUID) — The authenticated user's ID

**Response 200**:
```json
{
  "conversation_id": "uuid",
  "messages": [
    {
      "id": "uuid",
      "role": "user | assistant",
      "content": "string",
      "created_at": "ISO 8601 timestamp"
    }
  ]
}
```

**Error 401**: `{ "detail": "Not authenticated" }`
**Error 404**: `{ "detail": "No conversation found" }` (returns empty messages array instead)

---

## Task REST Endpoints (Phase II compatibility)

### GET /api/{user_id}/tasks

List all tasks for user.

**Auth**: Required

**Response 200**:
```json
[
  {
    "id": "uuid",
    "title": "string",
    "description": "string | null",
    "is_completed": false,
    "created_at": "ISO 8601",
    "updated_at": "ISO 8601",
    "completed_at": "ISO 8601 | null"
  }
]
```

### POST /api/{user_id}/tasks

Create a new task.

**Request**: `{ "title": "string", "description": "string | null" }`
**Response 201**: Task object

### PUT /api/{user_id}/tasks/{task_id}

Update a task.

**Request**: `{ "title": "string", "description": "string | null" }`
**Response 200**: Updated task object

### PATCH /api/{user_id}/tasks/{task_id}/complete

Mark task as completed.

**Response 200**: Updated task object with `is_completed: true`

### DELETE /api/{user_id}/tasks/{task_id}

Delete a task.

**Response 204**: No content

---

## MCP Tool Schemas

These are internal tools exposed to the AI agent via MCP protocol. They are NOT HTTP endpoints.

### add_task
```json
{
  "name": "add_task",
  "description": "Create a new task for the user",
  "parameters": {
    "user_id": "string (UUID)",
    "title": "string (required)",
    "description": "string (optional)"
  },
  "returns": "string — confirmation message with task title"
}
```

### list_tasks
```json
{
  "name": "list_tasks",
  "description": "List all tasks for the user",
  "parameters": {
    "user_id": "string (UUID)"
  },
  "returns": "string — formatted list of tasks with IDs, titles, and completion status"
}
```

### complete_task
```json
{
  "name": "complete_task",
  "description": "Mark a task as completed",
  "parameters": {
    "user_id": "string (UUID)",
    "task_id": "string (UUID)"
  },
  "returns": "string — confirmation message"
}
```

### delete_task
```json
{
  "name": "delete_task",
  "description": "Delete a task",
  "parameters": {
    "user_id": "string (UUID)",
    "task_id": "string (UUID)"
  },
  "returns": "string — confirmation message"
}
```

### update_task
```json
{
  "name": "update_task",
  "description": "Update a task's title or description",
  "parameters": {
    "user_id": "string (UUID)",
    "task_id": "string (UUID)",
    "title": "string (optional — new title)",
    "description": "string (optional — new description)"
  },
  "returns": "string — confirmation message with updated fields"
}
```
