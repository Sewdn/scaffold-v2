# Internal Tools: add-report

## Command

```
scaffold internal-tools add-report <name>
```

## Description

Report definition: query, filters, export formats.

## Injection Target

- **svc-reports:** `src/reports/<name>.ts` (query, filters, columns)
- **Backend:** `src/routes/reports/<name>.ts` (API)
- **Frontend:** `src/pages/reports/<Name>.tsx` (optional)

## Co-generation

- `svc-reports` (report definition)
- `backend add-route` (report API)
- `frontend add-page` (report UI)

## Technology & Patterns

- **Prisma** (report config), **svc-reports**. Effect for query→export. Alternatives: Metabase, Retool.

## Status

Planned
