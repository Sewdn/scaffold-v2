---
name: scaffold-ui
description: Scaffold a custom UI package (ui-*). Use when adding a new UI component library to a monorepo.
globs: ["**/packages/ui-*/**", "**/pkg-ui/**"]
---

# Scaffold UI Package

## High-Level Goal

Add a **custom UI package** to the monorepo—a component library built on shadcn and ui-lib. Use when you need project-specific UI components (e.g. `ui-dashboard`, `ui-forms`).

## Package Type

A **UI package** built with **React**, **shadcn/ui**, and **@workspace/ui-lib**. Depends on both `@workspace/ui` and `@workspace/ui-lib`. Never add `svc-*` packages as dependencies.

**IDs:** Package type `ui`; package name pattern `ui-<name>`.

**Documentation:** [ui.shadcn.com](https://ui.shadcn.com) — shadcn/ui docs. Use **context7** MCP with library ID `/shadcn-ui/ui` for up-to-date docs and code examples.

## When to Use

Use this skill when you need to add a **custom UI package** (e.g. `ui-dashboard`, `ui-forms`).

## Commands

**Create package** (from project root):
```bash
scaffold package <name> --type=ui
# Example: scaffold package ui-dashboard --type=ui
```

## What It Creates

- `packages/ui-<name>/` with React, shadcn, and ui-lib deps
- Depends on both `@workspace/ui` and `@workspace/ui-lib`
- Never add `svc-*` packages as dependencies to UI packages

## Key Points

- Custom UI packages extend the base `ui` and `ui-lib` setup
- Used by frontend applications
- Add ShadCN components via `bunx shadcn@latest add [component]` in the ui package
