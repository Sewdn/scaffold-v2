/**
 * CLI expansion: project with CLI app (no defaults), then add commands and services.
 */

import {
  pathExists,
  hasScript,
  buildSucceeds,
  lintSucceeds,
  cliHelpShowsCommands,
} from '@workspace/core-e2e';
import type { Scenario } from '@workspace/core-e2e';

export const scenario: Scenario = {
  id: 'cli-expansion',
  description: 'CLI app with add-command and add-service (no default examples)',
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
        '--no-example-command',
        '--no-example-service',
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
