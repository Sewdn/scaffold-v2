# Internal Tools: add-workflow

## Command

```
scaffold internal-tools add-workflow <name>
```

## Description

Workflow: steps, approvals, notifications.

## Injection Target

- **svc-workflow:** `src/workflows/<name>.ts` (steps, transitions)
- **Prisma:** `prisma/schema.prisma` (Workflow, WorkflowInstance, Step)
- **Backend:** `src/routes/workflows/` (start, approve, list)

## Co-generation

- `svc-prisma add-model` (Workflow, WorkflowInstance)
- `svc-workflow` (step definitions)
- `svc-email add-template` (approval notifications)
- `backend add-route` (workflow API)

## Technology & Patterns

- **Prisma** (Workflow, Step), **svc-email**. Effect for step→approval→notify. Alternatives: Temporal, Inngest.

## Status

Planned
