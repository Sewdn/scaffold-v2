import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import type { AppTypeConfig } from '../types.js';
import { createGeneratePhase } from '../defaults.js';
import { DEP_MCP_SDK, DEP_EFFECT } from '../../packages/dependencies.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

export const mcpServer: AppTypeConfig = {
  id: 'mcp-server',
  description: 'Model Context Protocol server',
  phases: [
    createGeneratePhase({
      stubsDir: join(__dirname, 'stubs'),
      getMerge: () => ({
        scripts: {
          build: 'tsc -b',
        },
      }),
      getDependencies: () => [DEP_MCP_SDK, DEP_EFFECT],
      getMkdirPaths: () => ['src', 'src/tools'],
    }),
  ],
};
