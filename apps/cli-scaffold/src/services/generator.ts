import { existsSync, readdirSync, readFileSync } from 'fs';
import { mkdir } from 'fs/promises';
import { join, dirname } from 'path';
import { renderTemplate } from '@workspace/core-utils';
import type { AppTypeContext } from '@workspace/core-app-types';

/**
 * Resolve stubs directory: project override (stubs/app-types/{id}) or module's built-in stubsDir.
 */
export function resolveAppTypeStubsDir(
  moduleStubsDir: string,
  appTypeId: string,
  projectRoot?: string,
): string {
  if (projectRoot) {
    const override = join(projectRoot, 'stubs', 'app-types', appTypeId);
    if (existsSync(override)) return override;
  }
  return moduleStubsDir;
}

/**
 * Resolve stubs directory: project override (stubs/packages/{id}) or module's built-in stubsDir.
 */
export function resolvePackageStubsDir(
  moduleStubsDir: string,
  packageType: string,
  projectRoot?: string,
): string {
  if (projectRoot) {
    const override = join(projectRoot, 'stubs', 'packages', packageType);
    if (existsSync(override)) return override;
  }
  return moduleStubsDir;
}

/**
 * Discover all .stub files in a directory recursively.
 * Returns relative paths from baseDir (e.g. ['src/index.ts.stub', 'bin/run.js.stub']).
 */
export function discoverStubFiles(baseDir: string): string[] {
  const result: string[] = [];

  function walk(dir: string, prefix = ''): void {
    const entries = readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const rel = prefix ? `${prefix}/${entry.name}` : entry.name;
      if (entry.isDirectory()) {
        walk(join(dir, entry.name), rel);
      } else if (entry.name.endsWith('.stub')) {
        result.push(rel);
      }
    }
  }

  walk(baseDir);
  return result;
}

/**
 * Get output path from stub path (strip .stub extension).
 */
export function stubPathToOutputPath(stubPath: string): string {
  return stubPath.replace(/\.stub$/, '');
}

/**
 * Generate source files from a stubs directory.
 * Each .stub file is rendered with Mustache and written to outputDir.
 */
export async function generateFromStubs(
  stubsDir: string,
  outputDir: string,
  context: Record<string, unknown>,
): Promise<void> {
  const stubFiles = discoverStubFiles(stubsDir);

  const view = { ...context };

  const { writeFile } = await import('fs/promises');
  for (const stubRel of stubFiles) {
    const stubFullPath = join(stubsDir, stubRel);
    const template = readFileSync(stubFullPath, 'utf-8');
    const rendered = renderTemplate(template, view);
    const outputRel = stubPathToOutputPath(stubRel);
    const outputPath = join(outputDir, outputRel);
    await mkdir(dirname(outputPath), { recursive: true });
    await writeFile(outputPath, rendered);
  }
}

/**
 * Context for package template rendering.
 */
export interface PackageTemplateContext {
  projectName: string;
  packageName: string;
  hasDomain?: boolean;
}
