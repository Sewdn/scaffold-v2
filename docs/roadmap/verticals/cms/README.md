# Content/CMS Vertical

**Target:** Posts, media, taxonomy.

**Status:** Planned

## App Types

- `frontend-nextjs` — Site
- `backend` — API
- `documentation` or `frontend-vite` (optional) — Admin

## Service Packages

- `svc-content` (posts, pages, drafts)
- `svc-media` (uploads, transforms, CDN)
- `svc-taxonomy` (tags, categories)
- `svc-prisma`
- `domain`
- `ui`, `ui-lib`

## Expansion Commands

| Command | Description | Spec |
|---------|-------------|------|
| [add-content-type](add-content-type.md) | Content model (fields, status, versioning) | svc-content, prisma |
| [add-taxonomy](add-taxonomy.md) | Taxonomy (hierarchical or flat, relations) | svc-taxonomy, prisma |
| [add-media-preset](add-media-preset.md) | Image/video presets (sizes, formats, CDN) | svc-media |
| [add-webhook](add-webhook.md) | Publish/update webhooks for headless consumers | svc-content |

## Technology & Patterns

- **Prisma** (content, media, taxonomy). Multi-package co-generation (content + media + taxonomy).
- **Effect** for content→media→webhook flow. Alternatives: Strapi, Sanity, Contentful.
