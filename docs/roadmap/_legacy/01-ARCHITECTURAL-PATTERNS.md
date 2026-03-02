# Architectural Patterns for Expansion

This document defines the architectural patterns that ensure **deterministic, AI-agent-friendly** expansion. All expansion commands must adhere to these patterns.

---

## 1. Registry Pattern

### Principle

Expansion commands patch **registry/index files**, not the main entry point. The main entry stays static; registries grow.

### Implementation

1. **Base scaffold** creates a registry file with a stable **insert marker**:
   ```ts
   // Commands registered below (scaffold cli add-command)
   ```

2. **Expansion command**:
   - Writes the new artifact (command, service, route, etc.) to its target path
   - Reads the registry file
   - Inserts import after the last existing import
   - Inserts registration line after the marker
   - **Idempotency:** Skip insertion if import path already exists

### Example (CLI)

```
src/commands/index.ts
  - Marker: // Commands registered below (scaffold cli add-command)
  - Patch: import { addUserCommand } from './add-user.js';
           program.addCommand(addUserCommand);
```

### Rules

- One registry per expansion type (commands, routes, tools, etc.)
- Use position-based insertion (after last import, after marker)
- Avoid brittle regex; prefer string search + slice

---

## 2. Stub Location

### Convention

Expansion stubs live under the app-type or package stubs directory:

```
app-types/<app-type-id>/stubs/
├── src/              # Initial scaffold stubs
├── bin/
└── expansion/        # Expansion-only stubs
    ├── command.ts.stub
    ├── service.ts.stub
    └── ...

packages/<package-id>/stubs/
├── src/
└── expansion/
    ├── model.prisma.stub
    └── ...
```

### Path Resolution

- **Built-in:** `app-types/<id>/stubs/expansion/<artifact>.stub`
- **Project override:** `stubs/app-types/<id>/expansion/` (if present) overrides built-in

---

## 3. Naming Conventions

| Context | Convention | Example |
|---------|------------|---------|
| File names | kebab-case | `add-user.ts`, `user-service.ts` |
| Exported types/classes | PascalCase | `AddUserCommand`, `UserService` |
| Variables, functions | camelCase | `addUserCommand`, `createUserService` |
| CLI args | kebab-case | `add-user`, `user-service` |

### Entity Formatting

- `formatEntityName(name, entityType)` — Normalizes input (e.g. `addUser` → `add-user`)
- `toPascalCase`, `toCamelCase`, `toKebabCase` — For template variables
- Validation: `validateCommandName`, `validateXxxName` — Enforce kebab-case, reject invalid chars

---

## 4. Dependency Injection

### Service Pattern (Factory)

```ts
export function createUserService(deps?: { logger?: Logger }) {
  return {
    addUser: (user: User) => { /* ... */ },
    // ...
  };
}
export type UserService = ReturnType<typeof createUserService>;
```

### Command Pattern (Context)

- Commands are registered with `program.addCommand(...)`
- Dependencies (services, config) passed when constructing or via shared context
- Stub comment: `// Add business logic and inject dependencies as needed`

### Implementation

- Stubs use `create{{serviceExportName}}()` factory
- Callers pass deps at runtime
- Commands can accept `getContext()` to resolve services

---

## 5. Co-Generation

### Principle

When expansion A logically depends on B, the CLI can run B first or prompt the user.

### Options

1. **Explicit:** `scaffold backend add-route users --with-service` → runs `add-service users` first
2. **Implicit:** `add-route` checks for service; if missing, prompts or auto-runs
3. **Declarative:** Config declares `expansionDependencies: { 'add-route': ['add-service'] }`

### Implementation

- Define `expansionDependencies` in app-type config
- Before executing expansion X, run required expansions with derived args
- Idempotency: skip if dependent artifact already exists

---

## 6. Validation

### Pre-Expansion

- Project root exists (`package.json`)
- Target app/package exists
- Registry file exists before patching

### Post-Expansion Validators

| Validator | Purpose |
|-----------|---------|
| `pathExists(path)` | Target file/dir exists |
| `fileContains(path, s)` | Registry contains expected import |
| `hasScript(name)` | package.json has build/lint scripts |
| `buildSucceeds()` | `bun run build` exits 0 |
| `lintSucceeds()` | `bun run lint` exits 0 |
| `cliHelpShowsCommands(appDir, commands)` | CLI `--help` lists added commands |

### When to Run

- E2E scenarios: run validators after all expansion steps
- Optional: `--validate` flag on expansion commands

---

## 7. Multi-App Support

When a project has multiple apps of the same type (e.g. two CLI apps):

- Add `--app <name>` option to expansion commands
- Resolve: `apps/cli-<name>` or `apps/cli-<app>`
- If only one app exists, auto-select; if multiple, require `--app`

---

## 8. Implementation Checklist

- [ ] Create registry file in base scaffold with insert marker
- [ ] Add `expansion/` stubs under `app-types/<id>/stubs/` or `packages/<id>/stubs/`
- [ ] Implement `patchXxxRegistry()` with idempotent insert
- [ ] Use `formatEntityName`, `toPascalCase`, `toCamelCase` consistently
- [ ] Add entity-specific validators
- [ ] Add E2E scenario with expansion steps + validators
- [ ] Stubs use factory/context pattern; document injection points
- [ ] (Optional) Define `expansionDependencies` for co-generation
