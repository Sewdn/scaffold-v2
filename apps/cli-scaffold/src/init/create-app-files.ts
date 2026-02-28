import type { AppType } from '../registry.js';
import {
  getAppTypeConfig,
  getStubsDir,
  hasGeneratePhase,
} from '../app-types/registry.js';
import {
  generateFromStubs,
  resolveAppTypeStubsDir,
} from '../services/generator.js';

export interface CreateAppFilesOptions {
  projectName: string;
  appName: string;
  appType: AppType;
  appDir: string;
  /** Project root for stub override (stubs/app-types/{appType}) */
  projectRoot?: string;
}

/**
 * Scaffolds source files for app types with a generate phase.
 * Uses Mustache stub files from each module's stubs/ folder.
 * Project-level stubs/app-types/{appType}/ overrides when present.
 */
export async function createAppEntryFiles(options: CreateAppFilesOptions): Promise<void> {
  const { appName, appType, appDir, projectRoot } = options;

  const config = getAppTypeConfig(appType);
  if (!config || !hasGeneratePhase(config)) return;

  const moduleStubsDir = getStubsDir(config);
  if (!moduleStubsDir) return;

  const stubsDir = resolveAppTypeStubsDir(moduleStubsDir, appType, projectRoot);
  const ctx = {
    projectName: options.projectName,
    appName,
    appDir,
  };

  await generateFromStubs(stubsDir, appDir, ctx);
}
