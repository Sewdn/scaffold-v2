# Implementation Priority and Phasing

This document outlines a phased approach to implementing the expansion commands and new app/service types, with clear priorities and dependencies.

---

## Phase 0: Foundation (Current)

**Status:** In progress / partially done.

- [x] CLI expansion: `add-command`, `add-service`
- [x] Registry pattern and stub layout
- [x] Documentation structure

---

## Phase 1: Core App Expansions (Weeks 1–3)

**Goal:** Expand the most-used app types with a small set of high-value commands.

### 1.1 Backend App

| Command          | Priority | Effort | Notes                        |
| ---------------- | -------- | ------ | ---------------------------- |
| `add-route`      | P0       | M      | Most requested; patch router |
| `add-service`    | P0       | S      | Add package dep + import     |
| `add-plugin`     | P1       | M      | Elysia plugin pattern        |
| `add-middleware` | P1       | M      | Middleware registration      |

### 1.2 Frontend (Next.js / Vite)

| Command        | Priority | Effort | Notes                 |
| -------------- | -------- | ------ | --------------------- |
| `add-page`     | P0       | M      | File-based routing    |
| `add-provider` | P1       | S      | Context + provider    |
| `add-module`   | P1       | L      | Reuse module scaffold |

### 1.3 CLI App (extend)

| Command      | Priority | Effort | Notes             |
| ------------ | -------- | ------ | ----------------- |
| (existing)   | —        | —      | Already done      |
| `add-config` | P2       | S      | Config file / env |

---

## Phase 2: Service Package Expansions (Weeks 4–6)

**Goal:** Enable expansion of the most common service packages.

### 2.1 svc-prisma

| Command         | Priority | Effort | Notes                     |
| --------------- | -------- | ------ | ------------------------- |
| `add-model`     | P0       | M      | Prisma schema + migration |
| `add-migration` | P1       | S      | Empty migration           |

### 2.2 svc-auth

| Command        | Priority | Effort | Notes                |
| -------------- | -------- | ------ | -------------------- |
| `add-provider` | P0       | M      | Auth provider config |
| `add-strategy` | P1       | M      | Custom strategy      |
| `add-guard`    | P1       | S      | Route guard          |

### 2.3 svc-elysia-api

| Command          | Priority | Effort | Notes                   |
| ---------------- | -------- | ------ | ----------------------- |
| `add-endpoint`   | P0       | M      | CRUD endpoint           |
| `add-middleware` | P1       | S      | Per-endpoint middleware |

### 2.4 svc-config

| Command            | Priority | Effort | Notes                |
| ------------------ | -------- | ------ | -------------------- |
| `add-env`          | P0       | S      | Env var + validation |
| `add-feature-flag` | P2       | S      | Feature flag         |

---

## Phase 3: UI and Domain Expansions (Weeks 7–8)

**Goal:** Support component and domain modeling expansion.

### 3.1 UI / ui-lib

| Command                | Priority | Effort | Notes                                  |
| ---------------------- | -------- | ------ | -------------------------------------- |
| `add-component`        | P0       | M      | Already exists as `scaffold component` |
| `add-hook`             | P0       | S      | Hook for component                     |
| `add-story`            | P0       | S      | Storybook story                        |
| `add-shadcn-component` | P0       | S      | Delegate to Shadcn CLI                 |
| `add-theme-variant`    | P1       | M      | CSS variables                          |

### 3.2 Domain

| Command                    | Priority | Effort | Notes              |
| -------------------------- | -------- | ------ | ------------------ |
| `add-entity`               | P0       | M      | Entity + barrel    |
| `add-value-object`         | P0       | S      | Value object       |
| `add-type`                 | P1       | S      | Shared type        |
| `add-event`                | P1       | S      | Domain event       |
| `add-repository-interface` | P1       | M      | Interface + barrel |

---

## Phase 4: Additional App Types (Weeks 9–12)

**Goal:** Add new app types and their expansion commands.

### 4.1 Worker App

| Task              | Priority | Effort |
| ----------------- | -------- | ------ |
| App type scaffold | P0       | L      |
| `add-job`         | P0       | M      |
| `add-queue`       | P1       | M      |
| `add-schedule`    | P1       | S      |

### 4.2 GraphQL API

| Task              | Priority | Effort |
| ----------------- | -------- | ------ |
| App type scaffold | P1       | L      |
| `add-type`        | P0       | M      |
| `add-resolver`    | P0       | M      |

### 4.3 tRPC API

| Task              | Priority | Effort |
| ----------------- | -------- | ------ |
| App type scaffold | P1       | L      |
| `add-router`      | P0       | M      |
| `add-procedure`   | P0       | M      |

### 4.4 WebSocket Server

| Task              | Priority | Effort |
| ----------------- | -------- | ------ |
| App type scaffold | P1       | M      |
| `add-channel`     | P0       | M      |
| `add-handler`     | P0       | S      |

### 4.5 Email Service

| Task              | Priority | Effort |
| ----------------- | -------- | ------ |
| App type scaffold | P2       | M      |
| `add-template`    | P0       | S      |
| `add-provider`    | P1       | S      |

### 4.6 Mobile / Desktop / Cron

| Task               | Priority | Effort |
| ------------------ | -------- | ------ |
| App type scaffold  | P2       | L each |
| Expansion commands | P2       | M each |

---

## Phase 5: Additional Service Packages (Weeks 13–16)

**Goal:** Add new service packages and their expansions.

### 5.1 High Priority

| Package     | Priority | Expansion Commands            |
| ----------- | -------- | ----------------------------- |
| svc-email   | P0       | add-template, add-provider    |
| svc-storage | P0       | add-bucket, add-preset        |
| svc-queue   | P0       | add-queue, add-handler        |
| svc-cache   | P1       | add-namespace, add-ttl-preset |
| svc-search  | P1       | add-index, add-analyzer       |

### 5.2 Medium Priority

| Package           | Priority | Expansion Commands                      |
| ----------------- | -------- | --------------------------------------- |
| svc-payments      | P1       | add-provider, add-product-type          |
| svc-notifications | P1       | add-channel, add-template               |
| svc-analytics     | P1       | add-event, add-dashboard                |
| svc-workos        | P1       | add-connection, add-organization-schema |
| svc-logging       | P2       | add-transport, add-format               |

---

## Phase 6: Vertical Templates (Weeks 17–20)

**Goal:** Implement vertical presets and vertical-specific expansion commands.

### 6.1 Vertical Presets

| Vertical       | Priority | Effort |
| -------------- | -------- | ------ |
| SaaS Starter   | P0       | L      |
| E-commerce     | P1       | L      |
| Internal Tools | P1       | M      |
| CMS            | P2       | L      |
| Dev Tools      | P2       | M      |
| Data Pipeline  | P2       | L      |

### 6.2 Vertical Expansion Commands

Implement per vertical; start with SaaS (`add-tenant`, `add-plan`, `add-invite-flow`, `add-usage-meter`).

---

## Effort Legend

| Symbol | Meaning           |
| ------ | ----------------- |
| S      | Small (1–2 days)  |
| M      | Medium (3–5 days) |
| L      | Large (1–2 weeks) |

---

## Dependency Graph

```
Phase 0 (Foundation)
    ↓
Phase 1 (Core App Expansions) ← depends on registry pattern
    ↓
Phase 2 (Service Expansions) ← depends on Phase 1
    ↓
Phase 3 (UI/Domain) ← can run in parallel with Phase 2
    ↓
Phase 4 (New App Types) ← depends on Phase 1 patterns
    ↓
Phase 5 (New Service Packages) ← depends on Phase 2 patterns
    ↓
Phase 6 (Verticals) ← depends on Phases 1–5
```

---

## Suggested First Sprint (2 weeks)

1. Backend: `add-route`, `add-service`
2. Frontend: `add-page`, `add-provider`
3. svc-prisma: `add-model`
4. Domain: `add-entity`, `add-value-object`
5. Document patterns and update README

---

## Success Criteria

- **Deterministic:** Same inputs produce same outputs
- **Registry-driven:** All expansions patch registries, not ad-hoc files
- **Documented:** Each expansion has a stub and a doc entry
- **Tested:** E2E tests for each expansion command
