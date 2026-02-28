/**
 * Backend + MCP scenario: project with Elysia backend and MCP server apps.
 */

import {
  pathExists,
  hasScript,
  buildSucceeds,
  lintSucceeds,
  devStarts,
} from '../validators/index.js';
import type { Scenario } from '../types.js';

export const scenario: Scenario = {
  id: 'backend-plus-mcp',
  description: 'Project with backend and MCP server apps',
  steps: [
    {
      command: 'project',
      args: [
        'e2e-bm',
        '--apps',
        'backend,mcp-server',
        '--app-names',
        'api,mcp',
        '--non-interactive',
      ],
    },
  ],
  validators: [
    pathExists('apps/backend-api'),
    pathExists('apps/mcp-mcp'),
    pathExists('apps/backend-api/package.json'),
    pathExists('apps/mcp-mcp/package.json'),
    hasScript('build'),
    buildSucceeds(),
    lintSucceeds(),
    devStarts(5000),
  ],
};
