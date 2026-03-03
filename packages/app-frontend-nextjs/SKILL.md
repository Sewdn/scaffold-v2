---
name: scaffold-app-frontend-nextjs
description: Scaffold a Next.js frontend app. Use when adding a React 19 / Next.js application.
globs: ["**/apps/frontend-*/**", "**/app-frontend-nextjs/**"]
---

# Scaffold Frontend (Next.js) App

## High-Level Goal

Add a **full-stack React frontend** to the monorepo with server components, App Router, and optimized builds. Use when you need a production-ready web app.

## Application Type

A **frontend** built with **Next.js 15+** and **React 19**: App Router, server components, Tailwind, shadcn.

**IDs:** App type `frontend-nextjs`; app name pattern `frontend-<name>` (e.g. `frontend-web`).

**Documentation:** [nextjs.org](https://nextjs.org) — official Next.js docs. Use **context7** MCP with library ID `/vercel/next.js` for up-to-date docs and code examples.

## When to Use

Use this skill when you need to add a **Next.js frontend** (React 19, App Router).

## Commands

**Create app** (from project root):
```bash
scaffold app <name> --type frontend-nextjs
# Example: scaffold app web --type frontend-nextjs → apps/frontend-web
```

## What It Creates

- `apps/frontend-<name>/` with Next.js 15+, React 19, Tailwind, shadcn
- App Router structure
- Uses `@workspace/ui` and `@workspace/ui-lib`
