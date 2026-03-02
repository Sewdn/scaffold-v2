/**
 * @workspace/app-frontend-nextjs — Next.js frontend app-type scaffolding.
 * Scripts phase only (bun create next-app); no stubs.
 */

import { getScriptSteps } from './config.js';

/** Options for createFrontendNextjsAppType factory (reserved for future use) */
export interface CreateFrontendNextjsAppTypeOptions {
  // No options required for scripts-only phase
}

/**
 * Create the frontend-nextjs app type config.
 * Called by cli-scaffold app-types registry.
 */
export function createFrontendNextjsAppType(_opts?: CreateFrontendNextjsAppTypeOptions) {
  const frontendNextjs = {
    id: 'frontend-nextjs',
    description: 'Next.js frontend application',
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

  return { frontendNextjs };
}
