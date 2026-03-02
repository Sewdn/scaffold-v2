---
name: scaffold-app-documentation
description: Scaffold a documentation website (Starlight/Astro). Use when adding a docs site.
globs: ["**/apps/docs-*/**", "**/app-documentation/**"]
---

# Scaffold Documentation App

## When to Use

Use this skill when you need to add a **documentation website** (Starlight/Astro).

## Commands

**CLI** (from project root):
```bash
bunx scaffold app <name> --type docs
# Example: bunx scaffold app docs --type docs → apps/docs-docs
```

**MCP**: `mcp_scaffold_app` with app name, type `docs`.

## What It Creates

- `apps/docs-<name>/` with Astro, Starlight
- Content collections, search
- Markdown/MDX-based documentation
