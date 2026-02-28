/**
 * Component in ui-lib scenario: init with ui, ui-lib, then add component to ui-lib.
 */

import {
  pathExists,
  hasScript,
  buildSucceeds,
  lintSucceeds,
} from '../validators/index.js';
import type { Scenario } from '../types.js';

export const scenario: Scenario = {
  id: 'component-in-ui-lib',
  description: 'Init with ui, ui-lib, then add component to ui-lib',
  steps: [
    {
      command: 'init',
      args: ['e2e-comp', '--packages', 'ui,ui-lib', '--non-interactive'],
    },
    {
      command: 'component',
      args: ['Button', '--package', 'ui-lib'],
    },
  ],
  validators: [
    pathExists('packages/ui'),
    pathExists('packages/ui-lib'),
    pathExists('packages/ui-lib/src/components/Button'),
    hasScript('build'),
    buildSucceeds(),
    lintSucceeds(),
  ],
};
