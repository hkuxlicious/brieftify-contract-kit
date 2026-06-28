# Open Source Preview Plan

This plan assumes we cannot get real developer validation before release. The goal is to open source safely as a small experimental primitive, not to claim proven demand.

## Release Position

Release this as a repo-only public preview for developer discovery.

Public framing:

> A small Build Contract artifact kit for testing whether contracts reduce AI-builder drift.

Do not frame it as the Brieftify engine, reviewer, or judgment system.

## Before Public

1. Finish protocol clarity.
   - Define `done`, `continue`, and `ask_human`.
   - Clarify `failedChecks` versus `driftFound`.
   - State that builder pass reports are untrusted claims until reviewed.
   - Keep stable check IDs as an example-first idea unless they clearly belong in the core contract.

2. Add basic confidence tests.
   - Schema guards.
   - Markdown formatter.
   - Invalid builder report cases.
   - Public-boundary checker.

3. Make examples more checkable.
   - Split bundled checks into one observable requirement each.
   - Use only synthetic inputs.
   - Avoid scoring, classifier logic, repair templates, live LLM calls, or private engine behavior.

4. Reduce support burden.
   - Add issue templates.
   - State that support is limited to schemas, docs, and toy examples.
   - Keep Discussions off unless there is real pull.

5. Run final release gate.
   - `npm run verify`
   - Review `docs/release-checklist.md`.
   - Review `NOTICE.md`.
   - Review README positioning.
   - Confirm examples are synthetic-only.
   - Confirm git history has no private app import.

## Do Not Do Yet

- Do not publish to npm.
- Do not add hosted demos.
- Do not add auth, storage, deployment config, or product infrastructure.
- Do not expose production prompts, private judgment logic, semantic-contract logic, classifier logic, repair templates, or private regression cases.

## After Public Preview

Use public signals as discovery:

- Stars, forks, issue quality, and external mentions.
- Whether developers try the examples without handholding.
- Whether questions stay focused on Build Contracts rather than asking for the full Brieftify engine.
- Whether maintenance stays small.

## Kill Or Pause Criteria

Pause public work if:

- The repo becomes general AI-builder support.
- Users expect the full Brieftify engine.
- Useful examples require private logic or private data.
- Boundary exceptions start growing.
- Support burden exceeds learning value.

## Recommended Next Step

Complete public-preview support boundaries, then run the final release checklist review.
