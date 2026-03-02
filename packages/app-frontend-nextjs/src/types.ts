/**
 * Minimal types for app-frontend-nextjs. Mirrors AppTypeContext from
 * cli-scaffold app-types (no dependency on cli-scaffold).
 */

export interface AppTypeContext {
  projectName: string;
  appName: string;
  appDir: string;
  projectDir?: string;
  appType?: string;
  patchScriptPath?: string;
}
