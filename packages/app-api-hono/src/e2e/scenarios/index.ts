/**
 * API Hono app-type E2E scenarios.
 * Exported for distributed scenario registry loading.
 */

import type { Scenario } from "@workspace/core-e2e";
import { scenario as apiHonoOnlyScenario } from "./api-hono-only.js";

export { scenario as apiHonoOnlyScenario } from "./api-hono-only.js";

/** All api-hono scenarios for registry discovery */
export const scenarios: readonly Scenario[] = [apiHonoOnlyScenario];
