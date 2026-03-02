/**
 * Backend app-type configuration. Package.json merge and scripts for
 * scaffolded backend (Elysia) applications.
 */

/** Scripts written to scaffolded backend app package.json */
export const BACKEND_APP_SCRIPTS = {
  start: 'bun run src/index.ts',
} as const;

/** Directory structure for scaffolded backend apps */
export const BACKEND_APP_MKDIR_PATHS = ['src'] as const;

export interface PackageMergeContext {
  projectName: string;
  appName: string;
  appBaseName?: string;
}

/**
 * Build the package.json merge object for a scaffolded backend app.
 */
export function getPackageMerge(_ctx: PackageMergeContext): Record<string, unknown> {
  return {
    scripts: { ...BACKEND_APP_SCRIPTS },
  };
}
