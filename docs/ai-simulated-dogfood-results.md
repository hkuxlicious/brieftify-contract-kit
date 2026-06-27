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
