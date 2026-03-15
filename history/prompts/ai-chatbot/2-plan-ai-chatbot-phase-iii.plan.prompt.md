---
id: 2
title: Plan AI Chatbot Phase III Architecture
stage: plan
date: 2026-02-14
surface: agent
model: claude-opus-4-6
feature: ai-chatbot
branch: 002-ai-chatbot
user: Ali
command: /sp.plan
labels: ["plan", "phase-iii", "ai-chatbot", "mcp", "architecture", "openai-agents"]
links:
  spec: specs/002-ai-chatbot/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/002-ai-chatbot/plan.md
  - specs/002-ai-chatbot/research.md
  - specs/002-ai-chatbot/data-model.md
  - specs/002-ai-chatbot/contracts/chat-api.md
  - specs/002-ai-chatbot/quickstart.md
tests:
  - n/a
---

## Prompt

before planning first you can preview the frontend and backend folder after that generate plan here is plan: Spec-002 (Phase-III AI Chatbot)

Objective
Implement an AI-powered conversational Todo system using MCP tools, integrated with the existing Phase-II app.

Plan

Define Spec-002 scope and constraints

Set up database models for conversations and messages

Implement MCP server with task tools

Build FastAPI chat endpoint (stateless)

Integrate OpenAI Agents SDK with MCP tools

Connect frontend Chat UI to agent backend

Persist chat history and tool actions

Add confirmations and error handling

Validate no regressions to Phase-II features

Exit Criteria

Chat can create, list, update, complete, and delete tasks

Conversations persist across requests

Frontend and agent backend communicate correctly

Phase-II functionality remains unchanged

## Response snapshot

Explored frontend (Next.js 14, localStorage mocks, no real backend) and confirmed backend directory does not exist yet. Generated 5 plan artifacts: plan.md (technical context, constitution check all PASS, full project structure), research.md (6 research decisions: OpenAI Agents SDK, MCP Python SDK, PostgreSQL/SQLAlchemy, simple chat UI, JWT reuse, statelessness pattern), data-model.md (4 entities: User, Task, Conversation, Message with full schemas), contracts/chat-api.md (REST endpoints + MCP tool schemas), quickstart.md (setup and verification steps).

## Outcome

- ✅ Impact: Complete architectural plan for Phase III with all design artifacts
- 🧪 Tests: n/a (planning phase)
- 📁 Files: plan.md, research.md, data-model.md, contracts/chat-api.md, quickstart.md
- 🔁 Next prompts: /sp.tasks to generate implementation tasks, then /sp.implement
- 🧠 Reflection: Key discovery — backend does not exist yet, plan accounts for building it from scratch

## Evaluation notes (flywheel)

- Failure modes observed: setup-plan.ps1 script produced no JSON output (PowerShell/bash compatibility issue)
- Graders run and results (PASS/FAIL): Constitution check PASS (all 10 principles), manual review PASS
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): n/a
