---
name: scaffold-ui-lib
description: Scaffold the ui-lib package. Use when adding the custom UI component library base.
globs: ["**/packages/ui-lib/**", "**/pkg-ui-lib/**"]
---

# Scaffold ui-lib Package

## When to Use

Use this skill when you need to add **ui-lib**—the custom UI components library that depends on `@workspace/ui` (shadcn) and provides project-specific components.

## Commands

**CLI** (from project root):
```bash
bunx scaffold package ui-lib --type=ui
```

**MCP**: `mcp_scaffold_ui` with UI package name `ui-lib`.

## What It Creates

- `packages/ui-lib/` with shadcn-based component structure
- Depends on `@workspace/ui`
- Custom `ui-*` packages depend on both `ui` and `ui-lib`

## Key Points

- ui-lib is the base for project-specific UI components
- Add components in `ui-lib/src/components/<name>/` with hooks and stories
- Presentational components + custom hook pattern per the software engineering guidelines
