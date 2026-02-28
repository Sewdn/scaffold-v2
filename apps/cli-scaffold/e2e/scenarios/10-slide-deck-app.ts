/**
 * Slide deck scenario: project with Reveal.js slide deck app.
 */

import {
  pathExists,
  hasScript,
  buildSucceeds,
  lintSucceeds,
} from '../validators/index.js';
import type { Scenario } from '../types.js';

export const scenario: Scenario = {
  id: 'slide-deck-app',
  description: 'Project with Reveal.js slide deck app',
  steps: [
    {
      command: 'project',
      args: [
        'e2e-slides',
        '--apps',
        'slide-deck',
        '--app-names',
        'slides',
        '--non-interactive',
      ],
    },
  ],
  validators: [
    pathExists('apps/slides-slides'),
    pathExists('apps/slides-slides/package.json'),
    hasScript('build'),
    buildSucceeds(),
    lintSucceeds(),
  ],
};
