import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import assert from "node:assert/strict";
import { findPublicBoundaryIssues } from "./check-public-boundaries.mjs";

const secretName = "OPENAI" + "_API" + "_KEY";
const secretValue = "sk-" + "x".repeat(24);
const privateCategory = "production " + "prompts";
const privateField = "semantic" + "Contract";

const cases = [
  {
    name: "passes safe synthetic contract docs",
    files: {
      "docs/example.md": "# Example\n\nSynthetic Build Contract notes only.\n",
      "packages/contracts/src/example.ts": "export const version = 'build-contract/v1';\n"
    },
    ok: true
  },
  {
    name: "allows boundary docs to name private categories",
    files: {
      "README.md": `# Boundary\n\nThis doc may mention ${privateCategory} as out of scope.\n`
    },
    ok: true
  },
  {
    name: "rejects secret-shaped values",
    files: {
      "docs/example.md": `Example token: ${secretValue}\n`
    },
    ok: false,
    includes: "Forbidden OpenAI-style secret"
  },
  {
    name: "rejects private environment variable names",
    files: {
      "src/example.ts": `export const keyName = '${secretName}';\n`
    },
    ok: false,
    includes: "Forbidden private environment variable"
  },
  {
    name: "rejects private category mentions outside boundary docs",
    files: {
      "docs/example.md": `This example contains ${privateCategory}.\n`
    },
    ok: false,
    includes: "Forbidden private content"
  },
  {
    name: "rejects private implementation field names",
    files: {
      "src/example.ts": `export const field = '${privateField}';\n`
    },
    ok: false,
    includes: "Forbidden private content"
  },
  {
    name: "rejects forbidden paths",
    files: {
      ".env.example": "SAFE_PLACEHOLDER=value\n"
    },
    ok: false,
    includes: "Forbidden path"
  }
];

for (const testCase of cases) {
  const fixtureRoot = await mkdtemp(path.join(tmpdir(), "brieftify-boundary-"));
  try {
    for (const [relativePath, contents] of Object.entries(testCase.files)) {
      const fullPath = path.join(fixtureRoot, relativePath);
      await mkdir(path.dirname(fullPath), { recursive: true });
      await writeFile(fullPath, contents, "utf8");
    }

    const issues = await findPublicBoundaryIssues(fixtureRoot);
    assert.equal(issues.length === 0, testCase.ok, testCase.name);
    if (testCase.includes) {
      assert.match(issues.join("\n"), new RegExp(escapeRegExp(testCase.includes)), testCase.name);
    }
  } finally {
    await rm(fixtureRoot, { force: true, recursive: true });
  }
}

console.log(`Boundary checker tests passed (${cases.length}).`);

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
