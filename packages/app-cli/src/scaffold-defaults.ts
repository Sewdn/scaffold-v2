/**
 * Scaffold default example command and service when creating a new CLI app.
 * Used by project and app commands; skippable via --no-example-command / --no-example-service.
 */

import { executeAddCommand } from "./expansion/add-command.js";
import { executeAddService } from "./expansion/add-service.js";
import {
  DEFAULT_COMMAND_NAME,
  DEFAULT_COMMAND_DESCRIPTION,
  DEFAULT_SERVICE_NAME,
} from "./config.js";

export interface ScaffoldCliDefaultsOptions {
  skipCommand?: boolean;
  skipService?: boolean;
}

/**
 * Add the default example command and/or service to a newly scaffolded CLI app.
 * Call after createAppEntryFiles when scaffolding a CLI app.
 */
export async function scaffoldCliExampleDefaults(
  projectDir: string,
  appName: string,
  options: ScaffoldCliDefaultsOptions = {},
): Promise<void> {
  if (!options.skipCommand) {
    await executeAddCommand(projectDir, appName, DEFAULT_COMMAND_NAME, DEFAULT_COMMAND_DESCRIPTION);
  }
  if (!options.skipService) {
    await executeAddService(projectDir, appName, DEFAULT_SERVICE_NAME);
  }
}
