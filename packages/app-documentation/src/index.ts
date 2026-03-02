/**
 * @workspace/app-documentation — Documentation (Starlight/Astro) app-type scaffolding.
 * Scripts phase only (no stubs). Exports a factory to create the documentation app type config.
 */

import { getScriptSteps } from './config.js';

/**
 * Create the documentation app type config.
 * Called by cli-scaffold app-types registry.
 */
export function createDocumentationAppType() {
  const documentation = {
    id: 'documentation',
    description: 'Starlight/Astro documentation',
    dirPrefix: 'docs',
    defaultAppName: 'docs',
    phases: [
      {
        type: 'scripts',
        getSteps: () => getScriptSteps(),
      },
    ],
  };

  return { documentation };
}
