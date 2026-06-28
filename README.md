# Brieftify Contract Kit

Repo-only public preview. This package is not published to npm.

Brieftify Contract Kit is a lightweight artifact kit for one idea:

> Before you let an AI builder loop, give it a contract.

This repo is not the Brieftify app and not the Brieftify judgment engine. It contains public-safe contract shapes, toy examples, a markdown formatter, and deterministic demo helpers for testing whether Build Contracts reduce AI-builder drift.

## Public Preview

This is an experimental Build Contract artifact kit for developer discovery. It exposes the public contract primitive, not the Brieftify product or private judgment system.

Use it to test whether a clear contract helps an AI builder stay scoped, report progress, and avoid drift.

## Start Here

| You want to... | Go to |
| --- | --- |
| Understand the artifact model | [Artifact Contracts](./docs/artifact-contracts.md) |
| Try a synthetic example | [Public Validation Examples](./docs/public-validation-examples.md) |
| Review builder output safely | [Builder Pass Report](./docs/artifact-contracts.md#builder-pass-report) |
| Understand what is not included | [Public Boundaries](./docs/public-boundaries.md) |
| See the docs map | [Docs Index](./docs/README.md) |
| Check release posture | [Open Source Preview Plan](./docs/open-source-preview-plan.md) |

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
npm install
npm run verify
```

For the public-boundary check only:

```bash
npm run check:public
```

The package remains private in `package.json`; this public preview is repo-only.

The intended public license is MIT. The Brieftify name, logo, hosted app, production prompts, private judgment engine, and commercial assets remain protected by `NOTICE.md`.

## Repository Goal

Use this kit to validate whether developers find Build Contracts useful before running tools such as Codex, Claude Code, Cursor, Lovable, Replit, Bolt, or v0.

Strong validation means developers report fewer repair loops, less drift, clearer acceptance checks, or a better first-pass build.
