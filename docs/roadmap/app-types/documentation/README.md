# Documentation App Type

**Description:** Starlight/Astro documentation site.

**Status:** Planned

## Expansion Commands

| Command                           | Description                       | Spec                          |
| --------------------------------- | --------------------------------- | ----------------------------- |
| [add-page](add-page.md)           | Add a page in `src/content/docs/` | `src/content/docs/<name>.md`  |
| [add-sidebar](add-sidebar.md)     | Add a sidebar group in config     | `astro.config.mjs`            |
| [add-component](add-component.md) | Add a custom component            | `src/components/<Name>.astro` |

## Underlying Technology

**Starlight/Astro** — Astro-based docs framework. Content Collections for MD/MDX; file-based routing. Tailwind, search, i18n built-in.

## Best Practices & Engineering Patterns

- **Content collections:** Use `src/content/docs/` with frontmatter; `getEntryBySlug` for programmatic access.
- **Sidebar config:** Define in `astro.config.mjs`; group pages logically.
- **Components:** Astro components for layout; slot-based composition.

## Effect Library Usage

- **Build-time:** Astro is static-first; Effect optional for data fetching in `getStaticPaths`.
- **API routes:** If using server endpoints, wrap in `Effect.runPromise` for Effect-based logic.
- **Context:** Inject config or services via Astro `Astro.locals` or Effect `Context` in server code.

## Implementation Considerations

- **Registry patching:** Update `astro.config.mjs` sidebar; use marker comments for config merge.
- **Stub variables:** `{{name}}`, `{{path}}`, `{{title}}`, `{{sidebarLabel}}`.
- **Idempotency:** Skip if page/component exists; merge sidebar config idempotently.

## Alternative Technology Considerations

- **Docusaurus:** React-based; different content model. Starlight preferred for Astro ecosystem.
- **VitePress:** Vue-based; similar file-based docs. Starlight has stronger Astro integration.
