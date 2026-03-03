# Backend Booster App Type

**Description:** Event-sourced backend with CQRS semantics using [Booster Framework](https://www.boosterframework.com). GraphQL API and infrastructure inferred from code. Runs on AWS or Azure.

**Status:** Proposed

## Expansion Commands

| Command | Description | Injection Target |
| ------- | ------------ | ---------------- |
| [add-command](add-command.md) | Add a command handler | `src/commands/<Name>.ts` |
| [add-event](add-event.md) | Add a domain event | `src/events/<Name>.ts` |
| [add-entity](add-entity.md) | Add an entity (aggregate) | `src/entities/<Name>.ts` |
| [add-read-model](add-read-model.md) | Add a read model | `src/read-models/<Name>.ts` |
| [add-reducer](add-reducer.md) | Add an event reducer | `src/reducers/<Name>.ts` |

## Underlying Technology

**Booster Framework** — Open-source TypeScript framework for event-sourced microservices. CQRS + ES semantics. GraphQL API auto-generated from entities and read models. Infrastructure (Lambda, DynamoDB, etc.) inferred from code. Deploy to AWS or Azure.

**Setup:**
```bash
npm install -g @boostercloud/cli
boost new:project <project-name> --default
# Or: boost new:project <project-name> -p @boostercloud/framework-provider-azure
```

**Providers:** Azure (`@boostercloud/framework-provider-azure`), AWS (deprecated), Local (`@boostercloud/framework-provider-local`).

**Prerequisites:** Node.js 20.x LTS, Git.

## Best Practices & Engineering Patterns

- **CQRS:** Commands mutate state via events; read models project from events.
- **Event sourcing:** All state changes stored as events; entities rebuilt by replaying.
- **GraphQL:** Schema inferred from entities and read models; no manual resolver wiring.
- **DDD:** Commands, events, entities, read models follow domain-driven design.

## Implementation Considerations

- **Idempotency:** Check if artifact exists before creation.
- **Validation:** Command/event/entity names in PascalCase.
- **Stub variables:** `{{name}}`, `{{Name}}`, `{{entityName}}`.
- **Directory prefix:** `backend-booster` → `apps/backend-booster-<name>`.

## References

- [Booster Docs](https://docs.boosterframework.com)
- [Booster CLI](https://docs.boosterframework.com/booster-cli)
- [Getting Started](https://docs.boosterframework.com/getting-started/coding)
