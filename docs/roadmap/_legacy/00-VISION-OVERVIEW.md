# Vision & Strategic Overview

## 1. Strategic Context

### The Problem

Agentic coding has exploded. AI-assisted development ships faster than ever. But after a few weeks, projects hit the wall:

- **Architecture drifts** — Patterns become inconsistent across the codebase
- **AI contradicts itself** — Same request yields different structures in different files
- **Complexity explodes** — Refactors become terrifying
- **Token waste** — Long prompts replace what structure could enforce

**AI didn't fail. The structure did.**

### The Insight

LLMs were trained on millions of real codebases. The strongest way to steer them is **definition by example**, not natural-language instructions.

Boilerplate with correctly applied patterns is more efficient than long declarative prompts. It reduces token consumption and gives clear direction.

### The Solution: Expansion as Architectural Gravity

The scaffolding CLI operates in two phases:

1. **Initial scaffold** — Creates base structure (project, apps, packages)
2. **Expansion** — Injects features deterministically via `scaffold <type> add-<feature> <name>`

Expansion commands are the **control layer for agentic coding**. They ensure:

- **Deterministic output** — Same command → same structure, every time
- **Orderly growth** — Features are added in predictable locations
- **Registry-based registration** — New artifacts are registered, not scattered
- **AI agents follow the rails** — The codebase is the instruction set

---

## 2. Core Principles

### Principle 1: Registry Over Entry

Expansion commands patch **registry/index files**, not main entry points. The main `index.ts` or `App.tsx` stays static; registries grow.

**Why:** Main entry files are fragile. Registries are append-only and idempotent.

### Principle 2: Stub-Driven Generation

All expansion artifacts come from **Mustache stubs** with consistent placeholders: `{{entityName}}`, `{{serviceExportName}}`, etc.

**Why:** Stubs are versioned, overridable, and deterministic.

### Principle 3: Naming Conventions

| Context | Convention | Example |
|---------|------------|---------|
| Files | kebab-case | `add-user.ts`, `user-service.ts` |
| Exports | PascalCase | `AddUserCommand`, `UserService` |
| Variables | camelCase | `addUserCommand`, `createUserService` |
| CLI args | kebab-case | `add-user`, `user-service` |

**Why:** Consistent naming reduces AI guesswork and improves predictability.

### Principle 4: Dependency Injection by Default

Expanded code receives dependencies via **factory functions** or **context**, not globals.

**Why:** Testability, composability, and clear dependency flow for AI agents.

### Principle 5: Co-Generation When Needed

When expansion A logically requires B (e.g. `add-route` needs `add-service`), the CLI can run B first or prompt the user.

**Why:** Reduces manual steps and ensures consistent structure.

---

## 3. Expansion Philosophy

### What Expansion Is

Expansion = **incremental, deterministic code injection** into an already-scaffolded app or package.

- **Scaffold** creates the skeleton
- **Expand** adds the meat

### What Expansion Is Not

- **Not code generation** — We don't generate business logic; we generate structure and boilerplate
- **Not a replacement for AI** — AI fills in the `// TODO` blocks; we provide the rails
- **Not overwriting** — Expansion appends/patches; it doesn't replace existing files

### Expansion Command Pattern

```
scaffold <app-type|package-type> add-<feature> <name> [options]
```

Examples:

- `scaffold cli add-command add-user`
- `scaffold cli add-service user-service`
- `scaffold backend add-route users`
- `scaffold frontend-nextjs add-page dashboard`
- `scaffold svc-prisma add-model User`

---

## 4. Target Audience

### Primary: AI Coding Agents

- Use MCP server or CLI to scaffold and expand
- Follow `.cursor/rules` and project structure
- Expansion commands reduce prompt length and increase consistency

### Secondary: Developers

- Use CLI directly for rapid setup
- Expansion replaces copy-paste and manual file creation
- Consistent structure improves onboarding

### Tertiary: Teams

- Enforce structure across members
- Expansion commands as part of team conventions
- CI/CD can validate expansion outputs

---

## 5. Success Metrics

| Metric | Target |
|--------|--------|
| Expansion commands implemented | 60+ |
| App types with expansion | 20+ |
| Service packages with expansion | 17+ |
| E2E scenarios for expansion | 15+ |
| Determinism | Same command → identical output |
| AI agent token reduction | Measurable via fewer structural prompts |

---

## 6. Open Core & Extensibility

- **Core:** App types, service packages, expansion commands — open source
- **Premium add-ons:** Advanced UI systems, enterprise templates, vertical presets
- **Community:** Custom stubs via `stubs/app-types/<id>/expansion/` override
- **Extensibility:** New app types and packages follow the same patterns
