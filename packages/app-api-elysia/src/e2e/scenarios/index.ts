/**
 * API Elysia app-type E2E scenarios.
 * Exported for distributed scenario registry loading.
 */

import type { Scenario } from "@workspace/core-e2e";
import { scenario as apiElysiaOnlyScenario } from "./backend-only.js";
import { scenario as apiElysiaExpansionScenario } from "./api-elysia-expansion.js";

export { scenario as apiElysiaOnlyScenario } from "./backend-only.js";
export { scenario as apiElysiaExpansionScenario } from "./api-elysia-expansion.js";

/** All api-elysia scenarios for registry discovery */
export const scenarios: readonly Scenario[] = [
  apiElysiaOnlyScenario,
  apiElysiaExpansionScenario,
];
