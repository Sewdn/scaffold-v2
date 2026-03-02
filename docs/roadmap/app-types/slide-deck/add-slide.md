# Slide Deck: add-slide

## Command

```
scaffold slide-deck add-slide <name>
```

## Description

Add a slide section to the presentation.

## Injection Target

- **Artifact:** `slides/<name>.html` or append to `index.html`

## Status

Planned

---

## Underlying Technology

**Reveal.js** — Each slide is a `<section>` element. Horizontal flow by default; vertical nesting for sub-slides.

## Best Practices & Engineering Patterns

- **One idea per slide:** Keep slides focused; use fragments for bullet reveals.
- **Semantic markup:** Use `<h2>`, `<p>`, `<ul>`; avoid inline styles.
- **Accessibility:** Add `aria-label` for screen readers; ensure contrast.

## Effect Library Usage

- **Static content:** No Effect needed for typical slides.
- **Dynamic content:** Use `Effect.runPromise` if slide fetches data (e.g. API demo).

## Implementation Considerations

- **Registry patch:** Append `<section>...</section>` to `index.html` or slides index.
- **Stub variables:** `{{name}}`, `{{title}}`, `{{content}}`.
- **Idempotency:** Skip if slide already exists; merge into index only when new.

## Alternative Technology Considerations

- **Markdown slides:** Reveal supports `.md`; scaffold may use HTML for more control.
- **Separate files:** Single `index.html` vs `slides/<name>.html` + include; choose per project.
