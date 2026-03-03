/**
 * API Fastify app-type E2E scenarios.
 * Exported for distributed scenario registry loading.
 */

import type { Scenario } from "@workspace/core-e2e";
import { scenario as apiFastifyOnlyScenario } from "./api-fastify-only.js";
import { scenario as apiFastifyExpansionScenario } from "./api-fastify-expansion.js";

export { scenario as apiFastifyOnlyScenario } from "./api-fastify-only.js";
export { scenario as apiFastifyExpansionScenario } from "./api-fastify-expansion.js";

/** All api-fastify scenarios for registry discovery */
export const scenarios: readonly Scenario[] = [
  apiFastifyOnlyScenario,
  apiFastifyExpansionScenario,
];
