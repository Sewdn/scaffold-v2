import { spawn } from 'child_process';
import { Effect, Data, pipe } from 'effect';
import type { CommandStep, TemplateContext } from './types/template.js';

/**
 * Error when a command execution fails.
 */
export class CommandExecutionError extends Data.TaggedError('CommandExecutionError')<{
  readonly command: string;
  readonly args: readonly string[];
  readonly exitCode: number | null;
  readonly signal: string | null;
  readonly stderr?: string;
}> {}

/**
 * Options for running a command step.
 */
export interface RunOptions {
  cwd: string;
  context?: TemplateContext;
  verbose?: boolean;
  /** When false, interactive steps run non-interactively using argsForNonInteractive if available */
  allowInteractive?: boolean;
  /** Called before running a step with interactive: true (e.g. to stop spinner) */
  beforeInteractiveStep?: () => void;
}

/**
 * Substitute placeholders in a string using template context.
 * Supports {{varName}} and {{varName}} patterns.
 */
function substituteVars(str: string, ctx: TemplateContext = {}): string {
  return str.replace(/\{\{(\w+)\}\}/g, (_, key) => {
    const val = ctx[key];
    return val ?? `{{${key}}}`;
  });
}

function substituteInArgs(args: string[], ctx: TemplateContext): string[] {
  return args.map((arg) => substituteVars(arg, ctx));
}

/**
 * Resolve the executable and args for a step type.
 */
function resolveCommand(
  step: CommandStep,
  ctx: TemplateContext,
  allowInteractive: boolean,
): { cmd: string; args: string[] } {
  const useNonInteractiveArgs =
    !allowInteractive && step.interactive && step.argsForNonInteractive != null;
  const args = useNonInteractiveArgs ? step.argsForNonInteractive! : (step.args ?? []);
  const subArgs = substituteInArgs(args, ctx);

  switch (step.type) {
    case 'bun':
      return { cmd: 'bun', args: [step.command, ...subArgs] };
    case 'pnpm':
      return { cmd: 'pnpm', args: [step.command, ...subArgs] };
    case 'bunx':
      return { cmd: 'bun', args: ['x', step.command, ...subArgs] };
    case 'npx':
      return { cmd: 'npx', args: [step.command, ...subArgs] };
    case 'exec':
      return {
        cmd: step.command === 'node' && typeof (globalThis as { Bun?: unknown }).Bun !== 'undefined' ? 'bun' : step.command,
        args: subArgs,
      };
    case 'shell':
      return {
        cmd: process.platform === 'win32' ? 'cmd' : '/bin/sh',
        args: process.platform === 'win32' ? ['/c', substituteVars(step.command, ctx)] : ['-c', substituteVars(step.command, ctx)],
      };
    default:
      return { cmd: step.command, args: subArgs };
  }
}

/**
 * Execute a single command step.
 */
function runStep(
  step: CommandStep,
  options: RunOptions,
): Effect.Effect<void, CommandExecutionError> {
  return Effect.async<void, CommandExecutionError>((resume) => {
    const {
      cwd,
      context = {},
      verbose = true,
      allowInteractive = true,
      beforeInteractiveStep,
    } = options;
    const rawCwd = step.cwd ? `${cwd}/${step.cwd}` : cwd;
    const stepCwd = substituteVars(rawCwd, context);
    const { cmd, args } = resolveCommand(step, context, allowInteractive);

    const isInteractive = step.interactive && allowInteractive;
    if (isInteractive) {
      beforeInteractiveStep?.();
    }

    if (verbose || isInteractive) {
      console.log(`  $ ${cmd} ${args.join(' ')}`);
    }

    const proc = spawn(cmd, args, {
      cwd: stepCwd,
      stdio: verbose || isInteractive ? 'inherit' : 'pipe',
      shell: false,
    });

    let stderr = '';
    if (!verbose && proc.stderr) {
      proc.stderr.on('data', (d) => { stderr += d.toString(); });
    }

    proc.on('close', (code, signal) => {
      if (code === 0) {
        resume(Effect.succeed(undefined));
      } else if (step.optional) {
        resume(Effect.succeed(undefined));
      } else {
        resume(
          Effect.fail(
            new CommandExecutionError({
              command: cmd,
              args: [...args],
              exitCode: code,
              signal: signal,
              stderr: stderr || undefined,
            }),
          ),
        );
      }
    });

    proc.on('error', (err) => {
      resume(
        Effect.fail(
          new CommandExecutionError({
            command: cmd,
            args: [...args],
            exitCode: null,
            signal: null,
            stderr: err.message,
          }),
        ),
      );
    });
  });
}

/**
 * Execute a sequence of command steps.
 */
export function runSteps(
  steps: readonly CommandStep[],
  options: RunOptions,
): Effect.Effect<void, CommandExecutionError> {
  return pipe(
    Effect.forEach(steps, (step) => runStep(step, options), {
      concurrency: 1,
    }),
    Effect.asVoid,
  );
}
