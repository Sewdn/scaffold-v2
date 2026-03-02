import { Command } from 'commander';
import { resolve } from 'path';
import { existsSync, readFileSync } from 'fs';
import { Effect } from 'effect';
import { createUIPackage } from '../init/create-package-files.js';
import { runSteps } from '../orchestrator.js';
import { formatEntityName, validatePackageName } from '@workspace/core-utils';

export const uiCommand = new Command('ui')
  .description('Add a UI package')
  .argument('<name>', 'UI package name')
  .action(async (name: string) => {
    const uiName = formatEntityName(validatePackageName(name), 'package');
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

    console.log(`\nAdding UI package ui-${uiName}\n`);
    await createUIPackage(projectDir, projectName, uiName);

    console.log('Running bun install...\n');
    await Effect.runPromise(
      runSteps([{ type: 'bun', command: 'install', cwd: '' }], { cwd: projectDir, verbose: true }),
    ).catch((err) => {
      console.error('Error:', err?.message ?? err);
      process.exit(1);
    });

    console.log(`\nCreated package packages/ui-${uiName}`);
    console.log(`  Package: @${projectName}/ui-${uiName}\n`);
  });
