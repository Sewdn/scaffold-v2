# UI-Lib Package

**Description:** Custom UI components library. Per project rules: every component has a hook (logic) and presentational component, plus Storybook stories.

**Status:** Partial (add-component implemented)

## Expansion Commands

| Command                             | Description                           | Spec                                        |
| ----------------------------------- | ------------------------------------- | ------------------------------------------- |
| [add-component](add-component.md)   | Add a new component                   | `src/components/<Name>/`                    |
| [add-hook](add-hook.md)             | Add a hook for existing component     | `src/components/<Name>/use<Name>.ts`        |
| [add-story](add-story.md)           | Add Storybook story for component     | `src/components/<Name>/<Name>.stories.tsx`  |
| [add-variant](add-variant.md)       | Add a variant to component            | Extend component props (cva)                |
| [add-composable](add-composable.md) | Add a shared hook                     | `src/hooks/<name>.ts`                       |
| [add-wrapper](add-wrapper.md)       | Add container (hook + presentational) | `src/components/<Name>/<Name>Container.tsx` |

## Technology Stack & Patterns

- **Shadcn** (base), **Tailwind**, **Storybook** for docs. **CVA** for variant props; `add-variant` extends CVA.
- **Container/presentational:** Hooks = logic; components = UI. `add-wrapper` creates container + presentational pair.
- **Effect in hooks:** `@effect/react` for async, errors, resources; use in `use<Name>` and composables.
- **Alternatives:** Radix raw, Chakra — different patterns; scaffold assumes Shadcn + CVA.
