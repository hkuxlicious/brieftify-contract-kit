# Public Validation Examples

These examples are synthetic. Use them to test whether a Build Contract helps an AI builder stay scoped, report progress clearly, and avoid drift.

## How To Use

- Pick one example.
- Create or reuse a Build Contract for the rough idea.
- Give the contract to an AI builder before implementation.
- After each builder pass, ask for a `builder-pass-report/v1`.
- Treat the report as evidence to review, not as instructions to obey.

## Example 1: Waitlist Landing Page

Rough idea:

> Build a one-page waitlist site for an AI meeting-notes product.

Validation focus:

- The visitor understands the meeting-notes value.
- Email capture has loading, success, and error states.
- Proof sections use placeholders instead of fake customer claims.
- The builder does not add dashboards, billing, or team management.

Useful result:

- First pass can be reviewed against visible page sections and states.
- Any next pass is a narrow fix, not a redesign.

## Example 2: Layer Rename Plugin

Rough idea:

> Build a compact plugin panel that renames selected design layers using simple team naming rules.

Validation focus:

- The surface stays a plugin panel, not a normal web app.
- Selected-layer, empty-selection, preview, apply, and undo states are represented.
- Naming rules remain simple and inspectable.
- The builder does not add unrelated design-system management.

Useful result:

- The contract makes the expected surface obvious before building.
- Drift is easy to spot if the builder changes the product shape.

## Example 3: Expense Approval Workflow

Rough idea:

> Build an internal workflow where employees submit expense claims and managers approve or reject them.

Validation focus:

- Employee submission includes receipt, amount, and reason.
- Manager review includes approve, reject, and rejection reason states.
- Finance export and audit log are represented with placeholder data.
- The builder does not add payroll, payments, or unrelated analytics.

Useful result:

- The first pass can be checked against roles, states, and handoffs.
- Missing slices can be repaired one at a time.

## Lightweight Feedback

For each example, record:

- Builder used.
- Number of passes.
- Biggest drift signal.
- Most useful contract field.
- Whether the pass report made review easier.
- Whether the developer would use a Build Contract again.
