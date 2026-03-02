/**
 * Documentation app-type configuration. Scripts phase for Starlight/Astro.
 */

/** Build script steps for create astro starlight */
export function getScriptSteps(): Array<{
  type: "bun";
  command: string;
  args: string[];
  argsForNonInteractive?: string[];
  interactive?: boolean;
}> {
  return [
    {
      type: "bun",
      command: "create",
      args: ["astro@latest", "{{appDir}}"],
      argsForNonInteractive: [
        "astro@latest",
        "{{appDir}}",
        "--template",
        "starlight",
        "--install",
        "--no-git",
      ],
      interactive: true,
    },
  ];
}
