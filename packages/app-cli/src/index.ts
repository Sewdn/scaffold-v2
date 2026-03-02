/**
 * @workspace/app-cli — CLI app-type scaffolding for the scaffold CLI.
 * Exports a factory to create the app type config, expansion command, and scaffold defaults.
 */

import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { cliCommand } from "./expansion/index.js";
import { scaffoldCliExampleDefaults } from "./scaffold-defaults.js";
import { createGeneratePhase, type AppTypeDepsOptions } from "@workspace/core-app-types";
import { getPackageMerge, CLI_APP_MKDIR_PATHS, CLI_APP_UI_DEPENDENCIES } from "./config.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const STUBS_DIR = join(__dirname, "..", "stubs");

export type { ScaffoldCliDefaultsOptions } from "./scaffold-defaults.js";
export { scaffoldCliExampleDefaults } from "./scaffold-defaults.js";
export { cliCommand, getCliExpansionCommands } from "./expansion/index.js";
export {
  CLI_APP_SCRIPTS,
  CLI_APP_UI_DEPENDENCIES,
  DEFAULT_COMMAND_NAME,
  DEFAULT_SERVICE_NAME,
  getPackageMerge,
} from "./config.js";
export { executeAddCommand } from "./expansion/add-command.js";
export { executeAddService } from "./expansion/add-service.js";

/**
 * Create the CLI app type config, expansion command, and scaffold defaults.
 * Called by cli-scaffold app-types registry.
 */
export function createCliAppType(opts: AppTypeDepsOptions) {
  const phase = createGeneratePhase({
    stubsDir: STUBS_DIR,
    getMerge: (ctx) => getPackageMerge(ctx as Parameters<typeof getPackageMerge>[0]),
    getDependencies: () => [...opts.deps, ...CLI_APP_UI_DEPENDENCIES],
    getMkdirPaths: () => [...CLI_APP_MKDIR_PATHS],
  });

  const cli = {
    id: "cli",
    description: "Command-line interface (Effect + Commander)",
    dirPrefix: "cli",
    defaultAppName: "tools",
    phases: [phase],
  };

  return {
    cli,
    cliCommand,
    scaffoldCliExampleDefaults,
  };
}
