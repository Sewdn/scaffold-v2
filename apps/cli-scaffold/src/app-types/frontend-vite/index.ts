import type { AppTypeConfig, AppTypeContext } from '../types.js';

export const frontendVite: AppTypeConfig = {
  id: 'frontend-vite',
  description: 'Vite frontend application',
  isReactFrontend: true,
  phases: [
    {
      type: 'scripts',
      getSteps: (ctx: AppTypeContext) => [
        {
          type: 'bun',
          command: 'create',
          args: ['vite@latest', '{{appDir}}', '--interactive'],
          argsForNonInteractive: ['vite@latest', '{{appDir}}', '--template', 'react-ts'],
          interactive: true,
        },
        {
          type: 'bun',
          command: 'add',
          args: ['react', 'react-dom', 'effect'],
          cwd: '{{appDir}}',
        },
      ],
    },
  ],
};
