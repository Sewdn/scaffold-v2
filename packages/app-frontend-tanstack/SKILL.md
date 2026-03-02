---
name: scaffold-app-frontend-tanstack
description: Scaffold a TanStack Start frontend app. Use when adding a TanStack Router application.
globs: ["**/apps/frontend-*/**", "**/app-frontend-tanstack/**"]
---

# Scaffold Frontend (TanStack) App

## When to Use

Use this skill when you need to add a **TanStack Start frontend** (TanStack Router, React).

## Commands

**CLI** (from project root):
```bash
bunx scaffold app <name> --type frontend-tanstack
# Example: bunx scaffold app app --type frontend-tanstack → apps/frontend-app
```

**MCP**: `mcp_scaffold_app` with app name, type `frontend-tanstack`.

## What It Creates

- `apps/frontend-<name>/` with TanStack Start, React, Tailwind
- File-based routing
- Uses `@workspace/ui` and `@workspace/ui-lib`
