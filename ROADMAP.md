# Roadmap

Use `NEXT_ACTIONS.md` as the short-term source of truth for "what's next."

## Before Public Release

- Confirm founder approval on the public/private boundary.
- Keep `npm run verify` green.
- Review git history for accidental imports from the private Brieftify app.
- Confirm examples are synthetic and not derived from private prompts, users, or regression cases.
- Decide package publishing shape, or keep this as a repo-only validation kit.
- Final-check `NOTICE.md` before any public visibility change.

## Private Developer Validation

Run a small private validation with developers who already use AI builders.

Ask them to try the kit on one scoped build:

- Draft or generate a Build Contract.
- Give the contract to their builder.
- Ask the builder for a pass report after each attempt.
- Record whether the contract reduced drift, repair loops, or unclear acceptance checks.

Track only lightweight feedback:

- Did the contract make the first build better?
- Did the report protocol make review easier?
- Which fields felt useful, confusing, or missing?
- Would they use this before Codex, Claude Code, Cursor, Lovable, Replit, Bolt, or v0?

Do not collect private customer prompts, production outputs, or proprietary app details.

## Next Milestones

- Add one or two more synthetic examples only if they teach a distinct contract shape.
- Add minimal tests for schema guards and markdown formatting.
- Add a short "using this with an AI builder" example that stays tool-agnostic.
- Decide whether the mock engine should remain in the public kit or move behind docs.
- Prepare release notes that clearly say this is a contract primitive, not the Brieftify engine.

## Kill Criteria

Pause or kill public-release work if:

- Maintenance shifts from contract primitives into general AI-builder support.
- Users expect this repo to be the full Brieftify reviewer or engine.
- Useful examples require private prompts, classifier logic, semantic-contract logic, or repair templates.
- The boundary checker starts needing broad exceptions.
- Support burden exceeds learning value from developer validation.
- Public demand points toward cloning Brieftify result quality instead of validating the contract concept.
