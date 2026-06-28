# Release Checklist Review

Prepared: 2026-06-28
Updated: 2026-06-29

This is a historical pre-release review plus the current public-preview status.

## Current Position

- Repo-only public preview is live at `https://github.com/hkuxlicious/brieftify-contract-kit`.
- `main` has only seed commits for this kit.
- `npm run verify` passes locally.
- Package metadata uses MIT while all package manifests remain `"private": true`.
- `NOTICE.md` protects the Brieftify name, logo, hosted app, production prompts, private judgment engine, and commercial assets.
- AI-simulated dogfood is complete across three synthetic examples.
- Builder report protocol clarity has been improved from dogfood findings.
- Focused schema, formatter, and boundary tests are in place.
- Real outside-developer validation is deferred until an outside developer is available.

## Historical Pre-Release Review

- Founder boundary approval: completed on 2026-06-29 before public preview.
- Git history imported from private app: no evidence in current repo history.
- Public check: automated by `npm run check:public` and included in `npm run verify`.
- Deployment/product infrastructure: none intended in this repo.
- Private engine material: keep excluding production prompts, classifier logic, semantic-contract logic, repair templates, scorecards, private prompts, and private regression cases.
- User/customer material: current examples are synthetic.
- README positioning: says this is a contract kit, not the Brieftify engine.
- License/notice: MIT direction is set; NOTICE still reserves protected Brieftify assets.
- Package publishing: not recommended yet; use repo-only public preview if release is approved.

## Current Guardrails

- Keep release repo-only; defer package publishing.
- Keep `package.json` files `"private": true`.
- Run `npm run verify` before meaningful changes.
- Do not expand the public/private boundary without founder approval.

## Recommendation

Do not publish to npm. Keep this as a repo-only public preview framed as an experimental Build Contract primitive.

This should be treated as developer discovery, not proof of demand.
