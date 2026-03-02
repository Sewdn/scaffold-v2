/**
 * @workspace/app-mcp-server — MCP server app-type scaffolding for the scaffold CLI.
 * Exports a factory to create the MCP server app type config.
 */

import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { createGeneratePhase, type AppTypeDepsOptions } from '@workspace/core-app-types';
import { getPackageMerge, MCP_APP_MKDIR_PATHS } from './config.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const STUBS_DIR = join(__dirname, '..', 'stubs');

export { getPackageMerge, MCP_APP_SCRIPTS, MCP_APP_MKDIR_PATHS } from './config.js';

/**
 * Create the MCP server app type config.
 * Called by cli-scaffold app-types registry.
 */
export function createMcpServerAppType(opts: AppTypeDepsOptions) {
  const phase = createGeneratePhase({
    stubsDir: STUBS_DIR,
    getMerge: (ctx) => getPackageMerge(ctx as Parameters<typeof getPackageMerge>[0]),
    getDependencies: () => [...opts.deps],
    getMkdirPaths: () => [...MCP_APP_MKDIR_PATHS],
  });

  const mcpServer = {
    id: 'mcp-server',
    description: 'Model Context Protocol server',
    dirPrefix: 'mcp',
    phases: [phase],
  };

  return { mcpServer };
}
