/**
 * Frontend-tanstack app-type E2E scenarios.
 * Exported for distributed scenario registry loading.
 */

import type { Scenario } from '@workspace/core-e2e';
import { scenario as frontendTanstackScenario } from './frontend-tanstack.js';

export { scenario as frontendTanstackScenario } from './frontend-tanstack.js';

/** All frontend-tanstack scenarios for registry discovery */
export const scenarios: readonly Scenario[] = [frontendTanstackScenario];
