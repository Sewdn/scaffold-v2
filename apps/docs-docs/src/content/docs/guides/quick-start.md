---
title: Quick Start
description: Get up and running with Scaffold CLI in minutes
---

## Prerequisites

- **Bun** v1.2.2+ (or Node.js 20+)
- Basic familiarity with monorepos and TypeScript

## Installation

From the Scaffold monorepo:

```bash
bun install
bun run build
```

## Create Your First Project

### Option 1: Full project with apps

Create a monorepo with frontend and backend in one command:

```bash
bun run scaffold project my-app --apps frontend-vite,backend --app-names web,api --non-interactive
cd my-app
bun install
bun run build
```

### Option 2: Incremental setup

Initialize the base structure, then add apps manually:

```bash
bun run scaffold init my-app
cd my-app
bun run scaffold app web --type frontend-vite --non-interactive
bun run scaffold app api --type backend --non-interactive
bun install
bun run build
```

## Run the dev server

```bash
bun run dev
```

Turbo will start all apps in development mode. Visit the frontend and backend URLs shown in the terminal.
