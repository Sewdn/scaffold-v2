/**
 * MCP server app-type E2E scenarios.
 * Exported for distributed scenario registry loading.
 */

import type { Scenario } from "@workspace/core-e2e";
import { scenario as mcpServerOnlyScenario } from "./mcp-server-only.js";

export { scenario as mcpServerOnlyScenario } from "./mcp-server-only.js";

/** All MCP server scenarios for registry discovery */
export const scenarios: readonly Scenario[] = [mcpServerOnlyScenario];
