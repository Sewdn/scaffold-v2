/**
 * Default values for app generate phases.
 */

/** Default package.json merge for app generate phases */
export const DEFAULT_APP_MERGE: Record<string, unknown> = {
  private: true,
  type: 'module',
  scripts: {
    build: 'tsc',
    dev: 'bun run --watch src/index.ts',
  },
};

/** Default mkdir paths for apps */
export const DEFAULT_APP_MKDIR_PATHS = ['src'];
