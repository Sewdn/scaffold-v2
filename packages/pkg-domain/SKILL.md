---
name: scaffold-domain
description: Scaffold a domain package. Use when adding shared domain types and entities to a monorepo.
globs: ["**/packages/domain/**", "**/pkg-domain/**"]
---

# Scaffold Domain Package

## High-Level Goal

Add a **domain** package—shared business logic and types used across apps and packages. Use when you need a single source of truth for entities and value objects.

## Package Type

A **domain** package: TypeScript types and pure logic only. No UI or backend dependencies. Consumed by both `svc-*` and `ui-*` packages.

**IDs:** Package type `domain`; package name `domain`.

**Documentation:** Domain packages are framework-agnostic. Use **context7** MCP with library ID `/websites/react_dev` or `/prisma/docs` for related patterns (React types, Prisma models).

## When to Use

Use this skill when you need to add or scaffold a **domain** package.

## Commands

**Create package** (from project root):
```bash
scaffold package domain [--type=domain]
```

## What It Creates

- `packages/domain/` with TypeScript setup
- Shared types and entities for apps and other packages
- No UI or backend dependencies—domain is consumed by both

## Key Points

- Domain packages have no runtime deps; they define types and pure logic
- Both `svc-*` and `ui-*` packages depend on domain for shared types
- Add domain during project create via optional packages, or add later with the package command
