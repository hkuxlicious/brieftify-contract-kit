# Public Preview Release Checklist

Status: repo-only public preview is live.

Completed before public preview:

- [x] Founder approved the public/private boundary on 2026-06-29.
- [x] Repo has no git history imported from the private Brieftify app.
- [x] `npm run verify` passed on the public-preview release commit.
- [x] `npm run check:public` passed on the public-preview release commit.
- [x] No `.env`, `.vercel`, Supabase, Vercel, auth, history, rate-limit, or deployment code.
- [x] No production prompts or skill/dialect markdown.
- [x] No real classifier, question scoring, semantic extraction, repair templates, or scorecard thresholds.
- [x] No real user prompts or generated outputs.
- [x] No private regression bank.
- [x] README says this is a contract kit, not the Brieftify engine.
- [x] License is MIT for public release readiness.
- [x] `package.json` files remain `"private": true`; npm publishing is out of scope.
- [x] `NOTICE.md` protects the Brieftify name, logo, hosted app, production prompts, private judgment engine, and commercial assets.

Before changing release posture again:

- [ ] Run `npm run verify` on the exact target commit.
- [ ] Re-review examples for synthetic-only content.
- [ ] Re-review `NOTICE.md`.
- [ ] Confirm package publishing is still out of scope unless explicitly approved.
