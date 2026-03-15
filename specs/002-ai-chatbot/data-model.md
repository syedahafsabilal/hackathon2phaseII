# Data Model: AI-Powered Conversational Todo Chatbot

**Feature**: 002-ai-chatbot
**Date**: 2026-02-14

## Entities

### 1. User

| Field | Type | Constraints | Notes |
|-------|------|-------------|-------|
| id | UUID | PK, auto-generated | |
| name | VARCHAR(100) | NOT NULL | Display name |
| email | VARCHAR(254) | NOT NULL, UNIQUE | Login identifier |
| password_hash | VARCHAR(255) | NOT NULL | bcrypt hashed |
| created_at | TIMESTAMP | NOT NULL, DEFAULT NOW() | |
| updated_at | TIMESTAMP | NOT NULL, DEFAULT NOW() | Auto-updated |

**Relationships**: One-to-many → Tasks, One-to-many → Conversations

### 2. Task (Phase II — extended)

| Field | Type | Constraints | Notes |
|-------|------|-------------|-------|
| id | UUID | PK, auto-generated | |
| user_id | UUID | FK → users.id, NOT NULL | Owner |
| title | VARCHAR(200) | NOT NULL | |
| description | TEXT | NULLABLE | Optional detail |
| is_completed | BOOLEAN | NOT NULL, DEFAULT FALSE | |
| created_at | TIMESTAMP | NOT NULL, DEFAULT NOW() | |
| updated_at | TIMESTAMP | NOT NULL, DEFAULT NOW() | Auto-updated |
| completed_at | TIMESTAMP | NULLABLE | Set when completed |

**Indexes**: `(user_id)`, `(user_id, is_completed)`

### 3. Conversation (Phase III — new)

| Field | Type | Constraints | Notes |
|-------|------|-------------|-------|
| id | UUID | PK, auto-generated | |
| user_id | UUID | FK → users.id, NOT NULL | Owner |
| created_at | TIMESTAMP | NOT NULL, DEFAULT NOW() | |
| updated_at | TIMESTAMP | NOT NULL, DEFAULT NOW() | Updated on new message |

**Relationships**: One-to-many → Messages
**Indexes**: `(user_id)`

**Design note**: One conversation per user (simplest model). When the user opens the chat, their single conversation is loaded or created. This avoids multi-conversation complexity while meeting all spec requirements.

### 4. Message (Phase III — new)

| Field | Type | Constraints | Notes |
|-------|------|-------------|-------|
| id | UUID | PK, auto-generated | |
| conversation_id | UUID | FK → conversations.id, NOT NULL | Parent conversation |
| role | VARCHAR(10) | NOT NULL, CHECK IN ('user', 'assistant') | Sender type |
| content | TEXT | NOT NULL | Message text |
| created_at | TIMESTAMP | NOT NULL, DEFAULT NOW() | Ordering + display |

**Indexes**: `(conversation_id, created_at)`

## Entity Relationship Diagram

```
User (1) ──── (N) Task
  │
  └── (1) ──── (N) Conversation
                      │
                      └── (1) ──── (N) Message
```

## State Transitions

### Task States
```
created (is_completed=false)
  → completed (is_completed=true, completed_at=NOW)
  → updated (title/description changed)
  → deleted (row removed)
```

### Conversation Lifecycle
```
created (on first chat message)
  → active (messages added per request)
  → no explicit close/archive state
```

## Validation Rules

- **User.email**: Must match email regex, max 254 chars, unique across all users
- **User.password**: Min 8 chars, must contain uppercase, lowercase, number (validated before hashing)
- **Task.title**: Required, 1-200 chars
- **Task.description**: Optional, max 1000 chars
- **Message.role**: Must be exactly 'user' or 'assistant'
- **Message.content**: Required, non-empty
