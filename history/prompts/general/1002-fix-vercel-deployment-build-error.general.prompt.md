---
id: 1002
title: Fix Vercel Deployment Build Error
stage: general
date: 2026-03-14
surface: agent
model: claude-sonnet-4-6
feature: none
branch: 002-ai-chatbot
user: Ali
command: fix vercel deployment error
labels: ["vercel", "deployment", "nextjs", "build"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - vercel.json
tests:
  - none
---

## Prompt

fix this error coming in vercel which i was deploying my project on vercel npm warn deprecated rimraf@3.0.2: Rimraf versions prior to v4 are no longer supported
npm warn deprecated inflight@1.0.6: This module is not supported, and leaks memory. Do not use it. Check out lru-cache if you want a good and tested way to coalesce async requests by a key value, which is much more comprehensive and powerful.
npm warn deprecated glob@7.1.7: Glob versions prior to v9 are no longer supported
npm warn deprecated @humanwhocodes/config-array@0.13.0: Use @eslint/config-array instead
npm warn deprecated @humanwhocodes/object-schema@2.0.3: Use @eslint/object-schema instead
npm warn deprecated eslint@8.57.1: This version is no longer supported. Please see https://eslint.org/version-support for other options.
npm warn deprecated next@14.0.0: This version has a security vulnerability. Please upgrade to a patched version. See https://nextjs.org/blog/security-update-2025-12-11 for more details.
> Build error occurred
Error: > Couldn't find any `pages` or `app` directory. Please create one under the project root
    at findPagesDir (/vercel/path0/node_modules/next/dist/lib/find-pages-dir.js:42:15)
    at /vercel/path0/node_modules/next/dist/build/index.js:237:73
    at async Span.traceAsyncFn (/vercel/path0/node_modules/next/dist/trace/trace.js:105:20)
    at async build (/vercel/path0/node_modules/next/dist/build/index.js:186:29)
    at async main (/vercel/path0/node_modules/next/dist/bin/next:150:5)
Error: Command "npm run build" exited with 1

## Response snapshot

Root cause: Vercel was building from the repo root but the Next.js app lives in `frontend/` subdirectory. Created `vercel.json` at the project root with custom build/install commands pointing to `frontend/`:

```json
{
  "buildCommand": "cd frontend && npm run build",
  "outputDirectory": "frontend/.next",
  "installCommand": "cd frontend && npm install",
  "framework": "nextjs"
}
```

Also noted that `next@14.0.0` has a security vulnerability and should be upgraded with `npm install next@latest` inside the `frontend/` directory.

## Outcome

- ✅ Impact: Vercel now knows to install and build from the `frontend/` subdirectory, resolving the "Couldn't find any pages or app directory" error.
- 🧪 Tests: none
- 📁 Files: vercel.json (created)
- 🔁 Next prompts: upgrade Next.js to latest to resolve security vulnerability warning
- 🧠 Reflection: Monorepo-style projects with a subdirectory frontend require either a vercel.json with custom build commands or setting Root Directory in the Vercel dashboard settings.

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): none
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): Set Root Directory to `frontend` directly in Vercel dashboard as an alternative to vercel.json
