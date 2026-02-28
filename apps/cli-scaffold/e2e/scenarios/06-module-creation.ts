/**
 * Module creation scenario: init then add module (service + UI packages).
 */

import {
  pathExists,
  hasScript,
  buildSucceeds,
  lintSucceeds,
} from '../validators/index.js';
import type { Scenario } from '../types.js';

export const scenario: Scenario = {
  id: 'module-creation',
  description: 'Init then add module (service + UI packages)',
  steps: [
    {
      command: 'init',
      args: ['e2e-mod', '--non-interactive'],
    },
    {
      command: 'module',
      args: ['users'],
    },
  ],
  validators: [
    pathExists('packages/svc-users'),
    pathExists('packages/ui-users'),
    pathExists('packages/svc-users/package.json'),
    pathExists('packages/ui-users/package.json'),
    hasScript('build'),
    buildSucceeds(),
    lintSucceeds(),
  ],
};
