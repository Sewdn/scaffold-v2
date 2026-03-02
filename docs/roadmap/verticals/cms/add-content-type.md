# CMS: add-content-type

## Command

```
scaffold cms add-content-type <name>
```

## Description

Content model: fields, status, versioning.

## Injection Target

- **Prisma:** `prisma/schema.prisma` (ContentType, ContentField)
- **svc-content:** `src/types/<name>.ts` (field schema)
- **Backend:** `src/routes/content/<name>/` (CRUD)

## Co-generation

- `svc-prisma add-model` (ContentType)
- `domain add-entity` (Content)
- `backend add-route` (content CRUD)

## Technology & Patterns

- **Prisma** (ContentType), **domain** Content. Effect for content→webhook. Alternatives: Strapi, Sanity.

## Status

Planned
