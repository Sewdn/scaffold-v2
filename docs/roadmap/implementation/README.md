# Implementation Phasing

This folder documents the phased approach to implementing expansion commands and new app/service types.

## Documents

| Document | Purpose |
|----------|---------|
| [phases.md](phases.md) | Phase 0–6 breakdown with tasks |
| [priority.md](priority.md) | P0/P1/P2, effort (S/M/L), dependencies |
| [first-sprint.md](first-sprint.md) | Suggested 2-week sprint |

## Phase Overview

| Phase | Focus | Weeks |
|-------|-------|-------|
| 0 | Foundation (registry, CLI expansion) | Current |
| 1 | Core App Expansions (backend, frontend) | 1–3 |
| 2 | Service Package Expansions (prisma, auth, etc.) | 4–6 |
| 3 | UI and Domain Expansions | 7–8 |
| 4 | Additional App Types (worker, GraphQL, tRPC, etc.) | 9–12 |
| 5 | Additional Service Packages | 13–16 |
| 6 | Vertical Templates | 17–20 |

## Dependency Flow

```
Phase 0 → Phase 1 → Phase 2 → Phase 3
                    ↓
Phase 4 (depends on Phase 1)
Phase 5 (depends on Phase 2)
Phase 6 (depends on Phases 1–5)
```
