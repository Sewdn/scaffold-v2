/**
 * Core utilities for resolving and validating apps by type prefix.
 * Used by app-type expansion commands (cli, backend, etc.) to find and resolve target apps.
 * Prefix is the directory prefix (e.g. "cli" for cli-*, "backend" for backend-*).
 */

import { existsSync, readdirSync } from 'fs';
import { resolve } from 'path';

/**
 * Ensure the given directory is a project root (has package.json).
 * Exits with code 1 if not.
 */
export function ensureProjectRoot(projectDir: string): void {
  const rootPkgPath = resolve(projectDir, 'package.json');
  if (!existsSync(rootPkgPath)) {
    console.error('Error: Not in a project root. Run scaffold create or scaffold init first.');
    process.exit(1);
  }
}

/**
 * Normalize prefix for directory matching: "cli" -> "cli-", "backend" -> "backend-"
 */
function appPrefix(prefix: string): string {
  return prefix.endsWith('-') ? prefix : `${prefix}-`;
}

/**
 * Find app directories in apps/ that start with the given prefix.
 * @param projectDir - Project root (contains apps/)
 * @param prefix - App type prefix (e.g. "cli", "backend", "mcp")
 * @returns Sorted list of matching app directory names (e.g. ["cli-tools"])
 */
export function findAppsByPrefix(projectDir: string, prefix: string): string[] {
  const p = appPrefix(prefix);
  const appsDir = resolve(projectDir, 'apps');
  if (!existsSync(appsDir)) return [];
  const entries = readdirSync(appsDir, { withFileTypes: true });
  return entries
    .filter((e) => e.isDirectory() && e.name.startsWith(p))
    .map((e) => e.name)
    .sort();
}

export interface ResolveAppOptions {
  /** Message when no apps found. Default: "Error: No {prefix} apps found..." */
  noAppsMessage?: string;
  /** Message when multiple apps and none specified. Default: "Error: Multiple {prefix} apps found. Specify one with --app: ..." */
  multipleAppsMessage?: string;
}

/**
 * Resolve the target app directory name for expansion commands.
 * Ensures project root, finds apps by prefix, and returns the single app to use.
 * Exits with code 1 on validation failure.
 *
 * @param projectDir - Project root
 * @param prefix - App type prefix (e.g. "cli", "backend")
 * @param appName - Optional app name from --app flag; normalized to prefix-name if needed
 * @param options - Custom error messages
 * @returns Resolved app directory name (e.g. "cli-tools")
 */
export function resolveAppByPrefix(
  projectDir: string,
  prefix: string,
  appName?: string,
  options?: ResolveAppOptions
): string {
  const p = appPrefix(prefix);
  const apps = findAppsByPrefix(projectDir, prefix);

  if (apps.length === 0) {
    console.error(
      options?.noAppsMessage ??
        `Error: No ${prefix} apps found in this project. Add one with: scaffold app --type ${prefix} <name>`
    );
    process.exit(1);
  }

  if (appName) {
    const full = appName.startsWith(p) ? appName : `${p}${appName}`;
    if (!apps.includes(full)) {
      console.error(`Error: ${prefix} app "${full}" not found. Available: ${apps.join(', ')}`);
      process.exit(1);
    }
    return full;
  }

  if (apps.length === 1) {
    return apps[0];
  }

  console.error(
    options?.multipleAppsMessage ??
      `Error: Multiple ${prefix} apps found. Specify one with --app: ${apps.join(', ')}`
  );
  process.exit(1);
}
