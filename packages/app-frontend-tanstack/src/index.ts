/**
 * @workspace/app-frontend-tanstack — TanStack Start app-type scaffolding for the scaffold CLI.
 * Exports a factory to create the frontend-tanstack app type config.
 * Scripts phase only (no stubs) — uses bunx @tanstack/cli and patchScriptPath.
 */

import { getScriptSteps } from './config.js';

/**
 * Create the frontend-tanstack app type config.
 * Called by cli-scaffold app-types registry.
 */
export function createFrontendTanstackAppType() {
  const frontendTanstack = {
    id: 'frontend-tanstack',
    description: 'TanStack Start (full-stack React)',
    dirPrefix: 'frontend',
    defaultAppName: 'web',
    isReactFrontend: true,
    phases: [
      {
        type: 'scripts' as const,
        getSteps: getScriptSteps,
      },
    ],
  };

  return { frontendTanstack };
}
