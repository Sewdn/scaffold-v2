/**
 * Service package scenario: init then add service package.
 */

import { pathExists, hasScript, buildSucceeds } from "../validators/index.js";
import type { Scenario } from "../types.js";

export const scenario: Scenario = {
  id: "service-package",
  description: "Init then add service package",
  steps: [
    {
      command: "init",
      args: ["e2e-svc", "--non-interactive"],
    },
    {
      command: "service",
      args: ["auth"],
    },
  ],
  validators: [
    pathExists("packages/svc-auth"),
    pathExists("packages/svc-auth/package.json"),
    hasScript("build"),
    buildSucceeds(),
  ],
};
