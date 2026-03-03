/**
 * API Elysia expansion — unified commands via app-api.
 */

import { createApiExpansionCommands } from "@workspace/app-api";
import { elysiaExpansionAdapter } from "./adapter.js";

const { apiCommand, getExpansionCommands } = createApiExpansionCommands(
  elysiaExpansionAdapter,
  "api-elysia",
);

export const apiElysiaCommand = apiCommand;
export const getApiElysiaExpansionCommands = getExpansionCommands;
