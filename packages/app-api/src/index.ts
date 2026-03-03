/**
 * @workspace/app-api — Generic App API module; framework-specific implementations (Elysia, Fastify, Hono) adapt from this.
 *
 * All API app types (api-elysia, api-fastify, api-hono) expose the same CLI commands
 * and deliver the same artifacts. Only the implementation (framework-specific stubs
 * and index patching) differs.
 *
 * Unified expansion commands:
 * - add-crud-routes <name> — src/routes/<name>.ts, src/handlers/<name>.ts (GET / paged, GET /:id, POST /, PUT /:id, DELETE /:id)
 * - add-middleware <name> — src/middleware/<name>.ts
 * - add-plugin <name> — src/plugins/<name>.ts
 * - add-handler <name> — src/handlers/<name>.ts (no routes, wire manually)
 */

export type { ApiExpansionAdapter, ExpansionCommandMeta } from "./types.js";
export { createApiExpansionCommands } from "./create-commands.js";
export { getApiGeneratePhaseOptions } from "./generate-phase-options.js";
export {
  SCAFFOLD_MARKER_CRUD_ENTRIES,
  SCAFFOLD_MARKER_MIDDLEWARE,
  SCAFFOLD_MARKER_PLUGINS,
} from "./markers.js";
export { SHARED_STUBS_DIR, TSCONFIG_STUB_PATH } from "./stubs.js";
