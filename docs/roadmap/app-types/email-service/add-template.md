# Email Service: add-template

## Command

```
scaffold email-service add-template <name>
```

## Description

Add an email template.

## Injection Target

- **Artifact:** `src/templates/<name>.ts`

## Status

Proposed

---

## Underlying Technology

**React Email**, **MJML**, or **Handlebars** for templates. React Email for React components; MJML for responsive HTML; Handlebars for simple logic.

## Best Practices & Engineering Patterns

- **Template engines:** Use React Email for type-safe props; MJML for layout; Handlebars for simple vars.
- **Layout vs content:** Shared layout (header, footer); content templates extend; compose at render.
- **Preview:** Render in dev for preview; use React Email preview or Storybook.

## Effect Library Usage

- **Context:** Inject template renderer via Effect `Context`; handlers receive.
- **Render:** Use `Effect.sync` for sync render; `Effect.promise` for async (e.g. MJML).
- **Services:** Wrap render in Effect service; expose `render(template, data)`.

## Implementation Considerations

- **Registry:** Templates in `src/templates/`; export `xxxTemplate` or `renderXxx`.
- **Stubs:** `{{name}}`, `{{Name}}`, `{{templateName}}`; export `XxxTemplate` or `xxxTemplate`.
- **Naming:** `welcome`, `reset-password`; file `templates/welcome.tsx`.

## Alternative Technology Considerations

- **React Email vs MJML:** React Email for React stack; MJML for non-React.
- **Handlebars:** Simpler; no React; good for basic templates.
