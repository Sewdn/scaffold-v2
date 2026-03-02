import { intro } from "@clack/prompts";
import {
  promptProjectName,
  promptOptionalPackages,
  promptApps,
  promptInitGit,
} from "./ui-prompts.js";
import type { OptionalPackage } from "../init/optional-packages.js";
import type { AppType } from "../registry.js";

export interface CreateOptions {
  projectName: string;
  optionalPackages: OptionalPackage[];
  apps: Array<{ type: AppType; name: string }>;
  initGit: boolean;
}

/**
 * Interactive flow for creating a new monorepo project.
 * Mirrors TanStack CLI's "Let's configure your application" experience.
 */
export async function promptForCreateOptions(opts?: {
  initialProjectName?: string;
}): Promise<CreateOptions> {
  intro("Let's configure your monorepo project");

  const projectName = await promptProjectName(opts?.initialProjectName);
  const optionalPackages = await promptOptionalPackages();
  const apps = await promptApps();
  const initGit = await promptInitGit();

  return {
    projectName,
    optionalPackages,
    apps,
    initGit,
  };
}
