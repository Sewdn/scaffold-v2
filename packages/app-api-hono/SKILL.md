---
name: scaffold-app-api-hono
description: Scaffold a REST API (Hono). Use when adding an API server to the monorepo.
globs: ["**/apps/api-hono-*/**", "**/app-api-hono/**"]
---

# Scaffold API (Hono) App

## High-Level Goal

Add a **REST API** to the monorepo that runs on any JavaScript runtime (Bun, Node, Cloudflare Workers, Deno). Use when you need an ultrafast, multi-runtime backend.

## Application Type

A **REST API** built with **Hono**: ultrafast, Web Standards–based, multi-runtime (Bun, Node, Cloudflare, Deno).

**IDs:** App type `api-hono`; app name pattern `api-hono-<name>` (e.g. `api-hono-api`).

**Documentation:** [hono.dev](https://hono.dev) — official Hono docs. Use **context7** MCP with library ID `/honojs/hono` for up-to-date docs and code examples.

## When to Use

Use this skill when you need to add a **REST API** (Hono).

## Commands

**Create app** (from project root):
```bash
scaffold app <name> --type api-hono
# Example: scaffold app api --type api-hono → apps/api-hono-api
```

**Expansion commands** (from project root, after app exists). Same CLI API as api-elysia and api-fastify; only implementation differs per framework:

| Command | Effect | Functionality added |
|---------|--------|----------------------|
| `add-crud-routes <name>` | Adds CRUD routes + handlers for one entity | `src/routes/<name>.ts`, `src/handlers/<name>.ts` — GET / (paged), GET /:id, POST /, PUT /:id, DELETE /:id. Registers in `src/index.ts`. |
| `add-middleware <name>` | Adds request-scoped middleware | `src/middleware/<name>.ts` — runs before handlers; use for auth, logging, etc. Registers in app chain. |
| `add-plugin <name>` | Adds a custom Hono plugin | `src/plugins/<name>.ts` — extends app via `app.use()`. Registers in app chain. |
| `add-handler <name>` | Adds a handler file (no routes) | `src/handlers/<name>.ts` — plain async handler; wire manually in route plugins. |

```bash
scaffold api-hono add-crud-routes <name> [-a <app>] [-p <path>]
scaffold api-hono add-middleware <name> [-a <app>]
scaffold api-hono add-plugin <name> [-a <app>]
scaffold api-hono add-handler <name> [-a <app>]
# Example: scaffold api-hono add-crud-routes users
# Example: scaffold api-hono add-middleware auth -a api-hono-api
```

**Expansion details:** Use context7 MCP (`/honojs/hono`) with queries like "Hono middleware", "Hono route", "Hono handlers".

## What It Creates

- `apps/api-hono-<name>/` with Hono
- Ultrafast, multi-runtime (Bun, Node, Cloudflare, etc.)
- Lightweight HTTP API structure
