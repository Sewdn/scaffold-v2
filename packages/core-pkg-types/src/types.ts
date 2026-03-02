/**
 * Context passed when resolving package config (dependencies, paths, merge).
 */
export interface PackageContext {
  projectName: string;
  packageName: string;
  packageDir: string;
  /** Whether domain package exists (e.g. for ui-lib dependency) */
  hasDomain?: boolean;
  /** Other selected package ids, for conditional deps */
  selectedPackages?: readonly string[];
}

/**
 * Config for package types.
 * Each package is a self-contained module with directory setup, deps, and stubs.
 * Enables adding new package types (svc-prisma, svc-workos, etc.) by creating a module.
 */
export interface PackageConfig {
  id: string;
  description: string;
  /** Path to stubs folder within the module */
  stubsDir: string;
  /** Package.json merge (name set by scaffolder). Use getMerge for context-dependent fields. */
  getMerge: (ctx: PackageContext) => Record<string, unknown>;
  /** Dependencies to add via bun add */
  getDependencies: (ctx: PackageContext) => string[];
  /** Dev dependencies to add via bun add -d */
  getDevDependencies: (ctx: PackageContext) => string[];
  /** Relative paths to create via mkdir (relative to packageDir), e.g. ['src', 'prisma'] */
  getMkdirPaths: (ctx: PackageContext) => string[];
  /** Optional scripts to merge into package.json */
  getScripts?: (ctx: PackageContext) => Record<string, string>;
}
