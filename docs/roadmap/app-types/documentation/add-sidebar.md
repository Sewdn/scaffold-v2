# Documentation: add-sidebar

## Command

```
scaffold documentation add-sidebar <name>
```

## Description

Add a sidebar group in Starlight config.

## Injection Target

- **Registry:** `astro.config.mjs` (sidebar config)

## Status

Planned

---

## Underlying Technology

**Starlight sidebar config** — Defined in `astro.config.mjs`; `sidebar` array with `label` and `items` (links or nested groups).

## Best Practices & Engineering Patterns

- **Logical groups:** Group by topic (e.g. "Getting Started", "API Reference").
- **Auto-generation:** Starlight can auto-generate from file structure; override with config.
- **Collapsible:** Use `collapsed: true` for large sections.

## Effect Library Usage

- **Config:** Sidebar is static config; no Effect for definition.
- **Dynamic sidebar:** If generating from API, use Effect in config build step.

## Implementation Considerations

- **Registry patch:** Append sidebar group to `sidebar` in `astro.config.mjs`; use marker comment.
- **Stub variables:** `{{name}}`, `{{label}}`, `{{items}}`, `{{collapsed}}`.
- **Idempotency:** Merge into existing sidebar; avoid duplicate group labels.

## Alternative Technology Considerations

- **Auto sidebar:** Rely on Starlight auto-generation vs explicit config.
- **Multi-sidebar:** Starlight supports different sidebars per section.
