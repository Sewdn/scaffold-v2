/**
 * API Fastify-only scenario: project with Fastify API app.
 */

import { createBaseApiScenario } from "@workspace/app-api/e2e";

export const scenario = createBaseApiScenario({
  id: "api-fastify-only",
  description: "Project with API (Fastify) app only",
  apiType: "api-fastify",
  projectName: "e2e-api-fastify",
});
