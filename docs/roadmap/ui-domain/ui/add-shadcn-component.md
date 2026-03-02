# UI: add-shadcn-component

## Command

```
scaffold ui add-shadcn-component [component...] [--package ui]
```

## Description

Add Shadcn component(s). Delegates to `bunx shadcn@latest add [component]` in `packages/ui`.

## Implementation

- No custom stubs; delegates to Shadcn CLI

## Technology Stack

- **Shadcn** via CLI; Tailwind for styling. Alternatives: Radix raw, Chakra — scaffold delegates to Shadcn.

## Status

Planned
