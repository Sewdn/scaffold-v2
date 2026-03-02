# Target Audience

## Primary: AI Coding Agents

- Use MCP server or CLI to scaffold and expand
- Follow `.cursor/rules` and project structure
- Expansion commands reduce prompt length and increase consistency

## Secondary: Developers

- Use CLI directly for rapid setup
- Expansion replaces copy-paste and manual file creation
- Consistent structure improves onboarding

## Tertiary: Teams

- Enforce structure across members
- Expansion commands as part of team conventions
- CI/CD can validate expansion outputs

## Technology Alignment

- **Effect** and **registry** serve all audiences: agents get typed flows; teams get consistent structure.
- **Implementation implication:** MCP tools expose expansion; CLI for direct use; both use same registry/stub engine.
- **Alternative philosophy:** Prompt-heavy (instructions for each audience) vs structure-heavy (one structure, many consumers) — structure-heavy scales.
