/**
 * @workspace/app-api-fastify — API app-type scaffolding (Fastify) for the scaffold CLI.
 * Exports a factory to create the api-fastify app type config and expansion commands.
 */

import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { createGeneratePhase, type AppTypeDepsOptions } from "@workspace/core-app-types";
import { getApiGeneratePhaseOptions } from "@workspace/app-api";
import { getPackageMerge, API_FASTIFY_APP_MKDIR_PATHS } from "./config.js";
import { apiFastifyCommand } from "./expansion/index.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const STUBS_DIR = join(__dirname, "..", "stubs");

export { getPackageMerge, API_FASTIFY_APP_SCRIPTS, API_FASTIFY_APP_MKDIR_PATHS } from "./config.js";
export { apiFastifyCommand, getApiFastifyExpansionCommands } from "./expansion/index.js";

/**
 * Create the api-fastify app type config.
 * Called by cli-scaffold app-types registry.
 */
export function createApiFastifyAppType(opts: AppTypeDepsOptions) {
  const phase = createGeneratePhase({
    ...getApiGeneratePhaseOptions(),
    stubsDir: STUBS_DIR,
    getMerge: (ctx) => getPackageMerge(ctx as Parameters<typeof getPackageMerge>[0]),
    getDependencies: () => [...opts.deps],
    getMkdirPaths: () => [...API_FASTIFY_APP_MKDIR_PATHS],
  });

  const apiFastify = {
    id: "api-fastify",
    description: "REST API (Fastify)",
    dirPrefix: "api-fastify",
    defaultAppName: "api",
    phases: [phase],
  };

  return { apiFastify };
}
