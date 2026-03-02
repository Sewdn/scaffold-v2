/**
 * Documentation-app scenario: project with Starlight/Astro documentation app.
 * App dir is docs-docs when app name is docs.
 */

import {
  pathExists,
  hasScript,
  buildSucceeds,
  lintSucceeds,
} from '@workspace/core-e2e';
import type { Scenario } from '@workspace/core-e2e';

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
