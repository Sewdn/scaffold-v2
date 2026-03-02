# Slide Deck App Type

**Description:** Reveal.js presentation (Vite + vanilla TS).

**Status:** Planned

## Expansion Commands

| Command                         | Description                                     | Spec                                 |
| ------------------------------- | ----------------------------------------------- | ------------------------------------ |
| [add-slide](add-slide.md)       | Add a slide section                             | `slides/<name>.html` or `index.html` |
| [add-section](add-section.md)   | Add a vertical section (group of slides)        | `slides/<name>/`                     |
| [add-fragment](add-fragment.md) | Add a fragment template for incremental reveals | `slides/fragments/<name>.html`       |

## Underlying Technology

**Reveal.js** — HTML/CSS/JS presentation framework. Vite for build; vanilla TypeScript. Slides are `<section>` elements; vertical nesting for sub-slides.

## Best Practices & Engineering Patterns

- **Slide structure:** One `<section>` per slide; use `data-state` for styling hooks.
- **Fragments:** `class="fragment"` for incremental reveals; `data-fragment-index` for order.
- **Theming:** CSS variables for colors/fonts; keep content separate from layout.

## Effect Library Usage

- **Minimal:** Slide decks are mostly static; Effect not required for content.
- **If dynamic:** Use `Effect.runPromise` for async slide data (e.g. live demos).
- **Build:** Optional Effect in Vite plugins for slide preprocessing.

## Implementation Considerations

- **Registry patching:** Append slide `<section>` to `index.html` or section index; use marker comments.
- **Stub variables:** `{{name}}`, `{{title}}`, `{{content}}`, `{{sectionId}}`.
- **Idempotency:** Skip if slide/section/fragment file exists; merge into index idempotently.

## Alternative Technology Considerations

- **Marp:** Markdown-native slides; different syntax and build. Reveal preferred for HTML flexibility.
- **Impress.js / Bespoke.js:** Other frameworks; Reveal has strong ecosystem and Vite integration.
