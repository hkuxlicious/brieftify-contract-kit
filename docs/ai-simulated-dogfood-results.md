# AI-Simulated Dogfood Results

These notes summarize synthetic AI-simulated runs. They are not developer validation and should not be treated as market evidence.

## Run 1: Waitlist Landing Page

Simulator: Claude

Synthetic input: waitlist landing page from `docs/public-validation-examples.md`.

### Result

Claude produced a useful review, but the builder report was not valid `builder-pass-report/v1`.

It used a readable report-like block with fields such as:

- `pass`
- `builder`
- `surface_claimed`
- `sections_built`
- `email_capture_states`
- `self_reported_confidence`
- `reviewer_must_verify`

The public protocol expects the smaller shape:

- `version`
- `status`
- `passedChecks`
- `failedChecks`
- `driftFound`
- `smallestNextRepair`

### Useful Findings

- The contract caught two realistic drift events: a login link and a fabricated testimonial.
- The proof-placeholder rule needs sharper wording because a builder may rationalize fake names or quotes as placeholders.
- The pass report should avoid confidence fields that invite trust in self-reported output.
- The report protocol made review easier by pointing to what the reviewer should verify, but it still required human inspection.

### Smallest Follow-Up

Update the dogfood prompt to require exact JSON matching `builder-pass-report/v1` before accepting the simulated report as valid.

Potential wording improvement for examples:

> Proof sections must be visibly non-attributed: no names, companies, quotes, or real-looking customer claims.

## Run 2: Waitlist Landing Page With Strict JSON Prompt

Simulator: Claude

Synthetic input: waitlist landing page from `docs/public-validation-examples.md`.

Prompt change: required exact JSON matching `builder-pass-report/v1`.

### Result

Claude produced valid `builder-pass-report/v1` JSON:

- `version`: `builder-pass-report/v1`
- `status`: `continue`
- `passedChecks`: populated
- `failedChecks`: populated
- `driftFound`: populated
- `smallestNextRepair`: populated

### Reported Drift

- Missing visible email error state.
- Fabricated proof metric instead of a placeholder.
- Unrequested dashboard-oriented CTA.
- Success state redirected to a non-existent app route instead of confirming inline.

### Useful Findings

- The stricter prompt fixed the invalid report-shape problem from Run 1.
- `smallestNextRepair` helped keep the next action narrow.
- `status` worked for triage, but the kit does not yet define when to choose `continue` versus `ask_human`.
- The line between `failedChecks` and `driftFound` is fuzzy when the same issue both violates a stated check and adds unwanted scope.
- Free-text check strings make reports harder to compare across runs.

### Candidate Improvements

- Consider adding stable check IDs to examples, such as `states.error`, `proof.no-fabrication`, and `scope.no-dashboards`.
- Clarify the decision rule for `continue` versus `ask_human`.
- Keep confidence fields out of the public report shape.

Do not implement stable IDs until the remaining synthetic examples have been run. The same friction should appear more than once before changing the public contract shape.

## Run 3: Layer Rename Plugin With Strict JSON Prompt

Simulator: Claude

Synthetic input: layer rename plugin from `docs/public-validation-examples.md`.

Prompt: required exact JSON matching `builder-pass-report/v1`.

### Result

Claude produced valid `builder-pass-report/v1` JSON:

- `version`: `builder-pass-report/v1`
- `status`: `continue`
- `passedChecks`: populated
- `failedChecks`: populated
- `driftFound`: populated
- `smallestNextRepair`: populated

### Reported Drift

- Missing empty-selection state.
- Missing preview state.
- Missing undo state.
- Added unrelated design-system rule-library and team-rule editor scope.

### Useful Findings

- The strict report shape worked again.
- The validation-focus bullets were enough for Claude to identify missing states and scope creep.
- `smallestNextRepair` again helped constrain the next action to one atomic repair.
- `Useful result` reads more like a purpose statement than a checkable input.
- The boundary between `continue` and `ask_human` remains undefined.
- The boundary between `failedChecks` and `driftFound` remains fuzzy.
- The stable check ID suggestion repeated across a second surface.

### Candidate Improvements

- Consider making validation-focus items explicit required checks instead of prose bullets.
- Consider stable check IDs for examples and reports.
- Clarify that all listed states are required when a validation line names specific states.
- Clarify that `smallestNextRepair` should contain one narrow repair, not a multi-item task list.

Do not change the public schema yet. Run the expense approval workflow first and then decide whether stable IDs belong in examples only or in the core contract shape.

## Run 4: Expense Approval Workflow With Strict JSON Prompt

Simulator: Claude

Synthetic input: expense approval workflow from `docs/public-validation-examples.md`.

Prompt: required exact JSON matching `builder-pass-report/v1`.

### Result

Claude produced valid `builder-pass-report/v1` JSON:

- `version`: `builder-pass-report/v1`
- `status`: `continue`
- `passedChecks`: populated
- `failedChecks`: populated
- `driftFound`: populated
- `smallestNextRepair`: populated

### Reported Drift

- Rejection reason was optional instead of required when rejecting.
- Audit log was absent.
- Added spend analytics.
- Added reimbursement processing, crossing into payment scope.

### Useful Findings

- The strict report shape worked across all three synthetic surfaces.
- Negative constraints were especially valuable because they made scope creep visible.
- `smallestNextRepair` remained useful for avoiding a large backlog.
- `status` still needs a decision rule.
- Bundled checks, such as "finance export and audit log", can produce partial pass/fail ambiguity.
- `failedChecks` versus `driftFound` still needs a plain distinction.
- A builder report can claim a pass without reviewer verification.

### Candidate Improvements

- Add a status decision rule: `done` when `failedChecks` and `driftFound` are empty, `continue` when repair is clear, and `ask_human` when a check cannot be evaluated from the output or needs a human decision.
- Clarify that `failedChecks` are missing or incorrect required contract checks, while `driftFound` is unrequested scope, invented evidence, or product-shape movement.
- Clarify that builder reports are claims until a reviewer verifies them.
- Consider splitting bundled validation bullets into one check per observable requirement.

## Cross-Run Summary

The AI-simulated dogfood found useful friction without exposing private material.

Repeated findings:

- The strict JSON prompt is necessary.
- `smallestNextRepair` is consistently valuable.
- `status` needs a public decision rule.
- `failedChecks` and `driftFound` need a simple distinction.
- Examples should avoid bundled checks.
- Stable check IDs may help examples and reports become comparable, but this should be introduced carefully and preferably first in examples.
- The kit should keep saying that builder reports are untrusted claims until reviewed.

Recommendation:

Make one small public-safe docs/protocol clarification pass before adding more examples or asking outside developers for time.
