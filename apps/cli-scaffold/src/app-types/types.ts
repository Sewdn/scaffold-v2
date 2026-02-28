import type { CommandStep } from '../types/template.js';

/**
 * Context passed when resolving app type config (dependencies, paths, source files).
 */
export interface AppTypeContext {
  projectName: string;
  appName: string;
  appDir: string;
  /** Included when running script phases (from app command) */
  projectDir?: string;
  appType?: string;
  patchScriptPath?: string;
}

/**
 * Phase that creates a new folder with package.json, dependencies, and source files from stubs.
 */
export interface GeneratePhase {
  type: 'generate';
  /** Path to stubs folder within the module */
  stubsDir: string;
  /** Package.json merge (name/bin set by scaffolder) */
  getMerge: (ctx: AppTypeContext) => Record<string, unknown>;
  /** Dependencies to add via bun add */
  getDependencies: (ctx: AppTypeContext) => string[];
  /** Relative paths to create via mkdir (relative to appDir) */
  getMkdirPaths: (ctx: AppTypeContext) => string[];
}

/**
 * Phase that runs initialization commands (e.g. bun create, bunx @tanstack/cli).
 */
export interface ScriptsPhase {
  type: 'scripts';
  getSteps: (ctx: AppTypeContext) => CommandStep[];
}

export type AppTypePhase = GeneratePhase | ScriptsPhase;

/**
 * Unified app type config.
 * Supports generating a folder with stubs, running init scripts, or both in a specified order.
 */
export interface AppTypeConfig {
  id: string;
  description: string;
  /** When true, UI/UI-lib packages can be added and workspace deps injected */
  isReactFrontend?: boolean;
  /** Phases run in order. Generate: mkdir + bun init + add deps + stub files. Scripts: run command steps. */
  phases: AppTypePhase[];
}
