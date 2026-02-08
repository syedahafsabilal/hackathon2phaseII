# Todo Application Architecture

## Overview

This document outlines the architecture for the Todo application, designed as a scalable, maintainable monorepo with clear separation of concerns between frontend and backend components. The application follows modern best practices and is designed to accommodate future AI integration.

## Monorepo Folder Structure

```
todo-app/
├── packages/
│   ├── frontend/           # Frontend application
│   │   ├── public/         # Static assets
│   │   ├── src/
│   │   │   ├── components/ # Reusable UI components
│   │   │   ├── pages/      # Page-level components
│   │   │   ├── hooks/      # Custom React hooks
│   │   │   ├── services/   # API service functions
│   │   │   ├── utils/      # Utility functions
│   │   │   ├── styles/     # Global styles and themes
│   │   │   └── types/      # TypeScript type definitions
│   │   ├── package.json
│   │   └── ...
│   ├── backend/            # Backend API server
│   │   ├── src/
│   │   │   ├── models/     # Database models
│   │   │   ├── routes/     # API route handlers
│   │   │   ├── controllers/ # Business logic controllers
│   │   │   ├── middleware/ # Express middleware
│   │   │   ├── services/   # Business logic services
│   │   │   ├── utils/      # Utility functions
│   │   │   └── config/     # Configuration files
│   │   ├── migrations/     # Database migration files
│   │   ├── package.json
│   │   └── ...
│   ├── shared/             # Shared types and utilities
│   │   ├── types/          # Shared TypeScript interfaces
│   │   ├── constants/      # Shared constants
│   │   ├── validators/     # Shared validation schemas
│   │   └── package.json
│   └── ai-service/         # AI service module (future)
│       ├── src/
│       │   ├── models/     # AI model interfaces
│       │   ├── services/   # AI service functions
│       │   └── utils/      # AI utility functions
│       ├── package.json
│       └── ...
├── docs/                   # Documentation files
├── tests/                  # Integration and e2e tests
├── .github/                # GitHub workflows
├── .gitignore
├── docker-compose.yml      # Docker orchestration
├── docker/                 # Docker configuration files
├── lerna.json              # Lerna configuration (monorepo manager)
└── package.json            # Root package.json
```

## Conceptual Database Schema

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
```

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
```

### Tags Table
```sql
CREATE TABLE tags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(50) UNIQUE NOT NULL,
  color VARCHAR(7), -- Hex color code
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

### Todo_Tags Junction Table
```sql
CREATE TABLE todo_tags (
  todo_id UUID NOT NULL REFERENCES todos(id) ON DELETE CASCADE,
  tag_id UUID NOT NULL REFERENCES tags(id) ON DELETE CASCADE,
  PRIMARY KEY (todo_id, tag_id)
);
```

## SQLModel Models

### User Model
```python
from sqlmodel import SQLModel, Field, Relationship
from typing import Optional, List
import uuid
from datetime import datetime

class UserBase(SQLModel):
    email: str = Field(unique=True, nullable=False)
    username: str = Field(unique=True, nullable=False)
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    avatar_url: Optional[str] = None
    is_active: bool = True
    email_verified: bool = False

class User(UserBase, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    password_hash: str = Field(nullable=False)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    # Relationships
    todos: List["Todo"] = Relationship(back_populates="user")
    tags: List["Tag"] = Relationship(back_populates="user")

class UserCreate(UserBase):
    password: str

class UserRead(UserBase):
    id: uuid.UUID
    created_at: datetime
    updated_at: datetime
```

### Todo Model
```python
from sqlmodel import SQLModel, Field, Relationship
from typing import Optional, List
import uuid
from datetime import datetime
from enum import Enum

class TodoStatus(str, Enum):
    pending = "pending"
    in_progress = "in_progress"
    completed = "completed"

class TodoPriority(int, Enum):
    lowest = 1
    low = 2
    medium = 3
    high = 4
    highest = 5

class TodoBase(SQLModel):
    title: str
    description: Optional[str] = None
    status: TodoStatus = TodoStatus.pending
    priority: TodoPriority = TodoPriority.medium
    due_date: Optional[datetime] = None
    completed_at: Optional[datetime] = None

class Todo(TodoBase, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    user_id: uuid.UUID = Field(foreign_key="users.id")
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    # Relationships
    user: User = Relationship(back_populates="todos")
    tags: List["Tag"] = Relationship(
        back_populates="todos",
        link_model="TodoTag"
    )

class TodoCreate(TodoBase):
    pass

class TodoRead(TodoBase):
    id: uuid.UUID
    user_id: uuid.UUID
    created_at: datetime
    updated_at: datetime

class TodoUpdate(SQLModel):
    title: Optional[str] = None
    description: Optional[str] = None
    status: Optional[TodoStatus] = None
    priority: Optional[TodoPriority] = None
    due_date: Optional[datetime] = None
```

### Tag Model
```python
from sqlmodel import SQLModel, Field, Relationship
from typing import Optional, List
import uuid
from datetime import datetime

class TagBase(SQLModel):
    name: str
    color: Optional[str] = None  # Hex color code

class Tag(TagBase, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    user_id: uuid.UUID = Field(foreign_key="users.id")
    created_at: datetime = Field(default_factory=datetime.utcnow)

    # Relationships
    user: User = Relationship(back_populates="tags")
    todos: List["Todo"] = Relationship(
        back_populates="tags",
        link_model="TodoTag"
    )

class TagCreate(TagBase):
    pass

class TagRead(TagBase):
    id: uuid.UUID
    user_id: uuid.UUID
    created_at: datetime

class TodoTag(SQLModel, table=True):
    todo_id: uuid.UUID = Field(foreign_key="todos.id", primary_key=True)
    tag_id: uuid.UUID = Field(foreign_key="tags.id", primary_key=True)
```

## Separation of Concerns

### Backend Responsibilities
- Authentication and authorization
- Data persistence and database operations
- Business logic implementation
- API endpoints and request handling
- Data validation and sanitization
- Security measures (password hashing, input validation)
- Background job processing
- Email notifications
- File uploads management

### Frontend Responsibilities
- User interface rendering
- User interaction handling
- Form validation (client-side)
- State management
- API communication
- Navigation and routing
- Responsive design implementation
- Accessibility compliance
- Performance optimization

### Shared Responsibilities
- Type definitions and interfaces
- Validation schemas
- Constants and configuration values
- Utility functions

### Communication Layer
- RESTful API endpoints
- Request/response schemas
- Error handling protocols
- Authentication tokens management

## Technology Stack

### Backend
- Python with FastAPI
- SQLModel for ORM
- PostgreSQL for database
- Alembic for migrations
- JWT for authentication
- Celery for background tasks
- Redis for caching

### Frontend
- React with TypeScript
- Next.js for server-side rendering
- Tailwind CSS for styling
- TanStack Query for data fetching
- React Hook Form for form handling
- Zustand for state management

### Infrastructure
- Docker for containerization
- PostgreSQL as primary database
- Redis for caching and queues
- GitHub Actions for CI/CD

## Future AI Integration Notes

### Planned AI Features
1. **Smart Task Prioritization**
   - AI algorithm to suggest task priorities based on due dates, importance, and workload
   - Machine learning model trained on user behavior patterns

2. **Natural Language Processing**
   - Parse natural language input for creating tasks (e.g., "Meeting with John tomorrow at 3pm")
   - Automatic tagging and categorization of tasks

3. **Intelligent Reminders**
   - Predictive algorithms to suggest optimal reminder times
   - Context-aware notifications based on user habits

4. **Productivity Insights**
   - Analysis of task completion patterns
   - Recommendations for optimal work schedules
   - Identification of productivity trends

### AI Service Architecture
- Dedicated microservice for AI operations
- Integration through API gateway
- Separate data pipeline for training data
- Privacy-focused design with opt-in features

### Technical Considerations
- Privacy by design - sensitive data remains on user devices when possible
- Modular architecture to easily swap AI providers
- Fallback mechanisms when AI services are unavailable
- Transparent AI recommendations with explainability

## Security Considerations

- Passwords hashed using bcrypt
- JWT tokens with refresh token rotation
- Input validation and sanitization
- Rate limiting for API endpoints
- Secure headers configuration
- HTTPS enforcement
- CORS policy configuration

## Scalability Considerations

- Stateless API design
- Database connection pooling
- Caching layer implementation
- Horizontal scaling capability
- Load balancing configuration
- Database read replicas for analytics

## Testing Strategy

- Unit tests for individual components
- Integration tests for API endpoints
- End-to-end tests for critical user flows
- Performance testing for API endpoints
- Database migration testing
- Security testing for authentication flows