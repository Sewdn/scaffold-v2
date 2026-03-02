/**
 * Documentation app-type E2E scenarios.
 * Exported for distributed scenario registry loading.
 */

import type { Scenario } from '@workspace/core-e2e';
import { scenario as documentationAppScenario } from './documentation.js';

export { scenario as documentationAppScenario } from './documentation.js';

/** All documentation scenarios for registry discovery */
export const scenarios: readonly Scenario[] = [documentationAppScenario];
