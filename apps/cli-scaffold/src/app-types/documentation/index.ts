import type { AppTypeConfig, AppTypeContext } from '../types.js';

export const documentation: AppTypeConfig = {
  id: 'documentation',
  description: 'Starlight/Astro documentation',
  phases: [
    {
      type: 'scripts',
      getSteps: (_ctx: AppTypeContext) => [
        {
          type: 'bun',
          command: 'create',
          args: ['astro@latest', '{{appDir}}'],
          argsForNonInteractive: [
            'astro@latest',
            '{{appDir}}',
            '--template',
            'starlight',
            '--install',
            '--no-git',
          ],
          interactive: true,
        },
      ],
    },
  ],
};
