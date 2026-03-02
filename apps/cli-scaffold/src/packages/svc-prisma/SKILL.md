---
name: scaffold-svc-prisma
description: Scaffold a Prisma data service package. Use when adding database/ORM layer.
globs: ["**/packages/svc-prisma/**", "**/svc-prisma/**"]
---

# Scaffold svc-prisma Package

## When to Use

Use this skill when you need to add a **Prisma data service**—ORM setup with migrations and DB access.

## Commands

**CLI** (from project root):
```bash
bunx scaffold service prisma
# Or: bunx scaffold package svc-prisma --type=service
```

**MCP**: `mcp_scaffold_service` with service name `prisma`, or `mcp_scaffold_package` with name `svc-prisma`, type `service`.

## What It Creates

- `packages/svc-prisma/` with Prisma, Effect
- `prisma/schema.prisma`, `db:generate`, `db:push`, `db:migrate`, `db:studio` scripts
- Optional domain dependency when project has domain package
