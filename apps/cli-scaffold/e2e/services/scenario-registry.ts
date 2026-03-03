/**
 * ScenarioRegistry service. Provides scenario loading and registration.
 * Supports distributed app-type scenarios (each app-type exports its own scenarios).
 */

import { Context, Effect, Layer } from "effect";
import type { Scenario } from "../types.js";

export interface ScenarioRegistry {
  readonly getAll: () => Effect.Effect<readonly Scenario[]>;
  readonly loadAll: () => Effect.Effect<void>;
}

export const ScenarioRegistry = Context.GenericTag<ScenarioRegistry>("ScenarioRegistry");

/** Core scenario loaders (single scenario per module) */
const CORE_SCENARIO_LOADERS = [
  () => import("../scenarios/01-minimal-project.js"),
  () => import("../scenarios/03-init-with-optional-packages.js"),
  () => import("../scenarios/04-service-package.js"),
  () => import("../scenarios/05-ui-package.js"),
  () => import("../scenarios/06-module-creation.js"),
  () => import("../scenarios/07-component-in-ui-lib.js"),
  () => import("../scenarios/09-backend-plus-mcp.js"),
  () => import("../scenarios/12-full-packages-stack.js"),
  () => import("../scenarios/13-incremental-full-stack.js"),
  () => import("../scenarios/14-package-generic.js"),
];

/** App-type scenario modules (export scenarios array) - add when extracting app-types to packages */
const APP_TYPE_SCENARIO_LOADERS: Array<() => Promise<{ scenarios?: readonly Scenario[] }>> = [
  () => import("@workspace/app-cli/e2e/scenarios"),
  () => import("@workspace/app-api-elysia/e2e/scenarios"),
  () => import("@workspace/app-api-hono/e2e/scenarios"),
  () => import("@workspace/app-api-fastify/e2e/scenarios"),
  () => import("@workspace/app-documentation/e2e/scenarios"),
  () => import("@workspace/app-mcp-server/e2e/scenarios"),
  () => import("@workspace/app-frontend-nextjs/e2e/scenarios"),
  () => import("@workspace/app-frontend-vite/e2e/scenarios"),
  () => import("@workspace/app-frontend-tanstack/e2e/scenarios"),
  () => import("@workspace/app-slide-deck/e2e/scenarios"),
];

function collectScenarios(m: unknown): Scenario[] {
  const mod = m as { scenario?: Scenario; scenarios?: readonly Scenario[] };
  if (mod.scenarios && Array.isArray(mod.scenarios)) {
    return [...mod.scenarios];
  }
  if (mod.scenario) {
    return [mod.scenario];
  }
  return [];
}

const createScenarioRegistry = (): ScenarioRegistry => {
  let scenarios: Scenario[] = [];

  return {
    getAll: () => Effect.sync(() => [...scenarios]),
    loadAll: () =>
      Effect.promise(async () => {
        const loaded: Scenario[] = [];
        for (const loader of CORE_SCENARIO_LOADERS) {
          const m = await loader();
          loaded.push(...collectScenarios(m));
        }
        for (const loader of APP_TYPE_SCENARIO_LOADERS) {
          const m = await loader();
          loaded.push(...collectScenarios(m));
        }
        scenarios = loaded;
      }),
  };
};

export const ScenarioRegistryLive = Layer.sync(ScenarioRegistry, createScenarioRegistry);
