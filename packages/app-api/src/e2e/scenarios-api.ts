/**
 * API-specific E2E scenario factory.
 * Use createBaseApiScenario and createApiExpansionScenario to build scenarios
 * that inherit common steps and validators.
 *
 * API scaffold commands are prefixed with "api-": api-elysia, api-hono, api-fastify.
 * Each extends the base scaffold CLI with expansion subcommands (add-crud-routes, etc.).
 */

import {
  pathExists,
  hasScript,
  buildSucceeds,
  testsSucceeds,
} from "@workspace/core-e2e";
import { apiEndpointsReturnMockData, type ApiEndpointsValidatorOptions } from "./validators.js";
import type { Scenario, ScaffoldStep, Validator } from "@workspace/core-e2e";

/** API scaffold commands: prefixed with api-<framework> for expansion (add-crud-routes, etc.). */
export type ApiScaffoldCommand = "api-elysia" | "api-hono" | "api-fastify";

/** API type: api-elysia | api-hono | api-fastify */
export type ApiType = ApiScaffoldCommand;

/** Options for creating a base API-only scenario. */
export interface BaseApiScenarioOptions {
  /** Scenario id (e.g. "api-elysia-only") */
  id: string;
  /** Scenario description */
  description: string;
  /** API type (determines --apps and app dir prefix) */
  apiType: ApiType;
  /** Project name for the scaffold step */
  projectName: string;
  /** App name (default "api") */
  appName?: string;
}

/** Get app directory for an API type and app name. API-specific. */
export function getApiAppDir(apiType: ApiType, appName: string): string {
  const prefix =
    apiType === "api-elysia" ? "api-elysia" : apiType === "api-hono" ? "api-hono" : "api-fastify";
  return `apps/${prefix}-${appName}`;
}

/** Create the base API scenario: project with single API app, no expansion. */
export function createBaseApiScenario(opts: BaseApiScenarioOptions): Scenario {
  const { id, description, apiType, projectName, appName = "api" } = opts;
  const appDir = getApiAppDir(apiType, appName);

  const steps: ScaffoldStep[] = [
    {
      command: "project",
      args: [projectName, "--apps", apiType, "--app-names", appName, "--non-interactive"],
    },
  ];

  const validators: Validator[] = [
    pathExists("package.json"),
    pathExists("turbo.json"),
    pathExists("apps"),
    pathExists(appDir),
    pathExists(`${appDir}/package.json`),
    pathExists(`${appDir}/src/index.ts`),
    hasScript("build"),
    hasScript("test"),
    buildSucceeds(),
    testsSucceeds(),
  ];

  return { id, description, steps, validators };
}

/** Options for creating an API expansion scenario (add-crud-routes, validate endpoints). */
export interface ApiExpansionScenarioOptions extends BaseApiScenarioOptions {
  /** Entity names for add-crud-routes (e.g. ["users", "posts"]) */
  entities: readonly string[];
  /** API command for expansion (api-elysia | api-hono | api-fastify) */
  expansionCommand: ApiType;
}

/** Create an API scenario with expansion steps and endpoint validation. */
export function createApiExpansionScenario(opts: ApiExpansionScenarioOptions): Scenario {
  const base = createBaseApiScenario(opts);
  const { entities, expansionCommand, appName = "api" } = opts;
  const appDir = getApiAppDir(expansionCommand, appName);

  const projectStep = base.steps[0];
  if (!projectStep || projectStep.command !== "project") {
    throw new Error("Base scenario first step must be project");
  }

  const expansionSteps: ScaffoldStep[] = entities.map((entity) => ({
    command: expansionCommand,
    args: ["add-crud-routes", entity],
  }));

  const apiOpts: ApiEndpointsValidatorOptions = {
    appSubdir: appDir,
    port: 34567,
    entityPaths: entities,
    startupMs: 4000,
  };

  const expansionValidators: Validator[] = [
    ...entities.flatMap((entity) => {
      const routeName = entity;
      return [
        pathExists(`${appDir}/src/routes/${routeName}.ts`),
        pathExists(`${appDir}/src/handlers/${routeName}.ts`),
      ];
    }),
    apiEndpointsReturnMockData(apiOpts),
  ];

  return {
    ...base,
    steps: [projectStep, ...expansionSteps],
    validators: [...base.validators, ...expansionValidators],
  };
}
