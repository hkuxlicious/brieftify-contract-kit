export type BuildContractV1 = {
  allowedAssumptions: string[];
  askHumanIf: string[];
  continueIf: string[];
  doNotBuild: string[];
  doneWhen: string[];
  goal: string;
  preserve: string[];
  smallestRepair: string;
  stopWhen: string[];
  version: "build-contract/v1";
  watchForDrift: string[];
};

export function isBuildContractV1(value: unknown): value is BuildContractV1 {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Record<string, unknown>;
  return (
    candidate.version === "build-contract/v1" &&
    typeof candidate.goal === "string" &&
    typeof candidate.smallestRepair === "string" &&
    [
      "allowedAssumptions",
      "askHumanIf",
      "continueIf",
      "doNotBuild",
      "doneWhen",
      "preserve",
      "stopWhen",
      "watchForDrift"
    ].every((key) => Array.isArray(candidate[key]) && (candidate[key] as unknown[]).every((item) => typeof item === "string"))
  );
}

