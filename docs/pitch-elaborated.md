# Elaborated Marketing Pitch — Scaffold CLI

This document elaborates on the pitch from `pitch.md`, grounded in the conversation context, project scope (README), and technical reality of the scaffolding tool.

---

## 1. Strategic Context

### From the Conversation

- **Primary audience**: Agentic coding — AI agents and the developers/product engineers who work with them
- **Core insight**: LLMs are trained on massive open-source codebases. The most powerful way to steer them is **definition by example**, not natural-language instructions in agent/skill files
- **Why scaffolding matters**: Boilerplate with correctly applied patterns is more efficient than long declarative prompts — it reduces token consumption and gives clear direction
- **Batteries included**: Patterns like Effect, dependency injection, service layers are embedded so users don’t have to know them upfront
- **Positioning**: Not a replacement for Turborepo/Nx or create-\* tools — it **orchestrates** them within one consistent architectural philosophy
- **Business model**: Open core — framework free, premium add-ons (e.g. advanced UI libraries) installable via CLI
- **Tone**: Visionary, high-level, for “vibe coders” who hit a ceiling because they lack architectural depth

### From the README (Technical Scope)

- **What it does**: Command-orchestration CLI for TypeScript monorepos (Turborepo + Bun)
- **How**: Mustache stubs + orchestrated commands (bun, bunx, npx) + centralized dependency management
- **Effect-first**: Effect library for orchestration, error handling, composability
- **App types**: frontend-nextjs, frontend-vite, cli, backend, mcp-server, slide-deck, documentation
- **Target**: AI agents (primary) and engineers using CLI or MCP server

---

## 2. Elaborated Hero Section

### Headline

**Stop prompting. Start scaffolding.**

### Subheadline

In the age of agentic coding, the best way to control AI isn’t more instructions.  
It’s better examples.

This opinionated monorepo scaffolds production-grade architectures that guide coding agents by design — not by endless prompt tweaking.

### Core Message (Expandable)

Large language models learned from millions of real codebases. So the most powerful way to steer them is not natural language. It’s structure. It’s patterns. It’s example.

Our scaffolding tool generates a batteries-included, opinionated monorepo where:

- **Applications scale linearly** — Effect-driven composition keeps complexity manageable as features grow
- **Architectural best practices are embedded** — Dependency injection, service layers, modular boundaries from day one
- **Coding agents follow the intended structure** — Deterministic output because the architecture speaks for itself
- **Token consumption drops** — Less prompting, more doing; the codebase is the instruction set

You don’t fight your AI. You **shape the environment it learns from.**

---

## 3. Positioning Statement

This is not a replacement for Turborepo or Nx. It builds on them.

It is not another `create-*` starter kit. It orchestrates them.

It’s a deterministic scaffolding engine that:

- Uses tools like Next.js, React, Bun, Node.js, Vite, Astro
- Integrates frameworks like Elysia.js
- Encourages structured effect systems like Effect

But enforces **one consistent architectural philosophy** across all of them.

**The product is not scaffolding. The product is architectural gravity for AI.**

---

## 4. Problem → Insight → Solution (Pitchdeck Narrative)

### The Problem

Agentic coding exploded. Vibe coders ship faster than ever. But after a few weeks, they hit the wall:

- The architecture drifts
- Patterns become inconsistent
- AI starts contradicting itself
- Complexity grows exponentially
- Refactors become terrifying

AI didn’t fail. The structure did.

### The Insight

LLMs were trained on source code. The strongest way to guide them is not instructions — it’s example.

Boilerplate is not about saving time. It’s about shaping model behavior.

### The Shift

Instead of writing agent files, skill descriptions, and endless system prompts, we scaffold:

- Deterministic project structures
- Embedded architectural patterns
- Dependency injection by default
- Service layers by design
- Effect-driven composition for scalable complexity

We don’t describe best practices. We instantiate them.

### The Solution

An opinionated monorepo scaffolding engine that generates:

- **SPAs** (React + Vite)
- **SSR apps** (Next.js)
- **APIs** (Bun/Node + Elysia.js)
- **CLI tools**
- **MCP servers**
- **Documentation sites** (Starlight/Astro)
- **Slide decks** (Reveal.js)
- **Internal packages** (UI libs, DB layers, shared services)

All aligned. All structured. All AI-guiding. Designed to grow incrementally without architectural collapse.

---

## 5. Core Philosophy Section (For Website)

### “Architecture is the new prompt.”

When your repository encodes:

- Clear boundaries
- Explicit dependency flow
- Effect-driven state
- Modular service isolation

AI doesn’t guess how to write code. It follows the rails.

---

## 6. Why This Matters Now

AI lowered the barrier to shipping. But it did not lower the barrier to architecture.

In fact: **Bad architecture + powerful AI = exponentially faster chaos.**

We need systems that constrain, guide, stabilize, and scale complexity linearly.

---

## 7. Open Core Ecosystem

The core framework is open source. The architecture allows premium add-ons:

- Advanced UI systems
- Enterprise-grade setups
- Specialized vertical templates
- High-level UX pattern libraries

Installable via CLI. Composable inside the same architectural gravity field.

Community-first. Composable. Extensible.

---

## 8. Taglines (Options)

- **Design the codebase. Control the AI.**
- **Scaffold once. Scale forever.**
- **Opinionated structure for agentic speed.**
- **Where architecture meets AI determinism.**
- **Control your coding agents by example.**
- **Stop prompting. Start structuring.**

---

## 9. Key Differentiators (vs. Existing Copy)

| Previous (Technical)                                 | New (Pitch-Aligned)                              |
| ---------------------------------------------------- | ------------------------------------------------ |
| "Command-orchestration CLI for TypeScript monorepos" | "Architectural gravity for AI"                   |
| "Layered approach: stubs + commands"                 | "Architecture is the new prompt"                 |
| "Built for productivity"                             | "Built for agentic coding"                       |
| "90% faster setup"                                   | "Deterministic output. Less prompting."          |
| "8+ app types"                                       | "SPAs, APIs, CLIs, MCP servers — one philosophy" |

---

## 10. Landing Page Section Mapping

| Section              | Content Source                                                         |
| -------------------- | ---------------------------------------------------------------------- |
| Hero                 | Headline + Subheadline + Core message (condensed)                      |
| Feature 1            | "Architecture is the new prompt" + solution overview                   |
| Feature 2 (optional) | Problem → Insight (condensed)                                          |
| Stats                | AI-agent focus, app types, one-command setup                           |
| Philosophy           | "Architecture is the new prompt" block                                 |
| CTA                  | "Start scaffolding today" + Get Started                                |
| Footer               | "Architectural gravity for AI" or "Stop prompting. Start scaffolding." |
