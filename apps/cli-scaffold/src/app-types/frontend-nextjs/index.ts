import type { AppTypeConfig, AppTypeContext } from '../types.js';

export const frontendNextjs: AppTypeConfig = {
  id: 'frontend-nextjs',
  description: 'Next.js frontend application',
  isReactFrontend: true,
  phases: [
    {
      type: 'scripts',
      getSteps: (ctx: AppTypeContext) => [
        {
          type: 'bun',
          command: 'create',
          args: ['next-app@latest', '{{appDir}}', '--use-bun'],
          argsForNonInteractive: [
            'next-app@latest',
            '{{appDir}}',
            '--typescript',
            '--tailwind',
            '--eslint',
            '--app',
            '--src-dir',
            '--no-import-alias',
          ],
          interactive: true,
        },
        {
          type: 'bun',
          command: 'add',
          args: ['effect'],
          cwd: '{{appDir}}',
        },
      ],
    },
  ],
};
