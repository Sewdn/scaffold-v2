/**
 * Slide deck app-type configuration. Scripts phase for Reveal.js (Vite + vanilla-ts).
 * No stubs — uses bun create vite + bun add reveal.js.
 */

/** Minimal script step shape (matches CommandStep from cli-scaffold) */
interface ScriptStep {
  type: "bun";
  command: string;
  args?: string[];
  argsForNonInteractive?: string[];
  cwd?: string;
  interactive?: boolean;
}

/** Build script steps: create Vite vanilla-ts app, then add reveal.js */
export function getScriptSteps(): ScriptStep[] {
  return [
    {
      type: "bun",
      command: "create",
      args: ["vite@latest", "{{appDir}}", "--interactive"],
      argsForNonInteractive: ["vite@latest", "{{appDir}}", "--template", "vanilla-ts"],
      interactive: true,
    },
    {
      type: "bun",
      command: "add",
      args: ["reveal.js"],
      cwd: "{{appDir}}",
    },
  ];
}
