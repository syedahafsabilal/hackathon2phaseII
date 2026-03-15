<!--
Sync Impact Report:
Version change: 1.0.0 -> 1.1.0
Added sections: Phase III Focus Areas, Statelessness, Agent Constraints, MCP Authority, Conversation Integrity
Removed sections: None
Modified sections: Title updated to "Phase II & III Constitution"
Templates requiring updates:
  - .specify/templates/plan-template.md ⚠ pending (Constitution Check should reference new principles)
  - .specify/templates/spec-template.md ⚠ pending
  - .specify/templates/tasks-template.md ⚠ pending
Follow-up TODOs: RATIFICATION_DATE still needs to be determined
-->

# To-Do Application – Phase II & III Constitution

## Core Principles

### Clean Architecture
Proper separation of frontend, backend, and database layers; Maintain clear boundaries between components; Scalable and maintainable structure

### Secure Authentication
Implement JWT-based authentication; Follow security best practices; Protect user data and privacy

### Persistent Data Storage
Use PostgreSQL for reliable data persistence; Implement proper data models and relationships; Ensure data integrity and backup

### Beginner-Readable Code
Write clear, well-documented code; Follow consistent naming conventions; Prioritize simplicity and clarity over cleverness

### Technology Stack Adherence
Use Next.js for frontend, FastAPI for backend, PostgreSQL for database, JWT for authentication, REST for API communication; No deviations without explicit approval

### User-Centric Design
Design for students and beginners learning full-stack development; Intuitive interface for non-technical users; Focus on core functionality without unnecessary features

### Statelessness
All servers, agents, endpoints, and MCP tools MUST be stateless. No in-memory session state, no server-side caches of conversation context. Conversation history and task state MUST be persisted in the database and reconstructed per request. Every request MUST be self-contained after loading persisted state.

### Agent Constraints
AI agents MUST never directly access the database. All task operations (create, read, update, delete) MUST be executed strictly through MCP tools. Every agent action MUST result in a clear user-facing confirmation message. Agents MUST NOT bypass MCP tools for any data mutation.

### MCP Authority
MCP tools are the sole permitted interface for task creation, listing, updating, completion, and deletion. Tool schemas and return values MUST be strictly followed. No alternative data access paths are permitted. All MCP tool invocations MUST be auditable.

### Conversation Integrity
Each request MUST load conversation history from the database before processing. Conversation context MUST be reconstructed from persisted state, not from in-memory storage. Responses MUST be stored back to the database for future context reconstruction. No conversation data may exist only in transient memory.

## Phase II Focus Areas
Clean and clear architecture; Proper separation of concerns; Secure authentication implementation; Persistent data storage; Beginner-readable and maintainable code

## Phase III Focus Areas
Stateless AI chatbot architecture; MCP-tool-mediated task operations; Database-persisted conversation history; Agent isolation from direct data access; Auditable tool invocations

## Development Workflow
Follow spec-driven development process; Create PHRs for significant changes; Use ADRs for architectural decisions; Maintain test coverage

## Governance
Constitution governs all development practices; Amendments require explicit approval; All implementations must comply with stated principles; Regular compliance reviews required

**Version**: 1.1.0 | **Ratified**: TODO(RATIFICATION_DATE): Original adoption date needs to be determined | **Last Amended**: 2026-02-14
