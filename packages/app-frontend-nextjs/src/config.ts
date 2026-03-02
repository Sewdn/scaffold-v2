/**
 * Frontend-Next.js app-type configuration. Script steps for scaffolding
 * Next.js apps via bun create next-app@latest (no stubs).
 */

import type { AppTypeContext } from "./types.js";

/** Script steps for scaffolding a Next.js frontend app */
export function getScriptSteps(_ctx: AppTypeContext) {
  return [
    {
      type: "bun" as const,
      command: "create",
      args: ["next-app@latest", "{{appDir}}", "--use-bun"],
      argsForNonInteractive: [
        "next-app@latest",
        "{{appDir}}",
        "--typescript",
        "--tailwind",
        "--no-eslint",
        "--app",
        "--src-dir",
        "--no-import-alias",
        "--no-react-compiler",
      ],
      interactive: true,
    },
    {
      type: "bun" as const,
      command: "add",
      args: ["effect"],
      cwd: "{{appDir}}",
    },
  ];
}
