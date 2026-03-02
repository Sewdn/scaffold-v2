# Priority Matrix

P0/P1/P2, effort (S/M/L), and dependencies.

## Effort Estimation Rationale

- **S (1–2 days):** Single registry patch, minimal stubs, no co-generation.
- **M (3–5 days):** Multi-file injection, co-gen with 1–2 packages, registry + marker logic.
- **L (1–2 weeks):** New app/package type, full expansion set, Effect integration.

## Effect Migration Path

- Phase 1–2: Native async handlers; Effect optional in services.
- Phase 3+: Effect in hooks (ui-lib), services, cross-package flows.

## Dependency Ordering

- Registry pattern must precede all expansions.
- Service expansions depend on app expansions (routes, pages).
- Verticals depend on Phases 1–5.

## Alternatives

- **Monolithic:** All phases in one release — faster but higher risk.
- **Phased:** Incremental delivery — lower risk, easier to validate.

---

## Effort Legend

| Symbol | Meaning           |
| ------ | ----------------- |
| S      | Small (1–2 days)  |
| M      | Medium (3–5 days) |
| L      | Large (1–2 weeks) |

## Priority Legend

| Priority | Meaning                  |
| -------- | ------------------------ |
| P0       | Must-have for core value |
| P1       | High value, next in line |
| P2       | Nice-to-have, deferred   |

---

## Phase 1: Core App Expansions

| Command                | Priority | Effort | Dependencies              |
| ---------------------- | -------- | ------ | ------------------------- |
| backend add-route      | P0       | M      | Phase 0 (registry)        |
| backend add-service    | P0       | S      | Phase 0                   |
| frontend add-page      | P0       | M      | Phase 0                   |
| frontend add-provider  | P1       | S      | Phase 0                   |
| backend add-plugin     | P1       | M      | add-route                 |
| backend add-middleware | P1       | M      | add-route                 |
| frontend add-module    | P1       | L      | add-page, module scaffold |
| cli add-config         | P2       | S      | Phase 0                   |

---

## Phase 2: Service Package Expansions

| Command                       | Priority | Effort | Dependencies |
| ----------------------------- | -------- | ------ | ------------ |
| svc-prisma add-model          | P0       | M      | Phase 1      |
| svc-auth add-provider         | P0       | M      | Phase 1      |
| svc-elysia-api add-endpoint   | P0       | M      | Phase 1      |
| svc-config add-env            | P0       | S      | Phase 0      |
| svc-prisma add-migration      | P1       | S      | add-model    |
| svc-auth add-strategy         | P1       | M      | add-provider |
| svc-auth add-guard            | P1       | S      | add-provider |
| svc-elysia-api add-middleware | P1       | S      | add-endpoint |
| svc-config add-feature-flag   | P2       | S      | add-env      |

---

## Phase 3: UI and Domain

| Command                         | Priority | Effort | Dependencies  |
| ------------------------------- | -------- | ------ | ------------- |
| domain add-entity               | P0       | M      | Phase 0       |
| domain add-value-object         | P0       | S      | Phase 0       |
| ui-lib add-component            | P0       | M      | (exists)      |
| ui-lib add-hook                 | P0       | S      | add-component |
| ui-lib add-story                | P0       | S      | add-component |
| ui add-shadcn-component         | P0       | S      | Phase 0       |
| domain add-type                 | P1       | S      | Phase 0       |
| domain add-event                | P1       | S      | add-entity    |
| domain add-repository-interface | P1       | M      | add-entity    |
| ui add-theme-variant            | P1       | M      | Phase 0       |

---

## Phase 4: Additional App Types

| Task                     | Priority | Effort | Dependencies |
| ------------------------ | -------- | ------ | ------------ |
| worker app               | P0       | L      | Phase 1      |
| worker add-job           | P0       | M      | worker app   |
| worker add-queue         | P1       | M      | worker app   |
| worker add-schedule      | P1       | S      | worker app   |
| graphql-api app          | P1       | L      | Phase 1      |
| graphql-api add-type     | P0       | M      | graphql app  |
| graphql-api add-resolver | P0       | M      | graphql app  |
| trpc-api app             | P1       | L      | Phase 1      |
| trpc-api add-router      | P0       | M      | trpc app     |
| trpc-api add-procedure   | P0       | M      | trpc app     |
| websocket-server app     | P1       | M      | Phase 1      |
| websocket add-channel    | P0       | M      | ws app       |
| websocket add-handler    | P0       | S      | ws app       |
| email-service app        | P2       | M      | Phase 1      |
| email add-template       | P0       | S      | email app    |
| email add-provider       | P1       | S      | email app    |

---

## Phase 5: Additional Service Packages

| Package           | Priority | Effort | Dependencies |
| ----------------- | -------- | ------ | ------------ |
| svc-email         | P0       | M      | Phase 2      |
| svc-storage       | P0       | M      | Phase 2      |
| svc-queue         | P0       | M      | Phase 2      |
| svc-cache         | P1       | M      | Phase 2      |
| svc-search        | P1       | M      | Phase 2      |
| svc-payments      | P1       | M      | Phase 2      |
| svc-notifications | P1       | M      | Phase 2      |
| svc-analytics     | P1       | M      | Phase 2      |
| svc-workos        | P1       | M      | Phase 2      |
| svc-logging       | P2       | M      | Phase 2      |

---

## Phase 6: Vertical Templates

| Vertical       | Priority | Effort | Dependencies |
| -------------- | -------- | ------ | ------------ |
| SaaS           | P0       | L      | Phases 1–5   |
| E-commerce     | P1       | L      | Phases 1–5   |
| Internal Tools | P1       | M      | Phases 1–5   |
| CMS            | P2       | L      | Phases 1–5   |
| Dev Tools      | P2       | M      | Phases 1–5   |
| Data Pipeline  | P2       | L      | Phases 1–5   |

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
