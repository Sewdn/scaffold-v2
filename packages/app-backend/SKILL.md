---
name: scaffold-app-backend
description: Scaffold a backend API (Elysia). Use when adding an API server to the monorepo.
globs: ["**/apps/backend-*/**", "**/app-backend/**"]
---

# Scaffold Backend App

## When to Use

Use this skill when you need to add a **backend API** (Elysia.js).

## Commands

**CLI** (from project root):
```bash
bunx scaffold app <name> --type backend
# Example: bunx scaffold app api --type backend → apps/backend-api
```

**MCP**: `mcp_scaffold_app` with app name, type `backend`.

## What It Creates

- `apps/backend-<name>/` with Elysia, Swagger, CORS, Effect
- Lightweight HTTP API structure
- Service-oriented; integrate `svc-*` packages
