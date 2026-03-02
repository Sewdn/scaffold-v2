# Frontend TanStack: add-addon

## Command

```
scaffold frontend-tanstack add-addon <addon-id>
```

## Description

Add a TanStack add-on (e.g. clerk, drizzle). Delegates to TanStack CLI.

## Injection Target

- **Delegation:** `npx @tanstack/cli add <addon-id>`

## Status

Planned

## Underlying Technology

TanStack add-ons extend the base TanStack Start app (clerk, drizzle, tanstack-query, etc.). Add-ons ship with `.add-on` manifests and EJS templates; TanStack CLI resolves and applies them.

## Best Practices & Engineering Patterns

Compose add-ons rather than hand-rolling. Use `addOnEnabled` and `addOnOption` in templates. Prefer official add-ons; validate custom add-on manifests before scaffolding.

## Effect Library Usage

Effect can wrap add-on-provided services (e.g. drizzle layer, clerk auth). Use Effect layers for dependency injection when integrating add-on backends with app logic.

## Implementation Considerations

Delegate to `npx @tanstack/cli add <addon-id>`; do not reimplement add-on logic. Pass `cwd` as project root. Stub variables: `addOnEnabled`, `addOnOption`, `packageManager`.

## Alternative Technology Considerations

TanStack add-ons vs manual setup: add-ons ensure consistent config. Next.js uses different plugin ecosystems (e.g. next-auth). Remix has loader conventions but no formal add-on system.
