---
name: scaffold-project
description: Scaffold a new monorepo project. Use when creating a project from scratch.
globs: []
---

# Scaffold Project

## When to Use

Use this skill when you need to **create a new monorepo project** with the scaffold structure.

## Commands

**CLI** (from parent directory):
```bash
bunx scaffold project <name> [--template analysis|no-analysis] [--apps ...]
# Example: bunx scaffold project my-app --template no-analysis --apps frontend-vite,backend
```

**MCP**: `mcp_scaffold_project` with project name, template type, apps list, working directory.

## What It Creates

- Monorepo with turbo, TypeScript, oxlint, oxfmt
- Optional packages: domain, svc-config, ui, ui-lib
- Selected apps (frontend-nextjs, frontend-vite, frontend-tanstack, cli, backend, mcp-server, docs, slide-deck)
