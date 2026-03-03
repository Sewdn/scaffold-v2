/**
 * API Hono app-type configuration. Package.json merge and scripts for
 * scaffolded API (Hono) applications.
 */

/** Scripts written to scaffolded API Hono app package.json */
export const API_HONO_APP_SCRIPTS = {
  start: "bun run src/index.ts",
  test: "bun test",
} as const;

/** Directory structure for scaffolded API Hono apps */
export const API_HONO_APP_MKDIR_PATHS = ["src"] as const;

export interface PackageMergeContext {
  projectName: string;
  appName: string;
  appBaseName?: string;
}

/**
 * Build the package.json merge object for a scaffolded API Hono app.
 */
export function getPackageMerge(_ctx: PackageMergeContext): Record<string, unknown> {
  return {
    scripts: { ...API_HONO_APP_SCRIPTS },
  };
}
