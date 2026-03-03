# Project Benchmarks

Full project briefings structured like real analysis deliverables. Each project contains:

1. **01-briefing.md** — Problem space (business context, challenges, vision, opportunities)
2. **02-domain.md** — Domain model (entities, relationships, users, roles)
3. **03-scope.md** — Solution space (goals, epics, roadmap phases)
4. **04-technical-solution.md** — Architecture guidelines (tech, components, structure)

## Benchmark Task

Given the four documents for a project, the agent must:

1. Understand the problem and solution
2. Scaffold the project structure appropriate to the scope
3. Set up applications, packages, and modules as indicated by the technical solution
4. Implement MVP features to the extent specified

Success is measured by: correct architecture, build success, and observable capabilities matching the scope.

## Architecture Pattern

Each project follows a layered architecture:

- **Data Service** — Owns persistence; exposes a programmatic API (TypeScript functions) for CRUD. No HTTP.
- **API Application** — Integrates the data service; exposes REST endpoints to third-party consumers.
- **CLI Application** — Integrates the same data service; exposes CLI commands for administration (same CRUD as API).
- **Frontend(s)** — Consume the API for user-facing features.

Both API and CLI delegate to the data service; neither accesses persistence directly.

## Projects

| Project | Domain | MVP Focus | Difficulty |
|---------|--------|-----------|------------|
| [EventHub](eventhub/) | Local event discovery & RSVP | Events API, listing, RSVP | 4 |
| [RecipeVault](recipevault/) | Community recipe sharing | Recipes, collections, search | 4 |
| [BookSpace](bookspace/) | Workshop booking for makerspaces | Spaces, sessions, bookings | 5 |
| [Strategy Puzzle](strategy-puzzle/) | Turn-based strategy puzzle game | Lobby, multi-game, event sourcing, real-time sync | 6 |
| [Club Member Admin](club-member-admin/) | Sports club member administration | Members, events, payments, email integration, AI agent, MCP server | 6 |
