import { join } from "path";
import { Effect } from "effect";
import type { CommandStep } from "../types/template.js";
import { runSteps } from "../orchestrator.js";
import { getBaseInitSteps, SCRIPTS_DIR } from "./init-steps.js";
import {
  getOptionalPackageSteps,
  scaffoldOptionalPackageFiles,
  type InitOptions,
  type OptionalPackage,
} from "./optional-packages.js";

export interface CreateBaseStructureOptions extends InitOptions {
  optionalPackages?: readonly OptionalPackage[];
  /** When false, suppresses step-by-step command output (for spinner UX) */
  verbose?: boolean;
}

/**
 * Creates minimal base monorepo structure: root package, turbo, typescript-config, oxc (oxlint + oxfmt).
 * Optionally adds domain, svc-config, ui, ui-lib when selected via optionalPackages.
 */
export async function createBaseStructure(options: CreateBaseStructureOptions): Promise<void> {
  const { projectName, projectDir, optionalPackages = [], verbose = true } = options;
  const parentDir = join(projectDir, "..");

  const allSteps: CommandStep[] = [
    ...getBaseInitSteps(projectName),
    {
      type: "exec",
      command: "node",
      args: [`${SCRIPTS_DIR}/write-dora-setup.mjs`],
      cwd: "{{projectName}}",
    },
    {
      type: "bun",
      command: "add",
      args: ["-d", "@workspace/typescript-config@workspace:*"],
      cwd: "{{projectName}}",
    },
    ...getOptionalPackageSteps(projectName, optionalPackages),
  ];

  await Effect.runPromise(
    runSteps(allSteps, {
      cwd: parentDir,
      context: { projectName, projectDir },
      verbose,
    }),
  );

  if (optionalPackages.length > 0) {
    await scaffoldOptionalPackageFiles(projectDir, optionalPackages, projectName);
  }
}
