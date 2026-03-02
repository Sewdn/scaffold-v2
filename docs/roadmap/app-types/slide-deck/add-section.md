# Slide Deck: add-section

## Command

```
scaffold slide-deck add-section <name>
```

## Description

Add a vertical section (group of slides).

## Injection Target

- **Artifact:** `slides/<name>/` (directory with slide files)

## Status

Planned

---

## Underlying Technology

**Reveal.js** — Vertical sections are nested `<section>` groups; use `data-state` for section-level styling.

## Best Practices & Engineering Patterns

- **Logical grouping:** Group related slides (e.g. "Introduction", "Details", "Summary").
- **Navigation:** Vertical arrow moves between sections; horizontal within.
- **Naming:** Use descriptive section IDs for deep linking.

## Effect Library Usage

- **Minimal:** Sections are structural; no Effect for static content.
- **Build-time:** Optional Effect for generating section index from file structure.

## Implementation Considerations

- **Registry patch:** Create `slides/<name>/` directory; add section wrapper to index.
- **Stub variables:** `{{name}}`, `{{sectionId}}`, `{{slideCount}}`.
- **Idempotency:** Skip if `slides/<name>/` exists; merge section ref into index.

## Alternative Technology Considerations

- **Flat vs nested:** Single-level slides vs vertical stacks; scaffold supports both.
- **Section templates:** Reusable section stubs for common patterns (e.g. "Title + bullets").
