---
name: scaffold-component
description: Scaffold a UI component in an existing package. Use when adding a component to ui or ui-lib.
globs: ["**/packages/ui-lib/**", "**/packages/ui-*/**"]
---

# Scaffold Component

## High-Level Goal

Add a **UI component** to an existing UI package with presentational component + custom hook and Storybook story. Use when you need a new component in ui-lib or a custom ui-* package.

## What It Creates

- Component directory with presentational component + custom hook
- Storybook story file
- Follows container/presentational pattern per software engineering guidelines

**Documentation:** [ui.shadcn.com](https://ui.shadcn.com) — shadcn/ui. Use **context7** MCP with library ID `/shadcn-ui/ui` for component patterns, `/websites/react_dev` for React hooks.

## When to Use

Use this skill when you need to add a **UI component** to an existing UI package (e.g. ui-lib, ui-dashboard).

## Commands

**Create component** (from project root):
```bash
scaffold component <name> <ui-package>
# Example: scaffold component DataTable ui-lib
```
