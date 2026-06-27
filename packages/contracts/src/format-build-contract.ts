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
    "- Smallest next repair"
  ].join("\n");
}

function bullets(title: string, values: string[]) {
  return [`## ${title}`, ...(values.length ? values.map((value) => `- ${value}`) : ["- None."]), ""].join("\n");
}

