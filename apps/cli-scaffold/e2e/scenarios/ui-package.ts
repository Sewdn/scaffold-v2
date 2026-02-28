/**
 * UI package scenario: init then add UI package.
 */

import { pathExists, hasScript, buildSucceeds } from '../validators/index.js';
import type { Scenario } from '../types.js';

export const scenario: Scenario = {
  id: 'ui-package',
  description: 'Init then add UI package',
  steps: [
    {
      command: 'init',
      args: ['e2e-ui', '--non-interactive'],
    },
    {
      command: 'ui',
      args: ['shared'],
    },
  ],
  validators: [
    pathExists('packages/ui-shared'),
    pathExists('packages/ui-shared/package.json'),
    hasScript('build'),
    buildSucceeds(),
  ],
};
