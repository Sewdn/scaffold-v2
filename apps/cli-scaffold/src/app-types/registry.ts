import type { AppTypeConfig, GeneratePhase } from "@workspace/core-app-types";

export type { GeneratePhase };
import { createCliAppType } from "@workspace/app-cli";
import { createBackendAppType } from "@workspace/app-backend";
import { createMcpServerAppType } from "@workspace/app-mcp-server";
import {
  DEP_ELYSIA,
  DEP_ELYSIA_SWAGGER,
  DEP_ELYSIA_CORS,
  DEP_EFFECT,
  DEP_COMMANDER,
  DEP_MCP_SDK,
} from "@workspace/scaffold-deps";
import { createFrontendNextjsAppType } from "@workspace/app-frontend-nextjs";
import { createFrontendViteAppType } from "@workspace/app-frontend-vite";
import { createFrontendTanstackAppType } from "@workspace/app-frontend-tanstack";
import { createDocumentationAppType } from "@workspace/app-documentation";
import { createSlideDeckAppType } from "@workspace/app-slide-deck";

const { cli } = createCliAppType({
  deps: [DEP_COMMANDER, DEP_EFFECT],
});

const { backend } = createBackendAppType({
  deps: [DEP_ELYSIA, DEP_ELYSIA_SWAGGER, DEP_ELYSIA_CORS, DEP_EFFECT],
});

const { mcpServer } = createMcpServerAppType({
  deps: [DEP_MCP_SDK, DEP_EFFECT],
});

const { frontendNextjs } = createFrontendNextjsAppType();
const { frontendVite } = createFrontendViteAppType();
const { frontendTanstack } = createFrontendTanstackAppType();
const { documentation } = createDocumentationAppType();
const { slideDeck } = createSlideDeckAppType();

const ALL_APP_TYPES = [
  frontendNextjs,
  frontendVite,
  frontendTanstack,
  cli,
  backend,
  mcpServer,
  slideDeck,
  documentation,
] as AppTypeConfig[];

const REGISTRY = new Map<string, AppTypeConfig>(ALL_APP_TYPES.map((c) => [c.id, c]));

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
  return config.phases.some((p) => p.type === "generate");
}

/**
 * Get the first generate phase's stubsDir, or undefined.
 */
export function getStubsDir(config: AppTypeConfig): string | undefined {
  const phase = config.phases.find((p) => p.type === "generate") as GeneratePhase | undefined;
  return phase?.stubsDir;
}

/**
 * Check if app type is a React frontend (for UI package handling).
 */
export function isReactFrontend(id: string): boolean {
  return REGISTRY.get(id)?.isReactFrontend === true;
}

/**
 * Get default app name for an app type (e.g. "web", "api", "tools").
 * Falls back to app type id when not configured.
 */
export function getDefaultAppName(id: string): string {
  return REGISTRY.get(id)?.defaultAppName ?? id;
}
