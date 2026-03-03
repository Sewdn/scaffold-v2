# Benchmark Project Schema

Structure for agent instruction benchmarks. Each project is a folder with four documents mirroring real analysis deliverables.

## Project Structure

Each project folder contains four documents:

| File | Structure |
|------|-----------|
| `01-briefing.md` | Business Context, Current Challenges, Vision for Solution, Business Opportunities |
| `02-domain.md` | Core Entities, User Roles, Relationships Diagram, Workflow Entities |
| `03-scope.md` | High-Level Goals, Epic Features, Roadmap (MVP, Phase 2, Phase 3, Out of Scope) |
| `04-technical-solution.md` | System Overview, Architecture Guidelines, Components to Set Up, Data Flow, MVP Implementation Notes |

No frontmatter is required on individual files. The project folder name serves as the benchmark ID (e.g. `eventhub`, `recipevault`, `bookspace`, `club-member-admin`).
