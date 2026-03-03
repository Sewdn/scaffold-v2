---
name: scaffold-app-documentation
description: Scaffold a documentation website (Starlight/Astro). Use when adding a docs site.
globs: ["**/apps/docs-*/**", "**/app-documentation/**"]
---

# Scaffold Documentation App

## High-Level Goal

Add a **documentation website** to the monorepo with content collections, search, and Markdown/MDX. Use when you need a fast, accessible docs site.

## Application Type

A **docs site** built with **Astro** and **Starlight**: content collections, search, theming, Markdown/MDX.

**IDs:** App type `documentation`; app name pattern `docs-<name>` (e.g. `docs-docs`).

**Documentation:** [starlight.astro.build](https://starlight.astro.build) — Starlight docs. Use **context7** MCP with library ID `/withastro/starlight` for up-to-date docs and code examples.

## When to Use

Use this skill when you need to add a **documentation website** (Starlight/Astro).

## Commands

**Create app** (from project root):
```bash
scaffold app <name> --type documentation
# Example: scaffold app docs --type documentation → apps/docs-docs
```

## What It Creates

- `apps/docs-<name>/` with Astro, Starlight
- Content collections, search
- Markdown/MDX-based documentation
