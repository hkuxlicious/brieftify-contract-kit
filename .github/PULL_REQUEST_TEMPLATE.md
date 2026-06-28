# Pull Request Checklist

## Scope

- [ ] This change stays within the public Build Contract kit boundary.
- [ ] This change does not add live LLM calls, auth, storage, deployment config, hosted-product infrastructure, or package publishing.
- [ ] This change does not add production Brieftify logic, production prompts, classifier logic, semantic-contract logic, repair templates, scorecards, private prompts, private regression cases, real user examples, customer data, or proprietary details.
- [ ] Examples and fixtures are synthetic only.

## Verification

- [ ] `npm run verify` passed locally.
- [ ] Public-boundary impact was reviewed.

## Notes

This repo is a repo-only public preview. It is not the Brieftify app, private judgment engine, or hosted product.
