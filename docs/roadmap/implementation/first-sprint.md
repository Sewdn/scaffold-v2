# Suggested First Sprint (2 weeks)

A focused 2-week sprint to deliver core expansion value.

## Goals

1. Backend: `add-route`, `add-service`
2. Frontend: `add-page`, `add-provider`
3. svc-prisma: `add-model`
4. Domain: `add-entity`, `add-value-object`
5. Document patterns and update README

---

## Week 1

### Days 1–2: Backend

| Task | Effort | Notes |
|------|--------|-------|
| `backend add-route` | M | Route plugin, registry patch |
| `backend add-service` | S | Package dep + import in app |

**Deliverables:** Stubs, registry logic, tests for both commands.

### Days 3–4: Frontend

| Task | Effort | Notes |
|------|--------|-------|
| `frontend add-page` | M | File-based routing (Next.js + Vite) |
| `frontend add-provider` | S | Context + provider component |

**Deliverables:** Stubs for both app types, tests.

### Day 5: svc-prisma

| Task | Effort | Notes |
|------|--------|-------|
| `svc-prisma add-model` | M | Prisma schema + migration |

**Deliverables:** Schema patch, migration generation, tests.

---

## Week 2

### Days 1–2: Domain

| Task | Effort | Notes |
|------|--------|-------|
| `domain add-entity` | M | Entity + barrel export |
| `domain add-value-object` | S | Value object + barrel |

**Deliverables:** Stubs, barrel exports, tests.

### Days 3–4: Integration & Polish

| Task | Notes |
|------|-------|
| E2E tests | Full flow: project create → add backend → add route → add model |
| Co-generation | Ensure add-route + add-model work together |
| Docs | Update README, patterns doc |

### Day 5: Buffer & Cleanup

| Task | Notes |
|------|-------|
| Fix issues | Address any bugs from tests |
| Code review | Ensure patterns are consistent |
| Documentation | Finalize patterns and update roadmap |

---

## Success Criteria

- **Deterministic:** Same inputs produce same outputs
- **Registry-driven:** All expansions patch registries, not ad-hoc files
- **Documented:** Each expansion has a stub and a doc entry
- **Tested:** E2E tests for each expansion command

---

## Out of Scope (This Sprint)

- add-plugin, add-middleware
- add-module
- add-migration
- add-hook, add-story
- add-shadcn-component, add-theme-variant

---

## Effort & Effect Rationale

- **Effort:** S = 1–2 days (add-service); M = 3–5 days (add-route, add-page, add-model). First sprint focuses on core value.
- **Effect migration:** Defer Effect to Phase 2–3; handlers use native async. Effect adoption in services/hooks later.
- **Dependency ordering:** Registry → backend → frontend → prisma → domain. Order matches implementation sequence.
- **Alternatives:** Monolithic (all expansions in one sprint) vs phased — phased chosen for validation and feedback.
