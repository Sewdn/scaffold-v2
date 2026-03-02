/**
 * Backend-only scenario: project with Elysia backend app.
 */

import {
  pathExists,
  hasScript,
  buildSucceeds,
} from '@workspace/core-e2e';
import type { Scenario } from '@workspace/core-e2e';

export const scenario: Scenario = {
  id: 'backend-only',
  description: 'Project with backend (Elysia) app only',
  steps: [
    {
      command: 'project',
      args: [
        'e2e-backend',
        '--apps',
        'backend',
        '--app-names',
        'api',
        '--non-interactive',
      ],
    },
  ],
  validators: [
    pathExists('package.json'),
    pathExists('apps/backend-api'),
    pathExists('apps/backend-api/package.json'),
    hasScript('build'),
    buildSucceeds(),
  ],
};
