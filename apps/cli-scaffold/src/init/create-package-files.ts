import { existsSync } from 'fs';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { Effect } from 'effect';
import { runSteps } from '../orchestrator.js';
import { getPackageInitSteps } from './init-steps.js';
import { BASE_DEV_DEPS, DEP_EFFECT, wsRef } from '../packages/dependencies.js';

function packageExists(projectDir: string, pkgPath: string): boolean {
  return existsSync(join(projectDir, pkgPath, 'package.json'));
}

/**
 * Creates a service package using bun init + bun add.
 * Adds domain and svc-config only when those packages exist.
 */
export async function createServicePackage(
  projectDir: string,
  projectName: string,
  serviceName: string,
): Promise<void> {
  const pkgDir = `packages/svc-${serviceName}`;
  const pkgName = `@${projectName}/svc-${serviceName}`;

  const deps: string[] = [DEP_EFFECT];
  if (packageExists(projectDir, 'packages/domain')) {
    deps.push(wsRef(projectName, 'domain'));
  }
  if (packageExists(projectDir, 'packages/svc-config')) {
    deps.push(wsRef(projectName, 'svc-config'));
  }

  const steps = getPackageInitSteps({
    packageDir: pkgDir,
    packageName: pkgName,
    dependencies: deps,
    devDependencies: BASE_DEV_DEPS,
  });

  await Effect.runPromise(
    runSteps(steps, {
      cwd: projectDir,
      context: { projectName },
      verbose: true,
    }),
  );

  await writeFile(join(projectDir, pkgDir, 'src', 'index.ts'), 'export {};\n');
}

/**
 * Creates a UI package using bun init + bun add.
 * Adds ui, ui-lib, and domain only when those packages exist.
 */
export async function createUIPackage(
  projectDir: string,
  projectName: string,
  uiName: string,
): Promise<void> {
  const pkgDir = `packages/ui-${uiName}`;
  const pkgName = `@${projectName}/ui-${uiName}`;

  const deps: string[] = [DEP_EFFECT];
  if (packageExists(projectDir, 'packages/ui')) {
    deps.push(wsRef(projectName, 'ui'));
  }
  if (packageExists(projectDir, 'packages/ui-lib')) {
    deps.push(wsRef(projectName, 'ui-lib'));
  }
  if (packageExists(projectDir, 'packages/domain')) {
    deps.push(wsRef(projectName, 'domain'));
  }

  const steps = getPackageInitSteps({
    packageDir: pkgDir,
    packageName: pkgName,
    dependencies: deps,
    devDependencies: BASE_DEV_DEPS,
  });

  await Effect.runPromise(
    runSteps(steps, {
      cwd: projectDir,
      context: { projectName },
      verbose: true,
    }),
  );

  await writeFile(join(projectDir, pkgDir, 'src', 'index.ts'), 'export {};\n');
}
