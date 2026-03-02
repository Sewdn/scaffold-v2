# UI-Lib: add-variant

## Command

```
scaffold component add-variant <name> <variant> [--package ui-lib]
```

## Description

Add a variant to a component. Extend component props (cva, etc.).

## Injection Target

- **Artifact:** Patch component file to add variant

## Technology Stack

- **CVA** (class-variance-authority) for variant props. Extend existing `cva()` call with new variant. Alternatives: Tailwind arbitrary, Chakra `sx`.

## Status

Planned
