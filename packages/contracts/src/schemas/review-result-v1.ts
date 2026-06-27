export type ContractReviewResultV1 = {
  failedChecks: string[];
  passedChecks: string[];
  repairPrompt: string;
  status: "fail" | "needs_human" | "pass";
  summary: string;
  version: "contract-review-result/v1";
};

export function isContractReviewResultV1(value: unknown): value is ContractReviewResultV1 {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Record<string, unknown>;
  return (
    candidate.version === "contract-review-result/v1" &&
    (candidate.status === "pass" || candidate.status === "fail" || candidate.status === "needs_human") &&
    typeof candidate.summary === "string" &&
    typeof candidate.repairPrompt === "string" &&
    ["failedChecks", "passedChecks"].every(
      (key) => Array.isArray(candidate[key]) && (candidate[key] as unknown[]).every((item) => typeof item === "string"),
    )
  );
}
