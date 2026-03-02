/**
 * CLI app-type configuration. All package.json merge, scripts, and default
 * scaffold behavior for CLI applications are defined here.
 */

/** CLI-specific npm dependencies (chalk, cli-table3, @clack/prompts) */
export const CLI_APP_UI_DEPENDENCIES = [
  "chalk@^5.6.2",
  "cli-table3@^0.6.5",
  "@clack/prompts@^1.0.1",
] as const;

/** Scripts written to scaffolded CLI app package.json */
export const CLI_APP_SCRIPTS = {
  build: "tsc -b",
  /** Run the CLI (e.g. bun run start -- hello); Bun runs TS directly */
  start: "bun run src/index.ts",
  /** Runs after bun install to register the CLI globally */
  postinstall: "bun link",
} as const;

/** Directory structure for scaffolded CLI apps */
export const CLI_APP_MKDIR_PATHS = ["src", "src/commands", "src/services", "bin"] as const;

/** Default example command when scaffolding a new CLI app */
export const DEFAULT_COMMAND_NAME = "hello";
export const DEFAULT_COMMAND_DESCRIPTION = "Say hello";

/** Default example service when scaffolding a new CLI app */
export const DEFAULT_SERVICE_NAME = "example-service";

export interface PackageMergeContext {
  projectName: string;
  appName: string;
  appBaseName?: string;
}

/**
 * Build the package.json merge object for a scaffolded CLI app.
 * - bin: {projectName}-{appBaseName} to avoid global command collisions
 * - scripts: build, start (run CLI), postinstall (bun link)
 */
export function getPackageMerge(ctx: PackageMergeContext): Record<string, unknown> {
  const { projectName, appName, appBaseName } = ctx;
  const binName = appBaseName ? `${projectName}-${appBaseName}` : appName;

  return {
    bin: { [binName]: "./bin/run.js" },
    scripts: { ...CLI_APP_SCRIPTS },
    version: "0.1.0",
  };
}
