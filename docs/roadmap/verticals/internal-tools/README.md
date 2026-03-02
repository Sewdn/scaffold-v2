# Internal Tools Vertical

**Target:** Admin, reports, workflows.

**Status:** Planned

## App Types

- `frontend-vite` or `frontend-nextjs` — Admin UI
- `backend` — API
- `cli` — Batch jobs, migrations

## Service Packages

- `svc-auth` (SSO, WorkOS)
- `svc-audit` (audit logs)
- `svc-reports` (queries, exports)
- `svc-workflow` (approvals, steps)
- `svc-prisma`
- `domain`
- `ui`, `ui-lib`

## Expansion Commands

| Command                               | Description                                        | Spec              |
| ------------------------------------- | -------------------------------------------------- | ----------------- |
| [add-report](add-report.md)           | Report definition (query, filters, export formats) | svc-reports       |
| [add-workflow](add-workflow.md)       | Workflow (steps, approvals, notifications)         | svc-workflow      |
| [add-admin-page](add-admin-page.md)   | CRUD page for an entity (list, form, actions)      | frontend, backend |
| [add-audit-scope](add-audit-scope.md) | Audit scope (entity + events to log)               | svc-audit         |

## Technology & Patterns

- **WorkOS** (SSO), **Prisma** (audit, reports). Multi-package co-generation (auth + audit + workflow).
- **Effect** for workflow→audit→notification. Alternatives: Supabase Auth, Firebase.
