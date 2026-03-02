# UI-Lib: add-component

## Command

```
scaffold component <name> [--package ui-lib]
```

## Description

Add a new component with presentational structure.

## Injection Target

- **Artifact:** `src/components/<Name>/<Name>.tsx`, `index.ts`
- **Registry:** `src/components/index.ts` with marker `// Exports below (scaffold component)`

## Technology Stack

- **Shadcn** base, **Tailwind**, **CVA** for variants. Container/presentational; Storybook for docs. Effect in hooks optional.

## Status

✅ Implemented
