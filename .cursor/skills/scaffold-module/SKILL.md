---
name: scaffold-module
description: Scaffold a module (service + UI package pair). Use when adding a full-stack feature.
globs: ["**/packages/svc-*/**", "**/packages/ui-*/**"]
---

# Scaffold Module

## When to Use

Use this skill when you need to add a **module**—a feature unit with both a service package and a UI package, loosely coupled via domain types.

## Commands

**CLI** (from project root):
```bash
bunx scaffold module <name>
# Example: bunx scaffold module auth → packages/svc-auth + packages/ui-auth
```

**MCP**: `mcp_scaffold_module` with module name.

## What It Creates

- `packages/svc-<name>/` – backend service
- `packages/ui-<name>/` – UI components
- Both depend on `domain` for shared types
- Tie together in app via backend impl + context provider
