/**
 * API-specific E2E scenario factory and validators.
 */

export {
  createBaseApiScenario,
  createApiExpansionScenario,
  getApiAppDir,
  type ApiType,
  type ApiScaffoldCommand,
  type BaseApiScenarioOptions,
  type ApiExpansionScenarioOptions,
} from "./scenarios-api.js";
export { apiEndpointsReturnMockData, type ApiEndpointsValidatorOptions } from "./validators.js";
