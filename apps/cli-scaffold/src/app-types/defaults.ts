import type { AppTypeContext, GeneratePhase } from './types.js';

/** Default package.json merge for app generate phases */
export const DEFAULT_APP_MERGE: Record<string, unknown> = {
  private: true,
  type: 'module',
  scripts: {
    build: 'tsc',
    dev: 'bun run --watch src/index.ts',
  },
};

/** Default mkdir paths for apps */
export const DEFAULT_APP_MKDIR_PATHS = ['src'];

/**
 * Merge override into defaults. Override wins for same keys.
 * For nested objects (e.g. scripts), override scripts are merged into default scripts.
 */
function deepMerge(
  base: Record<string, unknown>,
  override: Record<string, unknown>,
): Record<string, unknown> {
  const result = { ...base };
  for (const key of Object.keys(override)) {
    const baseVal = result[key];
    const overrideVal = override[key];
    if (
      baseVal != null &&
      overrideVal != null &&
      typeof baseVal === 'object' &&
      typeof overrideVal === 'object' &&
      !Array.isArray(baseVal) &&
      !Array.isArray(overrideVal)
    ) {
      result[key] = deepMerge(
        baseVal as Record<string, unknown>,
        overrideVal as Record<string, unknown>,
      );
    } else {
      result[key] = overrideVal;
    }
  }
  return result;
}

export interface GeneratePhaseInput
  extends Pick<GeneratePhase, 'stubsDir' | 'getDependencies'> {
  /** Override merge (deep-merged with defaults) */
  getMerge?: (ctx: AppTypeContext) => Record<string, unknown>;
  /** Override mkdir paths (default: ['src']) */
  getMkdirPaths?: (ctx: AppTypeContext) => string[];
}

/**
 * Create a GeneratePhase from defaults + overrides.
 * Only specify what differs from the default.
 */
export function createGeneratePhase(input: GeneratePhaseInput): GeneratePhase {
  return {
    type: 'generate',
    stubsDir: input.stubsDir,
    getMerge: (ctx) =>
      deepMerge(
        { ...DEFAULT_APP_MERGE },
        (input.getMerge?.(ctx) ?? {}) as Record<string, unknown>,
      ),
    getDependencies: input.getDependencies,
    getMkdirPaths: input.getMkdirPaths ?? (() => DEFAULT_APP_MKDIR_PATHS),
  };
}
