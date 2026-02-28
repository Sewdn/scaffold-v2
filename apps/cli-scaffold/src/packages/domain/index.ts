import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { createPackageConfig } from '../defaults.js';
import { BASE_DEV_DEPS_WITH_BUN } from '../dependencies.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

export const domain = createPackageConfig({
  id: 'domain',
  description: 'Shared domain types and entities',
  stubsDir: join(__dirname, 'stubs'),
  getDependencies: () => [],
  getDevDependencies: () => BASE_DEV_DEPS_WITH_BUN,
});
