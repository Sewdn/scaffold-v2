/**
 * Slide deck app-type E2E scenarios.
 * Exported for distributed scenario registry loading.
 */

import type { Scenario } from '@workspace/core-e2e';
import { scenario as slideDeckAppScenario } from './slide-deck.js';

export { scenario as slideDeckAppScenario } from './slide-deck.js';

/** All slide deck scenarios for registry discovery */
export const scenarios: readonly Scenario[] = [slideDeckAppScenario];
