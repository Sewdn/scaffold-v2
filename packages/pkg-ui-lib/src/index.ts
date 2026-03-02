/**
 * @workspace/pkg-ui-lib — Scaffolding for ui-lib package.
 * Custom UI component library dependent on ui (and optionally domain).
 */

import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { createPackageConfig } from '@workspace/core-pkg-types';
import {
  UI_DEPS,
  BASE_DEV_DEPS,
  wsRef,
  typesReact,
  typesReactDom,
} from '@workspace/scaffold-deps';

const __dirname = dirname(fileURLToPath(import.meta.url));

export const uiLibPackageConfig = createPackageConfig({
  id: 'ui-lib',
  description: 'Custom UI component library',
  stubsDir: join(__dirname, '..', 'stubs'),
  getDependencies: (ctx) => {
    const deps = [...UI_DEPS];
    if (ctx.hasDomain) {
      deps.unshift(wsRef(ctx.projectName, 'domain'));
    }
    deps.unshift(wsRef(ctx.projectName, 'ui'));
    return deps;
  },
  getDevDependencies: () => [
    ...BASE_DEV_DEPS,
    typesReact,
    typesReactDom,
  ],
});
