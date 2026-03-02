/**
 * Frontend-tanstack scenario: project with TanStack Start frontend app.
 * Requires @tanstack/cli (runs via bunx during scaffold).
 */

import {
  pathExists,
  hasScript,
  buildSucceeds,
  lintSucceeds,
} from '@workspace/core-e2e';
import type { Scenario } from '@workspace/core-e2e';

export const scenario: Scenario = {
  id: 'frontend-tanstack',
  description: 'Project with TanStack Start frontend app',
  timeoutMs: 150_000,
  steps: [
    {
      command: 'project',
      args: [
        'e2e-tanstack',
        '--apps',
        'frontend-tanstack',
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
  ],
};
