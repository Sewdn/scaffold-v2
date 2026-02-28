/**
 * E2E Config service. Provides paths and flags for test execution.
 * Scaffolded projects are created in a temp directory and removed after each scenario.
 */

import { Context, Effect, Layer } from 'effect';
import { join, dirname } from 'path';
import { tmpdir } from 'os';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export interface E2EConfig {
  readonly monorepoRoot: string;
  readonly scaffoldCliPath: string;
  /** Base directory for E2E temp workspaces. Default: os.tmpdir(). Set SCAFFOLD_E2E_WORKSPACE_DIR to override. */
  readonly workspaceBaseDir: string;
  readonly tempDirPrefix: string;
  readonly keepTempOnExit: boolean;
}

export const E2EConfig = Context.GenericTag<E2EConfig>('E2EConfig');

export const E2EConfigLive = Layer.succeed(E2EConfig, {
  monorepoRoot: join(__dirname, '..', '..', '..', '..'),
  scaffoldCliPath: join(__dirname, '..', '..', '..', '..', 'apps', 'cli-scaffold', 'src', 'index.ts'),
  workspaceBaseDir:
    process.env['SCAFFOLD_E2E_WORKSPACE_DIR'] ?? tmpdir(),
  tempDirPrefix: 'scaffold-e2e-',
  keepTempOnExit: process.env['SCAFFOLD_E2E_KEEP_TEMP'] === '1',
} as E2EConfig);
