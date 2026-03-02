# Expansion Patterns: Deterministic App/Service Growth

> **Note:** This document has been reorganized into granular files. See [roadmap/INDEX.md](roadmap/INDEX.md) and [roadmap/architecture/](roadmap/architecture/) for the full specification.

Scaffolding follows a two-phase model: **initial scaffold** creates the base structure; **expansion commands** add features incrementally (e.g. `scaffold cli add-command`, `scaffold cli add-service`). This document defines the architectural patterns for implementing expansion.

---

## 1. REGISTRY PATTERN

**Principle:** Expansion commands patch **registry/index files**, not the main entry point. The main entry stays static; registries grow.

**Implementation:**
- Base scaffold creates a registry file with a stable **insert marker** (e.g. `// Commands registered below (scaffold cli add-command)`).
- Expansion command:
  1. Writes the new artifact (command, service, etc.) to its target path.
  2. Reads the registry file.
  3. Inserts an import after the last existing import.
  4. Inserts a registration line after the marker (e.g. `program.addCommand(XxxCommand)`).
- Idempotency: skip insertion if the import path already exists.

**Example (CLI commands):**
```
src/commands/index.ts  →  registerCommands(program)
  - Marker: // Commands registered below (scaffold cli add-command)
  - Patch: import { addUserCommand } from './add-user.js';
           program.addCommand(addUserCommand);
```

**Rules:**
- One registry per expansion type (commands, services, routes, etc.).
- Use AST-safe insertion (append after last import, append after marker) to avoid brittle regex.

---

## 2. STUB LOCATION

**Convention:** Expansion stubs live under the app-type’s stubs directory:

```
app-types/<app-type-id>/stubs/
├── src/           # Initial scaffold stubs (index.ts, commands/index.ts, etc.)
├── bin/
└── expansion/      # Expansion-only stubs
    ├── command.ts.stub
    ├── service.ts.stub
    └── ...
```

**Path resolution:**
- Expansion commands resolve: `app-types/<id>/stubs/expansion/<artifact>.stub`
- Project override: `stubs/app-types/<id>/expansion/` (if present) overrides built-in stubs.

---

## 3. NAMING CONVENTIONS

| Context        | Convention   | Example                    |
|----------------|--------------|----------------------------|
| File names     | kebab-case   | `add-user.ts`, `user-service.ts` |
| Exported types/classes | PascalCase | `AddUserCommand`, `UserService` |
| Variables, functions | camelCase | `addUserCommand`, `createUserService` |
| CLI args       | kebab-case   | `add-user`, `user-service` |

**Entity formatting:**
- `formatEntityName(name, entityType)` normalizes input (e.g. `addUser` → `add-user` for commands).
- `toPascalCase`, `toCamelCase`, `toKebabCase` for template variables.
- Validation: `validateCommandName`, `validateCliServiceName` enforce kebab-case and reject invalid chars.

---

## 4. DEPENDENCY INJECTION

**Principle:** Expanded code receives dependencies via **factory functions** or **context**, not global singletons.

**Service pattern (factory):**
```ts
export function createUserService(deps?: { logger?: Logger }) {
  return {
    addUser: (user: User) => { /* ... */ },
    // ...
  };
}
export type UserService = ReturnType<typeof createUserService>;
```

**Command pattern (context):**
- Commands are registered with `program.addCommand(...)`.
- Dependencies (services, config) are passed when constructing the command or via a shared context object.
- Stub comment: `// Add business logic and inject dependencies as needed`.

**Implementation guidance:**
- Stubs use `create{{serviceExportName}}()` factory; callers pass deps.
- Commands can accept a `getContext()` or similar to resolve services at runtime.

---

## 5. CO-GENERATION

**Principle:** When one expansion logically depends on another, the expansion command can **trigger** the dependent expansion.

**Example:** `add-route` for a backend might require a service. Options:
1. **Explicit:** `scaffold backend add-route users --with-service` → runs `add-service users` first.
2. **Implicit:** `add-route` checks for the service; if missing, prompts or auto-runs `add-service`.
3. **Declarative:** Expansion config declares `requires: ['add-service']`; CLI runs dependencies in order.

**Implementation:**
- Define `expansionDependencies` in app-type config: `{ 'add-route': ['add-service'] }`.
- Before executing expansion X, run required expansions with derived args (e.g. route name → service name).
- Ensure idempotency: skip if the dependent artifact already exists.

---

## 6. VALIDATION

**Post-expansion validators** ensure the scaffolded app remains valid.

| Validator            | Purpose                                      |
|----------------------|----------------------------------------------|
| `pathExists(path)`   | Target file/dir exists                       |
| `fileContains(path, s)` | Registry contains expected import/registration |
| `hasScript(name)`    | `package.json` has build/lint scripts        |
| `buildSucceeds()`    | `bun run build` exits 0                      |
| `lintSucceeds()`     | `bun run lint` exits 0                       |
| `cliHelpShowsCommands(appDir, commands)` | CLI `--help` lists added commands |

**When to run:**
- E2E scenarios: run validators after all expansion steps.
- Optional: add `--validate` flag to expansion commands for local checks.

**Pre-expansion checks:**
- Project root exists (`package.json`).
- Target app exists (e.g. `apps/cli-*` for CLI expansion).
- Registry file exists before patching.

---

## 7. IMPLEMENTATION CHECKLIST

- [ ] **Registry:** Create registry file in base scaffold with insert marker.
- [ ] **Stubs:** Add `expansion/` stubs under `app-types/<id>/stubs/`.
- [ ] **Patch logic:** Implement `patchXxxRegistry()` with idempotent insert.
- [ ] **Naming:** Use `formatEntityName`, `toPascalCase`, `toCamelCase` consistently.
- [ ] **Validation:** Add entity-specific validators (`validateCommandName`, etc.).
- [ ] **E2E:** Add scenario with expansion steps + `pathExists`, `buildSucceeds`, `cliHelpShowsCommands`.
- [ ] **DI:** Stubs use factory/context pattern; document injection points.
- [ ] **Co-generation (optional):** Define `expansionDependencies` and run dependencies before main expansion.
