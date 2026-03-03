---
name: scaffold-svc-config
description: Scaffold the svc-config service package. Use when adding configuration service to a monorepo.
globs: ["**/packages/svc-config/**", "**/pkg-svc-config/**"]
---

# Scaffold svc-config Package

## High-Level Goal

Add **svc-config**—shared configuration service used by backend apps and other services. Use when you need centralized config (env, feature flags, etc.) for backends.

## Package Type

A **service package** for configuration: TypeScript, config handling. Backend-only; never add `ui-*` as a dependency.

**IDs:** Package type `service`; package name `svc-config`.

**Documentation:** svc-config is project-specific. Use **context7** MCP with library ID `/prisma/docs` for env and config patterns in backend services.

## When to Use

Use this skill when you need to add the **svc-config** package.

## Commands

**Create package** (from project root):
```bash
scaffold package svc-config --type=service
```

## What It Creates

- `packages/svc-config/` with TypeScript and config handling
- Backend-only; never add `ui-*` as a dependency to `svc-config`

## Key Points

- svc-config is a core optional package during project create
- Used by backend applications and other `svc-*` packages
- Part of the standard monorepo init when selected
