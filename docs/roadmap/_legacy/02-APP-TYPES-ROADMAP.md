# App Types Roadmap

This document lists all app types (existing and proposed) with their expansion commands. Each expansion command injects deterministic code following the registry pattern.

---

## Existing App Types

### 1. frontend-nextjs

**Description:** Next.js 15+ with App Router, React 19, TypeScript.

| Expansion Command | Description | Injection Target |
|-------------------|-------------|------------------|
| `add-page` | Add a page route under `app/` | `app/<name>/page.tsx` |
| `add-layout` | Add a layout component | `app/<name>/layout.tsx` |
| `add-route` | Add a route group with page + optional layout | `app/<name>/` |
| `add-api` | Add an API route handler | `app/api/<name>/route.ts` |
| `add-component` | Add a component in `components/` | `components/<Name>/` |
| `add-middleware` | Add middleware logic (e.g. auth) | `middleware.ts` or `middleware/<name>.ts` |

**Status:** Planned

---

### 2. frontend-vite

**Description:** Vite + React with client-side routing.

| Expansion Command | Description | Injection Target |
|-------------------|-------------|------------------|
| `add-page` | Add a page component and route entry | `src/pages/<Name>.tsx`, routes config |
| `add-layout` | Add a layout wrapper component | `src/layouts/<Name>.tsx` |
| `add-route` | Add a route with path + component | Routes config |
| `add-component` | Add a component in `components/` | `src/components/<Name>/` |
| `add-hook` | Add a custom hook in `hooks/` | `src/hooks/use<Name>.ts` |

**Status:** Planned

---

### 3. frontend-tanstack

**Description:** TanStack Start full-stack React app.

| Expansion Command | Description | Injection Target |
|-------------------|-------------|------------------|
| `add-page` | Add a page route (file-router pattern) | `src/routes/<name>.tsx` |
| `add-layout` | Add a layout component | `src/components/layouts/` |
| `add-api` | Add an API route handler | `src/routes/api/<name>.ts` |
| `add-component` | Add a component in `components/` | `src/components/<Name>/` |
| `add-addon` | Add a TanStack add-on (e.g. clerk, drizzle) | Delegates to TanStack CLI |

**Status:** Planned

---

### 4. cli

**Description:** CLI (Effect + Commander).

| Expansion Command | Description | Injection Target |
|-------------------|-------------|------------------|
| `add-command` | Add a command and register in commands index | `src/commands/<name>.ts`, `src/commands/index.ts` |
| `add-service` | Add a service in `src/services/` | `src/services/<name>.ts` |

**Status:** ✅ Implemented

---

### 5. backend

**Description:** Backend API (Elysia.js) with Swagger, CORS.

| Expansion Command | Description | Injection Target |
|-------------------|-------------|------------------|
| `add-route` | Add a route plugin | `src/routes/<name>.ts`, `src/index.ts` or routes registry |
| `add-middleware` | Add middleware and register in app chain | `src/middleware/<name>.ts` |
| `add-plugin` | Add a custom Elysia plugin | `src/plugins/<name>.ts` |
| `add-handler` | Add a single handler file for a route group | `src/handlers/<name>.ts` |

**Status:** Planned

---

### 6. mcp-server

**Description:** Model Context Protocol server (MCP SDK).

| Expansion Command | Description | Injection Target |
|-------------------|-------------|------------------|
| `add-tool` | Add a tool definition and register in server | `src/tools/<name>.ts`, tools registry |
| `add-resource` | Add a resource template | `src/resources/<name>.ts` |
| `add-prompt` | Add a prompt template | `src/prompts/<name>.ts` |

**Status:** Planned

---

### 7. slide-deck

**Description:** Reveal.js presentation (Vite + vanilla TS).

| Expansion Command | Description | Injection Target |
|-------------------|-------------|------------------|
| `add-slide` | Add a slide section | `slides/<name>.html` or `index.html` |
| `add-section` | Add a vertical section (group of slides) | `slides/<name>/` |
| `add-fragment` | Add a fragment template for incremental reveals | `slides/fragments/<name>.html` |

**Status:** Planned

---

### 8. documentation

**Description:** Starlight/Astro documentation site.

| Expansion Command | Description | Injection Target |
|-------------------|-------------|------------------|
| `add-page` | Add a page in `src/content/docs/` | `src/content/docs/<name>.md` |
| `add-sidebar` | Add a sidebar group in config | `astro.config.mjs` |
| `add-component` | Add a custom component | `src/components/<Name>.astro` |

**Status:** Planned

---

## Proposed App Types

### 9. worker

**Description:** Background worker (Bun workers, job queues, cron).

| Expansion Command | Description | Injection Target |
|-------------------|-------------|------------------|
| `add-job` | Add a job handler | `src/jobs/<name>.ts` |
| `add-cron` | Add a cron schedule + handler | `src/cron/<name>.ts` |
| `add-queue` | Add a queue consumer | `src/queues/<name>.ts` |
| `add-task` | Add a one-off task handler | `src/tasks/<name>.ts` |

**Status:** Proposed

---

### 10. graphql-api

**Description:** GraphQL API (Pothos, Yoga, or GraphQL.js).

| Expansion Command | Description | Injection Target |
|-------------------|-------------|------------------|
| `add-type` | Add a GraphQL type | `src/schema/types/<name>.ts` |
| `add-resolver` | Add a resolver (query/mutation) | `src/resolvers/<name>.ts` |
| `add-schema` | Add a schema module | `src/schema/<name>.ts` |
| `add-datasource` | Add a data source | `src/datasources/<name>.ts` |

**Status:** Proposed

---

### 11. trpc-api

**Description:** tRPC API (end-to-end typesafe).

| Expansion Command | Description | Injection Target |
|-------------------|-------------|------------------|
| `add-router` | Add a tRPC router | `src/routers/<name>.ts` |
| `add-procedure` | Add a procedure (query/mutation) | `src/procedures/<name>.ts` |
| `add-middleware` | Add tRPC middleware | `src/middleware/<name>.ts` |

**Status:** Proposed

---

### 12. websocket-server

**Description:** WebSocket server (Elysia WS or ws).

| Expansion Command | Description | Injection Target |
|-------------------|-------------|------------------|
| `add-channel` | Add a channel/room handler | `src/channels/<name>.ts` |
| `add-handler` | Add a message handler | `src/handlers/<name>.ts` |
| `add-middleware` | Add connection middleware | `src/middleware/<name>.ts` |

**Status:** Proposed

---

### 13. email-service

**Description:** Email sending service (Resend, Nodemailer).

| Expansion Command | Description | Injection Target |
|-------------------|-------------|------------------|
| `add-template` | Add an email template | `src/templates/<name>.ts` |
| `add-handler` | Add a send handler (e.g. welcome, reset) | `src/handlers/<name>.ts` |
| `add-transport` | Add a transport config | `src/transports/<name>.ts` |

**Status:** Proposed

---

### 14. mobile (Capacitor)

**Description:** Web-based mobile app with Capacitor.

| Expansion Command | Description | Injection Target |
|-------------------|-------------|------------------|
| `add-screen` | Add a screen/route | `src/screens/<Name>.tsx` |
| `add-plugin` | Add a Capacitor plugin config | `capacitor.config.ts` |
| `add-component` | Add a component | `src/components/<Name>/` |

**Status:** Proposed (stretch)

---

### 15. desktop (Tauri)

**Description:** Desktop app with Tauri (Rust + web frontend).

| Expansion Command | Description | Injection Target |
|-------------------|-------------|------------------|
| `add-command` | Add a Tauri command (Rust backend) | `src-tauri/src/commands/<name>.rs` |
| `add-window` | Add a window config | `src-tauri/tauri.conf.json` |
| `add-plugin` | Add a Tauri plugin | `src-tauri/plugins/` |

**Status:** Proposed (stretch)

---

### 16. cron

**Description:** Cron/scheduled jobs (Railway cron, GitHub Actions).

| Expansion Command | Description | Injection Target |
|-------------------|-------------|------------------|
| `add-job` | Add a cron job with schedule | `src/jobs/<name>.ts` |
| `add-task` | Add a task script | `src/tasks/<name>.ts` |

**Status:** Proposed

---

## Summary Table

| App Type ID | Status | Expansion Commands |
|-------------|--------|-------------------|
| frontend-nextjs | Planned | add-page, add-layout, add-route, add-api, add-component, add-middleware |
| frontend-vite | Planned | add-page, add-layout, add-route, add-component, add-hook |
| frontend-tanstack | Planned | add-page, add-layout, add-api, add-component, add-addon |
| cli | ✅ Implemented | add-command, add-service |
| backend | Planned | add-route, add-middleware, add-plugin, add-handler |
| mcp-server | Planned | add-tool, add-resource, add-prompt |
| slide-deck | Planned | add-slide, add-section, add-fragment |
| documentation | Planned | add-page, add-sidebar, add-component |
| worker | Proposed | add-job, add-cron, add-queue, add-task |
| graphql-api | Proposed | add-type, add-resolver, add-schema, add-datasource |
| trpc-api | Proposed | add-router, add-procedure, add-middleware |
| websocket-server | Proposed | add-channel, add-handler, add-middleware |
| email-service | Proposed | add-template, add-handler, add-transport |
| mobile | Proposed | add-screen, add-plugin, add-component |
| desktop | Proposed | add-command, add-window, add-plugin |
| cron | Proposed | add-job, add-task |
