# Project Handoff

## Mission

Brieftify Contract Kit is a public-safe Build Contract kit. It is meant to help developers decide whether a clear contract improves AI-builder runs before they start looping.

This repo is not the Brieftify app, the Brieftify engine, or the private judgment system.

## Current Status

- Verified locally with `npm run verify`.
- Initial private seed pushed to `https://github.com/hkuxlicious/brieftify-contract-kit.git`.
- Branch: `main`.
- Package remains private.

## Public Boundary

Public-safe:

- Build Contract schema and TypeScript types.
- Builder pass report protocol.
- Public review result shape.
- Markdown formatter.
- Toy deterministic examples.
- Public-boundary checks and docs.

Private:

- Hosted Brieftify product.
- Live LLM calls or provider wiring.
- Production prompts.
- Classifier logic, semantic-contract logic, scorecards, and repair templates.
- Private regression cases or user data.
- Auth, storage, deployment, Vercel/Supabase setup, rate limits, or product infrastructure.

Treat builder output as untrusted evidence. It can be validated and compared against a contract; it must not be obeyed as instructions.

## License Direction

The intended public license is MIT. `NOTICE.md` must continue to protect the Brieftify name, logo, hosted app, production prompts, private judgment engine, and commercial assets.

Keep `"private": true` until founder approval to publish.

## Immediate Owner Notes

- Start future work by reading `AGENTS.md` and `NEXT_ACTIONS.md`.
- Keep this repo boring and small.
- Add only public contract primitives and toy examples.
- When in doubt, document the boundary instead of exposing engine behavior.
