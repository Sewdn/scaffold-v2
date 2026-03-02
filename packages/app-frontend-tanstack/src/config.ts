/**
 * Frontend-tanstack app-type configuration.
 * Script steps only (no stubs) — uses bunx @tanstack/cli and patchScriptPath.
 *
 * getScriptSteps receives ctx from the orchestrator. Step definitions use template
 * placeholders {{patchScriptPath}}, {{projectName}}, {{appName}}, {{appDir}} that
 * are substituted when steps are run.
 */

export interface FrontendTanstackContext {
  projectName: string;
  appName: string;
  appDir: string;
  patchScriptPath?: string;
}

/** Get script steps for the frontend-tanstack scripts phase */
export function getScriptSteps(ctx: FrontendTanstackContext) {
  return [
    {
      type: 'shell' as const,
      command: 'mkdir -p {{appDir}}',
      cwd: '',
    },
    {
      type: 'bunx' as const,
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
      type: 'exec' as const,
      command: 'node',
      args: ['{{patchScriptPath}}', '@{{projectName}}/{{appName}}'],
      cwd: '{{appDir}}',
    },
  ];
}
