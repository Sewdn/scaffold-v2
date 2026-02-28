/**
 * Package-generic scenario: init then add generic package with type service.
 * Service type creates svc- prefix → packages/svc-utils.
 */

import {
  pathExists,
  hasScript,
  buildSucceeds,
  lintSucceeds,
} from '../validators/index.js';
import type { Scenario } from '../types.js';

export const scenario: Scenario = {
  id: 'package-generic',
  description: 'Init then add generic package with type service',
  steps: [
    {
      command: 'init',
      args: ['e2e-pkg', '--non-interactive'],
    },
    {
      command: 'package',
      args: ['utils', '--type', 'service'],
    },
  ],
  validators: [
    pathExists('packages/svc-utils'),
    pathExists('packages/svc-utils/package.json'),
    hasScript('build'),
    buildSucceeds(),
    lintSucceeds(),
  ],
};
