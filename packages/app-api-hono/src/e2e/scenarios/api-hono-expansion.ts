/**
 * API Hono expansion scenario: project + add-crud-routes for users and posts,
 * then validate API endpoints return expected mock data.
 */

import { createApiExpansionScenario } from "@workspace/app-api/e2e";

export const scenario = createApiExpansionScenario({
  id: "api-hono-expansion",
  description: "API (Hono) with CRUD routes for users and posts, validate endpoints",
  apiType: "api-hono",
  projectName: "e2e-api-hono-expand",
  expansionCommand: "api-hono",
  entities: ["users", "posts"],
});
