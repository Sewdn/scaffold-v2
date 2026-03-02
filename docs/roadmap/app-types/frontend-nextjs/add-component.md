# Frontend Next.js: add-component

## Command

```
scaffold frontend-nextjs add-component <name>
```

## Description

Add a component in `components/`.

## Injection Target

- **Artifact:** `components/<Name>/<Name>.tsx`, `components/<Name>/index.ts`

## Status

Planned

## Underlying Technology

React 19 components. Can be Server or Client; default Server in App Router. Use `"use client"` for hooks, event handlers, browser APIs. Tailwind + Shadcn for styling.

## Best Practices & Engineering Patterns

Strict container/presentational split. Presentational components receive props; logic lives in hooks or containers. Colocate in `components/<Name>/` with index export. One component per file; shared types in same folder.

## Effect Library Usage

Components use React patterns (useState, useEffect, custom hooks). Effect is atypical in UI components; consider for hooks that wrap Effect-based services.

## Implementation Considerations

Structure: `components/<Name>/<Name>.tsx`, `index.ts`. Stub variables: `{{ComponentName}}`, `{{propsInterface}}`. Add `"use client"` if component uses hooks or interactivity.

## Alternative Technology Considerations

Solid (fine-grained reactivity), Preact (lightweight), Astro components (framework-agnostic with slots).
