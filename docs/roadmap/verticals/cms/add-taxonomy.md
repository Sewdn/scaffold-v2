# CMS: add-taxonomy

## Command

```
scaffold cms add-taxonomy <name>
```

## Description

Taxonomy: hierarchical or flat, relations.

## Injection Target

- **Prisma:** `prisma/schema.prisma` (Taxonomy, Term)
- **svc-taxonomy:** `src/taxonomies/<name>.ts` (hierarchy logic)

## Co-generation

- `svc-prisma add-model` (Taxonomy, Term)
- `domain add-entity` (TaxonomyTerm)
- `backend add-route` (taxonomy CRUD)

## Technology & Patterns

- **Prisma** (Taxonomy, Term). Effect for taxonomy→content relations. Alternatives: Strapi taxonomies.

## Status

Planned
