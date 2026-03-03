/**
 * Default generate-phase options for API apps.
 * Framework-specific packages (api-elysia, api-hono, api-fastify) spread these
 * and override only what differs.
 */

import type { GeneratePhaseInput } from "@workspace/core-app-types";
import { composeProfiles, getDevDependencies, profileBase, profileBunTypes } from "@workspace/scaffold-deps";
import { TSCONFIG_STUB_PATH } from "./stubs.js";

const API_DEV_DEPS = getDevDependencies(composeProfiles(profileBase, profileBunTypes));

/**
 * Default generate-phase options for API apps (Bun runtime, tsconfig stub, dev deps).
 * Spread into createGeneratePhase and override as needed.
 *
 * @example
 * const phase = createGeneratePhase({
 *   ...getApiGeneratePhaseOptions(),
 *   stubsDir: STUBS_DIR,
 *   getMerge: (ctx) => getPackageMerge(ctx),
 *   getDependencies: () => [...opts.deps],
 *   getMkdirPaths: () => BACKEND_APP_MKDIR_PATHS,
 * });
 */
export function getApiGeneratePhaseOptions(): Pick<
  GeneratePhaseInput,
  "getDevDependencies" | "tsconfigExtends" | "tsconfigStubPath"
> {
  return {
    getDevDependencies: () => API_DEV_DEPS,
    tsconfigExtends: "@workspace/typescript-config/bun.json",
    tsconfigStubPath: TSCONFIG_STUB_PATH,
  };
}
