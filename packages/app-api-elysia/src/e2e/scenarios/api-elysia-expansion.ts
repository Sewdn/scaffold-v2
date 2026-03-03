/**
 * API Elysia expansion scenario: project + add-crud-routes for users and posts,
 * then validate API endpoints return expected mock data.
 */

import { createApiExpansionScenario } from "@workspace/app-api/e2e";

export const scenario = createApiExpansionScenario({
  id: "api-elysia-expansion",
  description: "API (Elysia) with CRUD routes for users and posts, validate endpoints",
  apiType: "api-elysia",
  projectName: "e2e-api-elysia-expand",
  expansionCommand: "api-elysia",
  entities: ["users", "posts"],
});
