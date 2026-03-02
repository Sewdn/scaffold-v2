/**
 * Frontend-vite app-type configuration.
 * Script steps only (no stubs) — uses bunx create-vite.
 */

/** Get script steps for the frontend-vite scripts phase */
export function getScriptSteps(_ctx: unknown) {
  return [
    {
      type: "bunx" as const,
      command: "create-vite@latest",
      args: ["{{appDir}}", "--template", "react-ts"],
      argsForNonInteractive: ["{{appDir}}", "--template", "react-ts"],
      interactive: false,
    },
    {
      type: "bun" as const,
      command: "add",
      args: ["react", "react-dom", "effect"],
      cwd: "{{appDir}}",
    },
  ];
}
