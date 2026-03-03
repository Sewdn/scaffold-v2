/**
 * API Hono expansion — unified commands via app-api.
 */

import { createApiExpansionCommands } from "@workspace/app-api";
import { honoExpansionAdapter } from "./adapter.js";

const { apiCommand, getExpansionCommands } = createApiExpansionCommands(
  honoExpansionAdapter,
  "api-hono",
);

export const apiHonoCommand = apiCommand;
export const getApiHonoExpansionCommands = getExpansionCommands;
