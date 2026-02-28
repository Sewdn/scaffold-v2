import type { AppTypeConfig, AppTypeContext } from '../types.js';

export const frontendTanstack: AppTypeConfig = {
  id: 'frontend-tanstack',
  description: 'TanStack Start (full-stack React)',
  isReactFrontend: true,
  phases: [
    {
      type: 'scripts',
      getSteps: () => [
        {
          type: 'shell',
          command: 'mkdir -p {{appDir}}',
          cwd: '',
        },
        {
          type: 'bunx',
          command: '@tanstack/cli',
          args: [
            'create',
            '{{appName}}',
            '--target-dir',
            '{{appDir}}',
            '--no-git',
            '--interactive',
          ],
          argsForNonInteractive: [
            'create',
            '{{appName}}',
            '--target-dir',
            '{{appDir}}',
            '--no-git',
          ],
          cwd: '',
          interactive: true,
        },
        {
          type: 'exec',
          command: 'node',
          args: ['{{patchScriptPath}}', '@{{projectName}}/{{appName}}'],
          cwd: '{{appDir}}',
        },
      ],
    },
  ],
};
