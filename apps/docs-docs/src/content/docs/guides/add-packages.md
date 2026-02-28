---
title: Add Packages
description: Add service and UI packages to your project
---

## scaffold service

Adds a service package (e.g. `svc-auth`, `svc-users`). Service packages hold backend logic and are used by backend apps or other services.

```bash
bun run scaffold service <name>
```

### Example

```bash
bun run scaffold service auth
# Creates packages/svc-auth
```

## scaffold ui

Adds a UI package (e.g. `ui-shared`, `ui-dashboard`). UI packages hold React components and are used by frontend apps.

```bash
bun run scaffold ui <name>
```

### Example

```bash
bun run scaffold ui shared
# Creates packages/ui-shared
```

## scaffold package

Adds a generic package with explicit type. Use when you need a package that doesn't fit the `svc-*` or `ui-*` pattern.

```bash
bun run scaffold package <name> --type <ui|service>
```

### Example

```bash
bun run scaffold package config --type service
# Creates packages/svc-config
```

## Package dependencies

- **Service packages** (`svc-*`): Can depend on other `svc-*` or `domain`. Never add `ui-*` as a dependency.
- **UI packages** (`ui-*`): Can depend on `ui`, `ui-lib`, and other `ui-*`. Never add `svc-*` as a dependency.
- **domain**: Shared business logic and types used by both services and UI.
