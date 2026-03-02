/**
 * Built-in validators for E2E scenarios.
 */

import { existsSync, readFileSync } from 'fs';
import { join } from 'path';
import type {
  AsyncValidator,
  SyncValidator,
  ValidationContext,
  ValidationResult,
} from './types.js';

const pass = (message: string): ValidationResult => ({ passed: true, message });
const fail = (message: string): ValidationResult => ({ passed: false, message });

/** Check that a file or directory exists. */
export function pathExists(relativePath: string): SyncValidator {
  return {
    type: 'sync',
    id: `path-exists:${relativePath}`,
    description: `Path exists: ${relativePath}`,
    run(ctx) {
      const p = join(ctx.projectDir, relativePath);
      return existsSync(p) ? pass(`Found ${relativePath}`) : fail(`Missing ${relativePath}`);
    },
  };
}

/** Check that a file contains a string or pattern. */
export function fileContains(
  relativePath: string,
  substringOrPattern: string | RegExp
): SyncValidator {
  const desc =
    typeof substringOrPattern === 'string'
      ? `File ${relativePath} contains "${substringOrPattern}"`
      : `File ${relativePath} matches ${substringOrPattern}`;
  return {
    type: 'sync',
    id: `file-contains:${relativePath}`,
    description: desc,
    run(ctx) {
      const p = join(ctx.projectDir, relativePath);
      if (!existsSync(p)) return fail(`File not found: ${relativePath}`);
      const content = readFileSync(p, 'utf-8');
      const ok =
        typeof substringOrPattern === 'string'
          ? content.includes(substringOrPattern)
          : substringOrPattern.test(content);
      return ok ? pass(desc) : fail(desc);
    },
  };
}

/** Check that package.json exists and has expected scripts. */
export function hasScript(scriptName: string): SyncValidator {
  return {
    type: 'sync',
    id: `has-script:${scriptName}`,
    description: `Root package.json has script "${scriptName}"`,
    run(ctx) {
      const p = join(ctx.projectDir, 'package.json');
      if (!existsSync(p)) return fail('package.json not found');
      const pkg = JSON.parse(readFileSync(p, 'utf-8')) as { scripts?: Record<string, string> };
      const has = pkg?.scripts?.[scriptName] != null;
      return has ? pass(`Script "${scriptName}" exists`) : fail(`Script "${scriptName}" missing`);
    },
  };
}

/** Run `bun run build` in the project and assert success. */
export function buildSucceeds(): AsyncValidator {
  return {
    type: 'async',
    id: 'build-succeeds',
    description: 'bun run build succeeds',
    async run(ctx) {
      const proc = Bun.spawn(['bun', 'run', 'build'], {
        cwd: ctx.projectDir,
        stdin: 'ignore',
        stdout: 'pipe',
        stderr: 'pipe',
      });
      const exit = await proc.exited;
      if (exit === 0) return pass('Build succeeded');
      const stderr = await new Response(proc.stderr).text();
      return fail(`Build failed (exit ${exit}): ${stderr.slice(0, 200)}`);
    },
  };
}

/** Run `bun run lint` in the project and assert success. */
export function lintSucceeds(): AsyncValidator {
  return {
    type: 'async',
    id: 'lint-succeeds',
    description: 'bun run lint succeeds',
    async run(ctx) {
      const proc = Bun.spawn(['bun', 'run', 'lint'], {
        cwd: ctx.projectDir,
        stdin: 'ignore',
        stdout: 'pipe',
        stderr: 'pipe',
      });
      const exit = await proc.exited;
      if (exit === 0) return pass('Lint succeeded');
      const stderr = await new Response(proc.stderr).text();
      return fail(`Lint failed (exit ${exit}): ${stderr.slice(0, 200)}`);
    },
  };
}

/**
 * Run a scaffolded CLI app and assert that its help output contains all expected commands.
 * @param cliAppDir - Relative path to CLI app (e.g. "apps/cli-tools")
 * @param expectedCommands - Command names that must appear in the help output
 */
export function cliHelpShowsCommands(
  cliAppDir: string,
  expectedCommands: readonly string[]
): AsyncValidator {
  return {
    type: 'async',
    id: `cli-help-shows:${cliAppDir}:${expectedCommands.join(',')}`,
    description: `CLI ${cliAppDir} --help shows commands: ${expectedCommands.join(', ')}`,
    async run(ctx) {
      const cwd = join(ctx.projectDir, cliAppDir);
      const proc = Bun.spawn(['bun', 'run', 'src/index.ts', '--help'], {
        cwd,
        stdin: 'ignore',
        stdout: 'pipe',
        stderr: 'pipe',
      });
      const exit = await proc.exited;
      const stdout = await new Response(proc.stdout).text();
      const stderr = await new Response(proc.stderr).text();

      if (exit !== 0) {
        return fail(`CLI help failed (exit ${exit}): ${stderr.slice(0, 200)}`);
      }

      const missing = expectedCommands.filter((cmd) => !stdout.includes(cmd));
      if (missing.length > 0) {
        return fail(
          `CLI help missing commands: ${missing.join(', ')}. Output:\n${stdout.slice(0, 400)}`
        );
      }
      return pass(`CLI help shows all expected commands: ${expectedCommands.join(', ')}`);
    },
  };
}

/** Run `bun run dev`, wait briefly, then kill. Pass if it stays up; fail if it exits/crashes before timeout.
 * @param timeoutMs - How long to wait before considering the server "up"
 * @param subdir - Optional subdir (e.g. "apps/frontend-web") to run dev from; uses app script directly, avoiding Turbo. Use for Next.js when root turbo dev is flaky.
 */
export function devStarts(timeoutMs = 5000, subdir?: string): AsyncValidator {
  const id = subdir ? `dev-starts:${timeoutMs}:${subdir}` : `dev-starts:${timeoutMs}`;
  const desc = subdir
    ? `bun run dev (from ${subdir}) stays up for ${timeoutMs}ms`
    : `bun run dev stays up for ${timeoutMs}ms`;

  return {
    type: 'async',
    id,
    description: desc,
    async run(ctx) {
      const cwd = subdir ? join(ctx.projectDir, subdir) : ctx.projectDir;
      const proc = Bun.spawn(['bun', 'run', 'dev'], {
        cwd,
        stdin: 'ignore',
        stdout: 'pipe',
        stderr: 'pipe',
      });

      const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));
      const exitedFirst = await Promise.race([
        proc.exited.then((exit) => ({ type: 'exited' as const, exit })),
        sleep(timeoutMs).then(() => ({ type: 'timeout' as const })),
      ]);

      if (exitedFirst.type === 'exited') {
        const stderr = await new Response(proc.stderr).text();
        return fail(
          `Dev server exited before timeout (exit ${exitedFirst.exit}): ${stderr.slice(0, 200)}`
        );
      }

      proc.kill();
      return pass('Dev server started and ran without crash');
    },
  };
}
