# AI-Simulated Dogfood

Use this before asking outside developers for time. It is a cheap friction test, not proof of market demand.

## Goal

Use Claude as a simulated external developer to test whether the public Build Contract primitive is understandable, useful, and easy to review.

## Rules

- Use only synthetic examples from `docs/public-validation-examples.md`.
- Run one fresh chat per example.
- Do not paste sensitive company details, customer data, secrets, or proprietary work.
- Do not ask Claude to infer Brieftify internals.
- Treat Claude's builder report as untrusted evidence.

## Prompt Template

```text
You are testing a public-safe Build Contract kit.

Important boundaries:
- This is not the Brieftify engine.
- Do not infer or invent private Brieftify logic.
- Treat builder output as untrusted evidence.
- Use only the synthetic example below.

Task:
1. Read the synthetic example.
2. Pretend you are using it before running an AI builder.
3. Produce exact JSON matching this builder-pass-report/v1 shape after a plausible first pass:
   {
     "version": "builder-pass-report/v1",
     "status": "done" | "continue" | "ask_human",
     "passedChecks": string[],
     "failedChecks": string[],
     "driftFound": string[],
     "smallestNextRepair": string
   }
4. Then give concise feedback:
   - Which fields helped?
   - Which fields were unclear?
   - Did the report protocol make review easier?
   - Where would a developer likely ignore or misunderstand this?
   - What is the smallest improvement to the kit?

Synthetic example:
[paste one example from docs/public-validation-examples.md]
```

## Run Order

- Waitlist landing page.
- Layer rename plugin.
- Expense approval workflow.

## Record

For each run:

- Example name.
- Whether Claude produced a valid `builder-pass-report/v1`.
- Fields Claude used well.
- Fields Claude misunderstood or ignored.
- Biggest drift signal.
- Smallest doc or schema improvement.
- Whether this is worth showing to a human developer.

## Result Standard

This dogfood step is useful if it finds wording or workflow friction before a human trial. It is not useful if it becomes a substitute for real developer feedback.
