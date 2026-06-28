# Next Actions

Source of truth for "what's next" in this private repo.

## Priority Checklist

- [x] Commit and push current docs.
- [x] Add a private developer trial checklist.
- [x] Add public validation examples using only synthetic inputs.
- [x] Improve boundary checker tests.
- [x] Prepare release checklist review.
- [x] Create private GitHub issues later, after the near-term shape stabilizes.

## Private GitHub Issues

- Next: blocked on founder release approval or an outside developer for validation.
- [#5 Clarify builder report protocol from dogfood findings](https://github.com/hkuxlicious/brieftify-contract-kit/issues/5) - closed
- [#4 Run AI-simulated dogfood with Claude](https://github.com/hkuxlicious/brieftify-contract-kit/issues/4) - closed
- [#1 Run private developer validation trial](https://github.com/hkuxlicious/brieftify-contract-kit/issues/1) - deferred until an outside developer is available
- [#2 Add focused schema and formatter tests](https://github.com/hkuxlicious/brieftify-contract-kit/issues/2) - closed
- [#3 Prepare public release decision review](https://github.com/hkuxlicious/brieftify-contract-kit/issues/3) - closed
- [#6 Add public preview issue templates](https://github.com/hkuxlicious/brieftify-contract-kit/issues/6) - closed

## Current Blockers

- Founder must approve the public/private boundary before public release.
- Final release checklist must pass on the exact release commit.
- Real developer validation remains deferred until an outside developer is available.

## Working Rule

Keep each step small enough to review in one pass, and run `npm run verify` before finishing meaningful changes.
