/**
 * @workspace/app-cli — CLI app-type scaffolding for the scaffold CLI.
 * Exports a factory to create the app type config, expansion command, and scaffold defaults.
 */

import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { cliCommand } from './expansion/index.js';
import { scaffoldCliExampleDefaults } from './scaffold-defaults.js';
import {
  getPackageMerge,
  CLI_APP_MKDIR_PATHS,
  CLI_APP_UI_DEPENDENCIES,
} from './config.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const STUBS_DIR = join(__dirname, '..', 'stubs');

export type { ScaffoldCliDefaultsOptions } from './scaffold-defaults.js';
export { scaffoldCliExampleDefaults } from './scaffold-defaults.js';
export { cliCommand } from './expansion/index.js';
export {
  CLI_APP_SCRIPTS,
  CLI_APP_UI_DEPENDENCIES,
  DEFAULT_COMMAND_NAME,
  DEFAULT_SERVICE_NAME,
  getPackageMerge,
} from './config.js';
export { executeAddCommand } from './expansion/add-command.js';
export { executeAddService } from './expansion/add-service.js';

/** Options for createCliAppType factory */
export interface CreateCliAppTypeOptions {
  /** createGeneratePhase from app-types/defaults — accepts GeneratePhaseInput */
  createGeneratePhase: (input: {
    stubsDir: string;
    getMerge?: (ctx: unknown) => Record<string, unknown>;
    getDependencies: () => string[];
    getMkdirPaths?: () => string[];
  }) => {
    type: 'generate';
    stubsDir: string;
    getMerge: (ctx: unknown) => Record<string, unknown>;
    getDependencies: (ctx: unknown) => string[];
    getMkdirPaths: (ctx: unknown) => string[];
  };
  /** Dependency strings, e.g. [DEP_COMMANDER, DEP_EFFECT] */
  deps: readonly string[];
}

/**
 * Create the CLI app type config, expansion command, and scaffold defaults.
 * Called by cli-scaffold app-types registry.
 */
export function createCliAppType(opts: CreateCliAppTypeOptions) {
  const phase = opts.createGeneratePhase({
    stubsDir: STUBS_DIR,
    getMerge: (ctx) => getPackageMerge(ctx as Parameters<typeof getPackageMerge>[0]),
    getDependencies: () => [...opts.deps, ...CLI_APP_UI_DEPENDENCIES],
    getMkdirPaths: () => [...CLI_APP_MKDIR_PATHS],
  });

  const cli = {
    id: 'cli',
    description: 'Command-line interface (Effect + Commander)',
    phases: [phase],
  };

  return {
    cli,
    cliCommand,
    scaffoldCliExampleDefaults,
  };
}
