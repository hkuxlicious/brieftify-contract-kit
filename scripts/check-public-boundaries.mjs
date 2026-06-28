import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const skipDirs = new Set([".git", "node_modules", "dist", "build", ".next"]);
const scannedExtensions = new Set([".ts", ".tsx", ".js", ".jsx", ".mjs", ".cjs", ".json", ".md", ".txt", ".yml", ".yaml"]);
const guardFiles = new Set([
  "scripts/check-public-boundaries.mjs",
  "packages/contracts/src/safety/artifact-safety.ts"
]);

const boundaryReferenceFiles = new Set([
  "AGENTS.md",
  ".github/ISSUE_TEMPLATE/boundary-safety.yml",
  ".github/ISSUE_TEMPLATE/bug-report.yml",
  ".github/ISSUE_TEMPLATE/docs-schema-question.yml",
  "README.md",
  "CONTRIBUTING.md",
  "NEXT_ACTIONS.md",
  "PROJECT_HANDOFF.md",
  "ROADMAP.md",
  "NOTICE.md",
  "SECURITY.md",
  "docs/artifact-contracts.md",
  "docs/mock-engine.md",
  "docs/open-source-preview-plan.md",
  "docs/public-boundaries.md",
  "docs/release-checklist.md",
  "docs/release-checklist-review.md"
]);

const forbiddenPathParts = [
  ".env",
  ".vercel",
  "supabase",
  "live-pipeline",
  "build-plan-generator",
  "brief-session",
  "semantic-contract",
  "rate-limit",
  "auth",
  "history"
];

const secretPatterns = [
  { label: "OpenAI-style secret", pattern: /\bsk-[A-Za-z0-9_-]{20,}\b/ },
  { label: "Bearer token", pattern: /\bBearer\s+[A-Za-z0-9._-]{20,}\b/i },
  { label: "JWT-shaped token", pattern: /\beyJ[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}\b/ },
  {
    label: "private environment variable",
    pattern: /\b(OPENAI_API_KEY|SUPABASE_SERVICE_ROLE_KEY|SUPABASE_SECRET_KEY|BRIEFTIFY_QA_BYPASS_TOKEN)\b/
  }
];

const privateImplementationPatterns = [
  { label: "semanticContract", pattern: /\bsemanticContract\b/ },
  { label: "BriefSession", pattern: /\bBriefSession\b/ },
  { label: "rawMessages", pattern: /\brawMessages\b/ },
  { label: "modelMessages", pattern: /\bmodelMessages\b/ },
  { label: "live pipeline module", pattern: /\blive-pipeline\.server\b/ },
  { label: "build plan generator module", pattern: /\bbuild-plan-generator\.server\b/ }
];

const privateCategoryPatterns = [
  { label: "production prompts", pattern: /\bproduction prompts?\b/i },
  { label: "classifier logic", pattern: /\b(real|hidden|production)\s+classifier\b/i },
  { label: "semantic contract logic", pattern: /\bsemantic[- ]contract\b/i },
  { label: "repair templates", pattern: /\brepair templates?\b/i },
  { label: "scorecard thresholds", pattern: /\bscorecard thresholds?\b/i },
  { label: "private regression content", pattern: /\bprivate regression\b/i },
  { label: "live LLM pipeline", pattern: /\blive LLM\b|\bLLM pipeline\b/i },
  { label: "deployment config", pattern: /\b(Vercel|Supabase)\b/ }
];

export async function findPublicBoundaryIssues(root = process.cwd()) {
  const issues = [];
  await walk(root, root, issues);
  return issues;
}

async function walk(root, dir, issues) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (skipDirs.has(entry.name)) continue;
    const fullPath = path.join(dir, entry.name);
    const relative = path.relative(root, fullPath).replaceAll(path.sep, "/");

    if (forbiddenPathParts.some((part) => relative.toLowerCase().includes(part.toLowerCase()))) {
      issues.push(`Forbidden path: ${relative}`);
      continue;
    }

    if (entry.isDirectory()) {
      await walk(root, fullPath, issues);
      continue;
    }

    if (!scannedExtensions.has(path.extname(entry.name))) continue;
    if (guardFiles.has(relative)) continue;
    const text = await readFile(fullPath, "utf8");

    for (const { label, pattern } of secretPatterns) {
      if (pattern.test(text)) issues.push(`Forbidden ${label} in ${relative}`);
    }

    if (boundaryReferenceFiles.has(relative)) continue;

    for (const { label, pattern } of [...privateImplementationPatterns, ...privateCategoryPatterns]) {
      if (pattern.test(text)) issues.push(`Forbidden private content (${label}) in ${relative}`);
    }
  }
}

if (isDirectRun()) {
  const issues = await findPublicBoundaryIssues();

  if (issues.length) {
    console.error("Public boundary check failed:");
    for (const issue of issues) console.error(`- ${issue}`);
    process.exit(1);
  }

  console.log("Public boundary check passed.");
}

function isDirectRun() {
  return process.argv[1] ? path.resolve(process.argv[1]) === fileURLToPath(import.meta.url) : false;
}
