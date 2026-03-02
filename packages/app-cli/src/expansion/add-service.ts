/**
 * scaffold cli add-service — Add a new service to the service layer of a scaffolded CLI application.
 */

import { Command } from 'commander';
import { existsSync, readFileSync } from 'fs';
import { mkdir, writeFile } from 'fs/promises';
import { dirname, join, resolve } from 'path';
import { fileURLToPath } from 'url';
import {
  ensureProjectRoot,
  formatEntityName,
  resolveAppByPrefix,
  toPascalCase,
  validateCliServiceName,
} from '@workspace/core-utils';
import { renderTemplate } from '@workspace/core-utils';

const __dirname = dirname(fileURLToPath(import.meta.url));
const EXPANSION_STUBS = join(__dirname, '..', '..', 'stubs', 'expansion');
const CLI_PREFIX = 'cli';

/**
 * Core logic: add a service to a CLI app. Exported for reuse (e.g. scaffold defaults).
 * @returns true if the service was created, false if it already existed
 */
export async function executeAddService(
  projectDir: string,
  appName: string,
  name: string
): Promise<boolean> {
  const appDir = resolve(projectDir, 'apps', appName);
  const serviceName = formatEntityName(validateCliServiceName(name), 'cli-service');
  const serviceExportName = toPascalCase(serviceName.replace(/-service$/, '')) + 'Service';

  const servicesDir = resolve(appDir, 'src', 'services');
  await mkdir(servicesDir, { recursive: true });

  const servicePath = resolve(servicesDir, `${serviceName}.ts`);
  if (existsSync(servicePath)) return false;

  const template = readFileSync(join(EXPANSION_STUBS, 'service.ts.stub'), 'utf-8');
  const rendered = renderTemplate(template, { serviceExportName });
  await writeFile(servicePath, rendered);
  return true;
}

export const addServiceSub = new Command('add-service')
  .description('Add a new service to the service layer of a scaffolded CLI application')
  .argument('<name>', 'Service name (kebab-case, e.g. user-service)')
  .option('-a, --app <name>', 'Target CLI app (required if project has multiple)')
  .action(async (name: string, options: { app?: string }) => {
    const projectDir = process.cwd();
    ensureProjectRoot(projectDir);
    const appName = resolveAppByPrefix(projectDir, CLI_PREFIX, options.app);
    const serviceName = formatEntityName(validateCliServiceName(name), 'cli-service');
    const serviceExportName = toPascalCase(serviceName.replace(/-service$/, '')) + 'Service';
    const created = await executeAddService(projectDir, appName, name);
    if (!created) {
      console.log(`\nService already exists: apps/${appName}/src/services/${serviceName}.ts (skipped)\n`);
      return;
    }
    console.log(`\nCreated service ${serviceName} in apps/${appName}/src/services/`);
    console.log(`  File: src/services/${serviceName}.ts`);
    console.log(`  Export: create${serviceExportName}(), ${serviceExportName}Live, ${serviceExportName}Api\n`);
  });
