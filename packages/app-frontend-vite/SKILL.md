---
name: scaffold-app-frontend-vite
description: Scaffold a Vite React frontend app. Use when adding a Vite-based SPA.
globs: ["**/apps/frontend-*/**", "**/app-frontend-vite/**"]
---

# Scaffold Frontend (Vite) App

## High-Level Goal

Add a **Vite-based SPA** to the monorepo with instant HMR and optimized builds. Use when you need a fast, lean React frontend.

## Application Type

A **frontend** built with **Vite** and **React 19**: instant server start, lightning-fast HMR, React Router, React Query, Tailwind, shadcn.

**IDs:** App type `frontend-vite`; app name pattern `frontend-<name>` (e.g. `frontend-admin`).

**Documentation:** [vitejs.dev](https://vitejs.dev) — official Vite docs. Use **context7** MCP with library ID `/vitejs/vite` for up-to-date docs and code examples.

## When to Use

Use this skill when you need to add a **Vite frontend** (React 19, Vite, fast HMR).

## Commands

**Create app** (from project root):
```bash
scaffold app <name> --type frontend-vite
# Example: scaffold app admin --type frontend-vite → apps/frontend-admin
```

## What It Creates

- `apps/frontend-<name>/` with Vite, React 19, Tailwind, shadcn
- React Router, React Query
- Uses `@workspace/ui` and `@workspace/ui-lib`
