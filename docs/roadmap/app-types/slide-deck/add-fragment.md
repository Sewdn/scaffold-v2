# Slide Deck: add-fragment

## Command

```
scaffold slide-deck add-fragment <name>
```

## Description

Add a fragment template for incremental reveals.

## Injection Target

- **Artifact:** `slides/fragments/<name>.html`

## Status

Planned

---

## Underlying Technology

**Reveal.js** — Fragments use `class="fragment"`; `data-fragment-index` controls reveal order. `data-fragment` for fade/slide/highlight.

## Best Practices & Engineering Patterns

- **Fragment order:** Use `data-fragment-index` when order matters; otherwise DOM order.
- **Animation:** `fade-in`, `fade-up`, `highlight-red`; keep consistent per deck.
- **Reusability:** Store fragment snippets in `slides/fragments/` for composition.

## Effect Library Usage

- **Static:** Fragments are HTML; no Effect for content.
- **Composition:** Optional Effect for assembling fragments from data at build time.

## Implementation Considerations

- **Registry patch:** Add fragment to `slides/fragments/`; optionally register in fragment index.
- **Stub variables:** `{{name}}`, `{{animation}}`, `{{content}}`.
- **Idempotency:** Skip if `slides/fragments/<name>.html` exists.

## Alternative Technology Considerations

- **Inline fragments:** Define fragments in slide files vs separate fragment library.
- **Animation libs:** Reveal built-in vs custom CSS/JS animations.
