export type BuilderPassReportV1 = {
  driftFound: string[];
  failedChecks: string[];
  passedChecks: string[];
  smallestNextRepair?: string;
  status: "ask_human" | "continue" | "done";
  version: "builder-pass-report/v1";
};

export function isBuilderPassReportV1(value: unknown): value is BuilderPassReportV1 {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Record<string, unknown>;
  return (
    candidate.version === "builder-pass-report/v1" &&
    (candidate.status === "done" || candidate.status === "continue" || candidate.status === "ask_human") &&
    ["driftFound", "failedChecks", "passedChecks"].every(
      (key) => Array.isArray(candidate[key]) && (candidate[key] as unknown[]).every((item) => typeof item === "string"),
    ) &&
    (candidate.smallestNextRepair === undefined || typeof candidate.smallestNextRepair === "string")
  );
}

