/**
 * Basic CLI scaffolding: project with CLI app using default example command and service.
 */

import {
  pathExists,
  hasScript,
  buildSucceeds,
  lintSucceeds,
  cliHelpShowsCommands,
} from "@workspace/core-e2e";
import type { Scenario } from "@workspace/core-e2e";

export const scenario: Scenario = {
  id: "cli-basic",
  description: "CLI app with default example command and service",
  steps: [
    {
      command: "project",
      args: ["e2e-cli-basic", "--apps", "cli", "--app-names", "tools", "--non-interactive"],
    },
  ],
  validators: [
    pathExists("apps/cli-tools"),
    pathExists("apps/cli-tools/src/commands/hello.ts"),
    pathExists("apps/cli-tools/src/services/example-service.ts"),
    pathExists("apps/cli-tools/src/commands/index.ts"),
    hasScript("build"),
    buildSucceeds(),
    lintSucceeds(),
    cliHelpShowsCommands("apps/cli-tools", ["hello"]),
  ],
};
