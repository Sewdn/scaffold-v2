# UI and Domain Expansion

This document details expansion commands for UI packages and the domain package, which have special considerations for component architecture and DDD patterns.

---

## 1. UI Package (`packages/ui`)

The UI package provides Shadcn-based primitives. Expansion focuses on adding Shadcn components and theme customization.

### Expansion Commands

| Command | Description | Implementation |
|---------|-------------|----------------|
| `add-shadcn-component` | Add Shadcn component(s) | Delegates to `bunx shadcn@latest add [component]` in `packages/ui` |
| `add-theme-variant` | Add theme variant (brand, accent) | Extend CSS variables in `globals.css` or `tailwind.config` |
| `init-shadcn` | Initialize Shadcn | Run Shadcn init, create `components.json` |
| `add-base-color` | Change base color (slate, zinc, etc.) | Update `components.json` |

### Command Structure

```
scaffold ui add-shadcn-component [component...] [--package ui]
scaffold ui add-theme-variant <name> [--package ui]
```

### Notes

- `add-shadcn-component` delegates to Shadcn CLI; no custom stubs needed
- Theme variants use CSS custom properties; stub for `globals.css` patch

---

## 2. UI-Lib Package (`packages/ui-lib`)

The UI-lib package contains custom components. Per project rules: every component has a hook (logic) and presentational component, plus Storybook stories.

### Expansion Commands

| Command | Description | Injection Target |
|---------|-------------|------------------|
| `add-component` | Add a new component | `src/components/<Name>/<Name>.tsx`, `index.ts` |
| `add-hook` | Add a hook for existing component | `src/components/<Name>/use<Name>.ts` |
| `add-story` | Add Storybook story for component | `src/components/<Name>/<Name>.stories.tsx` |
| `add-variant` | Add a variant to component | Extend component props (cva, etc.) |
| `add-composable` | Add a shared hook | `src/hooks/<name>.ts` |
| `add-wrapper` | Add container (hook + presentational) | `src/components/<Name>/<Name>Container.tsx` |

### Command Structure

```
scaffold component <name> [--package ui-lib]           # exists
scaffold component add-hook <name> [--package ui-lib]
scaffold component add-story <name> [--package ui-lib]
scaffold component add-variant <name> <variant> [--package ui-lib]
scaffold hook <name> [--package ui-lib]               # add-composable
```

### Co-Generation

- `add-story` and `add-hook` can depend on `add-component`
- If component missing, fail with clear message or optionally create it

### Registry Pattern

- Barrel file: `src/components/index.ts` with marker `// Exports below (scaffold component)`
- Patch: add `export { Xxx } from './Xxx';`

---

## 3. Domain Package (`packages/domain`)

The domain package holds shared business logic, entities, value objects, and events. Expansion supports DDD-style modeling.

### Expansion Commands

| Command | Description | Injection Target |
|---------|-------------|------------------|
| `add-entity` | Add a domain entity (aggregate root) | `src/entities/<name>.ts` |
| `add-value-object` | Add an immutable value object | `src/value-objects/<name>.ts` |
| `add-event` | Add a domain event type | `src/events/<name>.ts` |
| `add-repository-interface` | Add a repository interface | `src/repositories/<name>-repository.ts` |
| `add-type` | Add a shared type/interface | `src/types/<name>.ts` |

### Command Structure

```
scaffold domain add-entity <name>
scaffold domain add-value-object <name>
scaffold domain add-event <name>
scaffold domain add-repository-interface <name>
scaffold domain add-type <name>
```

### Stub Patterns

**Entity:**
```ts
export interface {{EntityName}} {
  id: string;
  // Add fields
}
```

**Value Object:**
```ts
export const {{ValueObjectName}} = (value: string) => ({ value });
export type {{ValueObjectName}} = ReturnType<typeof {{ValueObjectName}}>;
```

**Event:**
```ts
export interface {{EventName}}Event {
  type: '{{event-name}}';
  payload: { /* ... */ };
}
```

### Registry Pattern

- Barrel: `src/index.ts` with marker `// Exports below (scaffold domain add-entity)`
- Patch: add export for new artifact

---

## 4. Integration with Modules

When scaffolding a **module** (e.g. `scaffold module users`), the system creates:
- `svc-users` (service package)
- `ui-users` (UI package)

Expansion commands for `svc-*` and `ui-*` apply to these module packages. The same expansion commands work for both standalone packages and module-generated packages.

---

## 5. Naming Conventions

| Artifact | File | Export |
|----------|------|--------|
| Component | `Button.tsx` | `Button` |
| Hook | `useButton.ts` | `useButton` |
| Entity | `user.ts` | `User` |
| Value Object | `email.ts` | `Email`, `createEmail` |
| Event | `user-created.ts` | `UserCreatedEvent` |
