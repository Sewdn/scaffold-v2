---
title: App Types
description: Supported application types for scaffold app
---

## Available types

| Type | Directory prefix | Description |
|------|------------------|-------------|
| `frontend-nextjs` | `frontend` | Next.js frontend with React |
| `frontend-vite` | `frontend` | Vite frontend with React |
| `frontend-tanstack` | `frontend` | TanStack Start frontend |
| `backend` | `backend` | Elysia.js backend API |
| `cli` | `cli` | Command-line interface (Effect + Commander) |
| `mcp-server` | `mcp` | Model Context Protocol server |
| `slide-deck` | `slides` | Reveal.js presentation |
| `documentation` | `docs` | Starlight/Astro documentation site |

## Naming examples

- `scaffold app web --type frontend-vite` → `apps/frontend-web`
- `scaffold app api --type backend` → `apps/backend-api`
- `scaffold app docs --type documentation` → `apps/docs-docs`
- `scaffold app tool --type cli` → `apps/cli-tool`

## Extensibility

The app type registry is extensible. New types can be added by:

1. Defining an `AppTypeConfig` with `id`, `description`, and `phases`
2. Registering it in the app type registry
3. Exposing it via `scaffold app --type`

Each phase can run scripts (bun, bunx, npx, shell) or generate stubs.
