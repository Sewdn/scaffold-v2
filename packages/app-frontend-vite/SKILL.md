---
name: scaffold-app-frontend-vite
description: Scaffold a Vite React frontend app. Use when adding a Vite-based SPA.
globs: ["**/apps/frontend-*/**", "**/app-frontend-vite/**"]
---

# Scaffold Frontend (Vite) App

## When to Use

Use this skill when you need to add a **Vite frontend** (React 19, Vite, fast HMR).

## Commands

**CLI** (from project root):
```bash
bunx scaffold app <name> --type frontend-vite
# Example: bunx scaffold app admin --type frontend-vite → apps/frontend-admin
```

**MCP**: `mcp_scaffold_app` with app name, type `frontend-vite`.

## What It Creates

- `apps/frontend-<name>/` with Vite, React 19, Tailwind, shadcn
- React Router, React Query
- Uses `@workspace/ui` and `@workspace/ui-lib`
