/**
 * @workspace/app-backend — Backend app-type scaffolding for the scaffold CLI.
 * Exports a factory to create the backend app type config.
 */

import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { createGeneratePhase, type AppTypeDepsOptions } from '@workspace/core-app-types';
import { getPackageMerge, BACKEND_APP_MKDIR_PATHS } from './config.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const STUBS_DIR = join(__dirname, '..', 'stubs');

export { getPackageMerge, BACKEND_APP_SCRIPTS, BACKEND_APP_MKDIR_PATHS } from './config.js';

/**
 * Create the backend app type config.
 * Called by cli-scaffold app-types registry.
 */
export function createBackendAppType(opts: AppTypeDepsOptions) {
  const phase = createGeneratePhase({
    stubsDir: STUBS_DIR,
    getMerge: (ctx) => getPackageMerge(ctx as Parameters<typeof getPackageMerge>[0]),
    getDependencies: () => [...opts.deps],
    getMkdirPaths: () => [...BACKEND_APP_MKDIR_PATHS],
  });

  const backend = {
    id: 'backend',
    description: 'Backend API (Elysia.js)',
    dirPrefix: 'backend',
    defaultAppName: 'api',
    phases: [phase],
  };

  return { backend };
}
