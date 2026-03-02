# Documentation: add-component

## Command

```
scaffold documentation add-component <name>
```

## Description

Add a custom Astro component for docs.

## Injection Target

- **Artifact:** `src/components/<Name>.astro`

## Status

Planned

---

## Underlying Technology

**Astro components** — `.astro` files; slot-based composition. Run on server (SSR) or at build (SSG) depending on usage.

## Best Practices & Engineering Patterns

- **Slots:** Use `<slot />` for composition; named slots for complex layouts.
- **Props:** Type with TypeScript interface; pass from page or layout.
- **Islands:** Add `client:*` for interactivity (React, Vue, etc.) when needed.

## Effect Library Usage

- **Server components:** Use `Effect.runPromise` in server-side Astro components for Effect logic.
- **API/data:** Fetch in `getStaticPaths` or component; Effect for typed async flows.
- **Context:** Inject services via `Astro.locals` if using Effect layers.

## Implementation Considerations

- **Registry patch:** N/A; components imported where used.
- **Stub variables:** `{{name}}`, `{{Name}}`, `{{props}}`.
- **Idempotency:** Skip if `src/components/<Name>.astro` exists.

## Alternative Technology Considerations

- **UI framework:** Astro + React/Vue/Solid for interactive parts; scaffold may add framework option.
- **Shared components:** Docs-specific vs shared `ui` package; scaffold creates docs-local by default.
