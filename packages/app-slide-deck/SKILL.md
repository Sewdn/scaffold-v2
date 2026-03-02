---
name: scaffold-app-slide-deck
description: Scaffold a slide deck app (Reveal.js). Use when adding a presentation app.
globs: ["**/apps/slides-*/**", "**/app-slide-deck/**"]
---

# Scaffold Slide Deck App

## When to Use

Use this skill when you need to add a **slide deck application** (Reveal.js).

## Commands

**CLI** (from project root):
```bash
bunx scaffold app <name> --type slide-deck
# Example: bunx scaffold app pitch --type slide-deck → apps/slides-pitch
```

**MCP**: `mcp_scaffold_app` with app name, type `slide-deck`.

## What It Creates

- `apps/slides-<name>/` with Reveal.js
- Markdown and HTML slide support
- Theming and customization
