---
name: scaffold-svc-config
description: Scaffold the svc-config service package. Use when adding configuration service to a monorepo.
globs: ["**/packages/svc-config/**", "**/pkg-svc-config/**"]
---

# Scaffold svc-config Package

## When to Use

Use this skill when you need to add the **svc-config** package—shared configuration service used by backend apps and other services.

## Commands

**CLI** (from project root):
```bash
bunx scaffold package svc-config --type=service
```

**MCP**: `mcp_scaffold_package` with package name `svc-config`, type `service`.

## What It Creates

- `packages/svc-config/` with TypeScript and config handling
- Backend-only; never add `ui-*` as a dependency to `svc-config`

## Key Points

- svc-config is a core optional package during project create
- Used by backend applications and other `svc-*` packages
- Part of the standard monorepo init when selected
