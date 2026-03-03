/**
 * Elysia API expansion adapter — implements ApiExpansionAdapter for app-api.
 */

import type { ApiExpansionAdapter } from "@workspace/app-api";
import { executeAddCrudRoutes } from "./add-crud-routes.js";
import { executeAddMiddleware } from "./add-middleware.js";
import { executeAddPlugin } from "./add-plugin.js";
import { executeAddHandler } from "./add-handler.js";

export const elysiaExpansionAdapter: ApiExpansionAdapter = {
  apiPrefix: "api-elysia",
  executeAddCrudRoutes,
  executeAddMiddleware,
  executeAddPlugin,
  executeAddHandler,
};
