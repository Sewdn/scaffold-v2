import type { AppTypeConfig, AppTypeContext } from '../types.js';

export const slideDeck: AppTypeConfig = {
  id: 'slide-deck',
  description: 'Reveal.js presentation',
  phases: [
    {
      type: 'scripts',
      getSteps: (_ctx: AppTypeContext) => [
        {
          type: 'bun',
          command: 'create',
          args: ['vite@latest', '{{appDir}}', '--interactive'],
          argsForNonInteractive: ['vite@latest', '{{appDir}}', '--template', 'vanilla-ts'],
          interactive: true,
        },
        {
          type: 'bun',
          command: 'add',
          args: ['reveal.js'],
          cwd: '{{appDir}}',
        },
      ],
    },
  ],
};
