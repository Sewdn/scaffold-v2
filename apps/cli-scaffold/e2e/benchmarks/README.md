# Agent Instruction Benchmarks

Markdown-based benchmark projects for AI agents. Each project contains analysis deliverables (briefing, domain, scope, technical solution) that agents use to scaffold projects, add applications, implement business logic, and wire everything together.

## Purpose

1. **Scaffolding tool validation** — Verify the scaffold CLI works correctly across different setups
2. **Application & integration testing** — Test different app types, service packages, and integrations
3. **AI model benchmarking** — Compare how different models perform on the same projects
4. **Real project simulation** — Full project benchmarks (`projects/`) mirror real analysis deliverables (briefing, domain, scope, technical solution). Agents scaffold and implement from problem space → solution space → architecture.

## Structure

```
benchmarks/
├── README.md           # This file
├── SCHEMA.md           # Metadata format for benchmark projects
├── METRICS.md          # Metrics and reporting
└── projects/          # Full project benchmarks (real use cases)
    ├── eventhub/       # Local event discovery & RSVP
    ├── recipevault/    # Community recipe sharing
    ├── bookspace/      # Workshop booking for makerspaces
    ├── strategy-puzzle/ # Turn-based puzzle game, event sourcing, real-time sync
    └── club-member-admin/ # Sports club member administration, email & AI agent integration
```

### Project Benchmark Format

Each project in `projects/` contains four documents mirroring real analysis phases:

| Document | Purpose |
|----------|---------|
| `01-briefing.md` | Problem space: business context, challenges, vision, opportunities |
| `02-domain.md` | Domain model: entities, relationships, users, roles |
| `03-scope.md` | Solution space: goals, epics, roadmap (MVP, Phase 2, …) |
| `04-technical-solution.md` | Architecture: tech guidelines, components to set up |

The agent receives all four documents and must scaffold the project, set up the architecture, and implement MVP features as specified. No frontmatter is required; the project folder name serves as the benchmark ID.

## Running Benchmarks

Benchmarks are **project instruction sets** for agents. To run a benchmark:

1. Load the project folder (all four documents)
2. Provide them as context/prompt to an AI agent
3. Agent executes the instructions (scaffolding, coding, wiring)
4. Evaluate outcomes (build succeeds, paths exist, etc.)

### Metrics

The scaffold CLI logs metrics for benchmarking. See [METRICS.md](METRICS.md) for:

- **Command logging** — scaffold commands auto-logged (count, duration)
- **Static analysis** — pre/post hooks snapshot before and after each scaffold command
- **Scaffolded vs AI-generated** — deltas from snapshot pairs (see METRICS.md)
- **Report** — `scaffold metrics report` for summary

Tooling to automate benchmarks (agent runner + validator) can be added later.

## Adding a Benchmark Project

1. Create a new folder under `projects/` (e.g. `projects/my-project/`)
2. Add the four analysis documents: `01-briefing.md`, `02-domain.md`, `03-scope.md`, `04-technical-solution.md`
3. Follow the structure described in [SCHEMA.md](SCHEMA.md)
