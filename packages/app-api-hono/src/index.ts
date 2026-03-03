/**
 * @workspace/app-api-hono — API app-type scaffolding (Hono) for the scaffold CLI.
 * Exports a factory to create the api-hono app type config.
 */

import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { createGeneratePhase, type AppTypeDepsOptions } from "@workspace/core-app-types";
import { getPackageMerge, API_HONO_APP_MKDIR_PATHS } from "./config.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const STUBS_DIR = join(__dirname, "..", "stubs");

export { getPackageMerge, API_HONO_APP_SCRIPTS, API_HONO_APP_MKDIR_PATHS } from "./config.js";

/**
 * Create the api-hono app type config.
 * Called by cli-scaffold app-types registry.
 */
export function createApiHonoAppType(opts: AppTypeDepsOptions) {
  const phase = createGeneratePhase({
    stubsDir: STUBS_DIR,
    getMerge: (ctx) => getPackageMerge(ctx as Parameters<typeof getPackageMerge>[0]),
    getDependencies: () => [...opts.deps],
    getMkdirPaths: () => [...API_HONO_APP_MKDIR_PATHS],
  });

  const apiHono = {
    id: "api-hono",
    description: "REST API (Hono)",
    dirPrefix: "api-hono",
    defaultAppName: "api",
    phases: [phase],
  };

  return { apiHono };
}
