# Strategic Context

## The Problem

Agentic coding has exploded. AI-assisted development ships faster than ever. But after a few weeks, projects hit the wall:

- **Architecture drifts** — Patterns become inconsistent across the codebase
- **AI contradicts itself** — Same request yields different structures in different files
- **Complexity explodes** — Refactors become terrifying
- **Token waste** — Long prompts replace what structure could enforce

**AI didn't fail. The structure did.**

## The Insight

LLMs were trained on millions of real codebases. The strongest way to steer them is **definition by example**, not natural-language instructions.

Boilerplate with correctly applied patterns is more efficient than long declarative prompts. It reduces token consumption and gives clear direction.

## The Solution: Expansion as Architectural Gravity

The scaffolding CLI operates in two phases:

1. **Initial scaffold** — Creates base structure (project, apps, packages)
2. **Expansion** — Injects features deterministically via `scaffold <type> add-<feature> <name>`

Expansion commands are the **control layer for agentic coding**. They ensure:

- **Deterministic output** — Same command → same structure, every time
- **Orderly growth** — Features are added in predictable locations
- **Registry-based registration** — New artifacts are registered, not scattered
- **AI agents follow the rails** — The codebase is the instruction set

## Technology Alignment

- **Effect** and **registry pattern** align: Effect for typed flows; registry for append-only structure. Both reduce AI guesswork.
- **Implementation implication:** Expansion stubs use Effect where cross-package flows exist; registry patches are idempotent.
- **Alternative philosophy:** Prompt-heavy (long instructions) vs structure-heavy (scaffold + expansion) — we choose structure-heavy for token efficiency.
