---
name: scaffold-domain
description: Scaffold a domain package. Use when adding shared domain types and entities to a monorepo.
globs: ["**/packages/domain/**", "**/pkg-domain/**"]
---

# Scaffold Domain Package

## When to Use

Use this skill when you need to add or scaffold a **domain** package—shared business logic and types used across apps and packages.

## Commands

**CLI** (from project root):
```bash
bunx scaffold package domain [--type=domain]
```

**MCP**: `mcp_scaffold_package` with package name `domain`, type `service` (domain is a shared logic package).

## What It Creates

- `packages/domain/` with TypeScript setup
- Shared types and entities for apps and other packages
- No UI or backend dependencies—domain is consumed by both

## Key Points

- Domain packages have no runtime deps; they define types and pure logic
- Both `svc-*` and `ui-*` packages depend on domain for shared types
- Add domain during project create via optional packages, or add later with the package command
