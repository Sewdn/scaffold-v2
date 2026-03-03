/**
 * API Hono-only scenario: project with Hono API app.
 */

import { createBaseApiScenario } from "@workspace/app-api/e2e";

export const scenario = createBaseApiScenario({
  id: "api-hono-only",
  description: "Project with API (Hono) app only",
  apiType: "api-hono",
  projectName: "e2e-api-hono",
});
