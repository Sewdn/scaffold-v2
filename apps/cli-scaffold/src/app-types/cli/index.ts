import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import type { AppTypeConfig } from '../types.js';
import { createGeneratePhase } from '../defaults.js';
import { DEP_COMMANDER, DEP_EFFECT } from '../../packages/dependencies.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

export const cli: AppTypeConfig = {
  id: 'cli',
  description: 'Command-line interface (Effect + Commander)',
  phases: [
    createGeneratePhase({
      stubsDir: join(__dirname, 'stubs'),
      getMerge: (ctx) => ({
        bin: { [ctx.appName]: './bin/run.js' },
        scripts: {
          build: 'tsc -b',
        },
      }),
      getDependencies: () => [DEP_COMMANDER, DEP_EFFECT],
      getMkdirPaths: () => ['src', 'bin'],
    }),
  ],
};
