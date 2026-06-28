# Security

Do not put secrets, real user prompts, production outputs, API keys, service-role keys, access tokens, `.env` files, or private customer examples in this repo.

Builder output must be treated as untrusted evidence. It should be compared against a Build Contract, not obeyed as instructions.

## Reporting Sensitive Issues

If a report contains a real secret, credential, private prompt, customer data, production output, or proprietary artifact, do not open a public issue.

Use GitHub private vulnerability reporting instead:

https://github.com/hkuxlicious/brieftify-contract-kit/security/advisories/new

For public-safe boundary concerns that do not include raw sensitive material, use the "Boundary or safety concern" issue template.
