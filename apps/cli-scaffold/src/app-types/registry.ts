import type { AppTypeConfig, GeneratePhase } from './types.js';

export type { GeneratePhase };
import type { CreateCliAppTypeOptions } from '@workspace/app-cli';
import { createCliAppType } from '@workspace/app-cli';
import { createGeneratePhase } from './defaults.js';
import { DEP_COMMANDER, DEP_EFFECT } from '../packages/dependencies.js';
import { backend } from './backend/index.js';
import { mcpServer } from './mcp-server/index.js';
import { frontendNextjs } from './frontend-nextjs/index.js';
import { frontendVite } from './frontend-vite/index.js';
import { frontendTanstack } from './frontend-tanstack/index.js';
import { slideDeck } from './slide-deck/index.js';
import { documentation } from './documentation/index.js';

const { cli } = createCliAppType({
  createGeneratePhase: createGeneratePhase as CreateCliAppTypeOptions['createGeneratePhase'],
  deps: [DEP_COMMANDER, DEP_EFFECT],
});

const ALL_APP_TYPES: AppTypeConfig[] = [
  frontendNextjs,
  frontendVite,
  frontendTanstack,
  cli,
  backend,
  mcpServer,
  slideDeck,
  documentation,
];

const REGISTRY = new Map<string, AppTypeConfig>(
  ALL_APP_TYPES.map((c) => [c.id, c]),
);

/**
 * Get app type config by id.
 */
export function getAppTypeConfig(id: string): AppTypeConfig | undefined {
  return REGISTRY.get(id);
}

/**
 * List all app type ids (same order as APP_TYPES in main registry).
 */
export function getAllAppTypeIds(): string[] {
  return ALL_APP_TYPES.map((c) => c.id);
}

/**
 * Check if app type has any generate phase (creates folder + stubs).
 */
export function hasGeneratePhase(config: AppTypeConfig): boolean {
  return config.phases.some((p) => p.type === 'generate');
}

/**
 * Get the first generate phase's stubsDir, or undefined.
 */
export function getStubsDir(config: AppTypeConfig): string | undefined {
  const phase = config.phases.find((p) => p.type === 'generate') as
    | GeneratePhase
    | undefined;
  return phase?.stubsDir;
}

/**
 * Check if app type is a React frontend (for UI package handling).
 */
export function isReactFrontend(id: string): boolean {
  return REGISTRY.get(id)?.isReactFrontend === true;
}
