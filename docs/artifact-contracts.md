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

## Review Result

A future reviewer can return:

- `pass`
- `fail`
- `needs_human`

The public shape can be shared. The private Brieftify reviewer logic should stay private.

