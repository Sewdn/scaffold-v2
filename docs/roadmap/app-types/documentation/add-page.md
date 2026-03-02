# Documentation: add-page

## Command

```
scaffold documentation add-page <path>
```

## Description

Add a documentation page in content directory.

## Injection Target

- **Artifact:** `src/content/docs/<path>.md`

## Status

Planned

---

## Underlying Technology

**Starlight content collections** — Pages live in `src/content/docs/`; frontmatter drives metadata. File path = URL path.

## Best Practices & Engineering Patterns

- **Frontmatter:** `title`, `description`, `sidebar` for nav; optional `draft` for WIP.
- **MDX:** Use `.mdx` for interactive components; `.md` for plain content.
- **Structure:** Flat or nested folders; Starlight builds sidebar from structure.

## Effect Library Usage

- **Static:** Pages are static by default; no Effect for content.
- **Dynamic data:** Use `getCollection` in layout; Effect for async data in `getStaticPaths` if needed.

## Implementation Considerations

- **Registry patch:** N/A for pages; file placement defines routing.
- **Stub variables:** `{{path}}`, `{{title}}`, `{{description}}`, `{{sidebarLabel}}`.
- **Idempotency:** Skip if `src/content/docs/<path>.md` exists.

## Alternative Technology Considerations

- **Co-located components:** Page-specific components in same folder vs global.
- **Content sources:** Local files vs CMS; scaffold assumes local MD/MDX.
