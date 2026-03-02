/**
 * Frontend-Next.js app-type E2E scenarios.
 * Exported for distributed scenario registry loading.
 */

import type { Scenario } from "@workspace/core-e2e";
import { scenario as frontendNextjsScenario } from "./frontend-nextjs.js";

export { scenario as frontendNextjsScenario } from "./frontend-nextjs.js";

/** All frontend-nextjs scenarios for registry discovery */
export const scenarios: readonly Scenario[] = [frontendNextjsScenario];
