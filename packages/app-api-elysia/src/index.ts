/**
 * @workspace/app-api-elysia — API app-type scaffolding (Elysia.js) for the scaffold CLI.
 * Exports a factory to create the api-elysia app type config.
 */

import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { createGeneratePhase, type AppTypeDepsOptions } from "@workspace/core-app-types";
import { getPackageMerge, BACKEND_APP_MKDIR_PATHS } from "./config.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const STUBS_DIR = join(__dirname, "..", "stubs");

export { getPackageMerge, BACKEND_APP_SCRIPTS, BACKEND_APP_MKDIR_PATHS } from "./config.js";

/**
 * Create the api-elysia app type config.
 * Called by cli-scaffold app-types registry.
 */
export function createApiElysiaAppType(opts: AppTypeDepsOptions) {
  const phase = createGeneratePhase({
    stubsDir: STUBS_DIR,
    getMerge: (ctx) => getPackageMerge(ctx as Parameters<typeof getPackageMerge>[0]),
    getDependencies: () => [...opts.deps],
    getMkdirPaths: () => [...BACKEND_APP_MKDIR_PATHS],
  });

  const apiElysia = {
    id: "api-elysia",
    description: "REST API (Elysia.js)",
    dirPrefix: "api-elysia",
    defaultAppName: "api",
    phases: [phase],
  };

  return { apiElysia };
}
