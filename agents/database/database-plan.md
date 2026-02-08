# Todo Application Database Planning Document

## Overview

This document outlines the database schema design for the Todo application using PostgreSQL and SQLModel. The schema is designed with proper normalization, efficient indexing for user-based filtering, and extensibility for future AI features.

## Database Schema

### Users Table
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  username VARCHAR(50) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  avatar_url TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  email_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for user lookup
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_users_created_at ON users(created_at);
```

**Fields:**
- `id`: Primary key, UUID, auto-generated
- `email`: Unique email address, VARCHAR(255), not null
- `username`: Unique username, VARCHAR(50), not null
- `password_hash`: Hashed password, VARCHAR(255), not null
- `first_name`: User's first name, VARCHAR(100), optional
- `last_name`: User's last name, VARCHAR(100), optional
- `avatar_url`: URL to user's avatar image, TEXT, optional
- `is_active`: Account active status, BOOLEAN, default TRUE
- `email_verified`: Email verification status, BOOLEAN, default FALSE
- `created_at`: Timestamp of record creation, TIMESTAMP WITH TIME ZONE, auto-default
- `updated_at`: Timestamp of last update, TIMESTAMP WITH TIME ZONE, auto-default

### Todos Table
```sql
CREATE TABLE todos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed')),
  priority INTEGER DEFAULT 1 CHECK (priority BETWEEN 1 AND 5),
  due_date TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for efficient querying
CREATE INDEX idx_todos_user_id ON todos(user_id);
CREATE INDEX idx_todos_status ON todos(status);
CREATE INDEX idx_todos_priority ON todos(priority);
CREATE INDEX idx_todos_due_date ON todos(due_date);
CREATE INDEX idx_todos_completed_at ON todos(completed_at);
CREATE INDEX idx_todos_created_at ON todos(created_at);
CREATE INDEX idx_todos_user_status ON todos(user_id, status);
CREATE INDEX idx_todos_user_priority ON todos(user_id, priority);
CREATE INDEX idx_todos_user_due_date ON todos(user_id, due_date);
```

**Fields:**
- `id`: Primary key, UUID, auto-generated
- `user_id`: Foreign key to users table, UUID, not null, cascading delete
- `title`: Todo title, VARCHAR(255), not null
- `description`: Todo description, TEXT, optional
- `status`: Todo status enum, VARCHAR(20), default 'pending', constrained to allowed values
- `priority`: Priority level, INTEGER, default 1, constrained 1-5
- `due_date`: Due date/time, TIMESTAMP WITH TIME ZONE, optional
- `completed_at`: Completion timestamp, TIMESTAMP WITH TIME ZONE, optional
- `created_at`: Creation timestamp, TIMESTAMP WITH TIME ZONE, auto-default
- `updated_at`: Last update timestamp, TIMESTAMP WITH TIME ZONE, auto-default

### Tags Table
```sql
CREATE TABLE tags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(50) NOT NULL,
  color VARCHAR(7), -- Hex color code
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(name, user_id) -- Unique tag names per user
);

-- Indexes for efficient querying
CREATE INDEX idx_tags_user_id ON tags(user_id);
CREATE INDEX idx_tags_name ON tags(name);
CREATE INDEX idx_tags_user_name ON tags(user_id, name);
```

**Fields:**
- `id`: Primary key, UUID, auto-generated
- `name`: Tag name, VARCHAR(50), not null
- `color`: Color code in hex format, VARCHAR(7), optional
- `user_id`: Foreign key to users table, UUID, not null, cascading delete
- `created_at`: Creation timestamp, TIMESTAMP WITH TIME ZONE, auto-default
- Constraint: Unique combination of name and user_id

### Todo-Tags Junction Table
```sql
CREATE TABLE todo_tags (
  todo_id UUID NOT NULL REFERENCES todos(id) ON DELETE CASCADE,
  tag_id UUID NOT NULL REFERENCES tags(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (todo_id, tag_id)
);

-- Indexes for efficient querying
CREATE INDEX idx_todo_tags_todo_id ON todo_tags(todo_id);
CREATE INDEX idx_todo_tags_tag_id ON todo_tags(tag_id);
```

**Fields:**
- `todo_id`: Foreign key to todos table, UUID, not null, cascading delete
- `tag_id`: Foreign key to tags table, UUID, not null, cascading delete
- `created_at`: Association creation timestamp, TIMESTAMP WITH TIME ZONE, auto-default
- Primary key: Composite of (todo_id, tag_id)

### Sessions Table (for JWT refresh tokens)
```sql
CREATE TABLE sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  refresh_token VARCHAR(255) UNIQUE NOT NULL,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  is_revoked BOOLEAN DEFAULT FALSE
);

-- Indexes for efficient querying
CREATE INDEX idx_sessions_user_id ON sessions(user_id);
CREATE INDEX idx_sessions_refresh_token ON sessions(refresh_token);
CREATE INDEX idx_sessions_expires_at ON sessions(expires_at);
CREATE INDEX idx_sessions_active ON sessions(user_id, is_revoked) WHERE is_revoked = FALSE;
```

**Fields:**
- `id`: Primary key, UUID, auto-generated
- `user_id`: Foreign key to users table, UUID, not null, cascading delete
- `refresh_token`: Unique refresh token, VARCHAR(255), not null
- `expires_at`: Token expiration timestamp, TIMESTAMP WITH TIME ZONE, not null
- `created_at`: Creation timestamp, TIMESTAMP WITH TIME ZONE, auto-default
- `is_revoked`: Revocation status, BOOLEAN, default FALSE

### AI Analytics Table (Future Feature Support)
```sql
CREATE TABLE ai_analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  todo_id UUID REFERENCES todos(id) ON DELETE SET NULL,
  ai_feature VARCHAR(100) NOT NULL, -- Feature name (e.g., 'smart-priority', 'natural-language-parser')
  action VARCHAR(50) NOT NULL, -- Action taken (e.g., 'suggested', 'applied', 'rejected')
  metadata JSONB, -- Additional data about the AI interaction
  confidence_score DECIMAL(3,2), -- Confidence score (0.00 to 1.00)
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for efficient querying
CREATE INDEX idx_ai_analytics_user_id ON ai_analytics(user_id);
CREATE INDEX idx_ai_analytics_todo_id ON ai_analytics(todo_id);
CREATE INDEX idx_ai_analytics_feature ON ai_analytics(ai_feature);
CREATE INDEX idx_ai_analytics_created_at ON ai_analytics(created_at);
CREATE INDEX idx_ai_analytics_user_feature ON ai_analytics(user_id, ai_feature);
```

**Fields:**
- `id`: Primary key, UUID, auto-generated
- `user_id`: Foreign key to users table, UUID, not null, cascading delete
- `todo_id`: Foreign key to todos table, UUID, nullable, sets null on delete
- `ai_feature`: Name of the AI feature used, VARCHAR(100), not null
- `action`: Action taken by AI/user, VARCHAR(50), not null
- `metadata`: Additional data in JSON format, JSONB, optional
- `confidence_score`: Confidence level of AI suggestion, DECIMAL(3,2), optional
- `created_at`: Creation timestamp, TIMESTAMP WITH TIME ZONE, auto-default

## Relationships

### One-to-Many Relationships

#### Users to Todos
- One user can have many todos
- Foreign key: `todos.user_id` references `users.id`
- Cascade delete: When user is deleted, all their todos are deleted
- Index: `idx_todos_user_id` for efficient filtering

#### Users to Tags
- One user can have many tags
- Foreign key: `tags.user_id` references `users.id`
- Cascade delete: When user is deleted, all their tags are deleted
- Index: `idx_tags_user_id` for efficient filtering

#### Users to Sessions
- One user can have many sessions
- Foreign key: `sessions.user_id` references `users.id`
- Cascade delete: When user is deleted, all their sessions are deleted
- Index: `idx_sessions_user_id` for efficient filtering

#### Users to AI Analytics
- One user can have many AI analytics records
- Foreign key: `ai_analytics.user_id` references `users.id`
- Cascade delete: When user is deleted, all their AI analytics are deleted
- Index: `idx_ai_analytics_user_id` for efficient filtering

### Many-to-Many Relationships

#### Todos to Tags
- Many todos can have many tags (through junction table)
- Junction table: `todo_tags` with foreign keys to both tables
- Cascade delete: When todo or tag is deleted, association is removed
- Indexes: `idx_todo_tags_todo_id` and `idx_todo_tags_tag_id` for efficient joins

## Indexes and Constraints for User-Based Filtering

### Primary Indexes for User Filtering
```sql
-- Todos filtered by user
CREATE INDEX idx_todos_user_id ON todos(user_id);

-- Combined user and status filtering
CREATE INDEX idx_todos_user_status ON todos(user_id, status);

-- Combined user and priority filtering
CREATE INDEX idx_todos_user_priority ON todos(user_id, priority);

-- Combined user and due date filtering
CREATE INDEX idx_todos_user_due_date ON todos(user_id, due_date);

-- Tags filtered by user
CREATE INDEX idx_tags_user_id ON tags(user_id);

-- Combined user and tag name filtering
CREATE INDEX idx_tags_user_name ON tags(user_id, name);

-- Active sessions filtered by user
CREATE INDEX idx_sessions_active ON sessions(user_id, is_revoked) WHERE is_revoked = FALSE;

-- AI analytics filtered by user
CREATE INDEX idx_ai_analytics_user_id ON ai_analytics(user_id);
```

### Additional Performance Indexes
```sql
-- Todos by status (for dashboard views)
CREATE INDEX idx_todos_status ON todos(status);

-- Todos by priority (for priority sorting)
CREATE INDEX idx_todos_priority ON todos(priority);

-- Todos by due date (for upcoming deadlines)
CREATE INDEX idx_todos_due_date ON todos(due_date);

-- Todos by completion date (for history views)
CREATE INDEX idx_todos_completed_at ON todos(completed_at);

-- Tags by name (for tag search)
CREATE INDEX idx_tags_name ON tags(name);

-- Sessions by expiration (for cleanup jobs)
CREATE INDEX idx_sessions_expires_at ON sessions(expires_at);

-- AI analytics by feature (for feature usage analysis)
CREATE INDEX idx_ai_analytics_feature ON ai_analytics(ai_feature);

-- Users by email (for authentication)
CREATE INDEX idx_users_email ON users(email);

-- Users by username (for authentication)
CREATE INDEX idx_users_username ON users(username);
```

### Constraints
```sql
-- Todos status constraint
ALTER TABLE todos ADD CONSTRAINT chk_todos_status
CHECK (status IN ('pending', 'in_progress', 'completed'));

-- Todos priority constraint
ALTER TABLE todos ADD CONSTRAINT chk_todos_priority
CHECK (priority BETWEEN 1 AND 5);

-- Tags name uniqueness per user
ALTER TABLE tags ADD CONSTRAINT uk_tags_user_name
UNIQUE (name, user_id);

-- Users email uniqueness
ALTER TABLE users ADD CONSTRAINT uk_users_email
UNIQUE (email);

-- Users username uniqueness
ALTER TABLE users ADD CONSTRAINT uk_users_username
UNIQUE (username);
```

## SQLModel Class Outlines

### Base Classes
```python
from sqlmodel import SQLModel, Field, Relationship
from typing import Optional, List
import uuid
from datetime import datetime
from enum import Enum
from pydantic import EmailStr

class BaseTimestamp(SQLModel):
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class UUIDPrimaryKey(SQLModel):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
```

### User Model
```python
class UserRole(str, Enum):
    USER = "user"
    ADMIN = "admin"

class UserBase(SQLModel):
    email: EmailStr
    username: str
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    avatar_url: Optional[str] = None
    is_active: bool = True
    email_verified: bool = False

class User(UUIDPrimaryKey, UserBase, BaseTimestamp, table=True):
    __tablename__ = "users"

    password_hash: str

    # Relationships
    todos: List["Todo"] = Relationship(back_populates="user", cascade_delete=True)
    tags: List["Tag"] = Relationship(back_populates="user", cascade_delete=True)
    sessions: List["Session"] = Relationship(back_populates="user", cascade_delete=True)
    ai_analytics: List["AIAnalytics"] = Relationship(back_populates="user", cascade_delete=True)

class UserCreate(UserBase):
    password: str

class UserRead(UserBase):
    id: uuid.UUID
    created_at: datetime
    updated_at: datetime

class UserUpdate(SQLModel):
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    avatar_url: Optional[str] = None
```

### Todo Model
```python
class TodoStatus(str, Enum):
    PENDING = "pending"
    IN_PROGRESS = "in_progress"
    COMPLETED = "completed"

class TodoPriority(int, Enum):
    LOWEST = 1
    LOW = 2
    MEDIUM = 3
    HIGH = 4
    HIGHEST = 5

class TodoBase(SQLModel):
    title: str
    description: Optional[str] = None
    status: TodoStatus = TodoStatus.PENDING
    priority: TodoPriority = TodoPriority.MEDIUM
    due_date: Optional[datetime] = None
    completed_at: Optional[datetime] = None

class Todo(UUIDPrimaryKey, TodoBase, BaseTimestamp, table=True):
    __tablename__ = "todos"

    user_id: uuid.UUID = Field(foreign_key="users.id", ondelete="CASCADE")

    # Relationships
    user: User = Relationship(back_populates="todos")
    tags: List["Tag"] = Relationship(
        back_populates="todos",
        link_model="TodoTag"
    )
    ai_analytics: List["AIAnalytics"] = Relationship(back_populates="todo")

class TodoCreate(TodoBase):
    tags: Optional[List[str]] = []  # List of tag names

class TodoRead(TodoBase):
    id: uuid.UUID
    user_id: uuid.UUID
    created_at: datetime
    updated_at: datetime
    tags: List["TagRead"]

class TodoUpdate(SQLModel):
    title: Optional[str] = None
    description: Optional[str] = None
    status: Optional[TodoStatus] = None
    priority: Optional[TodoPriority] = None
    due_date: Optional[datetime] = None
    completed_at: Optional[datetime] = None
    tags: Optional[List[str]] = None
```

### Tag Model
```python
class TagBase(SQLModel):
    name: str
    color: Optional[str] = None  # Hex color code

class Tag(UUIDPrimaryKey, TagBase, BaseTimestamp, table=True):
    __tablename__ = "tags"

    user_id: uuid.UUID = Field(foreign_key="users.id", ondelete="CASCADE")

    # Relationships
    user: User = Relationship(back_populates="tags")
    todos: List[Todo] = Relationship(
        back_populates="tags",
        link_model="TodoTag"
    )

class TagCreate(TagBase):
    pass

class TagRead(TagBase):
    id: uuid.UUID
    user_id: uuid.UUID
    created_at: datetime

class TagUpdate(SQLModel):
    name: Optional[str] = None
    color: Optional[str] = None
```

### Todo-Tag Junction Model
```python
class TodoTag(SQLModel, table=True):
    __tablename__ = "todo_tags"

    todo_id: uuid.UUID = Field(
        foreign_key="todos.id",
        primary_key=True,
        ondelete="CASCADE"
    )
    tag_id: uuid.UUID = Field(
        foreign_key="tags.id",
        primary_key=True,
        ondelete="CASCADE"
    )
    created_at: datetime = Field(default_factory=datetime.utcnow)
```

### Session Model
```python
class Session(UUIDPrimaryKey, BaseTimestamp, table=True):
    __tablename__ = "sessions"

    user_id: uuid.UUID = Field(foreign_key="users.id", ondelete="CASCADE")
    refresh_token: str = Field(sa_column=sa.Column(sa.String, unique=True, nullable=False))
    expires_at: datetime
    is_revoked: bool = False

    # Relationships
    user: User = Relationship(back_populates="sessions")

class SessionCreate(SQLModel):
    refresh_token: str
    expires_at: datetime
    user_id: uuid.UUID
```

### AI Analytics Model (Future Feature Support)
```python
class AIAnalytics(UUIDPrimaryKey, BaseTimestamp, table=True):
    __tablename__ = "ai_analytics"

    user_id: uuid.UUID = Field(foreign_key="users.id", ondelete="CASCADE")
    todo_id: Optional[uuid.UUID] = Field(foreign_key="todos.id", ondelete="SET NULL")
    ai_feature: str  # Name of the AI feature used
    action: str  # Action taken (suggested, applied, rejected)
    metadata: Optional[dict] = Field(default=None, sa_column_kwargs={"server_default": "NULL"})
    confidence_score: Optional[float] = Field(default=None, sa_column=sa.Column(sa.Numeric(3,2)))

    # Relationships
    user: User = Relationship(back_populates="ai_analytics")
    todo: Optional[Todo] = Relationship(back_populates="ai_analytics")

class AIAnalyticsCreate(SQLModel):
    user_id: uuid.UUID
    todo_id: Optional[uuid.UUID] = None
    ai_feature: str
    action: str
    metadata: Optional[dict] = None
    confidence_score: Optional[float] = None
```

## Database Optimization Strategies

### Query Optimization for User-Based Filtering
1. **Index-Only Scans**: Use covering indexes for frequently accessed user data
2. **Partitioning**: Consider partitioning large tables by user_id for better performance
3. **Connection Pooling**: Implement connection pooling for efficient database connections
4. **Query Caching**: Cache common user queries to reduce database load

### Data Archiving Strategy
1. **Soft Deletion**: Consider soft deletion for important data
2. **Archive Old Data**: Move completed tasks older than X months to archive table
3. **Data Retention Policies**: Implement automated cleanup of temporary data

### Security Considerations
1. **Row-Level Security**: Implement RLS policies to enforce user data isolation
2. **Column Encryption**: Encrypt sensitive columns if required
3. **Audit Logging**: Log all database access for security monitoring
4. **Parameterized Queries**: Use only parameterized queries to prevent SQL injection

## Future Extensibility for AI Features

### AI-Ready Schema Elements
1. **AI Analytics Table**: Pre-built table for tracking AI interactions
2. **Metadata Column**: JSONB column for storing AI-specific data
3. **Confidence Score**: Numeric field for AI prediction confidence
4. **Feature Tracking**: String field to track which AI features are used

### Potential AI Feature Tables
1. **User Behavior Patterns**: Track user habits for personalized suggestions
2. **Task Clustering**: Group similar tasks for pattern recognition
3. **Predictive Analytics**: Store predicted completion times and priorities
4. **Natural Language Processing**: Store parsed natural language inputs