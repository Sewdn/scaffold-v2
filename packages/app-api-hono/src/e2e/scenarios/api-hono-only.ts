/**
 * API Hono-only scenario: project with Hono API app.
 */

import { pathExists, hasScript, buildSucceeds } from "@workspace/core-e2e";
import type { Scenario } from "@workspace/core-e2e";

export const scenario: Scenario = {
  id: "api-hono-only",
  description: "Project with API (Hono) app only",
  steps: [
    {
      command: "project",
      args: ["e2e-api-hono", "--apps", "api-hono", "--app-names", "api", "--non-interactive"],
    },
  ],
  validators: [
    pathExists("package.json"),
    pathExists("apps/api-hono-api"),
    pathExists("apps/api-hono-api/package.json"),
    hasScript("build"),
    buildSucceeds(),
  ],
};
