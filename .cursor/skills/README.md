# Cursor skills (project)

Skills are symlinked from scaffold packages so Cursor sees only `SKILL.md` per skill (as required).

- **Package skills** (`scaffold-app-cli`, `scaffold-domain`, etc.): Each dir contains a symlink `SKILL.md` → the package's `SKILL.md`.
- **Standalone skills** (`scaffold-component`, `scaffold-module`, `scaffold-project`): Real dirs with their own `SKILL.md`.

To refresh package skill symlinks after adding or moving packages:

```bash
bun run skills:link
```
