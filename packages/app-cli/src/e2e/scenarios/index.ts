/**
 * CLI app-type E2E scenarios.
 * Exported for distributed scenario registry loading.
 */

import type { Scenario } from '@workspace/core-e2e';
import { scenario as cliBasicScenario } from './cli-basic.js';
import { scenario as cliExpansionScenario } from './cli-expansion.js';

export { scenario as cliBasicScenario } from './cli-basic.js';
export { scenario as cliExpansionScenario } from './cli-expansion.js';

/** All CLI scenarios for registry discovery */
export const scenarios: readonly Scenario[] = [cliBasicScenario, cliExpansionScenario];
