/**
 * API Elysia-only scenario: project with Elysia API app.
 */

import { createBaseApiScenario } from "@workspace/app-api/e2e";

export const scenario = createBaseApiScenario({
  id: "api-elysia-only",
  description: "Project with API (Elysia) app only",
  apiType: "api-elysia",
  projectName: "e2e-api-elysia",
});
