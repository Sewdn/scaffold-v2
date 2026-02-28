---
title: Add Components
description: Add UI components to existing packages
---

## scaffold component

Adds a component to an existing UI package. Use when you have `ui` or `ui-lib` (or another `ui-*` package) and want to scaffold a new component with proper structure.

```bash
bun run scaffold component <name> --package <package-name>
```

### Example

```bash
# Add Button to ui-lib
bun run scaffold component Button --package ui-lib

# Add UserCard to ui-users
bun run scaffold component UserCard --package ui-users
```

### Component structure

The scaffold creates:

- `packages/<ui-pkg>/src/components/<ComponentName>/` — component directory
- Component file, hook (if applicable), and Storybook story

### Prerequisites

- The target UI package must exist (e.g. via `scaffold init --packages ui,ui-lib` or `scaffold ui <name>`)
- Component names can be PascalCase or kebab-case; they are normalized
