# UI & Domain Packages

UI packages (`ui`, `ui-lib`) and domain package expansion. Domain is also listed under [services/domain](../services/domain/).

## Packages

| Package           | Status  | Expansion Commands                                                              |
| ----------------- | ------- | ------------------------------------------------------------------------------- |
| [ui](ui/)         | Planned | add-shadcn-component, add-theme-variant, init-shadcn, add-base-color            |
| [ui-lib](ui-lib/) | Partial | add-component ✅, add-hook, add-story, add-variant, add-composable, add-wrapper |

## Technology Stack & Patterns

- **Shadcn** (Radix primitives) + **Tailwind** for styling; **Storybook** for component documentation.
- **Container/presentational** split: hooks hold logic, components are presentational; `add-wrapper` creates container.
- **Effect in hooks:** Use `@effect/react` for async flows, error handling, and resource management in hooks.
- **CVA** (class-variance-authority) for component variants; `add-variant` extends CVA config.
- **Alternatives:** Radix raw (no Shadcn), Chakra UI — different primitives; scaffold supports Shadcn-first.
