import { getAllAppTypeIds } from './app-types/registry.js';

/** App type ids derived from app-types registry */
export const APP_TYPES = getAllAppTypeIds() as readonly string[];

export type AppType = (typeof APP_TYPES)[number];

/**
 * App type to directory prefix mapping.
 */
export const APP_TYPE_PREFIX: Record<string, string> = {
  'frontend-nextjs': 'frontend',
  'frontend-vite': 'frontend',
  'frontend-tanstack': 'frontend',
  cli: 'cli',
  backend: 'backend',
  'mcp-server': 'mcp',
  'slide-deck': 'slides',
  documentation: 'docs',
};
