---
id: 2
title: Add Phase III Constitution Principles
stage: constitution
date: 2026-02-14
surface: agent
model: claude-opus-4-6
feature: none
branch: main
user: Ali
command: /sp.constitution
labels: ["constitution", "phase-iii", "stateless", "mcp", "agents"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - .specify/memory/constitution.md
tests:
  - n/a
---

## Prompt

You are updating an existing spec-driven project.

Important
This update extends the existing Phase-II constitution.
Do not delete, rewrite, or weaken any Phase-II rules.
All Phase-II behavior must continue to work unchanged.

Objective
Add Phase-III: an AI-powered conversational Todo chatbot implemented using a stateless architecture, MCP tools, and AI agents.

Constitution Additions

Statelessness
All servers, agents, endpoints, and MCP tools must be stateless.
Conversation history and task state must be persisted in the database and reconstructed per request.

Agent Constraints
AI agents must never directly access the database.
All task operations must be executed strictly through MCP tools.
Every agent action must result in a clear user confirmation message.

MCP Authority
MCP tools are the only permitted interface for task creation, listing, updating, completion, and deletion.
Tool schemas and return values must be strictly followed.

Conversation Integrity
Each request must:

Load conversation history from the database

## Response snapshot

Updated constitution from v1.0.0 to v1.1.0 (MINOR bump — new principles added, no existing principles modified or removed). Added four new core principles: Statelessness, Agent Constraints, MCP Authority, and Conversation Integrity. Added Phase III Focus Areas section. All Phase II principles, focus areas, workflow, and governance sections preserved unchanged.

## Outcome

- ✅ Impact: Constitution extended with Phase III principles; all Phase II rules intact
- 🧪 Tests: n/a (governance document)
- 📁 Files: .specify/memory/constitution.md
- 🔁 Next prompts: /sp.specify for Phase III feature spec, /sp.plan for architecture
- 🧠 Reflection: Clean additive update; no conflicts with existing Phase II governance

## Evaluation notes (flywheel)

- Failure modes observed: None
- Graders run and results (PASS/FAIL): Manual validation PASS — no unresolved placeholders, all Phase II content preserved
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): n/a
