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
  () => import('../scenarios/01-minimal-project.js'),
  () => import('../scenarios/02-backend-only.js'),
  () => import('../scenarios/03-init-with-optional-packages.js'),
  () => import('../scenarios/04-service-package.js'),
  () => import('../scenarios/05-ui-package.js'),
  () => import('../scenarios/06-module-creation.js'),
  () => import('../scenarios/07-component-in-ui-lib.js'),
  () => import('../scenarios/08-backend-plus-cli.js'),
  () => import('../scenarios/09-backend-plus-mcp.js'),
  () => import('../scenarios/10-slide-deck-app.js'),
  () => import('../scenarios/11-documentation-app.js'),
  () => import('../scenarios/12-full-packages-stack.js'),
  () => import('../scenarios/13-incremental-full-stack.js'),
  () => import('../scenarios/14-package-generic.js'),
  () => import('../scenarios/15-frontend-vite.js'),
  () => import('../scenarios/16-frontend-nextjs.js'),
  () => import('../scenarios/17-frontend-tanstack.js'),
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
