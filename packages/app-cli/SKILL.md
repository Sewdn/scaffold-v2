---
name: scaffold-app-cli
description: Scaffold a CLI application. Use when adding a command-line tool to the monorepo.
globs: ["**/apps/cli-*/**", "**/app-cli/**"]
---

# Scaffold CLI App

## When to Use

Use this skill when you need to add a **CLI application** (e.g. `cli-tools`, `cli-migrate`).

## Commands

**CLI** (from project root):
```bash
bunx scaffold app <name> --type cli
# Example: bunx scaffold app tools --type cli → apps/cli-tools
```

**MCP**: `mcp_scaffold_app` with app name, type `cli`.

## What It Creates

- `apps/cli-<name>/` with Commander, Effect, and default hello command
- `bin/run.js` entry point, `bun link` for global install
- `src/commands/` and `src/services/` structure
