# svc-config Package

**Description:** Configuration service.

**Status:** Planned

## Expansion Commands

| Command                                     | Description                            | Spec                          |
| ------------------------------------------- | -------------------------------------- | ----------------------------- |
| [add-env-var](add-env-var.md)               | Add an environment variable definition | `src/env/<name>.ts` or config |
| [add-config-section](add-config-section.md) | Add a config section                   | `src/config/<name>.ts`        |

## Underlying Technology

Zod for schema validation and parsing. Environment variables loaded at startup; config sections typed via Zod schemas. Supports `.env` files and runtime overrides.

## Best Practices & Engineering Patterns

Validate all env vars at app bootstrap; fail fast on missing/invalid values. Use namespaced keys (e.g. `DATABASE_URL`, `REDIS_URL`). Prefer typed config objects over raw `process.env` access.

## Effect Library Usage

`Effect.tryPromise` for async config loading. Config via Context/Layer; `Effect.fail` for validation errors (e.g. `ConfigError`). Compose config layers with `Layer.merge`.

## Implementation Considerations

Stub variables: `{{varName}}`, `{{sectionName}}`; registry in `src/env/index.ts` or `src/config/index.ts`. Env vars prefixed by service (e.g. `SVC_EMAIL_API_KEY`).

## Alternative Technology Considerations

`@t3-oss/env-nextjs` for Next.js env validation. `convict` for hierarchical config. `dotenv` + Zod is lightweight and Effect-friendly.
