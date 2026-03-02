---
name: scaffold-component
description: Scaffold a UI component in an existing package. Use when adding a component to ui or ui-lib.
globs: ["**/packages/ui-lib/**", "**/packages/ui-*/**"]
---

# Scaffold Component

## When to Use

Use this skill when you need to add a **UI component** to an existing UI package (e.g. ui-lib, ui-dashboard).

## Commands

**CLI** (from project root):
```bash
bunx scaffold component <name> <ui-package>
# Example: bunx scaffold component DataTable ui-lib
```

**MCP**: `mcp_scaffold_component` with component name and UI package name.

## What It Creates

- Component directory with presentational component + custom hook
- Storybook story file
- Follows container/presentational pattern per software engineering guidelines
