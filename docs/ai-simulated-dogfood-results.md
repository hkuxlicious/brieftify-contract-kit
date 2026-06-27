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
