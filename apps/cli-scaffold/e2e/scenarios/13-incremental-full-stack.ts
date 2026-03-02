/**
 * Incremental full-stack scenario: init, add backend app, service package, module in sequence.
 */

import {
  pathExists,
  hasScript,
  buildSucceeds,
  lintSucceeds,
  devStarts,
} from "../validators/index.js";
import type { Scenario } from "../types.js";

export const scenario: Scenario = {
  id: "incremental-full-stack",
  description: "Init, add backend app, service package, module in sequence",
  timeoutMs: 150_000,
  steps: [
    {
      command: "init",
      args: ["e2e-incr", "--non-interactive"],
    },
    {
      command: "app",
      args: ["api", "--type", "backend", "--non-interactive"],
    },
    {
      command: "service",
      args: ["auth"],
    },
    {
      command: "module",
      args: ["users"],
    },
  ],
  validators: [
    pathExists("apps/backend-api"),
    pathExists("packages/svc-auth"),
    pathExists("packages/svc-users"),
    pathExists("packages/ui-users"),
    hasScript("build"),
    buildSucceeds(),
    lintSucceeds(),
    devStarts(5000),
  ],
};
