import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { createPackageConfig } from '../defaults.js';
import {
  BASE_DEV_DEPS,
  UI_DEPS,
  DEP_POSTCSS,
  DEP_TAILWINDCSS,
} from '../dependencies.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

export const ui = createPackageConfig({
  id: 'ui',
  description: 'Shadcn base UI primitives',
  stubsDir: join(__dirname, 'stubs'),
  getDependencies: () => UI_DEPS,
  getDevDependencies: () => [...BASE_DEV_DEPS, DEP_POSTCSS, DEP_TAILWINDCSS],
  getScripts: () => ({
    lint: 'eslint . --max-warnings 0',
    storybook: 'storybook dev -p 6006',
  }),
});
