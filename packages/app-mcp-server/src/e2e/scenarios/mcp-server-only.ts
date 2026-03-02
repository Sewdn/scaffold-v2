/**
 * MCP-server-only scenario: project with MCP server app only.
 */

import {
  pathExists,
  hasScript,
  buildSucceeds,
} from '@workspace/core-e2e';
import type { Scenario } from '@workspace/core-e2e';

export const scenario: Scenario = {
  id: 'mcp-server-only',
  description: 'Project with MCP server app only',
  steps: [
    {
      command: 'project',
      args: [
        'e2e-mcp',
        '--apps',
        'mcp-server',
        '--app-names',
        'mcp',
        '--non-interactive',
      ],
    },
  ],
  validators: [
    pathExists('package.json'),
    pathExists('apps/mcp-mcp'),
    pathExists('apps/mcp-mcp/package.json'),
    hasScript('build'),
    buildSucceeds(),
  ],
};
