/**
 * Frontend-Next.js scenario: project with Next.js frontend app.
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
  id: 'frontend-nextjs',
  description: 'Project with Next.js frontend app',
  timeoutMs: 180_000,
  steps: [
    {
      command: 'project',
      args: [
        'e2e-nextjs',
        '--apps',
        'frontend-nextjs',
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
    devStarts(5000, 'apps/frontend-web'),
  ],
};
