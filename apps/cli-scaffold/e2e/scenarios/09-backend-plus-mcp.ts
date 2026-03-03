/**
 * API Elysia + MCP scenario: project with Elysia API and MCP server apps.
 */

import {
  pathExists,
  hasScript,
  buildSucceeds,
  lintSucceeds,
  devStarts,
} from "../validators/index.js";
import type { Scenario } from "../types.js";

export const scenario: Scenario = {
  id: "api-elysia-plus-mcp",
  description: "Project with API (Elysia) and MCP server apps",
  steps: [
    {
      command: "project",
      args: [
        "e2e-bm",
        "--apps",
        "api-elysia,mcp-server",
        "--app-names",
        "api,mcp",
        "--non-interactive",
      ],
    },
  ],
  validators: [
    pathExists("apps/api-elysia-api"),
    pathExists("apps/mcp-mcp"),
    pathExists("apps/api-elysia-api/package.json"),
    pathExists("apps/mcp-mcp/package.json"),
    hasScript("build"),
    buildSucceeds(),
    lintSucceeds(),
    devStarts(5000),
  ],
};
