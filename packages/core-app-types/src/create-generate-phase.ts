import type { AppTypeContext, GeneratePhase } from "./types.js";
import { deepMerge } from "./deep-merge.js";
import { DEFAULT_APP_MERGE, DEFAULT_APP_MKDIR_PATHS } from "./defaults.js";

/** Input for createGeneratePhase — specify only what differs from defaults */
export interface GeneratePhaseInput extends Pick<GeneratePhase, "stubsDir" | "getDependencies"> {
  /** Override merge (deep-merged with defaults) */
  getMerge?: (ctx: AppTypeContext) => Record<string, unknown>;
  /** Override mkdir paths (default: ['src']) */
  getMkdirPaths?: (ctx: AppTypeContext) => string[];
  /** Dev dependencies (e.g. bun-types for API apps). If omitted, CLI uses BASE_DEV_DEPS. */
  getDevDependencies?: (ctx: AppTypeContext) => string[];
  /** Tsconfig extends path (e.g. bun.json for API apps). If omitted, uses base.json. */
  tsconfigExtends?: string;
  /** Path to tsconfig.json.stub. When set, stub is rendered instead of generating tsconfig. */
  tsconfigStubPath?: string;
}

/**
 * Create a GeneratePhase from defaults + overrides.
 * Only specify what differs from the default.
 */
export function createGeneratePhase(input: GeneratePhaseInput): GeneratePhase {
  return {
    type: "generate",
    stubsDir: input.stubsDir,
    getMerge: (ctx) =>
      deepMerge({ ...DEFAULT_APP_MERGE }, (input.getMerge?.(ctx) ?? {}) as Record<string, unknown>),
    getDependencies: input.getDependencies,
    getMkdirPaths: input.getMkdirPaths ?? (() => DEFAULT_APP_MKDIR_PATHS),
    getDevDependencies: input.getDevDependencies,
    tsconfigExtends: input.tsconfigExtends,
    tsconfigStubPath: input.tsconfigStubPath,
  };
}
