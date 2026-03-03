/**
 * Shared stubs for API expansion — framework-agnostic handler and CRUD handler templates.
 * Used by app-api-elysia, app-api-fastify, app-api-hono.
 */

import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

/** Path to shared expansion stubs (handler.ts.stub, handlers-crud.ts.stub) */
export const SHARED_STUBS_DIR = join(__dirname, "..", "stubs");

/** Path to shared tsconfig stub for API apps. Override in framework-specific packages if needed. */
export const TSCONFIG_STUB_PATH = join(SHARED_STUBS_DIR, "tsconfig.json.stub");
