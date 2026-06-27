const secretPatterns = [
  /\bsk-[A-Za-z0-9_-]{20,}\b/,
  /\bBearer\s+[A-Za-z0-9._-]{20,}\b/i,
  /\beyJ[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}\b/,
  /\b(OPENAI_API_KEY|SUPABASE_SERVICE_ROLE_KEY|SUPABASE_SECRET_KEY|BRIEFTIFY_QA_BYPASS_TOKEN)\b/
];

const privateFieldPatterns = [
  /\bBriefSession\b/,
  /\bsemanticContract\b/,
  /\brawMessages\b/,
  /\bmodelMessages\b/,
  /\buntrustedBuilderOutput\b/
];

export type PublicSafetyAudit = {
  issues: string[];
  ok: boolean;
};

export function auditPublicArtifactSafety(value: unknown): PublicSafetyAudit {
  const text = JSON.stringify(value);
  const issues = [
    ...secretPatterns.flatMap((pattern) => (pattern.test(text) ? ["Possible secret-shaped value."] : [])),
    ...privateFieldPatterns.flatMap((pattern) => (pattern.test(text) ? [`Private field pattern: ${pattern.source}`] : []))
  ];

  return {
    issues,
    ok: issues.length === 0
  };
}

