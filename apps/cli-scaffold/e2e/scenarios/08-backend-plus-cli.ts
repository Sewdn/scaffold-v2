/**
 * Backend + CLI scenario: project with Elysia backend and CLI apps.
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
  id: 'backend-plus-cli',
  description: 'Project with backend and CLI apps',
  steps: [
    {
      command: 'project',
      args: [
        'e2e-bc',
        '--apps',
        'backend,cli',
        '--app-names',
        'api,tools',
        '--non-interactive',
      ],
    },
  ],
  validators: [
    pathExists('apps/backend-api'),
    pathExists('apps/cli-tools'),
    pathExists('apps/backend-api/package.json'),
    pathExists('apps/cli-tools/package.json'),
    hasScript('build'),
    buildSucceeds(),
    lintSucceeds(),
    devStarts(5000),
  ],
};
