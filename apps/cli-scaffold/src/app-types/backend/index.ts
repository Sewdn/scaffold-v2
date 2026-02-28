import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import type { AppTypeConfig } from '../types.js';
import { createGeneratePhase } from '../defaults.js';
import {
  DEP_ELYSIA,
  DEP_ELYSIA_SWAGGER,
  DEP_ELYSIA_CORS,
  DEP_EFFECT,
} from '../../packages/dependencies.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

export const backend: AppTypeConfig = {
  id: 'backend',
  description: 'Backend API (Elysia.js)',
  phases: [
    createGeneratePhase({
      stubsDir: join(__dirname, 'stubs'),
      getMerge: () => ({
        scripts: {
          start: 'bun run src/index.ts',
        },
      }),
      getDependencies: () => [
        DEP_ELYSIA,
        DEP_ELYSIA_SWAGGER,
        DEP_ELYSIA_CORS,
        DEP_EFFECT,
      ],
    }),
  ],
};
