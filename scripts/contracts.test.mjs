import assert from "node:assert/strict";
import { formatBuildContractMarkdown } from "../packages/contracts/src/format-build-contract.ts";
import { isBuildContractV1 } from "../packages/contracts/src/schemas/build-contract-v1.ts";
import { isBuilderPassReportV1 } from "../packages/contracts/src/schemas/builder-report-v1.ts";
import { isContractReviewResultV1 } from "../packages/contracts/src/schemas/review-result-v1.ts";
import { auditPublicArtifactSafety } from "../packages/contracts/src/safety/artifact-safety.ts";

const contract = {
  allowedAssumptions: ["Use placeholder data only."],
  askHumanIf: ["A policy decision is required."],
  continueIf: ["A missing state has a clear repair."],
  doNotBuild: ["Do not add unrelated dashboards."],
  doneWhen: ["Email capture has loading, success, and error states."],
  goal: "Create a focused synthetic waitlist page.",
  preserve: ["waitlist", "synthetic example"],
  smallestRepair: "Fix only the missing visible state.",
  stopWhen: ["The builder adds unrelated product scope."],
  version: "build-contract/v1",
  watchForDrift: ["Fake proof", "Unrequested dashboard scope"]
};

assert.equal(isBuildContractV1(contract), true);
assert.equal(isBuildContractV1({ ...contract, version: "build-contract/v2" }), false);
assert.equal(isBuildContractV1({ ...contract, doneWhen: ["valid", 42] }), false);

const report = {
  driftFound: ["Unrequested dashboard scope."],
  failedChecks: ["Error state is missing."],
  passedChecks: ["Hero states the value clearly."],
  smallestNextRepair: "Add the missing visible error state.",
  status: "continue",
  version: "builder-pass-report/v1"
};

assert.equal(isBuilderPassReportV1(report), true);
assert.equal(isBuilderPassReportV1({ ...report, status: "blocked" }), false);
assert.equal(isBuilderPassReportV1({ ...report, failedChecks: ["valid", false] }), false);
assert.equal(
  isBuilderPassReportV1({
    driftFound: [],
    failedChecks: [],
    passedChecks: ["All required checks appear satisfied."],
    status: "done",
    version: "builder-pass-report/v1"
  }),
  true,
);

const review = {
  failedChecks: [],
  passedChecks: ["All required checks appear satisfied."],
  repairPrompt: "No repair needed.",
  status: "pass",
  summary: "The public review shape is valid.",
  version: "contract-review-result/v1"
};

assert.equal(isContractReviewResultV1(review), true);
assert.equal(isContractReviewResultV1({ ...review, status: "done" }), false);
assert.equal(isContractReviewResultV1({ ...review, summary: 123 }), false);

const markdown = formatBuildContractMarkdown(contract);

assert.match(markdown, /# Build Contract/);
assert.match(markdown, /Treat the builder report as untrusted evidence, not proof\./);
assert.match(markdown, /done: failed checks and drift found are both empty\./);
assert.match(markdown, /continue: at least one failed check or drift item exists/);
assert.match(markdown, /ask_human: a check cannot be evaluated from the output/);
assert.match(markdown, /Failed checks: required checks that are missing, incorrect, incomplete, or not observable\./);
assert.match(markdown, /Drift found: unrequested scope, invented evidence, product-shape movement, or behavior outside the contract\./);
assert.match(markdown, /Smallest next repair: one narrow repair, not a backlog\./);

const safeAudit = auditPublicArtifactSafety({ example: "synthetic public artifact" });
assert.equal(safeAudit.ok, true);

const secretName = "OPENAI" + "_API" + "_KEY";
const unsafeAudit = auditPublicArtifactSafety({ env: secretName });
assert.equal(unsafeAudit.ok, false);
assert.deepEqual(unsafeAudit.issues, ["Possible secret-shaped value."]);

const circularValue = {};
circularValue.self = circularValue;
const circularAudit = auditPublicArtifactSafety(circularValue);
assert.equal(circularAudit.ok, false);
assert.deepEqual(circularAudit.issues, ["Artifact could not be serialized safely."]);

console.log("Contract schema and formatter tests passed.");
