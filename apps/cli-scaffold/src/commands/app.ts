import { Command } from 'commander';
import { resolve } from 'path';
import { existsSync, readFileSync } from 'fs';
import { Effect } from 'effect';
import { outro } from '@clack/prompts';
import chalk from 'chalk';
import { runSteps } from '../orchestrator.js';
import { createAppEntryFiles } from '../init/create-app-files.js';
import { getAppInitSteps, SCRIPTS_DIR } from '../init/init-steps.js';
import { ensureUIPackagesExist, hasUIPackages } from '../init/optional-packages.js';
import { validateAppName } from '../utils/validation.js';
import { formatEntityName } from '../utils/entity-formatting.js';
import { APP_TYPES, APP_TYPE_PREFIX, type AppType } from '../registry.js';
import {
  getAppTypeConfig,
  isReactFrontend,
  hasGeneratePhase,
} from '../app-types/registry.js';
import { promptWithUI } from '../ui/ui-prompts.js';

export const appCommand = new Command('app')
  .description('Add an application to the project')
  .argument('[name]', 'App name')
  .option('-t, --type <type>', 'App type', APP_TYPES as unknown as string)
  .option('--with-ui', 'Include UI and UI-lib packages (React frontends only)')
  .option('--no-with-ui', 'Do not include UI packages')
  .option('--non-interactive', 'Run without prompts', false)
  .action(async (name: string | undefined, options: {
    type?: string;
    withUi?: boolean;
    nonInteractive?: boolean;
  }) => {
    let appName = name;
    let appType = options.type as AppType | undefined;

    if (!appType) {
      console.error('Error: App type is required. Use --type with one of:', APP_TYPES.join(', '));
      process.exit(1);
    }

    if (!APP_TYPES.includes(appType as AppType)) {
      console.error('Error: Invalid app type. Must be one of:', APP_TYPES.join(', '));
      process.exit(1);
    }

    if (!appName) {
      console.error('Error: App name is required.');
      process.exit(1);
    }

    appName = formatEntityName(validateAppName(appName), 'app');
    const prefix = APP_TYPE_PREFIX[appType as AppType];
    const dirName = `${prefix}-${appName}`;
    const appDir = `apps/${dirName}`;

    const projectDir = process.cwd();
    const rootPkgPath = resolve(projectDir, 'package.json');
    if (!existsSync(rootPkgPath)) {
      console.error('Error: Not in a project root. Run scaffold init first.');
      process.exit(1);
    }

    let projectName = 'workspace';
    try {
      const pkg = JSON.parse(readFileSync(rootPkgPath, 'utf-8')) as { name?: string };
      const name = pkg?.name;
      if (name && name.startsWith('@') && name.endsWith('/root')) {
        projectName = name.slice(1, -5);
      }
    } catch {
      // ignore
    }

    const patchScriptPath = `${SCRIPTS_DIR}/patch-package-json.mjs`;
    const runContext = {
      projectName,
      projectDir,
      appName: dirName,
      appType,
      appDir,
      patchScriptPath,
    };

    const config = getAppTypeConfig(appType);
    if (!config) {
      console.error('Error: Unknown app type:', appType);
      process.exit(1);
    }

    const reactFrontend = isReactFrontend(appType);
    const uiExists = hasUIPackages(projectDir);
    let addUIPackages = options.withUi === true || uiExists;
    if (reactFrontend && addUIPackages === false && !options.nonInteractive && options.withUi !== false) {
      addUIPackages = await promptWithUI();
    }

    console.log(`\nAdding ${appType} app "${appName}" at ${appDir}\n`);

    if (reactFrontend && addUIPackages && !uiExists) {
      console.log('  Creating UI and UI-lib packages...\n');
      await ensureUIPackagesExist(projectDir, projectName);
    }

    const appTypeContext = {
      projectName,
      appName: dirName,
      appDir,
      projectDir,
      appType,
      patchScriptPath,
    };

    for (const phase of config.phases) {
      if (phase.type === 'generate') {
        const steps = getAppInitSteps({
          appDir,
          appName: dirName,
          appType,
          projectName,
        });
        if (steps.length === 0) continue;
        try {
          await Effect.runPromise(
            runSteps(steps, {
              cwd: projectDir,
              context: runContext,
              verbose: true,
              allowInteractive: !options.nonInteractive,
            }),
          );
        } catch (err) {
          const msg =
            err && typeof err === 'object' && 'message' in err ? String((err as Error).message) : String(err);
          console.error('Error:', msg);
          process.exit(1);
        }
      } else {
        const steps = phase.getSteps(appTypeContext);
        if (steps.length === 0) continue;
        try {
          await Effect.runPromise(
            runSteps(steps, {
              cwd: projectDir,
              context: runContext,
              verbose: true,
              allowInteractive: !options.nonInteractive,
            }),
          );
        } catch (err) {
          const msg =
            err && typeof err === 'object' && 'message' in err ? String((err as Error).message) : String(err);
          console.error('Error:', msg);
          process.exit(1);
        }
      }
    }

    if (reactFrontend && addUIPackages) {
      try {
        await Effect.runPromise(
          runSteps(
            [
              {
                type: 'bun',
                command: 'add',
                args: [`@${projectName}/ui@workspace:*`, `@${projectName}/ui-lib@workspace:*`],
                cwd: appDir,
              },
            ],
            { cwd: projectDir, context: runContext, verbose: true },
          ),
        );
      } catch (err) {
        const msg =
          err && typeof err === 'object' && 'message' in err ? String((err as Error).message) : String(err);
        console.error('Error adding UI packages:', msg);
        process.exit(1);
      }
    }

    if (hasGeneratePhase(config)) {
      await createAppEntryFiles({
        projectName,
        appName: dirName,
        appType: appType as AppType,
        appDir: resolve(projectDir, appDir),
        projectRoot: projectDir,
      });
    }

    console.log('\nRunning bun install...\n');
    const installEffect = runSteps(
      [{ type: 'bun', command: 'install', cwd: '' }],
      { cwd: projectDir, verbose: true },
    );
    try {
      await Effect.runPromise(installEffect);
    } catch (err) {
      const msg =
        err && typeof err === 'object' && 'message' in err ? String((err as Error).message) : String(err);
      console.error('Error:', msg);
      process.exit(1);
    }

    outro(chalk.green(`Created app in ${appDir}`));
    console.log(chalk.gray('  Package:') + ` @${projectName}/${dirName}`);
    console.log('');
  });
