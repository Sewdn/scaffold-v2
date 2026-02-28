---
title: Add Modules
description: Add paired service and UI packages for a feature
---

## scaffold module

Creates a **module** — a pair of loosely coupled packages that implement a feature end-to-end:

1. **Service package** (`svc-<name>`) — backend logic
2. **UI package** (`ui-<name>`) — React components

Both depend on the **domain** package for shared types. The service and UI packages are **not** dependent on each other; they are tied together in an application by providing a backend implementation to the UI context provider.

```bash
bun run scaffold module <name>
```

### Example

```bash
bun run scaffold module users
# Creates:
#   packages/svc-users
#   packages/ui-users
```

### Architecture

```
packages/domain          ← shared types
       ↑        ↑
       |        |
packages/svc-users   packages/ui-users
       |                    |
       |                    |
  backend app          frontend app
  (provides API)       (provides context)
```

The frontend app wires the `ui-users` components to the `svc-users` API via a context provider.
