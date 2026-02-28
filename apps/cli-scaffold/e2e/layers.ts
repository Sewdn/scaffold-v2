/**
 * Effect layers for E2E test services.
 */

import { Layer } from 'effect';
import { E2EConfigLive } from './services/config.js';
import { FileSystemLive } from './services/filesystem.js';
import { ScaffoldRunnerLive } from './services/scaffold-runner.js';
import { ValidatorExecutorLive } from './services/validator-executor.js';
import { ScenarioRegistryLive } from './services/scenario-registry.js';

/** All E2E services. FileSystem and ScaffoldRunner depend on E2EConfig. */
export const E2ELiveLayer = Layer.mergeAll(
  E2EConfigLive,
  Layer.provideMerge(FileSystemLive, E2EConfigLive),
  Layer.provideMerge(ScaffoldRunnerLive, E2EConfigLive),
  ValidatorExecutorLive,
  ScenarioRegistryLive,
);
