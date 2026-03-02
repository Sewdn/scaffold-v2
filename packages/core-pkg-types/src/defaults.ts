import type { PackageConfig, PackageContext } from './types.js';

/** Default package.json merge for library packages (module + types entry) */
export const DEFAULT_PACKAGE_MERGE: Record<string, unknown> = {
  private: true,
  type: 'module',
  module: './src/index.ts',
  types: './src/index.ts',
};

/** Default scripts for TypeScript packages (no dev — run with Bun, build for compile) */
export const DEFAULT_PACKAGE_SCRIPTS: Record<string, string> = {
  build: 'tsc',
  lint: 'eslint .',
};

/** Default mkdir paths */
export const DEFAULT_MKDIR_PATHS = ['src'];

/**
 * Merge override into defaults. Override wins for same keys.
 */
function merge<T extends Record<string, unknown>>(base: T, override?: Partial<T>): T {
  if (!override) return base;
  return { ...base, ...override } as T;
}

export interface PackageConfigInput
  extends Pick<PackageConfig, 'id' | 'description' | 'stubsDir'> {
  /** Override merge (merged with defaults) */
  getMerge?: (ctx: PackageContext) => Record<string, unknown>;
  getDependencies: (ctx: PackageContext) => string[];
  getDevDependencies: (ctx: PackageContext) => string[];
  /** Override mkdir paths (default: ['src']) */
  getMkdirPaths?: (ctx: PackageContext) => string[];
  /** Override scripts (merged with defaults) */
  getScripts?: (ctx: PackageContext) => Record<string, string>;
}

/**
 * Create a PackageConfig from defaults + overrides.
 * Only specify what differs from the default.
 */
export function createPackageConfig(input: PackageConfigInput): PackageConfig {
  return {
    id: input.id,
    description: input.description,
    stubsDir: input.stubsDir,
    getMerge: (ctx) =>
      merge(DEFAULT_PACKAGE_MERGE, input.getMerge?.(ctx) ?? {}),
    getDependencies: input.getDependencies,
    getDevDependencies: input.getDevDependencies,
    getMkdirPaths: input.getMkdirPaths ?? (() => DEFAULT_MKDIR_PATHS),
    getScripts: input.getScripts
      ? (ctx) => merge(DEFAULT_PACKAGE_SCRIPTS, input.getScripts?.(ctx))
      : () => ({ ...DEFAULT_PACKAGE_SCRIPTS }),
  };
}
