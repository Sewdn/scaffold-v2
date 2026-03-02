# Internal Tools: add-admin-page

## Command

```
scaffold internal-tools add-admin-page <entity>
```

## Description

CRUD page for an entity: list, form, actions.

## Injection Target

- **Frontend:** `src/pages/admin/<entity>/` (list, create, edit)
- **Backend:** `src/routes/admin/<entity>/` (CRUD API)
- **ui-lib:** `src/components/<Entity>Form/`, `<Entity>Table/` (optional)

## Co-generation

- `frontend add-page` (list, form pages)
- `backend add-route` (CRUD)
- `ui-lib add-component` (form, table)

## Technology & Patterns

- **ui-lib** (form, table), **backend** CRUD. Effect for list→form→submit. Alternatives: Refine, React Admin.

## Status

Planned
