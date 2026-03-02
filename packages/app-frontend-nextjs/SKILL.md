---
name: scaffold-app-frontend-nextjs
description: Scaffold a Next.js frontend app. Use when adding a React 19 / Next.js application.
globs: ["**/apps/frontend-*/**", "**/app-frontend-nextjs/**"]
---

# Scaffold Frontend (Next.js) App

## When to Use

Use this skill when you need to add a **Next.js frontend** (React 19, App Router).

## Commands

**CLI** (from project root):
```bash
bunx scaffold app <name> --type frontend-nextjs
# Example: bunx scaffold app web --type frontend-nextjs → apps/frontend-web
```

**MCP**: `mcp_scaffold_app` with app name, type `frontend-nextjs`.

## What It Creates

- `apps/frontend-<name>/` with Next.js 15+, React 19, Tailwind, shadcn
- App Router structure
- Uses `@workspace/ui` and `@workspace/ui-lib`
