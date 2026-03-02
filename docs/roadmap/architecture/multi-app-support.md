# Multi-App Support

When a project has multiple apps of the same type (e.g. two CLI apps):

- Add `--app <name>` option to expansion commands
- Resolve: `apps/cli-<name>` or `apps/cli-<app>`
- If only one app exists, auto-select; if multiple, require `--app`

## Underlying Technology

Resolution uses **fs.readdirSync** or **glob** on `apps/` to find matching apps. **Commander** `--app` option. String matching: `apps/cli-<name>` or `apps/cli-<app>`. No config file; directory-based discovery.

## Best Practices & Engineering Patterns

**Convention over configuration:** App dirs follow `apps/<type>-<name>`. **Auto-select when unambiguous:** Single app = no flag needed. **Explicit when ambiguous:** Require `--app` when multiple. Reference Lerna, Turborepo for workspace resolution.

## Effect Library Usage

`Effect.gen` for discover → resolve → validate. `Effect.try` for file system reads. `Effect.Option` for optional `--app` resolution. Layer could provide app resolution as a service.

## Implementation Considerations

**Edge cases:** No apps, malformed app dir names. **Idempotency:** N/A for resolution. **Multi-app:** Expansion targets resolved app; registry patching per app. **Conflict:** Same app type, different names — ensure `--app` is required.

## Alternative Technology Considerations

**Config file:** `apps` in package.json or turbo.json; adds indirection. **Directory discovery:** Simpler, no config. **Glob vs readdir:** Glob for patterns; readdir for simple listing. **Workspace protocol:** Align with workspace package managers.
