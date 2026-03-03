---
name: scaffold-svc-prisma
description: Scaffold a Prisma data service package. Use when adding database/ORM layer.
globs: ["**/packages/svc-prisma/**", "**/svc-prisma/**"]
---

# Scaffold svc-prisma Package

## High-Level Goal

Add a **Prisma data service**—ORM setup with migrations, schema, and DB access. Use when you need type-safe database access in the monorepo.

## Package Type

A **service package** built with **Prisma** and **Effect**: schema, migrations, `db:generate`, `db:push`, `db:migrate`, `db:studio`. Optional domain dependency.

**IDs:** Package type `service`; package name `svc-prisma`.

**Documentation:** [prisma.io](https://prisma.io) — Prisma docs. Use **context7** MCP with library ID `/prisma/docs` for up-to-date docs and code examples.

## When to Use

Use this skill when you need to add a **Prisma data service**.

## Commands

**Create service** (from project root):
```bash
scaffold service prisma
# Or: scaffold package svc-prisma --type=service
```

## What It Creates

- `packages/svc-prisma/` with Prisma, Effect
- `prisma/schema.prisma`, `db:generate`, `db:push`, `db:migrate`, `db:studio` scripts
- Optional domain dependency when project has domain package
