---
name: scaffold-app-api-elysia
description: Scaffold a backend API (Elysia). Use when adding an API server to the monorepo.
globs: ["**/apps/api-elysia-*/**", "**/app-api-elysia/**"]
---

# Scaffold API (Elysia) App

## High-Level Goal

Add a **REST API** to the monorepo that serves HTTP endpoints with OpenAPI docs, CORS, and a plugin-based structure. Use when you need a backend for frontends, MCP servers, or other consumers.

## Application Type

A **REST API** built with **Elysia.js** on Bun: lightweight, type-safe, composable via plugins. Includes Swagger for OpenAPI docs and CORS for cross-origin requests. Service-oriented: handlers delegate to `svc-*` packages.

**IDs:** App type `api-elysia`; app name pattern `api-elysia-<name>` (e.g. `api-elysia-api`).

**Documentation:** [elysiajs.com](https://elysiajs.com) — official Elysia.js docs. Use **context7** MCP with library ID `/elysiajs/documentation` for up-to-date docs and code examples.

## When to Use

Use this skill when you need a **backend API** (Elysia.js) in the monorepo.

## Commands

**Create app** (from project root):
```bash
scaffold app <name> --type api-elysia
# Example: scaffold app api --type api-elysia → apps/api-elysia-api
```

**Effect:** Creates `apps/api-elysia-<name>/` with Elysia, Swagger, CORS, health route, and markers for expansions.

---

**Expansion commands** (from project root, after app exists). Same CLI API as api-fastify and api-hono; only implementation differs per framework:

| Command | Effect | Functionality added |
|---------|--------|----------------------|
| `add-crud-routes <name>` | Adds CRUD routes + handlers for one entity | `src/routes/<name>.ts`, `src/handlers/<name>.ts`, `src/plugins/handlers-<name>.ts` — route plugin uses handler plugin via `.use()`; handlers injected via context. GET / (paged), GET /:id, POST /, PUT /:id, DELETE /:id. Wired in `src/routes/registry.ts`. |
| `add-middleware <name>` | Adds request-scoped middleware | `src/middleware/<name>.ts` — runs before handlers; use for auth, logging, etc. Registers in app chain. |
| `add-plugin <name>` | Adds a custom Elysia plugin | `src/plugins/<name>.ts` — extends app via `derive`, `state`, lifecycle hooks. Registers in app chain. |
| `add-handler <name>` | Adds a handler file (no routes) | `src/handlers/<name>.ts` — plain async handler; wire manually in route plugins. |

```bash
scaffold api-elysia add-crud-routes <name> [-a <app>] [-p <path>]
scaffold api-elysia add-middleware <name> [-a <app>]
scaffold api-elysia add-plugin <name> [-a <app>]
scaffold api-elysia add-handler <name> [-a <app>]
# Example: scaffold api-elysia add-crud-routes users
# Example: scaffold api-elysia add-middleware auth -a api-elysia-api
```

**Expansion details:** Use context7 MCP (`/elysiajs/documentation`) with queries like "Elysia plugins", "Elysia derive middleware", "Elysia route handlers".

## What It Creates

- `apps/api-elysia-<name>/` with Elysia, Swagger, CORS
- Lightweight HTTP API structure
- Service-oriented; integrate `svc-*` packages
