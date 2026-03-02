/**
 * Frontend-vite app-type E2E scenarios.
 * Exported for distributed scenario registry loading.
 */

import type { Scenario } from '@workspace/core-e2e';
import { scenario as frontendViteScenario } from './frontend-vite.js';

export { scenario as frontendViteScenario } from './frontend-vite.js';

/** All frontend-vite scenarios for registry discovery */
export const scenarios: readonly Scenario[] = [frontendViteScenario];
