# Naming Conventions

| Context | Convention | Example |
|---------|------------|---------|
| File names | kebab-case | `add-user.ts`, `user-service.ts` |
| Exported types/classes | PascalCase | `AddUserCommand`, `UserService` |
| Variables, functions | camelCase | `addUserCommand`, `createUserService` |
| CLI args | kebab-case | `add-user`, `user-service` |

## Entity Formatting

- `formatEntityName(name, entityType)` — Normalizes input (e.g. `addUser` → `add-user`)
- `toPascalCase`, `toCamelCase`, `toKebabCase` — For template variables
- Validation: `validateCommandName`, `validateXxxName` — Enforce kebab-case, reject invalid chars

## Underlying Technology

Name formatting uses **string manipulation** (split, map, join) for case conversion. Validation uses regex or simple char checks. Mustache templates receive `{{entityName}}`, `{{EntityName}}`, etc. via `formatEntityName` and helpers.

## Best Practices & Engineering Patterns

**Consistent naming** across ecosystems (ESLint, Angular CLI, NestJS). **Entity-type-specific validators** prevent invalid identifiers. **Format helpers** (`toPascalCase`, `toKebabCase`) centralize conversion logic.

## Effect Library Usage

`Effect.try` for validation that may throw. `Effect.gen` for format → validate → render pipeline. `Layer` for composing naming validators with expansion steps. Effect's `Either` for validation failures with typed errors.

## Implementation Considerations

**Edge cases:** Empty input, special chars, reserved words. **Idempotency:** N/A for naming. **Multi-app:** Resolution uses app name; ensure naming doesn't conflict with app identifiers. **Unicode:** Decide whether to support non-ASCII.

## Alternative Technology Considerations

**change-case:** npm package for case conversion; adds dependency. **Custom helpers:** Lightweight, no deps. **Zod:** For schema-based validation; integrates with Effect. **Regex vs char-by-char:** Regex faster; char-by-char more explicit for edge cases.
