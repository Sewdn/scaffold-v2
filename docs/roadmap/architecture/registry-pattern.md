# Registry Pattern

## Principle

Expansion commands patch **registry/index files**, not the main entry point. The main entry stays static; registries grow.

## Implementation

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

## Example (CLI)

```
src/commands/index.ts
  - Marker: // Commands registered below (scaffold cli add-command)
  - Patch: import { addUserCommand } from './add-user.js';
           program.addCommand(addUserCommand);
```

## Rules

- One registry per expansion type (commands, routes, tools, etc.)
- Use position-based insertion (after last import, after marker)
- Avoid brittle regex; prefer string search + slice

## Underlying Technology

Registry patching uses **string search** (`indexOf`, `lastIndexOf`) and **slice** to locate insert points. No AST or regex. Mustache renders stubs; fs/promises writes files. Commander's `program.addCommand()` drives CLI registration.

## Best Practices & Engineering Patterns

**Registry pattern** from plugin systems (Babel, Webpack, ESLint): main entry is static; plugins register via a central index. **Insert markers** provide stable anchor points. Position-based insertion (after last import, after marker) avoids fragile line-number assumptions.

## Effect Library Usage

`Effect.gen` could orchestrate read → parse → insert → write. `Effect.try` wraps `fs.readFile`/`fs.writeFile` for typed errors. `Layer` could compose registry-patching steps with validation. Current sync/async Node APIs are candidates for Effect wrapping.

## Implementation Considerations

**Idempotency:** Check if import path or registration already exists before inserting. **Edge cases:** empty registry, malformed file, Windows vs Unix line endings. **Multi-app:** each app has its own registry; resolution via `--app` when multiple exist.

## Alternative Technology Considerations

**AST (ts-morph):** Preserves formatting and handles complex edits; heavier dependency. **String search + slice:** Lightweight, deterministic, easy to debug. **Regex:** Brittle; avoid for variable-length content. **Codemods (jscodeshift):** Overkill for simple insertions.
