/**
 * @workspace/pkg-svc-config — Scaffolding for svc-config package.
 * Configuration service used by backend and other packages.
 */

import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { createPackageConfig } from '@workspace/core-pkg-types';
import { BASE_DEV_DEPS, DEP_DOTENV } from '@workspace/scaffold-deps';

const __dirname = dirname(fileURLToPath(import.meta.url));

export const svcConfigPackageConfig = createPackageConfig({
  id: 'svc-config',
  description: 'Configuration service',
  stubsDir: join(__dirname, '..', 'stubs'),
  getDependencies: () => [DEP_DOTENV],
  getDevDependencies: () => BASE_DEV_DEPS,
});
