/**
 * Full packages stack scenario: init with all optional packages (domain, svc-config, ui, ui-lib).
 */

import {
  pathExists,
  hasScript,
  buildSucceeds,
  lintSucceeds,
} from '../validators/index.js';
import type { Scenario } from '../types.js';

export const scenario: Scenario = {
  id: 'full-packages-stack',
  description: 'Init with all optional packages (domain, svc-config, ui, ui-lib)',
  timeoutMs: 150_000,
  steps: [
    {
      command: 'init',
      args: ['e2e-full', '--packages', 'domain,svc-config,ui,ui-lib', '--non-interactive'],
    },
  ],
  validators: [
    pathExists('packages/domain'),
    pathExists('packages/svc-config'),
    pathExists('packages/ui'),
    pathExists('packages/ui-lib'),
    hasScript('build'),
    buildSucceeds(),
    lintSucceeds(),
  ],
};
