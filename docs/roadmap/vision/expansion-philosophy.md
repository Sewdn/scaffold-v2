# Expansion Philosophy

## What Expansion Is

Expansion = **incremental, deterministic code injection** into an already-scaffolded app or package.

- **Scaffold** creates the skeleton
- **Expand** adds the meat

## What Expansion Is Not

- **Not code generation** — We don't generate business logic; we generate structure and boilerplate
- **Not a replacement for AI** — AI fills in the `// TODO` blocks; we provide the rails
- **Not overwriting** — Expansion appends/patches; it doesn't replace existing files

## Expansion Command Pattern

```
scaffold <app-type|package-type> add-<feature> <name> [options]
```

### Examples

- `scaffold cli add-command add-user`
- `scaffold cli add-service user-service`
- `scaffold backend add-route users`
- `scaffold frontend-nextjs add-page dashboard`
- `scaffold svc-prisma add-model User`

## Technology Alignment

- **Effect** for expanded service logic; **registry** for artifact registration. Expansion outputs Effect-ready stubs where applicable.
- **Implementation implication:** Stubs include Effect patterns (runPromise, Context) in services/hooks; registry patch per expansion.
- **Alternative philosophy:** Prompt-heavy (AI generates structure) vs structure-heavy (expansion generates) — expansion ensures consistency.
