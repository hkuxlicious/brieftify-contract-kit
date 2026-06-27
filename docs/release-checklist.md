# Release Checklist

Before making this repo public:

- [ ] Founder approves the public/private boundary.
- [ ] Repo has no git history imported from the private Brieftify app.
- [ ] `npm run check:public` passes.
- [ ] No `.env`, `.vercel`, Supabase, Vercel, auth, history, rate-limit, or deployment code.
- [ ] No production prompts or skill/dialect markdown.
- [ ] No real classifier, question scoring, semantic extraction, repair templates, or scorecard thresholds.
- [ ] No real user prompts or generated outputs.
- [ ] No private regression bank.
- [ ] README says this is a contract kit, not the Brieftify engine.
- [ ] License is MIT for public release readiness.
- [ ] `package.json` files remain `"private": true` until founder approval to publish.
- [ ] `NOTICE.md` protects the Brieftify name, logo, hosted app, production prompts, private judgment engine, and commercial assets.
