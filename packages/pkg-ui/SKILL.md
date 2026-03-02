---
name: scaffold-ui
description: Scaffold a custom UI package (ui-*). Use when adding a new UI component library to a monorepo.
globs: ["**/packages/ui-*/**", "**/pkg-ui/**"]
---

# Scaffold UI Package

## When to Use

Use this skill when you need to add a **custom UI package** (e.g. `ui-dashboard`, `ui-forms`)—component libraries built on `@workspace/ui` and `@workspace/ui-lib`.

## Commands

**CLI** (from project root):
```bash
bunx scaffold package <name> --type=ui
# Example: bunx scaffold package ui-dashboard --type=ui
```

**MCP**: `mcp_scaffold_ui` with UI package name.

## What It Creates

- `packages/ui-<name>/` with React, shadcn, and ui-lib deps
- Depends on both `@workspace/ui` and `@workspace/ui-lib`
- Never add `svc-*` packages as dependencies to UI packages

## Key Points

- Custom UI packages extend the base `ui` and `ui-lib` setup
- Used by frontend applications
- Add ShadCN components via `bunx shadcn@latest add [component]` in the ui package
