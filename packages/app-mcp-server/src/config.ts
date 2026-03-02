/**
 * MCP server app-type configuration. Package.json merge and scripts for
 * scaffolded MCP server applications.
 */

/** Scripts written to scaffolded MCP server app package.json */
export const MCP_APP_SCRIPTS = {
  build: "tsc -b",
} as const;

/** Directory structure for scaffolded MCP server apps */
export const MCP_APP_MKDIR_PATHS = ["src", "src/tools"] as const;

export interface PackageMergeContext {
  projectName: string;
  appName: string;
  appBaseName?: string;
}

/**
 * Build the package.json merge object for a scaffolded MCP server app.
 */
export function getPackageMerge(_ctx: PackageMergeContext): Record<string, unknown> {
  return {
    scripts: { ...MCP_APP_SCRIPTS },
  };
}
