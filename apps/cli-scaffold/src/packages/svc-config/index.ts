import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { createPackageConfig } from '../defaults.js';
import { BASE_DEV_DEPS, DEP_DOTENV } from '../dependencies.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

export const svcConfig = createPackageConfig({
  id: 'svc-config',
  description: 'Configuration service',
  stubsDir: join(__dirname, 'stubs'),
  getDependencies: () => [DEP_DOTENV],
  getDevDependencies: () => BASE_DEV_DEPS,
});
