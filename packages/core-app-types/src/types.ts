/**
 * App type scaffolding types shared by app-type packages and the scaffold CLI.
 */

/** Command step type for script phases (bun create, bunx, etc.) */
export type CommandStepType = "bun" | "pnpm" | "bunx" | "npx" | "shell" | "exec";

/** A single command step in a scripts phase */
export interface CommandStep {
  type: CommandStepType;
  command: string;
  args?: string[];
  /** Use when running in non-interactive mode instead of args */
  argsForNonInteractive?: string[];
  cwd?: string;
  optional?: boolean;
  /** When true, subprocess uses stdio: 'inherit' for prompts */
  interactive?: boolean;
}

/** Context passed when resolving app type config (dependencies, paths, source files) */
export interface AppTypeContext {
  projectName: string;
  appName: string;
  appDir: string;
  projectDir?: string;
  appType?: string;
  patchScriptPath?: string;
}

/** Phase that creates a folder with package.json, dependencies, and source files from stubs */
export interface GeneratePhase {
  type: "generate";
  stubsDir: string;
  getMerge: (ctx: AppTypeContext) => Record<string, unknown>;
  getDependencies: (ctx: AppTypeContext) => string[];
  getMkdirPaths: (ctx: AppTypeContext) => string[];
}

/** Phase that runs initialization commands (e.g. bun create, bunx) */
export interface ScriptsPhase {
  type: "scripts";
  getSteps: (ctx: AppTypeContext) => CommandStep[];
}

export type AppTypePhase = GeneratePhase | ScriptsPhase;

/** Shared options for app-type factories that accept dependency strings */
export interface AppTypeDepsOptions {
  deps: readonly string[];
}

/** Unified app type config */
export interface AppTypeConfig {
  id: string;
  description: string;
  /** Directory prefix for app folder (e.g. "frontend" → apps/frontend-* ) */
  dirPrefix: string;
  /** Default app name when none provided (e.g. "web", "api", "tools") */
  defaultAppName: string;
  isReactFrontend?: boolean;
  phases: AppTypePhase[];
}
