export type { AppTypeConfig, AppTypeContext, AppTypePhase, GeneratePhase, ScriptsPhase } from './types.js';
export {
  getAppTypeConfig,
  getAllAppTypeIds,
  hasGeneratePhase,
  getStubsDir,
  isReactFrontend,
} from './registry.js';
export {
  createGeneratePhase,
  DEFAULT_APP_MERGE,
  DEFAULT_APP_MKDIR_PATHS,
} from './defaults.js';
