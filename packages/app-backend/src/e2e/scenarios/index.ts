/**
 * Backend app-type E2E scenarios.
 * Exported for distributed scenario registry loading.
 */

import type { Scenario } from "@workspace/core-e2e";
import { scenario as backendOnlyScenario } from "./backend-only.js";

export { scenario as backendOnlyScenario } from "./backend-only.js";

/** All backend scenarios for registry discovery */
export const scenarios: readonly Scenario[] = [backendOnlyScenario];
