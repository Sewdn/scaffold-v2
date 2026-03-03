---
name: scaffold-app-api-fastify
description: Scaffold a REST API (Fastify). Use when adding an API server to the monorepo.
globs: ["**/apps/api-fastify-*/**", "**/app-api-fastify/**"]
---

# Scaffold API (Fastify) App

## High-Level Goal

Add a **REST API** to the monorepo with schema-based validation, plugin architecture, and Pino logging. Use when you need a fast, low-overhead Node.js backend.

## Application Type

A **REST API** built with **Fastify** on Node.js: fast, low-overhead, schema-based validation, plugin architecture.

**IDs:** App type `api-fastify`; app name pattern `api-fastify-<name>` (e.g. `api-fastify-api`).

**Documentation:** [fastify.dev](https://fastify.dev) — official Fastify docs. Use **context7** MCP with library ID `/fastify/fastify` for up-to-date docs and code examples.

## When to Use

Use this skill when you need to add a **REST API** (Fastify).

## Commands

**Create app** (from project root):
```bash
scaffold app <name> --type api-fastify
# Example: scaffold app api --type api-fastify → apps/api-fastify-api
```

**Expansion commands** (from project root, after app exists). Same CLI API as api-elysia and api-hono; only implementation differs per framework:

| Command | Effect | Functionality added |
|---------|--------|----------------------|
| `add-crud-routes <name>` | Adds CRUD routes + handlers for one entity | `src/routes/<name>.ts`, `src/handlers/<name>.ts` — GET / (paged), GET /:id, POST /, PUT /:id, DELETE /:id. Registers in `src/index.ts`. |
| `add-middleware <name>` | Adds request-scoped middleware | `src/middleware/<name>.ts` — runs before handlers; use for auth, logging, etc. Registers in app chain. |
| `add-plugin <name>` | Adds a custom Fastify plugin | `src/plugins/<name>.ts` — extends app via `fastify.register`. Registers in app chain. |
| `add-handler <name>` | Adds a handler file (no routes) | `src/handlers/<name>.ts` — plain async handler; wire manually in route plugins. |

```bash
scaffold api-fastify add-crud-routes <name> [-a <app>] [-p <path>]
scaffold api-fastify add-middleware <name> [-a <app>]
scaffold api-fastify add-plugin <name> [-a <app>]
scaffold api-fastify add-handler <name> [-a <app>]
# Example: scaffold api-fastify add-crud-routes users
# Example: scaffold api-fastify add-plugin metrics -a api-fastify-api
```

**Expansion details:** Use context7 MCP (`/fastify/fastify`) with queries like "Fastify plugins", "Fastify addHook middleware", "Fastify register routes".

## What It Creates

- `apps/api-fastify-<name>/` with Fastify
- Schema-based validation, plugin architecture, Pino logging
- Lightweight HTTP API structure
