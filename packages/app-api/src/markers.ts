/**
 * Scaffold insertion markers for API app index files.
 * Framework-agnostic; used by api-elysia, api-hono, api-fastify expansion commands.
 *
 * Format: // @scaffold-api:<slot> — short, unique, unlikely to appear in user code.
 * Do not change these; they must match stubs and expansion logic.
 */
export const SCAFFOLD_MARKER_PLUGINS = "// @scaffold-api:plugins";
export const SCAFFOLD_MARKER_MIDDLEWARE = "// @scaffold-api:middleware";
/** Marker in routes/registry.ts for inserting new CRUD route entries. */
export const SCAFFOLD_MARKER_CRUD_ENTRIES = "// @scaffold-api:crud-entries";
