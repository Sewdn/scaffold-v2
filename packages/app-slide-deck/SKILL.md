---
name: scaffold-app-slide-deck
description: Scaffold a slide deck app (Reveal.js). Use when adding a presentation app.
globs: ["**/apps/slides-*/**", "**/app-slide-deck/**"]
---

# Scaffold Slide Deck App

## High-Level Goal

Add a **presentation app** to the monorepo with Markdown and HTML slides, theming, and PDF export. Use when you need pitch decks, tutorials, or talks.

## Application Type

A **slide deck** built with **Reveal.js**: nested slides, Markdown support, theming, PDF export.

**IDs:** App type `slide-deck`; app name pattern `slides-<name>` (e.g. `slides-pitch`).

**Documentation:** [revealjs.com](https://revealjs.com) — Reveal.js docs. Use **context7** MCP with library ID `/hakimel/reveal.js` for up-to-date docs and code examples.

## When to Use

Use this skill when you need to add a **slide deck application** (Reveal.js).

## Commands

**Create app** (from project root):
```bash
scaffold app <name> --type slide-deck
# Example: scaffold app pitch --type slide-deck → apps/slides-pitch
```

## What It Creates

- `apps/slides-<name>/` with Reveal.js
- Markdown and HTML slide support
- Theming and customization
