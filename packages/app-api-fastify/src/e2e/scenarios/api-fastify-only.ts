/**
 * API Fastify-only scenario: project with Fastify API app.
 */

import { pathExists, hasScript, buildSucceeds } from "@workspace/core-e2e";
import type { Scenario } from "@workspace/core-e2e";

export const scenario: Scenario = {
  id: "api-fastify-only",
  description: "Project with API (Fastify) app only",
  steps: [
    {
      command: "project",
      args: ["e2e-api-fastify", "--apps", "api-fastify", "--app-names", "api", "--non-interactive"],
    },
  ],
  validators: [
    pathExists("package.json"),
    pathExists("apps/api-fastify-api"),
    pathExists("apps/api-fastify-api/package.json"),
    hasScript("build"),
    buildSucceeds(),
  ],
};
