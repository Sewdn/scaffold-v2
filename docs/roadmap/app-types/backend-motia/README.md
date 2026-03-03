# Backend Motia App Type

**Description:** Unified backend framework using [Motia](https://www.motia.dev) — APIs, background jobs, workflows, AI agents, streaming, and state in one Step-based system.

**Status:** Proposed

## Expansion Commands

| Command | Description | Injection Target |
| ------- | ------------ | ---------------- |
| [add-step](add-step.md) | Add a Step (api, event, or cron) | `src/steps/<name>.step.ts` |
| [add-api-step](add-api-step.md) | Add an API-triggered Step | `src/steps/<name>.step.ts` |
| [add-event-step](add-event-step.md) | Add an event-subscribed Step | `src/steps/<name>.step.ts` |
| [add-cron-step](add-cron-step.md) | Add a cron-triggered Step | `src/steps/<name>.step.ts` |
| [add-flow](add-flow.md) | Add a flow grouping | `flows` config |

## Underlying Technology

**Motia** — Code-first backend framework. Single primitive: the **Step**. Each Step has a config (trigger type, name, path) and handler (business logic). Supports API, Event, and Cron triggers. Built-in: state, streams, emit, logger. Multi-language (TS/JS/Python).

**Setup:**
```bash
npx motia@latest create my-app
# Or interactive: npx motia@latest create -i
# Skip Redis: npx motia@latest create my-app --skip-redis
```

**Prerequisites:** Node.js v18+, TypeScript/JavaScript or Python.

**Runtime:** `iii -c iii-config.yaml` (iii engine).

## Best Practices & Engineering Patterns

- **Step-based:** All backend logic in `.step.ts` files; config + handler pattern.
- **Event-driven:** Steps communicate via `emit({ topic, data })` and `subscribes`.
- **Flows:** Group related steps with `flows: ['messaging']` for observability.
- **State/Streams:** Use `state.set/get` for persistence; `streams.<name>.set` for real-time push.

## Implementation Considerations

- **File naming:** `*.step.ts`, `*.step.js`, or `*_step.py` for auto-discovery.
- **Stub variables:** `{{name}}`, `{{Name}}`, `{{path}}`, `{{method}}`, `{{cron}}`, `{{topic}}`.
- **Directory prefix:** `backend-motia` → `apps/backend-motia-<name>`.

## References

- [Motia Docs](https://www.motia.dev/docs)
- [Quick Start](https://www.motia.dev/docs/getting-started/quick-start)
- [Build Your First App](https://www.motia.dev/docs/getting-started/build-your-first-motia-app)
