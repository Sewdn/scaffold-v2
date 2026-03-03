# Backend & Realtime Sync Integration Specification

This document specifies the integration of **5 new backend app types** and **2 new realtime sync service packages** into the scaffold-v2 CLI. It consolidates research from Context7, web search, and official documentation.

---

## 1. New Backend App Types

### 1.1 backend-booster (Booster Framework)

| Attribute | Value |
| --------- | ----- |
| **ID** | `backend-booster` |
| **Directory prefix** | `backend-booster` |
| **Package** | `@workspace/app-backend-booster` (to create) |
| **Docs** | https://docs.boosterframework.com |

**Setup:**
```bash
npm install -g @boostercloud/cli
boost new:project <name> --default
```

**Key concepts:** Commands, Events, Entities, Read Models, Reducers. GraphQL API auto-generated. CQRS + Event Sourcing. Deploy to AWS/Azure.

**Expansion commands:** add-command, add-event, add-entity, add-read-model, add-reducer.

---

### 1.2 backend-motia (Motia)

| Attribute | Value |
| --------- | ----- |
| **ID** | `backend-motia` |
| **Directory prefix** | `backend-motia` |
| **Package** | `@workspace/app-backend-motia` (to create) |
| **Docs** | https://www.motia.dev/docs |

**Setup:**
```bash
npx motia@latest create <name>
# --skip-redis for minimal setup
```

**Key concepts:** Steps (config + handler). Triggers: api, event, cron. Built-in: state, streams, emit, logger. File convention: `*.step.ts`.

**Expansion commands:** add-step, add-api-step, add-event-step, add-cron-step, add-flow.

---

### 1.3 backend-temporal (Temporal)

| Attribute | Value |
| --------- | ----- |
| **ID** | `backend-temporal` |
| **Directory prefix** | `backend-temporal` |
| **Package** | `@workspace/app-backend-temporal` (to create) |
| **Docs** | https://docs.temporal.io/develop/typescript |

**Setup:**
```bash
npx @temporalio/create@latest ./<name>
brew install temporal
temporal server start-dev
```

**Key concepts:** Workflows (orchestration), Activities (failure-prone logic), Workers, Client. Durable execution; automatic retries.

**Expansion commands:** add-workflow, add-activity, add-worker, add-client.

---

### 1.4 backend-mastra (Mastra AI)

| Attribute | Value |
| --------- | ----- |
| **ID** | `backend-mastra` |
| **Directory prefix** | `backend-mastra` |
| **Package** | `@workspace/app-backend-mastra` (to create) |
| **Docs** | https://mastra.ai/docs |

**Setup:**
```bash
npm create mastra@latest
```

**Key concepts:** Agents, Tools, Workflows, Scorers, Prompts. Studio at localhost:4111. MCP, RAG, memory support.

**Expansion commands:** add-agent, add-tool, add-workflow, add-scorer, add-prompt.

---

### 1.5 backend-convex (Convex)

| Attribute | Value |
| --------- | ----- |
| **ID** | `backend-convex` |
| **Directory prefix** | `backend-convex` |
| **Package** | `@workspace/app-backend-convex` (to create) |
| **Docs** | https://docs.convex.dev |

**Setup:**
```bash
npm create convex@latest
# Templates: bare, nextjs-shadcn, nextjs-clerk, etc.
```

**Key concepts:** Queries, Mutations, Actions, Schema. Real-time subscriptions. Cron jobs. Often paired with Next.js/Vite.

**Expansion commands:** add-query, add-mutation, add-action, add-schema, add-cron.

---

## 2. New Realtime Sync Service Packages

### 2.1 svc-spacetimedb (SpacetimeDB)

| Attribute | Value |
| --------- | ----- |
| **ID** | `svc-spacetimedb` |
| **Package** | `@workspace/svc-spacetimedb` (to create) |
| **Docs** | https://spacetimedb.com/docs |

**Setup:**
```bash
curl -sSf https://install.spacetimedb.com | sh
spacetime dev --template basic-ts
```

**Key concepts:** Tables, Reducers (server logic in DB), Subscriptions. Real-time sync; high throughput. Good for multiplayer, games, collaborative apps.

**Expansion commands:** add-table, add-reducer, add-module, add-subscription.

---

### 2.2 svc-powersync (PowerSync)

| Attribute | Value |
| --------- | ----- |
| **ID** | `svc-powersync` |
| **Package** | `@workspace/svc-powersync` (to create) |
| **Docs** | https://docs.powersync.com |

**Setup:**
```bash
npm install @powersync/web @journeyapps/wa-sqlite
npm install @powersync/react  # if React
```

**Key concepts:** Sync engine: backend DB ↔ in-app SQLite. Sync rules, buckets, connectors. Offline-first; JWT auth.

**Expansion commands:** add-schema, add-sync-rule, add-bucket, add-connector.

---

## 3. Implementation Checklist

### 3.1 App Type Integration

For each new backend app type:

1. **Create app-type package** under `packages/app-backend-<id>/`:
   - `src/index.ts` exporting `createBackendXxxAppType` or equivalent
   - `stubs/` with Mustache templates for base structure
   - `e2e/scenarios.ts` for E2E validation

2. **Register in registry** (`apps/cli-scaffold/src/app-types/registry.ts`):
   - Import `createBackendBoosterAppType`, etc.
   - Add to `ALL_APP_TYPES` array

3. **Add to project create** (`apps/cli-scaffold/src/commands/project.ts`):
   - Include new IDs in app type choices when `--apps` is used

4. **Create expansion commands** (or delegate to framework CLI where appropriate):
   - Booster: `boost new:command`, `boost new:event`, etc.
   - Motia: custom stubs for `.step.ts` files
   - Temporal: custom stubs for workflows/activities
   - Mastra: custom stubs for agents/tools
   - Convex: custom stubs for convex/*.ts

### 3.2 Service Package Integration

For each new service package:

1. **Create package module** under `apps/cli-scaffold/src/packages/` or `packages/pkg-svc-<id>/`:
   - `PackageConfig` with `getMerge`, `getDependencies`, `getMkdirPaths`, `getScripts`, `stubsDir`
   - `stubs/` with `.stub` files

2. **Register in packages registry** (`apps/cli-scaffold/src/packages/registry.ts`)

3. **Add to optional packages** for project create if desired (e.g. `svc-spacetimedb`, `svc-powersync`)

### 3.3 Scaffolding Strategy

| Framework | Scaffolding approach |
| --------- | -------------------- |
| Booster | Delegate to `boost new:*` or replicate structure from `boost new:project` |
| Motia | Use `npx motia@latest create` for init; custom stubs for add-step |
| Temporal | Use `npx @temporalio/create` for init; custom stubs for add-workflow/add-activity |
| Mastra | Use `npm create mastra` for init; custom stubs for add-agent/add-tool |
| Convex | Use `npm create convex` for init; custom stubs for add-query/add-mutation |
| SpacetimeDB | Use `spacetime init` or `spacetime dev --template`; custom stubs for add-table/add-reducer |
| PowerSync | No create CLI; package adds deps + config; custom stubs for add-schema |

---

## 4. Dependencies Summary

| App/Service | Key npm packages |
| ----------- | ---------------- |
| backend-booster | `@boostercloud/cli`, `@boostercloud/framework-*` |
| backend-motia | `motia` |
| backend-temporal | `@temporalio/client`, `@temporalio/worker`, `@temporalio/workflow`, `@temporalio/activity` |
| backend-mastra | `mastra` (via create-mastra) |
| backend-convex | `convex` (via create-convex) |
| svc-spacetimedb | `@spacetimedb/sdk` (client) |
| svc-powersync | `@powersync/web`, `@journeyapps/wa-sqlite`, `@powersync/react` (optional) |

---

## 5. References

- [Booster Framework](https://www.boosterframework.com) | [Docs](https://docs.boosterframework.com)
- [Motia](https://www.motia.dev) | [Docs](https://www.motia.dev/docs)
- [Temporal](https://temporal.io) | [TypeScript SDK](https://docs.temporal.io/develop/typescript)
- [Mastra](https://mastra.ai) | [Docs](https://mastra.ai/docs)
- [Convex](https://www.convex.dev) | [Docs](https://docs.convex.dev)
- [SpacetimeDB](https://spacetimedb.com) | [Docs](https://spacetimedb.com/docs)
- [PowerSync](https://www.powersync.com) | [Docs](https://docs.powersync.com)
