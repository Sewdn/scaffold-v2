---
name: scaffold-project
description: Scaffold a new monorepo project. Use when creating a project from scratch.
globs: []
---

# Scaffold Project

## High-Level Goal

Create a **new monorepo project** with Turborepo, TypeScript, oxlint, oxfmt, and optional packages/apps. Use when starting a project from scratch.

## What It Creates

- Monorepo with turbo, TypeScript, oxlint, oxfmt
- Optional packages: domain, svc-config, ui, ui-lib
- Selected apps (frontend-nextjs, frontend-vite, frontend-tanstack, cli, api-elysia, api-hono, api-fastify, mcp-server, docs, slide-deck)

**App type IDs:** `frontend-nextjs`, `frontend-vite`, `frontend-tanstack`, `cli`, `api-elysia`, `api-hono`, `api-fastify`, `mcp-server`, `documentation`, `slide-deck`.

**Documentation:** Use **context7** MCP for framework docs—e.g. `/vercel/next.js`, `/vitejs/vite`, `/elysiajs/documentation`, `/tanstack/router`, `/fastify/fastify`, `/honojs/hono`.

## When to Use

Use this skill when you need to **create a new monorepo project** with the scaffold structure.

## Commands

**Create project** (from parent directory):
```bash
scaffold project <name> [--template analysis|no-analysis] [--apps ...]
# Example: scaffold project my-app --template no-analysis --apps frontend-vite,api-elysia
```
