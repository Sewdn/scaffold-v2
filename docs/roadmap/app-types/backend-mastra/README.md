# Backend Mastra App Type

**Description:** AI agent framework using [Mastra](https://mastra.ai). Agents, workflows, RAG, memory, MCP, and observability in one TypeScript stack.

**Status:** Proposed

## Expansion Commands

| Command | Description | Injection Target |
| ------- | ------------ | ---------------- |
| [add-agent](add-agent.md) | Add an AI agent | `src/mastra/agents/<name>.ts` |
| [add-tool](add-tool.md) | Add an agent tool | `src/mastra/tools/<name>.ts` |
| [add-workflow](add-workflow.md) | Add a workflow | `src/mastra/workflows/<name>.ts` |
| [add-scorer](add-scorer.md) | Add an eval scorer | `src/mastra/scorers/<name>.ts` |
| [add-prompt](add-prompt.md) | Add a prompt template | `src/mastra/prompts/<name>.ts` |

## Underlying Technology

**Mastra** — All-in-one TypeScript AI framework. Agents with tools, workflows, RAG, memory, MCP integration. Studio dev server at `localhost:4111` for prototyping. Deploy as API or bundle with Next.js, Express, Hono.

**Setup:**
```bash
npm create mastra@latest
```

**Project structure:**
```
src/mastra/
├── agents/
├── tools/
├── workflows/
├── scorers/
└── index.ts
```

**Prerequisites:** API key from OpenAI, Anthropic, Google Gemini, etc.

## Best Practices & Engineering Patterns

- **Agent-centric:** Agents use tools, workflows, and prompts; expose as API or embed in app.
- **Observability:** Built-in traces, logs, token usage; integrate with o11y platforms.
- **Evals:** Define scorers for model-graded, rule-based, or statistical evaluation.
- **MCP:** Integrate Model Context Protocol for tool discovery.

## Implementation Considerations

- **Stub variables:** `{{name}}`, `{{Name}}`, `{{model}}`.
- **Directory prefix:** `backend-mastra` → `apps/backend-mastra-<name>`.
- **Env:** `.env.example` for API keys.

## References

- [Mastra Docs](https://mastra.ai/docs)
- [Quickstart](https://mastra.ai/docs/getting-started/installation)
- [Project Structure](https://mastra.ai/docs/getting-started/project-structure)
