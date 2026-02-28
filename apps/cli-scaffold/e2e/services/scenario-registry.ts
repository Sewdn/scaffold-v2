/**
 * ScenarioRegistry service. Provides scenario loading and registration.
 */

import { Context, Effect, Layer } from 'effect';
import type { Scenario } from '../types.js';

export interface ScenarioRegistry {
  readonly getAll: () => Effect.Effect<readonly Scenario[]>;
  readonly loadAll: () => Effect.Effect<void>;
}

export const ScenarioRegistry = Context.GenericTag<ScenarioRegistry>('ScenarioRegistry');

/** Scenario module loaders - add imports here when creating new scenarios */
const SCENARIO_LOADERS = [
  () => import('../scenarios/minimal-project.js'),
  () => import('../scenarios/backend-only.js'),
  () => import('../scenarios/init-with-optional-packages.js'),
  () => import('../scenarios/service-package.js'),
  () => import('../scenarios/ui-package.js'),
];

const createScenarioRegistry = (): ScenarioRegistry => {
  let scenarios: Scenario[] = [];

  return {
    getAll: () => Effect.sync(() => [...scenarios]),
    loadAll: () =>
      Effect.promise(async () => {
        const loaded: Scenario[] = [];
        for (const loader of SCENARIO_LOADERS) {
          const m = await loader();
          const s = (m as { scenario?: Scenario }).scenario;
          if (s) loaded.push(s);
        }
        scenarios = loaded;
      }),
  };
};

export const ScenarioRegistryLive = Layer.sync(ScenarioRegistry, createScenarioRegistry);
