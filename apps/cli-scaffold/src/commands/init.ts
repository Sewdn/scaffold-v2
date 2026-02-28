import { Command } from 'commander';
import { resolve } from 'path';
import { Effect } from 'effect';
import { intro, outro } from '@clack/prompts';
import chalk from 'chalk';
import { createBaseStructure } from '../init/create-base-structure.js';
import { runSteps } from '../orchestrator.js';
import { validateProjectName } from '../utils/validation.js';
import { formatEntityName } from '../utils/entity-formatting.js';
import {
  OPTIONAL_PACKAGES,
  type OptionalPackage,
} from '../init/optional-packages.js';
import { promptOptionalPackages } from '../ui/ui-prompts.js';

function parseOptionalPackages(
  packages: string | string[] | undefined,
  flags: { domain?: boolean; svcConfig?: boolean; ui?: boolean; uiLib?: boolean },
): OptionalPackage[] {
  const fromFlags: OptionalPackage[] = [];
  if (flags.domain) fromFlags.push('domain');
  if (flags.svcConfig) fromFlags.push('svc-config');
  if (flags.ui) fromFlags.push('ui');
  if (flags.uiLib) fromFlags.push('ui-lib');
  if (fromFlags.length > 0) return fromFlags;

  const raw = Array.isArray(packages) ? packages : packages ? [packages] : [];
  if (raw.length > 0) {
    const list = raw.flatMap((p) => p.split(',')).map((s) => s.trim());
    return list.filter((p): p is OptionalPackage =>
      OPTIONAL_PACKAGES.includes(p as OptionalPackage),
    );
  }
  return [];
}

export const initCommand = new Command('init')
  .description('Initialize base monorepo structure only')
  .argument('<name>', 'Project name')
  .option('-p, --packages <list>', 'Optional packages: domain, svc-config, ui, ui-lib (comma-separated)')
  .option('--domain', 'Include domain package')
  .option('--svc-config', 'Include svc-config package')
  .option('--ui', 'Include ui package (Shadcn base)')
  .option('--ui-lib', 'Include ui-lib package')
  .option('--non-interactive', 'Skip interactive prompts', false)
  .action(async (name: string, options: {
    packages?: string[];
    domain?: boolean;
    svcConfig?: boolean;
    ui?: boolean;
    uiLib?: boolean;
    nonInteractive?: boolean;
  }) => {
    const projectName = formatEntityName(validateProjectName(name), 'project');
    const projectDir = resolve(process.cwd(), projectName);

    let optionalPackages = parseOptionalPackages(options.packages, {
      domain: options.domain,
      svcConfig: options.svcConfig,
      ui: options.ui,
      uiLib: options.uiLib,
    });

    if (optionalPackages.length === 0 && !options.nonInteractive) {
      intro("Let's configure your monorepo");
      optionalPackages = await promptOptionalPackages();
    }

    console.log(`\nCreating monorepo at ${projectDir}\n`);

    await createBaseStructure({ projectName, projectDir, optionalPackages });

    console.log('Running bun install...\n');
    const program = runSteps(
      [{ type: 'bun', command: 'install', cwd: '' }],
      { cwd: projectDir, verbose: true },
    );

    try {
      await Effect.runPromise(program);
    } catch (err) {
      const msg = err && typeof err === 'object' && 'message' in err ? String((err as Error).message) : String(err);
      console.error('Error:', msg);
      process.exit(1);
    }

    const basePkgs = ['typescript-config', 'eslint-config'];
    const pkgList =
      optionalPackages.length > 0 ? [...basePkgs, ...optionalPackages] : basePkgs;
    outro(chalk.green(`Monorepo created in ${projectName}/`));
    console.log(chalk.gray('  packages:') + ` ${pkgList.join(', ')}`);
    console.log('');
    console.log(chalk.cyan('  Run:') + chalk.gray(` cd ${projectName} && bun run build`));
    console.log('');
  });
