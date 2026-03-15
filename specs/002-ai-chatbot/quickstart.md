# Quickstart: AI-Powered Conversational Todo Chatbot

**Feature**: 002-ai-chatbot
**Date**: 2026-02-14

## Prerequisites

- Python 3.11+
- Node.js 18+
- PostgreSQL (Neon Serverless account or local instance)
- OpenAI API key

## Environment Setup

### 1. Backend

```bash
cd backend

# Create virtual environment
python -m venv venv
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Configure environment
cp .env.example .env
# Edit .env with your values:
#   DATABASE_URL=postgresql+asyncpg://user:pass@host/dbname
#   OPENAI_API_KEY=sk-...
#   JWT_SECRET=your-secret-key
```

### 2. Database

```bash
# Tables are auto-created on first backend startup
# The backend uses SQLAlchemy create_all() for simplicity
```

### 3. Frontend

```bash
cd frontend

# Install dependencies
npm install

# Configure API URL (if different from default)
# Default: http://localhost:8000
```

## Running the Application

### Start Backend

```bash
# Run from the project root (the directory containing backend/)
# All imports use `from backend.xxx` so the project root must be on PYTHONPATH.
uvicorn backend.main:app --reload --port 8000
```

### Start Frontend

```bash
cd frontend
npm run dev
# Opens at http://localhost:3000
```

## Verification Steps

### 1. Register a User
- Navigate to `http://localhost:3000/auth/sign-up`
- Create an account with name, email, password
- Should redirect to dashboard

### 2. Test Chat
- Navigate to `http://localhost:3000/chat`
- Type: "Add a task to buy groceries"
- Verify: Agent responds with confirmation
- Type: "Show my tasks"
- Verify: Agent lists the groceries task

### 3. Test Persistence
- Refresh the chat page
- Verify: Previous messages are still displayed
- Type: "What tasks do I have?"
- Verify: Agent knows about previously created tasks

### 4. Test Phase II Compatibility
- Navigate to dashboard
- Verify: Tasks created via chat appear in the task list
- Create a task via the dashboard UI
- Go back to chat and ask "Show my tasks"
- Verify: Both chat-created and UI-created tasks appear

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Backend won't start | Check `DATABASE_URL` and `OPENAI_API_KEY` in `.env` |
| Chat returns error | Verify OpenAI API key has credits and is valid |
| Tasks not showing | Check database connection; verify tables were created |
| CORS errors | Backend CORS is configured for `http://localhost:3000` by default |
