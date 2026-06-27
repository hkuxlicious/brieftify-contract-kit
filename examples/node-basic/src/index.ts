import { createMockBuildPack } from "@brieftify/mock-engine";

const result = createMockBuildPack("Figma plugin that renames messy layers using team naming rules.");

console.log(result.markdown);

