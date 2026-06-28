# Brieftify Contract Kit Docs

These docs describe the public Build Contract kit. They do not document the Brieftify product or private judgment system.

## Pick A Track

| You are... | Start with | Outcome |
| --- | --- | --- |
| New to Build Contracts | [Artifact Contracts](./artifact-contracts.md) | Understand the contract, report, and review shapes |
| Trying the kit manually | [Public Validation Examples](./public-validation-examples.md) | Run a synthetic builder-review flow |
| Checking the public boundary | [Public Boundaries](./public-boundaries.md) | Know what belongs here and what stays out |
| Preparing a release decision | [Open Source Preview Plan](./open-source-preview-plan.md) | Review the repo-only preview posture |
| Auditing release readiness | [Release Checklist](./release-checklist.md) | Confirm gates before changing release posture |

## Core Docs

| Doc | Best for |
| --- | --- |
| [Artifact Contracts](./artifact-contracts.md) | Build Contract, builder pass report, and review result definitions |
| [Mock Engine](./mock-engine.md) | Understanding the deterministic toy helper |
| [Public Validation Examples](./public-validation-examples.md) | Synthetic examples for manual validation |
| [AI-Simulated Dogfood](./ai-simulated-dogfood.md) | Running Claude-style synthetic dogfood safely |
| [AI-Simulated Dogfood Results](./ai-simulated-dogfood-results.md) | Findings from synthetic dogfood runs |
| [Private Developer Trial Checklist](./private-developer-trial-checklist.md) | Future outside-developer validation |

## Governance Docs

| Doc | Best for |
| --- | --- |
| [Public Boundaries](./public-boundaries.md) | Public/private scope |
| [Release Checklist](./release-checklist.md) | Final release gates |
| [Release Checklist Review](./release-checklist-review.md) | Current readiness review |
| [Open Source Preview Plan](./open-source-preview-plan.md) | Repo-only preview plan and kill criteria |

## Reading Strategy

Start with `artifact-contracts.md`, then run one synthetic example from `public-validation-examples.md`. Use `public-boundaries.md` before proposing any new code or docs.
