# Effect Library Usage — Specification Audit Report

**Scope:** All `.md` files under `docs/roadmap/` (app-types/, services/, architecture/, ui-domain/, verticals/, implementation/, vision/)  
**Audit Date:** 2025-03-01  
**Reference:** Official Effect-TS documentation (Context7, effect-ts/effect)

---

## 1. Summary

### Overall Effect Coverage & Correctness

| Category | Files with Effect | Correctness | Gaps |
|----------|-------------------|-------------|------|
| **app-types** | 12 (frontend-tanstack ×6, cli ×2, backend ×1, svc-elysia-api ×6) | **Mostly correct** | Add `Effect.provide` at edge; prefer `Effect.tryPromise` with `catch` over `Effect.promise` |
| **services** | 14 (svc-logging ×5, svc-prisma ×1, domain ×1, svc-elysia-api ×6) | **Mostly correct** | Add `Data.TaggedError`; clarify sync vs async I/O |
| **architecture** | 7 (registry, DI, validation, co-generation, implementation-checklist, multi-app, naming) | **Partially incorrect** | `Effect.try` vs `Effect.tryPromise` misuse; `Effect.Either` phrasing outdated |
| **vision** | 1 (core-principles) | **Superficial** | Mention only; could add concrete patterns |

**Total files with explicit "Effect Library Usage" sections:** 20  
**Total files mentioning Effect:** 21+

---

## 2. Per-Category Findings

### 2.1 app-types

#### frontend-tanstack (add-page, add-layout, add-api, add-component, add-addon, README)

- **Correct:** `Effect.runPromise`, `Effect.runPromiseExit` in loaders; `@effect/react` for client components; Effect layers for DI.
- **Missing:** At the app edge, loaders must run `Effect.runPromise(program.pipe(Effect.provide(MainLive)))` — specs don't mention `Effect.provide` explicitly.
- **Minor:** "Effect's error channel" (add-api) is vague; suggest `Effect.catchTag` + `Data.TaggedError` for HTTP status mapping.

#### cli/add-command

- **Incorrect:** Recommends `Effect.promise` for async logic. `Effect.promise` wraps rejections as `UnknownException`; use `Effect.tryPromise({ try: ..., catch: (e) => new CliError(e) })` for typed, user-facing errors.
- **Correct:** `Effect.runPromise` at entry; `Effect.fail` + `Effect.catchAll` for errors; Context for services.

#### cli/add-service

- **Partially incorrect:** "Context.Tag interface" — the standard pattern is `class X extends Context.Tag("X")<X, { ... }>() {}`, not a bare interface. Spec should show full Tag definition.
- **Prefer:** `Effect.tryPromise` with `catch` for Node APIs over `Effect.promise` when typed errors matter.
- **Correct:** `Layer.effect`, `Effect.gen`, DI via Layer.

#### backend/add-route

- **Correct:** `Effect.runPromise` in handlers; `Effect.fail` + `Effect.catchAll`; Context for services.
- **Missing:** Suggest `Effect.catchTag("NotFound", () => ...)` for 404 vs 500; `Data.TaggedError` for `NotFound`, `ValidationError`, etc.

#### svc-elysia-api (add-route, add-plugin, add-guard, add-middleware, add-resource)

- **Correct:** `Effect.tryPromise` for async handlers/guards; typed errors; Layers for composition.
- **Missing:** Explicit `catch` in `Effect.tryPromise` to map to domain errors (e.g. `NotFound`) instead of `UnknownException`; `Data.TaggedError` for guard failures.

### 2.2 services

#### svc-logging (add-sink, add-transport, add-formatter, add-context-enricher, README)

- **Correct:** `Effect.tryPromise` for async writes; `Effect.sync` for sync formatters; Context for services; Layer composition.
- **Vague:** "Sink as Effect resource" — clarify: use `Effect.acquireRelease` or `Layer.scoped` for lifecycle-managed sinks.
- **Correct:** Typed errors for write failures.

#### svc-prisma/add-model

- **Correct:** `Effect.gen` for multi-step ops; PrismaClient via Context; `Effect.fail` for validation/not-found.
- **Missing:** Recommend `Data.TaggedError("NotFound")` and `Data.TaggedError("ValidationError")` for repository errors.

#### domain/add-entity

- **Correct:** `Effect.succeed(entity)`, `Effect.fail(InvalidEntity)`; `Effect.gen` for lifecycle.
- **Missing:** Suggest `class InvalidEntity extends Data.TaggedError("InvalidEntity")<{ reason: string }>()` for structured errors.

### 2.3 architecture

#### registry-pattern

- **Incorrect:** "Effect.try wraps fs.readFile/fs.writeFile" — `fs/promises` APIs return Promises, so use `Effect.tryPromise`. `Effect.try` is for synchronous code that throws.
- **Correct:** `Effect.gen` for orchestration; Layer for composition.

#### dependency-injection

- **Correct:** Layer for composition; `Effect.gen` with injected deps; `Effect.provide` for test doubles.
- **Minor:** "build Runtime" — the common pattern is `Effect.runPromise(program.pipe(Effect.provide(MainLive)))`; Runtime is optional.

#### validation

- **Incorrect:** "Effect.try for each validator (file I/O, process exec)" — use `Effect.tryPromise` for `fs/promises` (readFile, access); `Effect.try` only for sync `execSync`.
- **Correct:** `Effect.gen` for sequential; `Effect.all` for parallel.
- **Vague:** "Effect's Either for pass/fail" — prefer `Effect<A, E>` with typed `E`; Effect's error channel replaces Either in most patterns.

#### multi-app-support, co-generation, implementation-checklist, naming-conventions

- **Same `Effect.try` vs `Effect.tryPromise` issue** for file I/O.
- **Correct:** `Effect.gen`, `Layer`, `Effect.Option` (multi-app).

### 2.4 vision

#### core-principles

- **Correct:** "Effect Context for DI" and "typed error/async flows."
- **Superficial:** No concrete patterns; could add one sentence on Layer composition for main app.

### 2.5 ui-domain, verticals, implementation

- **No Effect sections found.** These categories do not currently document Effect usage.

---

## 3. Critical Corrections

### 3.1 Effect.try vs Effect.tryPromise

| Context | Current Spec | Correction |
|---------|--------------|------------|
| registry-pattern | `Effect.try` wraps `fs.readFile`/`fs.writeFile` | Use `Effect.tryPromise` for `fs/promises`; `Effect.try` only for sync operations that throw (e.g. `execSync`) |
| validation | `Effect.try` for file I/O, process exec | `Effect.tryPromise` for `fs.readFile`, `fs.access`; `Effect.try` for `execSync` |
| multi-app-support | `Effect.try` for file system reads | `Effect.tryPromise` for async fs |
| co-generation, implementation-checklist | `Effect.try` for I/O | Same split: async → `tryPromise`, sync → `try` |
| naming-conventions | `Effect.try` for validation that may throw | If validation is sync (e.g. regex), `Effect.try`; if async, `Effect.tryPromise` |

### 3.2 Effect.promise vs Effect.tryPromise (cli/add-command)

- **Current:** "Use `Effect.promise` when wrapping async logic"
- **Correction:** Prefer `Effect.tryPromise({ try: () => ..., catch: (e) => new CommandError(e) })` for typed CLI errors. `Effect.promise` yields `UnknownException` on rejection.

### 3.3 Context.Tag Syntax (cli/add-service)

- **Current:** "Tag interface `UserService` for `Context.Tag<UserService>`"
- **Correction:** Show full pattern: `class UserService extends Context.Tag("UserService")<UserService, { addUser: (...) => Effect.Effect<...> }>() {}`

---

## 4. Recommended Additions

### 4.1 High-Value Effect Patterns to Add

1. **Data.TaggedError for domain errors**
   - Specs: `domain/add-entity`, `svc-prisma/add-model`, `backend/add-route`, `svc-elysia-api/add-resource`
   - Example: `class NotFound extends Data.TaggedError("NotFound")<{ entity: string }>()`
   - Use `Effect.catchTag("NotFound", handler)` for discriminated handling.

2. **Effect.tryPromise with explicit catch**
   - Specs: `svc-logging`, `svc-elysia-api`, `cli/add-command`
   - Example: `Effect.tryPromise({ try: () => fs.readFile(...), catch: (e) => new FileReadError(e) })`
   - Avoids `UnknownException` and enables `Effect.catchTag`.

3. **Effect.provide at the edge**
   - Specs: `frontend-tanstack/*`, `backend/add-route`
   - Pattern: `Effect.runPromise(program.pipe(Effect.provide(MainLive)))` where `MainLive` merges all service layers.

4. **Main Layer composition**
   - Add to architecture/dependency-injection or a new "Effect Architecture" section:
   - `const MainLive = Layer.mergeAll(DatabaseLive, LoggingLive, AuthLive).pipe(Layer.provide(ConfigLive))`

5. **Effect.catchTag for HTTP status mapping**
   - Spec: `backend/add-route`, `svc-elysia-api`
   - Example: `Effect.catchTag("NotFound", () => reply.status(404).send(...))`

---

## 5. Per-File Suggestions

### 5.1 cli/add-command.md

**Replace:**

```markdown
## Effect Library Usage

- **Action:** Use `Effect.promise` when wrapping async logic; `Effect.runPromise` at entry point.
- **Services:** Inject via `Context` when using Effect; or `createXxxService()` for direct factory.
- **Errors:** Use `Effect.fail` for typed errors; `Effect.catchAll` for user-facing messages.
```

**With:**

```markdown
## Effect Library Usage

- **Action:** Use `Effect.tryPromise({ try: () => ..., catch: (e) => new CommandError(e) })` for async logic to get typed errors; `Effect.runPromise` at entry point. Avoid `Effect.promise` when typed errors matter (it yields `UnknownException`).
- **Services:** Inject via `Context.Tag` and `Effect.provide(Layer)`; or `createXxxService()` for direct factory.
- **Errors:** Use `Effect.fail` with `Data.TaggedError` for typed errors; `Effect.catchTag` for discriminated handling; `Effect.catchAll` for user-facing fallback.
```

### 5.2 cli/add-service.md

**Replace:**

```markdown
## Effect Library Usage

- **Layer:** Define `UserServiceLive = Layer.effect(...)` for DI integration.
- **Context:** Tag interface `UserService` for `Context.Tag<UserService>`.
- **Async:** Use `Effect.promise` for Node APIs; `Effect.gen` for sequential flows.
```

**With:**

```markdown
## Effect Library Usage

- **Service Definition:** `class UserService extends Context.Tag("UserService")<UserService, { addUser: (u: User) => Effect.Effect<...> }>() {}`
- **Layer:** Define `UserServiceLive = Layer.effect(UserService, Effect.gen(function* () { ... })).pipe(Layer.provide(DepsLive))` for DI.
- **Async:** Use `Effect.tryPromise({ try: ..., catch: (e) => new ServiceError(e) })` for Node APIs when typed errors matter; `Effect.gen` for sequential flows.
```

### 5.3 backend/add-route.md

**Replace:**

```markdown
## Effect Library Usage

- **Handler:** Use `Effect.runPromise` inside handler for Effect-based logic; or native async.
- **Context:** Inject services via Elysia `derive` or Effect `Context` if app uses Effect.
- **Errors:** `Effect.fail` with `Effect.catchAll` for typed error mapping to HTTP status.
```

**With:**

```markdown
## Effect Library Usage

- **Handler:** Use `Effect.runPromise(handler.pipe(Effect.provide(MainLive)))` for Effect-based logic; provide the app's main Layer at the edge.
- **Context:** Inject services via Elysia `derive` or Effect `Context.Tag` + `Effect.provide`.
- **Errors:** Use `Data.TaggedError` for `NotFound`, `ValidationError`, etc.; `Effect.catchTag("NotFound", () => reply.status(404))` for discriminated handling; `Effect.catchAll` for generic fallback.
```

### 5.4 services/svc-prisma/add-model.md

**Replace:**

```markdown
## Effect Library Usage

Repositories wrapping Prisma model access use `Effect.gen` for multi-step operations. Inject `PrismaClient` via Context. Use `Effect.fail` for validation or not-found cases.
```

**With:**

```markdown
## Effect Library Usage

Repositories wrapping Prisma model access use `Effect.gen` for multi-step operations. Inject `PrismaClient` via `Context.Tag`. Use `Data.TaggedError` for domain errors: `class NotFound extends Data.TaggedError("NotFound")<{ model: string }>()`; handle with `Effect.catchTag("NotFound", ...)`. Use `Effect.fail(new NotFound({ model: "User" }))` for not-found; typed validation errors for invalid input.
```

### 5.5 services/domain/add-entity.md

**Replace:**

```markdown
## Effect Library Usage

Entity creation/validation can return `Effect.succeed(entity)` or `Effect.fail(InvalidEntity)`. Repository methods return `Effect<Entity, NotFound>`. Use Effect.gen for entity lifecycle logic.
```

**With:**

```markdown
## Effect Library Usage

Entity creation/validation can return `Effect.succeed(entity)` or `Effect.fail(new InvalidEntity({ reason: "..." }))`. Define `class InvalidEntity extends Data.TaggedError("InvalidEntity")<{ reason: string }>()`. Repository methods return `Effect<Entity, NotFound | ValidationError>`. Use `Effect.gen` for entity lifecycle logic; `Effect.catchTag` for discriminated error handling.
```

### 5.6 architecture/registry-pattern.md

**Replace:**

```markdown
## Effect Library Usage

`Effect.gen` could orchestrate read → parse → insert → write. `Effect.try` wraps `fs.readFile`/`fs.writeFile` for typed errors. `Layer` could compose registry-patching steps with validation. Current sync/async Node APIs are candidates for Effect wrapping.
```

**With:**

```markdown
## Effect Library Usage

`Effect.gen` could orchestrate read → parse → insert → write. Use `Effect.tryPromise({ try: () => fs.readFile(...), catch: (e) => new FileReadError(e) })` for async fs; `Effect.try` only for sync operations that throw. `Layer` could compose registry-patching steps with validation. Current sync/async Node APIs are candidates for Effect wrapping.
```

### 5.7 architecture/dependency-injection.md

**Replace:**

```markdown
## Effect Library Usage

**Effect Layer** is a natural fit: compose services as `Layer`, build `Runtime` for CLI. `Effect.gen` for command execution with injected deps. `Effect.provide` to inject test doubles. Current factory pattern could be wrapped in Effect services.
```

**With:**

```markdown
## Effect Library Usage

**Effect Layer** is a natural fit: compose services as `Layer.merge` or `Layer.mergeAll`, provide at edge via `Effect.provide(MainLive)`. Main layer: `const MainLive = Layer.mergeAll(DbLive, LoggingLive).pipe(Layer.provide(ConfigLive))`. Run with `Effect.runPromise(program.pipe(Effect.provide(MainLive)))`. `Effect.gen` for command execution with injected deps. `Effect.provide(TestLayer)` to inject test doubles. Current factory pattern could be wrapped in Effect services via `Context.Tag` + `Layer.succeed`.
```

### 5.8 architecture/validation.md

**Replace:**

```markdown
## Effect Library Usage

`Effect.try` for each validator (file I/O, process exec). `Effect.gen` for sequential validation. `Effect.all` for parallel validators. Effect's `Either` for pass/fail with typed errors. Layer could compose validators as services.
```

**With:**

```markdown
## Effect Library Usage

Use `Effect.tryPromise` for async validators (fs/promises `readFile`, `access`); `Effect.try` for sync validators (`execSync`). `Effect.gen` for sequential validation; `Effect.all` for parallel validators. Use `Effect<A, ValidationError>` with `Data.TaggedError` for typed pass/fail. Layer could compose validators as services.
```

---

## 6. Missed Opportunities

Specs that do **not** mention Effect but could benefit:

| File / Category | Opportunity |
|-----------------|-------------|
| **app-types/worker** (add-task, add-job, add-queue) | Effect for job execution (Effect.gen, typed errors, Layer for queue clients) |
| **app-types/cron** | Effect for cron handlers; Effect.tryPromise for scheduled tasks |
| **app-types/email-service** | Effect for async send; Effect.tryPromise with typed errors for transport failures |
| **app-types/websocket-server** | Effect for message handlers; Context for per-connection services |
| **services/svc-cache** | Effect for cache ops; Layer for Redis/client injection |
| **services/svc-queue** | Effect for job processing; Layer composition for workers |
| **verticals/data-pipeline** | Effect for transform steps; typed errors for pipeline failures |
| **architecture/registry-pattern** | Effect for idempotency checks (already partially covered) |
| **implementation/first-sprint** | Add "Effect patterns" as a first-sprint deliverable if Effect is in scope |

---

## 7. Reference Quick Facts (Effect v3)

| Pattern | API |
|---------|-----|
| Service definition | `class X extends Context.Tag("X")<X, { method: () => Effect.Effect<...> }>() {}` |
| Layer (no deps) | `Layer.succeed(Tag, impl)` |
| Layer (with deps) | `Layer.effect(Tag, Effect.gen(function* () { const deps = yield* Deps; return impl })).pipe(Layer.provide(DepsLive))` |
| Compose layers | `Layer.merge`, `Layer.mergeAll` |
| Provide at edge | `Effect.provide(Layer)` |
| Run at edge | `Effect.runPromise(program.pipe(Effect.provide(MainLive)))` |
| Typed errors | `class E extends Data.TaggedError("E")<{ msg: string }>()` |
| Discriminated handling | `Effect.catchTag("E", (e) => ...)` |
| Async with typed errors | `Effect.tryPromise({ try: () => ..., catch: (e) => new MyError(e) })` |
| Sync that throws | `Effect.try({ try: () => ..., catch: (e) => new MyError(e) })` |

---

*End of report*
