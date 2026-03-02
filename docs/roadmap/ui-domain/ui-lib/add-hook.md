# UI-Lib: add-hook

## Command

```
scaffold component add-hook <name> [--package ui-lib]
```

## Description

Add a hook for an existing component.

## Injection Target

- **Artifact:** `src/components/<Name>/use<Name>.ts`

## Co-Generation

- Depends on component existing; fail with clear message or optionally create it

## Technology Stack

- **Effect** (`@effect/react`) for async, errors, resources. Presentational component stays pure; hook holds logic.

## Status

Planned
