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

**Expansion commands** (from project root, after app exists):
```bash
scaffold api-hono add-route <name> [-a <app>] [-p <path>]
scaffold api-hono add-middleware <name> [-a <app>]
scaffold api-hono add-handler <name> [-a <app>]
# Example: scaffold api-hono add-route users
# Example: scaffold api-hono add-middleware auth -a api-hono-api
```

**Expansion details:** Use context7 MCP (`/honojs/hono`) with queries like "Hono middleware", "Hono routes", "Hono handlers".

## What It Creates

- `apps/api-hono-<name>/` with Hono
- Ultrafast, multi-runtime (Bun, Node, Cloudflare, etc.)
- Lightweight HTTP API structure
