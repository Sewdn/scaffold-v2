---
title: App Types
description: Supported application types for scaffold app
---

## Available types

| Type | Directory prefix | Description |
|------|------------------|-------------|
| [Frontend (Next.js)](./frontend-nextjs) | `frontend` | Next.js frontend application |
| [Frontend (Vite)](./frontend-vite) | `frontend` | Vite frontend application |
| [Frontend (TanStack)](./frontend-tanstack) | `frontend` | TanStack Start (full-stack React) |
| [CLI](./cli) | `cli` | Command-line interface (Effect + Commander) |
| [API (Elysia)](./api-elysia) | `api-elysia` | REST API (Elysia.js) |
| [API (Hono)](./api-hono) | `api-hono` | REST API (Hono) |
| [API (Fastify)](./api-fastify) | `api-fastify` | REST API (Fastify) |
| [MCP Server](./mcp-server) | `mcp` | Model Context Protocol server |
| [Slide Deck](./slide-deck) | `slides` | Reveal.js presentation |
| [Documentation](./documentation) | `docs` | Starlight/Astro documentation |

## Naming examples

- `scaffold app web --type frontend-vite` → `apps/frontend-web`
- `scaffold app api --type api-elysia` → `apps/api-elysia-api`
- `scaffold app docs --type documentation` → `apps/docs-docs`
- `scaffold app tool --type cli` → `apps/cli-tool`

## Extensibility

The app type registry is extensible. New types can be added by:

1. Defining an `AppTypeConfig` with `id`, `description`, `dirPrefix`, and `phases`
2. Registering it in the app type registry
3. Exposing it via `scaffold app --type`

Each phase can run scripts (bun, bunx, npx, shell) or generate stubs.
