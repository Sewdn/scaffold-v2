---
name: scaffold-ui-lib
description: Scaffold the ui-lib package. Use when adding the custom UI component library base.
globs: ["**/packages/ui-lib/**", "**/pkg-ui-lib/**"]
---

# Scaffold ui-lib Package

## High-Level Goal

Add **ui-lib**—the base custom UI components library that depends on shadcn and provides project-specific components. Use when setting up the shared component layer for frontends.

## Package Type

A **UI library** built on **shadcn/ui** (`@workspace/ui`). Custom `ui-*` packages depend on both `ui` and `ui-lib`.

**IDs:** Package type `ui`; package name `ui-lib`.

**Documentation:** [ui.shadcn.com](https://ui.shadcn.com) — shadcn/ui docs. Use **context7** MCP with library ID `/shadcn-ui/ui` for up-to-date docs and code examples.

## When to Use

Use this skill when you need to add **ui-lib**—the custom UI components library base.

## Commands

**Create package** (from project root):
```bash
scaffold package ui-lib --type=ui
```

## What It Creates

- `packages/ui-lib/` with shadcn-based component structure
- Depends on `@workspace/ui`
- Custom `ui-*` packages depend on both `ui` and `ui-lib`

## Key Points

- ui-lib is the base for project-specific UI components
- Add components in `ui-lib/src/components/<name>/` with hooks and stories
- Presentational components + custom hook pattern per the software engineering guidelines
