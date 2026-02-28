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
          type: 'bunx',
          command: 'create-vite@latest',
          args: ['{{appDir}}', '--template', 'react-ts'],
          argsForNonInteractive: ['{{appDir}}', '--template', 'react-ts'],
          interactive: false,
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
