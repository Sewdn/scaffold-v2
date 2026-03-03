/**
 * API Elysia-only scenario: project with Elysia API app.
 */

import { pathExists, hasScript, buildSucceeds } from "@workspace/core-e2e";
import type { Scenario } from "@workspace/core-e2e";

export const scenario: Scenario = {
  id: "api-elysia-only",
  description: "Project with API (Elysia) app only",
  steps: [
    {
      command: "project",
      args: ["e2e-api-elysia", "--apps", "api-elysia", "--app-names", "api", "--non-interactive"],
    },
  ],
  validators: [
    pathExists("package.json"),
    pathExists("apps/api-elysia-api"),
    pathExists("apps/api-elysia-api/package.json"),
    hasScript("build"),
    buildSucceeds(),
  ],
};
