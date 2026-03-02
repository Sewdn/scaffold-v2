import { Command } from 'commander';
import { resolve } from 'path';
import { existsSync, readFileSync } from 'fs';
import { Effect } from 'effect';
import { createServicePackage } from '../init/create-package-files.js';
import { runSteps } from '../orchestrator.js';
import { formatEntityName, validateServiceName } from '@workspace/core-utils';

export const serviceCommand = new Command('service')
  .description('Add a service package')
  .argument('<name>', 'Service name')
  .action(async (name: string) => {
    const serviceName = formatEntityName(validateServiceName(name), 'service');
    const projectDir = process.cwd();

    const rootPkgPath = resolve(projectDir, 'package.json');
    if (!existsSync(rootPkgPath)) {
      console.error('Error: Not in a project root. Run scaffold init first.');
      process.exit(1);
    }

    let projectName = 'workspace';
    try {
      const pkg = JSON.parse(readFileSync(rootPkgPath, 'utf-8')) as { name?: string };
      if (pkg?.name?.startsWith('@') && pkg.name.endsWith('/root')) {
        projectName = pkg.name.slice(1, -5);
      }
    } catch {
      // ignore
    }

    console.log(`\nAdding service package svc-${serviceName}\n`);
    await createServicePackage(projectDir, projectName, serviceName);

    console.log('Running bun install...\n');
    await Effect.runPromise(
      runSteps([{ type: 'bun', command: 'install', cwd: '' }], { cwd: projectDir, verbose: true }),
    ).catch((err) => {
      console.error('Error:', err?.message ?? err);
      process.exit(1);
    });

    console.log(`\nCreated package packages/svc-${serviceName}`);
    console.log(`  Package: @${projectName}/svc-${serviceName}\n`);
  });
