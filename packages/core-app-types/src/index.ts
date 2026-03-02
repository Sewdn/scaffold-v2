export type {
  AppTypeConfig,
  AppTypeContext,
  AppTypeDepsOptions,
  AppTypePhase,
  CommandStep,
  CommandStepType,
  GeneratePhase,
  ScriptsPhase,
} from './types.js';
export {
  DEFAULT_APP_MERGE,
  DEFAULT_APP_MKDIR_PATHS,
} from './defaults.js';
export { deepMerge } from './deep-merge.js';
export {
  createGeneratePhase,
  type GeneratePhaseInput,
} from './create-generate-phase.js';
