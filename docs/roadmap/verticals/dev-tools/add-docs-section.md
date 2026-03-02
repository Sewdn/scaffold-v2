# Dev Tools: add-docs-section

## Command

```
scaffold dev-tools add-docs-section <name>
```

## Description

Docs section: guide + code samples.

## Injection Target

- **documentation:** `src/content/docs/<name>/` (MD pages)
- **Starlight:** `astro.config.mjs` (sidebar entry)
- **Components:** `src/components/<Name>Example.astro` (optional)

## Co-generation

- `documentation add-page` (guide pages)
- `documentation add-sidebar` (section)
- `documentation add-component` (code demo)

## Technology & Patterns

- **Starlight/Astro** docs. Co-generation with playground examples. Alternatives: Docusaurus, Mintlify.

## Status

Planned
