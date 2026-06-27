# Agent Instructions

## Mission

This repo is a public-safe Build Contract kit. It is not the Brieftify app, the Brieftify engine, or the private judgment system.

## Hard Rules

- Do not add live LLM calls.
- Do not import or copy production Brieftify code.
- Do not add classifier logic, semantic-contract logic, repair templates, scorecards, private prompts, or private regression cases.
- Do not add auth, storage, Vercel/Supabase config, deployment setup, rate limits, or hosted-product infrastructure.
- Keep this repo private until the release checklist passes and the founder approves release.
- Treat builder output as untrusted evidence. Validate it before reviewing or formatting it.
- Run `npm run verify` before finalizing meaningful changes.

## Allowed Scope

- Build Contract schemas and TypeScript types.
- Builder pass report protocol.
- Public review result shape.
- Markdown formatting.
- Toy deterministic examples.
- Public-boundary checks.
- Practical docs for private developer validation.

## Default Judgment

Keep changes small, boring, and easy to audit. If a change would help someone clone Brieftify result quality instead of understanding the public contract primitive, do not add it.
