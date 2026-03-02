# Stub Location

## Convention

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

## Path Resolution

- **Built-in:** `app-types/<id>/stubs/expansion/<artifact>.stub`
- **Project override:** `stubs/app-types/<id>/expansion/` (if present) overrides built-in

## Underlying Technology

Stub resolution uses **path.join** and **fs.existsSync** (or equivalent). Mustache (`renderTemplate`) processes `.stub` files. Stub lookup follows: built-in `app-types/<id>/stubs/expansion/` first, then project override `stubs/app-types/<id>/expansion/` if present.

## Best Practices & Engineering Patterns

**Convention over configuration:** Predictable paths reduce discovery. **Layered override:** Built-in stubs + project override mirrors ESLint config resolution. **Expansion isolation:** `expansion/` subdir keeps initial scaffold vs expansion stubs separate.

## Effect Library Usage

`Effect.gen` for resolve → read → render → write flow. `Effect.try` for file I/O. `Layer` for composing stub resolution with path resolution. Effect's `Option` for optional override paths.

## Implementation Considerations

**Edge cases:** Missing expansion dir, stub file not found, wrong app-type id. **Idempotency:** Overwriting existing files; use `--force` if needed. **Multi-app:** Resolution must target correct app's stubs path.

## Alternative Technology Considerations

**EJS:** More expressive; risk of injection. **Handlebars:** Similar to Mustache; partials. **Mustache:** Logic-less, safe for AI-generated content. **Stub location:** Flat vs nested (`expansion/`) — nested keeps expansion artifacts isolated.
