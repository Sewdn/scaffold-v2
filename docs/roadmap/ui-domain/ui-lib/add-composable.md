# UI-Lib: add-composable

## Command

```
scaffold hook <name> [--package ui-lib]
```

## Description

Add a shared hook (composable).

## Injection Target

- **Artifact:** `src/hooks/<name>.ts`

## Technology Stack

- **Effect** (`@effect/react`) for shared async logic. Composable = hook; can use Effect for cross-component flows.

## Status

Planned
