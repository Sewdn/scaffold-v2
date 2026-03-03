---
name: scaffold-app-frontend-tanstack
description: Scaffold a TanStack Start frontend app. Use when adding a TanStack Router application.
globs: ["**/apps/frontend-*/**", "**/app-frontend-tanstack/**"]
---

# Scaffold Frontend (TanStack) App

## High-Level Goal

Add a **TanStack Start** frontend to the monorepo with fully type-safe routing and built-in caching. Use when you need a TanStack-first React app.

## Application Type

A **frontend** built with **TanStack Start** and **TanStack Router**: type-safe routing, file-based routing, React, Tailwind.

**IDs:** App type `frontend-tanstack`; app name pattern `frontend-<name>` (e.g. `frontend-app`).

**Documentation:** [tanstack.com/router](https://tanstack.com/router) — TanStack Router docs. Use **context7** MCP with library ID `/tanstack/router` for up-to-date docs and code examples.

## When to Use

Use this skill when you need to add a **TanStack Start frontend** (TanStack Router, React).

## Commands

**Create app** (from project root):
```bash
scaffold app <name> --type frontend-tanstack
# Example: scaffold app app --type frontend-tanstack → apps/frontend-app
```

## What It Creates

- `apps/frontend-<name>/` with TanStack Start, React, Tailwind
- File-based routing
- Uses `@workspace/ui` and `@workspace/ui-lib`
