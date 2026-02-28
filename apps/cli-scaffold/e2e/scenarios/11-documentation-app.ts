/**
 * Documentation-app scenario: project with Starlight/Astro documentation app.
 */

import {
  pathExists,
  hasScript,
  buildSucceeds,
  lintSucceeds,
} from '../validators/index.js';
import type { Scenario } from '../types.js';

export const scenario: Scenario = {
  id: 'documentation-app',
  description: 'Project with Starlight/Astro documentation app',
  steps: [
    {
      command: 'project',
      args: [
        'e2e-docs',
        '--apps',
        'documentation',
        '--app-names',
        'docs',
        '--non-interactive',
      ],
    },
  ],
  validators: [
    pathExists('apps/docs-docs'),
    pathExists('apps/docs-docs/package.json'),
    hasScript('build'),
    buildSucceeds(),
    lintSucceeds(),
  ],
};
