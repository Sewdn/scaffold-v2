/**
 * API Fastify expansion — unified commands via app-api.
 */

import { createApiExpansionCommands } from "@workspace/app-api";
import { fastifyExpansionAdapter } from "./adapter.js";

const { apiCommand, getExpansionCommands } = createApiExpansionCommands(
  fastifyExpansionAdapter,
  "api-fastify",
);

export const apiFastifyCommand = apiCommand;
export const getApiFastifyExpansionCommands = getExpansionCommands;
