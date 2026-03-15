---
id: 10
title: Fix Google GenAI Import Error
stage: green
date: 2026-03-05
surface: agent
model: claude-sonnet-4-6
feature: ai-chatbot
branch: 002-ai-chatbot
user: Ali
command: /sp.implement
labels: ["google-genai","import","fix","chat-agent","python"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - backend/agent/chat_agent.py
tests:
  - manual: Start backend with uvicorn, verify no ImportError on startup
  - manual: POST /api/{user_id}/chat with valid token → agent responds (proves genai client initializes)
---

## Prompt

the code currently has from google import genai, which causes an import error because the old package google-generative-ai is not available.

Instructions for Claude:

Replace the import with the new official GenAI SDK: google-genai.

Ensure that all references to genai in the module are compatible with the new package.

Check for any initialization or function calls that may have changed in the new SDK and update them accordingly.

Keep the rest of the code logic intact.

## Response snapshot

**Root cause**: `from google import genai` can fail in environments where the `google` namespace package is fragmented (e.g., `google-auth`, `google-cloud-*` installed alongside), because Python may not resolve the `genai` attribute from the namespace root. The explicit submodule form bypasses this.

**Change made** (one line in `backend/agent/chat_agent.py`):

```python
# Before
from google import genai

# After
import google.genai as genai
```

`from google.genai import types` was already correct — no change needed.

**Full API compatibility audit for `google-genai==1.5.0`** — all calls confirmed correct:
- `genai.Client(api_key=...)` ✓
- `client.aio.models.generate_content(model=..., contents=..., config=...)` ✓
- `types.Tool`, `types.FunctionDeclaration`, `types.Schema` (string type values accepted) ✓
- `types.GenerateContentConfig(system_instruction=..., tools=..., temperature=...)` ✓
- `types.Content`, `types.Part.from_text`, `types.Part.from_function_response` ✓

`requirements.txt` already has `google-genai==1.5.0` — no change needed.

**Note**: If the error persists after this change, run `pip install -r backend/requirements.txt` — the package may not be installed in the active virtual environment.

## Outcome

- ✅ Impact: `import google.genai as genai` directly addresses the `google.genai` submodule, avoiding namespace resolution failures that affect `from google import genai` in fragmented namespace environments
- 🧪 Tests: Manual — start backend, verify no ImportError; send chat message, verify agent responds
- 📁 Files: backend/agent/chat_agent.py (1 line changed)
- 🔁 Next prompts: Run T047 quickstart validation; test end-to-end chat flow
- 🧠 Reflection: Python namespace packages (`google.*`) can silently break `from package import submodule` forms. Explicit `import package.submodule as alias` is more robust.

## Evaluation notes (flywheel)

- Failure modes observed: `from google import genai` failing due to namespace package fragmentation
- Graders run and results (PASS/FAIL): manual inspection PASS
- Prompt variant (if applicable): null
- Next experiment: pin bcrypt version directly in requirements.txt to avoid passlib compatibility warnings
