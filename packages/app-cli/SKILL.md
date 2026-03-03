---
name: scaffold-app-cli
description: Scaffold a CLI application. Use when adding a command-line tool to the monorepo.
globs: ["**/apps/cli-*/**", "**/app-cli/**"]
---

# Scaffold CLI App

## High-Level Goal

Add a **command-line tool** to the monorepo with Commander for argument parsing and Effect for structured concurrency. Use when you need a CLI for migrations, scripts, or tooling.

## Application Type

A **CLI** built with **Commander** and **Effect**: subcommands, options, services, `bun link` for global install.

**IDs:** App type `cli`; app name pattern `cli-<name>` (e.g. `cli-tools`).

**Documentation:** [github.com/tj/commander.js](https://github.com/tj/commander.js) — Commander.js docs. Use **context7** MCP with library ID `/tj/commander.js` for up-to-date docs and code examples.

## When to Use

Use this skill when you need to add a **CLI application** (e.g. `cli-tools`, `cli-migrate`).

## Commands

**Create app** (from project root):
```bash
scaffold app <name> --type cli
# Example: scaffold app tools --type cli → apps/cli-tools
```

**Expansion commands** (from project root, after app exists):
```bash
scaffold cli add-command <name> [-a <app>] [-d <description>]
scaffold cli add-service <name> [-a <app>] [-d <description>]
# Example: scaffold cli add-command add-user -d "Add a new user"
# Example: scaffold cli add-service db -a cli-tools
```

**Expansion details:** Use context7 MCP (`/tj/commander.js`) with queries like "Commander subcommands", "Commander options".

## What It Creates

- `apps/cli-<name>/` with Commander, Effect, and default hello command
- `bin/run.js` entry point, `bun link` for global install
- `src/commands/` and `src/services/` structure
