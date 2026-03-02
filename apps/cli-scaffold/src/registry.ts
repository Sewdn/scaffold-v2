import { getAllAppTypeIds, getAppTypeConfig } from './app-types/registry.js';

/** App type ids derived from app-types registry */
export const APP_TYPES = getAllAppTypeIds() as readonly string[];

export type AppType = (typeof APP_TYPES)[number];

/**
 * App type to directory prefix mapping. Derived from app type configs.
 */
export const APP_TYPE_PREFIX: Record<string, string> = Object.fromEntries(
  APP_TYPES.map((id) => {
    const config = getAppTypeConfig(id);
    return [id, config?.dirPrefix ?? id];
  }),
);
