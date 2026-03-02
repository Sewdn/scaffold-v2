/**
 * Minimal project scenario: init with base structure only.
 */

import { pathExists, hasScript, buildSucceeds } from "../validators/index.js";
import type { Scenario } from "../types.js";

export const scenario: Scenario = {
  id: "minimal-project",
  description: "Initialize base monorepo (no apps, no optional packages)",
  steps: [
    {
      command: "init",
      args: ["e2e-minimal", "--non-interactive"],
    },
  ],
  validators: [
    pathExists("package.json"),
    pathExists("turbo.json"),
    pathExists("packages/typescript-config"),
    hasScript("build"),
    buildSucceeds(),
  ],
};
