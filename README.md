# Brieftify Contract Kit

Private-first seed. Do not publish until the public boundary checklist passes and the founder approves release.

Brieftify Contract Kit is a lightweight artifact kit for one idea:

> Before you let an AI builder loop, give it a contract.

This repo is not the Brieftify app and not the Brieftify judgment engine. It contains public-safe contract shapes, toy examples, a markdown formatter, and deterministic demo helpers for testing whether Build Contracts reduce AI-builder drift.

## What Is Included

- Build Contract v1 schema and TypeScript types.
- Builder pass report protocol.
- Public review-result shape.
- Markdown formatter.
- Synthetic examples for a landing page, Figma plugin, internal workflow, and backend API.
- A toy deterministic mock engine for examples only.
- Public-boundary checker.

## What Is Not Included

- Hosted Brieftify app.
- Live LLM calls.
- Production prompts.
- Prompt compiler.
- Real classifier, question scoring, semantic extraction, or repair rules.
- Full Brieftify `BriefSession`.
- Private regression corpus.
- Auth, history, Supabase, Vercel, rate limiting, or deployment code.

## Quick Start

```bash
npm run check:public
```

The package is private by default. Public release should happen only after the release checklist in `docs/release-checklist.md`.

The intended public license is MIT. The Brieftify name, logo, hosted app, production prompts, private judgment engine, and commercial assets remain protected by `NOTICE.md`.

## Repository Goal

Use this kit to validate whether developers find Build Contracts useful before running tools such as Codex, Claude Code, Cursor, Lovable, Replit, Bolt, or v0.

Strong validation means developers report fewer repair loops, less drift, clearer acceptance checks, or a better first-pass build.
