/**
 * Frontend-vite scenario: project with Vite + React frontend app.
 */

import { pathExists, hasScript, buildSucceeds, lintSucceeds, devStarts } from "@workspace/core-e2e";
import type { Scenario } from "@workspace/core-e2e";

export const scenario: Scenario = {
  id: "frontend-vite",
  description: "Project with Vite + React frontend app",
  steps: [
    {
      command: "project",
      args: ["e2e-vite", "--apps", "frontend-vite", "--app-names", "web", "--non-interactive"],
    },
  ],
  validators: [
    pathExists("apps/frontend-web"),
    pathExists("apps/frontend-web/package.json"),
    hasScript("build"),
    buildSucceeds(),
    lintSucceeds(),
    devStarts(5000),
  ],
};
