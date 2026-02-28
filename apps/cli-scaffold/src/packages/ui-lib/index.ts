import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { createPackageConfig } from '../defaults.js';
import {
  UI_DEPS,
  BASE_DEV_DEPS,
  wsRef,
  typesReact,
  typesReactDom,
} from '../dependencies.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

export const uiLib = createPackageConfig({
  id: 'ui-lib',
  description: 'Custom UI component library',
  stubsDir: join(__dirname, 'stubs'),
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
