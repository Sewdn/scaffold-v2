/**
 * Built-in validators for E2E scenarios.
 */

import { existsSync, readFileSync } from 'fs';
import { join } from 'path';
import type { SyncValidator, AsyncValidator, ValidationContext, ValidationResult } from '../types.js';

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
export function fileContains(relativePath: string, substringOrPattern: string | RegExp): SyncValidator {
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

/** Run `bun run dev`, wait briefly, then kill. Pass if it stays up; fail if it exits/crashes before timeout. */
export function devStarts(timeoutMs = 5000): AsyncValidator {
  return {
    type: 'async',
    id: `dev-starts:${timeoutMs}`,
    description: `bun run dev stays up for ${timeoutMs}ms`,
    async run(ctx) {
      const proc = Bun.spawn(['bun', 'run', 'dev'], {
        cwd: ctx.projectDir,
        stdin: 'ignore',
        stdout: 'pipe',
        stderr: 'pipe',
      });

      const sleep = (ms: number) => new Promise<void>(r => setTimeout(r, ms));
      const exitedFirst = await Promise.race([
        proc.exited.then(exit => ({ type: 'exited' as const, exit })),
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
