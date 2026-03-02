/**
 * Init with optional packages: domain and svc-config.
 */

import { pathExists, hasScript, buildSucceeds, lintSucceeds } from "../validators/index.js";
import type { Scenario } from "../types.js";

export const scenario: Scenario = {
  id: "init-with-optional-packages",
  description: "Init with domain and svc-config optional packages",
  steps: [
    {
      command: "init",
      args: ["e2e-opt", "--packages", "domain,svc-config", "--non-interactive"],
    },
  ],
  validators: [
    pathExists("packages/domain"),
    pathExists("packages/svc-config"),
    pathExists("packages/domain/package.json"),
    pathExists("packages/svc-config/package.json"),
    hasScript("build"),
    buildSucceeds(),
    lintSucceeds(),
  ],
};
