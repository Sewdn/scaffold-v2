# Domain: add-event

## Command

```
scaffold domain add-event <name>
```

## Description

Add a domain event type for event-driven architecture.

## Injection Target

- **Artifact:** `src/events/<name>.ts`
- **Registry:** `src/events/index.ts` (optional)

## Status

Planned

## Underlying Technology

Domain event: immutable record of something that happened. TypeScript type/interface with `type`, `aggregateId`, `payload`, `timestamp`. Used for event sourcing or pub/sub.

## Best Practices & Engineering Patterns

Past tense naming (`UserCreated`, `OrderPlaced`). Include aggregate id and version. Keep payload minimal. Events are immutable and append-only.

## Effect Library Usage

Event publishing returns `Effect<void, PublishError>`. Use Effect.gen for "load aggregate → validate → emit event". Event handlers can be Effect services in Layer.

## Implementation Considerations

Stub variables: `{{EventName}}`, `{{payloadType}}`, `{{aggregateId}}`. File: `src/events/<name>.ts`. Consider event schema versioning for evolution.

## Alternative Technology Considerations

EventBridge, Kafka schemas. Zod for event payload validation. Effect Queue for async event handling. Domain events are transport-agnostic.
