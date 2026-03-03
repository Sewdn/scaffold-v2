# Backend Temporal App Type

**Description:** Durable workflow orchestration using [Temporal](https://temporal.io). Workflows and Activities for fault-tolerant, long-running business logic.

**Status:** Proposed

## Expansion Commands

| Command | Description | Injection Target |
| ------- | ------------ | ---------------- |
| [add-workflow](add-workflow.md) | Add a workflow definition | `src/workflows/<name>.ts` |
| [add-activity](add-activity.md) | Add an activity (failure-prone logic) | `src/activities/<name>.ts` |
| [add-worker](add-worker.md) | Add/configure a worker | `src/workers/<name>.ts` |
| [add-client](add-client.md) | Add a workflow client entry | `src/clients/<name>.ts` |

## Underlying Technology

**Temporal** — Durable execution platform. Workflows orchestrate Activities; state persisted; automatic retries and replay. TypeScript SDK: `@temporalio/client`, `@temporalio/worker`, `@temporalio/workflow`, `@temporalio/activity`.

**Setup:**
```bash
npx @temporalio/create@latest ./my-app
# Select hello-world sample
# Install Temporal CLI: brew install temporal
# Start dev server: temporal server start-dev
```

**Prerequisites:** Node.js 18+, Temporal CLI. Local Temporal Service on `localhost:7233`; Web UI at `http://localhost:8233`.

## Best Practices & Engineering Patterns

- **Workflows:** Deterministic; orchestrate Activities; use `proxyActivities` for type-safe calls.
- **Activities:** Non-deterministic; API calls, DB ops, external I/O; automatic retries.
- **Workers:** Poll task queues; host Workflows and Activities; scale horizontally.
- **Client:** Start workflows; signal/query; get results.

## Implementation Considerations

- **Workflow isolation:** Workflows run in separate JS context; import only workflow-safe code.
- **Stub variables:** `{{name}}`, `{{Name}}`, `{{taskQueue}}`.
- **Directory prefix:** `backend-temporal` → `apps/backend-temporal-<name>`.

## References

- [Temporal TypeScript SDK](https://docs.temporal.io/develop/typescript/)
- [Set Up Local TypeScript](https://docs.temporal.io/develop/typescript/set-up-your-local-typescript)
- [Temporal Platform Docs](https://docs.temporal.io)
