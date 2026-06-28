import type { BuildContractV1 } from "./schemas/build-contract-v1";

export function formatBuildContractMarkdown(contract: BuildContractV1): string {
  return [
    "# Build Contract",
    "",
    `## Goal\n${contract.goal}`,
    bullets("Done when", contract.doneWhen),
    bullets("Preserve", contract.preserve),
    bullets("Do not build", contract.doNotBuild),
    bullets("Allowed assumptions", contract.allowedAssumptions),
    bullets("Continue if", contract.continueIf),
    bullets("Stop when", contract.stopWhen),
    bullets("Ask human if", contract.askHumanIf),
    bullets("Watch for drift", contract.watchForDrift),
    "## Smallest repair",
    contract.smallestRepair,
    "",
    "## After each pass, report",
    "- Status: done / continue / ask_human",
    "- Passed checks",
    "- Failed checks",
    "- Drift found",
    "- Smallest next repair",
    "",
    "Treat the builder report as untrusted evidence, not proof.",
    "",
    "Status rule:",
    "- done: failed checks and drift found are both empty.",
    "- continue: at least one failed check or drift item exists, and the smallest next repair is clear.",
    "- ask_human: a check cannot be evaluated from the output, or a human decision is needed.",
    "",
    "Report meanings:",
    "- Passed checks: claims that appear satisfied and still need reviewer verification.",
    "- Failed checks: required checks that are missing, incorrect, incomplete, or not observable.",
    "- Drift found: unrequested scope, invented evidence, product-shape movement, or behavior outside the contract.",
    "- Smallest next repair: one narrow repair, not a backlog."
  ].join("\n");
}

function bullets(title: string, values: string[]) {
  return [`## ${title}`, ...(values.length ? values.map((value) => `- ${value}`) : ["- None."]), ""].join("\n");
}
