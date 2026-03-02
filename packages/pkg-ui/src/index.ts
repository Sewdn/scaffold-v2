/**
 * @workspace/pkg-ui — Scaffolding for ui package.
 * Shadcn base UI primitives shared by all frontend applications.
 */

import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { createPackageConfig } from '@workspace/core-pkg-types';
import {
  BASE_DEV_DEPS,
  UI_DEPS,
  DEP_POSTCSS,
  DEP_TAILWINDCSS,
} from '@workspace/scaffold-deps';

const __dirname = dirname(fileURLToPath(import.meta.url));

export const uiPackageConfig = createPackageConfig({
  id: 'ui',
  description: 'Shadcn base UI primitives',
  stubsDir: join(__dirname, '..', 'stubs'),
  getDependencies: () => UI_DEPS,
  getDevDependencies: () => [...BASE_DEV_DEPS, DEP_POSTCSS, DEP_TAILWINDCSS],
  getScripts: () => ({
    lint: 'eslint . --max-warnings 0',
    storybook: 'storybook dev -p 6006',
  }),
});
