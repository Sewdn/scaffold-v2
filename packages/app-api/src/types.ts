import type { Command } from "commander";

/**
 * Contract for API expansion implementations.
 * Each app-api-* package provides these; framework-specific logic lives in stubs and patch functions.
 */
export interface ApiExpansionAdapter {
  /** App prefix for resolveAppByPrefix (e.g. api-elysia, api-fastify, api-hono) */
  apiPrefix: string;

  /** Add CRUD routes + handlers. Returns false if already exists (idempotent). */
  executeAddCrudRoutes(
    projectDir: string,
    appName: string,
    name: string,
    path?: string,
  ): Promise<boolean>;

  /** Add middleware. Returns false if already exists (idempotent). */
  executeAddMiddleware(
    projectDir: string,
    appName: string,
    name: string,
  ): Promise<boolean>;

  /** Add plugin. Returns false if already exists (idempotent). */
  executeAddPlugin(
    projectDir: string,
    appName: string,
    name: string,
  ): Promise<boolean>;

  /** Add handler (no routes). Returns false if already exists (idempotent). */
  executeAddHandler(
    projectDir: string,
    appName: string,
    name: string,
  ): Promise<boolean>;
}

export interface ExpansionCommandMeta {
  name: string;
  description: string;
  usage: string;
}

export interface ApiExpansionCommands {
  apiCommand: Command;
  getExpansionCommands: () => ExpansionCommandMeta[];
}
