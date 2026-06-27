import { createMockBuildPack, reviewToyBuilderReport } from "@brieftify/mock-engine";

const buildPack = createMockBuildPack("Backend-only fraud scoring API for fintech transactions.");
const review = reviewToyBuilderReport(buildPack.contract, {
  driftFound: [],
  failedChecks: [],
  passedChecks: ["Request and response shape are documented.", "Risk score and reason codes are returned."],
  status: "done",
  version: "builder-pass-report/v1"
});

console.log(review);

