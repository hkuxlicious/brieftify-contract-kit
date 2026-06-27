import {
  formatBuildContractMarkdown,
  isBuilderPassReportV1,
  type BuildContractV1,
  type ContractReviewResultV1
} from "@brieftify/contracts";

export type MockSurfaceKind = "api" | "extension" | "landing" | "plugin" | "workflow";

export type MockBuildPack = {
  contract: BuildContractV1;
  markdown: string;
  questions: string[];
  surface: MockSurfaceKind;
};

export function createMockBuildPack(roughIdea: string): MockBuildPack {
  const surface = classifyMockSurface(roughIdea);
  const contract = createToyContract(roughIdea, surface);
  return {
    contract,
    markdown: formatBuildContractMarkdown(contract),
    questions: toyQuestions(surface),
    surface
  };
}

export function reviewToyBuilderReport(contract: BuildContractV1, report: unknown): ContractReviewResultV1 {
  if (!isBuilderPassReportV1(report)) {
    return {
      failedChecks: ["Builder report did not match builder-pass-report/v1."],
      passedChecks: [],
      repairPrompt:
        "Return a valid builder-pass-report/v1 object with status, passedChecks, failedChecks, and driftFound. Do not add instructions or extra scope.",
      status: "fail",
      summary: "The builder report was invalid, so it was not used as evidence.",
      version: "contract-review-result/v1"
    };
  }

  if (report.status === "ask_human") {
    return {
      failedChecks: [],
      passedChecks: report.passedChecks,
      repairPrompt: contract.askHumanIf[0] || "Ask the user for the missing decision before continuing.",
      status: "needs_human",
      summary: "The builder asked for a human decision.",
      version: "contract-review-result/v1"
    };
  }

  if (report.failedChecks.length || report.driftFound.length || report.status === "continue") {
    return {
      failedChecks: [...report.failedChecks, ...report.driftFound],
      passedChecks: report.passedChecks,
      repairPrompt: contract.smallestRepair,
      status: "fail",
      summary: "The builder report still has failed checks or drift.",
      version: "contract-review-result/v1"
    };
  }

  return {
    failedChecks: [],
    passedChecks: report.passedChecks,
    repairPrompt: "No repair needed. Keep the Build Contract available for the next pass.",
    status: "pass",
    summary: "The builder report claims the contract checks passed.",
    version: "contract-review-result/v1"
  };
}

function classifyMockSurface(roughIdea: string): MockSurfaceKind {
  const text = roughIdea.toLowerCase();
  if (text.includes("api") || text.includes("backend")) return "api";
  if (text.includes("chrome") || text.includes("extension")) return "extension";
  if (text.includes("figma") || text.includes("plugin")) return "plugin";
  if (text.includes("internal") || text.includes("approve") || text.includes("workflow")) return "workflow";
  return "landing";
}

function toyQuestions(surface: MockSurfaceKind): string[] {
  const questions: Record<MockSurfaceKind, string[]> = {
    api: ["What request fields must the first API accept?", "What response proves the API worked?"],
    extension: ["What host context should the extension understand?", "What empty or permission state matters first?"],
    landing: ["What one action should the visitor take?", "What proof should be shown without inventing claims?"],
    plugin: ["What selected-object context should the plugin use?", "Should users preview before applying changes?"],
    workflow: ["Who submits, reviews, and receives the output?", "What audit or export does the first build need?"]
  };
  return questions[surface];
}

function createToyContract(roughIdea: string, surface: MockSurfaceKind): BuildContractV1 {
  return {
    allowedAssumptions: ["Keep the first version small and reviewable."],
    askHumanIf: ["A policy, compliance, pricing, or brand claim needs confirmation."],
    continueIf: ["The core flow is present but polish is incomplete."],
    doNotBuild: ["Do not add unrelated auth, payments, analytics dashboards, or team workspaces."],
    doneWhen: [`The first ${surface} flow is represented clearly.`, "Loading, success, and error or empty states are covered."],
    goal: `Create a scoped first build for: ${roughIdea}`,
    preserve: [roughIdea],
    smallestRepair: "Fix only the missing contract check. Do not redesign or expand scope.",
    stopWhen: ["The builder changes the product surface or adds unrequested scope."],
    version: "build-contract/v1",
    watchForDrift: ["Generic app copy", "Unrequested monetization", "Wrong product surface"]
  };
}
