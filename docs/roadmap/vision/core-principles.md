# Core Principles

## Principle 1: Registry Over Entry

Expansion commands patch **registry/index files**, not main entry points. The main `index.ts` or `App.tsx` stays static; registries grow.

**Why:** Main entry files are fragile. Registries are append-only and idempotent.

## Principle 2: Stub-Driven Generation

All expansion artifacts come from **Mustache stubs** with consistent placeholders: `{{entityName}}`, `{{serviceExportName}}`, etc.

**Why:** Stubs are versioned, overridable, and deterministic.

## Principle 3: Naming Conventions

| Context | Convention | Example |
|---------|------------|---------|
| Files | kebab-case | `add-user.ts`, `user-service.ts` |
| Exports | PascalCase | `AddUserCommand`, `UserService` |
| Variables | camelCase | `addUserCommand`, `createUserService` |
| CLI args | kebab-case | `add-user`, `user-service` |

**Why:** Consistent naming reduces AI guesswork and improves predictability.

## Principle 4: Dependency Injection by Default

Expanded code receives dependencies via **factory functions** or **context**, not globals.

**Why:** Testability, composability, and clear dependency flow for AI agents.

## Principle 5: Co-Generation When Needed

When expansion A logically requires B (e.g. `add-route` needs `add-service`), the CLI can run B first or prompt the user.

**Why:** Reduces manual steps and ensures consistent structure.

## Technology Alignment

- **Registry** = append-only index; **Effect** = typed error/async flows. Both support deterministic expansion.
- **Implementation implication:** New packages register in registry; Effect Context for DI in expanded code.
- **Alternative philosophy:** Prompt-heavy (AI infers structure) vs structure-heavy (expansion enforces) — structure-heavy chosen.
