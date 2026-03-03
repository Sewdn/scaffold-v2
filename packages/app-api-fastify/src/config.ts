/**
 * API Fastify app-type configuration. Package.json merge and scripts for
 * scaffolded API (Fastify) applications.
 */

/** Scripts written to scaffolded API Fastify app package.json */
export const API_FASTIFY_APP_SCRIPTS = {
  start: "bun run src/index.ts",
} as const;

/** Directory structure for scaffolded API Fastify apps */
export const API_FASTIFY_APP_MKDIR_PATHS = ["src"] as const;

export interface PackageMergeContext {
  projectName: string;
  appName: string;
  appBaseName?: string;
}

/**
 * Build the package.json merge object for a scaffolded API Fastify app.
 */
export function getPackageMerge(_ctx: PackageMergeContext): Record<string, unknown> {
  return {
    scripts: { ...API_FASTIFY_APP_SCRIPTS },
  };
}
