# UI Package

**Description:** Core UI components (Shadcn base).

**Status:** Planned

## Expansion Commands

| Command | Description | Spec |
|---------|-------------|------|
| [add-shadcn-component](add-shadcn-component.md) | Add Shadcn component(s) via CLI | Delegates to `bunx shadcn add` |
| [add-theme-variant](add-theme-variant.md) | Add theme variant (brand, accent) | `globals.css`, `tailwind.config` |
| [init-shadcn](init-shadcn.md) | Initialize Shadcn in package | `components.json` |
| [add-base-color](add-base-color.md) | Change base color (slate, zinc, etc.) | Update `components.json` |

## Technology Stack & Patterns

- **Shadcn** + **Tailwind** (globals.css, tailwind.config). Shadcn CLI for component add; Tailwind for theme.
- **Alternatives:** Radix raw (manual primitives), Chakra UI — different theming; scaffold delegates to Shadcn CLI.
