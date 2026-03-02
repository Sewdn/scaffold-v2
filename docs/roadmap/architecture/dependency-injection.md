# Dependency Injection

## Service Pattern (Factory)

```ts
export function createUserService(deps?: { logger?: Logger }) {
  return {
    addUser: (user: User) => {
      /* ... */
    },
    // ...
  };
}
export type UserService = ReturnType<typeof createUserService>;
```

## Command Pattern (Context)

- Commands are registered with `program.addCommand(...)`
- Dependencies (services, config) passed when constructing or via shared context
- Stub comment: `// Add business logic and inject dependencies as needed`

## Implementation

- Stubs use `create{{serviceExportName}}()` factory
- Callers pass deps at runtime
- Commands can accept `getContext()` to resolve services

## Underlying Technology

Factory pattern uses plain **TS functions** returning objects. No DI framework; runtime composition. Stubs render `create{{serviceExportName}}()` via Mustache. Commander passes context via `opts` or shared closure.

## Best Practices & Engineering Patterns

**Factory pattern** (common in Node/TS): functions return configured instances. **Context pattern** for CLI: `getContext()` resolves services. **Dependency inversion:** depend on interfaces, not concrete impls. Reference NestJS, Inversify for advanced DI.

## Effect Library Usage

**Effect Layer** is a natural fit: compose services as `Layer`, build `Runtime` for CLI. `Effect.gen` for command execution with injected deps. `Effect.provide` to inject test doubles. Current factory pattern could be wrapped in Effect services.

## Implementation Considerations

**Edge cases:** Missing deps, circular deps. **Idempotency:** N/A for DI. **Multi-app:** Each app has its own service instances; no cross-app sharing. **Testing:** Factory pattern allows easy mocking via `deps` param.

## Alternative Technology Considerations

**Effect Layer vs manual factory:** Effect adds typed composition; factory is simpler. **Inversify/tsyringe:** Full DI container; overkill for CLI. **Context vs constructor:** Context is flexible; constructor is explicit. **Stub injection points:** Document in stub comments.
