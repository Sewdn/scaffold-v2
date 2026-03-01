/**
 * CLI expansion scenario: project with CLI app, then add commands and services.
 * Validates that scaffold cli add-command and add-service work, and that the
 * scaffolded CLI runs with all added commands visible in help.
 */

import {
  pathExists,
  hasScript,
  buildSucceeds,
  lintSucceeds,
  cliHelpShowsCommands,
} from '../validators/index.js';
import type { Scenario } from '../types.js';

export const scenario: Scenario = {
  id: 'cli-expansion',
  description: 'CLI app with expanded commands and services',
  steps: [
    {
      command: 'project',
      args: [
        'e2e-cli-expand',
        '--apps',
        'cli',
        '--app-names',
        'tools',
        '--non-interactive',
      ],
    },
    {
      command: 'cli',
      args: ['add-command', 'add-user', '--description', 'Add a new user'],
    },
    {
      command: 'cli',
      args: ['add-command', 'list-items', '--description', 'List all items'],
    },
    {
      command: 'cli',
      args: ['add-service', 'user-service'],
    },
  ],
  validators: [
    pathExists('apps/cli-tools'),
    pathExists('apps/cli-tools/src/commands/add-user.ts'),
    pathExists('apps/cli-tools/src/commands/list-items.ts'),
    pathExists('apps/cli-tools/src/services/user-service.ts'),
    pathExists('apps/cli-tools/src/commands/index.ts'),
    hasScript('build'),
    buildSucceeds(),
    lintSucceeds(),
    cliHelpShowsCommands('apps/cli-tools', ['add-user', 'list-items']),
  ],
};
