/**
 * API Fastify expansion scenario: project + add-crud-routes for users and posts,
 * then validate API endpoints return expected mock data.
 */

import { createApiExpansionScenario } from "@workspace/app-api/e2e";

export const scenario = createApiExpansionScenario({
  id: "api-fastify-expansion",
  description: "API (Fastify) with CRUD routes for users and posts, validate endpoints",
  apiType: "api-fastify",
  projectName: "e2e-api-fastify-expand",
  expansionCommand: "api-fastify",
  entities: ["users", "posts"],
});
