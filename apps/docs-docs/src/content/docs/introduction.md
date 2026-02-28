---
title: Introduction
description: Vision and approach of the Scaffold CLI v2
---

## Layered Approach

Scaffold v2 uses a layered approach: underlying commands (bun, bunx, npx, shell) are orchestrated in the right sequence to construct the monorepo.

- **Template files are copied and rendered** — Mustache stub files (`.stub`) are discovered, rendered with context (project name, app name, etc.), and written to the output directory. Used for app types (backend, CLI, MCP server) and optional packages (domain, svc-config, ui, ui-lib).
- **Extra commands extend the generated code** — On top of stub generation, additional commands run to bootstrap projects (e.g. `bun create vite@latest`, `bun create astro@latest`), install dependencies, and configure tooling.
- **Dependency management is consolidated and centralized** — TypeScript package versions live in a single source of truth (`packages/dependencies.ts`). Profiles (base, React, Shadcn, Elysia, etc.) are composed and applied consistently across packages and apps.
- **Reproducible and transparent** — Every step is explicit; umbrella commands invoke subcommand sequences in a defined order.

## Composable Command Architecture

Commands are organized as umbrella templates that invoke subcommand templates. For example, `scaffold project` runs a sequence that includes `scaffold init` (base structure) plus optional app creation.

## Effect-First

The CLI uses the [Effect](https://effect.website/) TypeScript library for orchestration, error handling, and composability. New applications and packages can include Effect as a dependency.

## Target Audience

- **AI agents (primary)**: Documented CLI API for scaffolding without generating code manually. Engineers instruct agents to scaffold applications and projects, then implement business logic.
- **Engineers**: Use the CLI directly or via an MCP server that exposes these commands.
