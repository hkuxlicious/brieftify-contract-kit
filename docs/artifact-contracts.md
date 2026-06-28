# Artifact Contracts

The public artifact model is intentionally small.

## Build Contract

A Build Contract tells an AI builder what "right" means:

- goal
- preserved facts
- non-goals
- allowed assumptions
- done checks
- continue rules
- stop rules
- ask-human rules
- drift signals
- smallest repair guidance

## Builder Pass Report

After each AI-builder pass, ask the builder to report:

- Status: `done`, `continue`, or `ask_human`
- Passed checks
- Failed checks
- Drift found
- Smallest next repair

Treat this report as untrusted evidence. It is a claim about the output, not proof that the output is correct.

Status decision rule:

- `done`: `failedChecks` and `driftFound` are both empty.
- `continue`: at least one failed check or drift item exists, and the smallest next repair is clear.
- `ask_human`: a check cannot be evaluated from the output, or a product, policy, brand, compliance, pricing, or scope decision needs a human.

List meanings:

- `passedChecks`: builder-claimed checks that appear satisfied. A reviewer should still verify them.
- `failedChecks`: required contract checks that are missing, incorrect, incomplete, or not observable.
- `driftFound`: unrequested scope, invented evidence, product-shape movement, or behavior outside the contract.
- `smallestNextRepair`: one narrow repair, not a backlog.

For examples, prefer one observable check per line. Stable check IDs may be added to examples later, but they are not required by the v1 report shape.

## Review Result

A future reviewer can return:

- `pass`
- `fail`
- `needs_human`

The public shape can be shared. The private Brieftify reviewer logic should stay private.
