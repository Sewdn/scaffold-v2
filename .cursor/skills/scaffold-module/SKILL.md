---
name: scaffold-module
description: Scaffold a module (service + UI package pair). Use when adding a full-stack feature.
globs: ["**/packages/svc-*/**", "**/packages/ui-*/**"]
---

# Scaffold Module

## High-Level Goal

Add a **module**—a full-stack feature unit with both a service package and a UI package, loosely coupled via domain types. Use when you need a feature that spans backend and frontend.

## What It Creates

- `packages/svc-<name>/` – backend service
- `packages/ui-<name>/` – UI components
- Both depend on `domain` for shared types
- Tie together in app via backend impl + context provider

**Documentation:** Use **context7** MCP with `/shadcn-ui/ui` for UI components, `/prisma/docs` for service/DB patterns, `/websites/react_dev` for React context providers.

## When to Use

Use this skill when you need to add a **module**—a feature unit with both service and UI packages.

## Commands

**Create module** (from project root):
```bash
scaffold module <name>
# Example: scaffold module auth → packages/svc-auth + packages/ui-auth
```
