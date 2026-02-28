/**
 * Frontend-vite scenario: project with Vite + React frontend app.
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
  id: 'frontend-vite',
  description: 'Project with Vite + React frontend app',
  steps: [
    {
      command: 'project',
      args: [
        'e2e-vite',
        '--apps',
        'frontend-vite',
        '--app-names',
        'web',
        '--non-interactive',
      ],
    },
  ],
  validators: [
    pathExists('apps/frontend-web'),
    pathExists('apps/frontend-web/package.json'),
    hasScript('build'),
    buildSucceeds(),
    lintSucceeds(),
    devStarts(5000),
  ],
};
