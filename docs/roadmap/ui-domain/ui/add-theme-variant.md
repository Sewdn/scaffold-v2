# UI: add-theme-variant

## Command

```
scaffold ui add-theme-variant <name> [--package ui]
```

## Description

Add theme variant (brand, accent). Extend CSS variables in `globals.css` or `tailwind.config`.

## Injection Target

- **Artifact:** Patch `globals.css` or `tailwind.config`

## Stub

- CSS custom properties stub for `globals.css` patch

## Technology Stack

- **Tailwind** CSS variables in globals.css; Shadcn theme tokens. Alternatives: Chakra theme, Radix CSS vars.

## Status

Planned
