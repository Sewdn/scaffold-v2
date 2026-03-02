import { existsSync } from "fs";
import { join } from "path";
import { generateFromStubs, resolvePackageStubsDir } from "../services/generator.js";
import {
  getPackageConfig,
  OPTIONAL_PACKAGE_IDS,
  type OptionalPackage,
} from "../packages/registry.js";
import { Effect } from "effect";
import type { CommandStep } from "../types/template.js";
import { runSteps } from "../orchestrator.js";
import { getPackageInitStepsFromConfig } from "./init-steps.js";
import type { PackageContext } from "@workspace/core-pkg-types";

export const OPTIONAL_PACKAGES = OPTIONAL_PACKAGE_IDS;
export type { OptionalPackage };

export interface InitOptions {
  projectName: string;
  projectDir: string;
}

/**
 * Returns init steps for the selected optional packages.
 * Order matters: domain first (ui-lib may depend on it), then svc-config, ui, ui-lib.
 * Each package's config drives directory setup, deps, and package.json merge.
 */
export function getOptionalPackageSteps(
  projectName: string,
  selected: readonly OptionalPackage[],
): CommandStep[] {
  if (selected.length === 0) return [];

  const hasDomain = selected.includes("domain");
  const steps: CommandStep[] = [];

  for (const pkg of selected) {
    const config = getPackageConfig(pkg);
    if (!config) continue;

    const packageDir = `${projectName}/packages/${pkg}`;
    const packageName = `@${projectName}/${pkg}`;
    const ctx: PackageContext = {
      projectName,
      packageName,
      packageDir,
      hasDomain,
      selectedPackages: selected,
    };

    steps.push(...getPackageInitStepsFromConfig(config, ctx));
  }

  return steps;
}

/**
 * Creates ui and ui-lib packages if they do not exist.
 * Use when adding a frontend app with --with-ui.
 */
export async function ensureUIPackagesExist(
  projectDir: string,
  projectName: string,
): Promise<void> {
  const needsUi = !existsSync(join(projectDir, "packages/ui", "package.json"));
  const needsUiLib = !existsSync(join(projectDir, "packages/ui-lib", "package.json"));
  if (!needsUi && !needsUiLib) return;

  const toCreate: OptionalPackage[] = [];
  if (needsUi) toCreate.push("ui");
  if (needsUiLib) toCreate.push("ui-lib");

  const steps = getOptionalPackageSteps(projectName, toCreate);
  if (steps.length === 0) return;

  const parentDir = join(projectDir, "..");
  await Effect.runPromise(
    runSteps(steps, {
      cwd: parentDir,
      context: { projectName, projectDir },
      verbose: true,
    }),
  );
  await scaffoldOptionalPackageFiles(projectDir, toCreate, projectName);
}

/**
 * Returns true if both ui and ui-lib packages exist.
 */
export function hasUIPackages(projectDir: string): boolean {
  return (
    existsSync(join(projectDir, "packages/ui", "package.json")) &&
    existsSync(join(projectDir, "packages/ui-lib", "package.json"))
  );
}

/**
 * Writes source files for the selected optional packages.
 * Uses Mustache stub files from each package module's stubsDir.
 */
export async function scaffoldOptionalPackageFiles(
  projectDir: string,
  selected: readonly OptionalPackage[],
  projectName?: string,
): Promise<void> {
  const pkgName = projectName ? `@${projectName}` : "@workspace";
  const projectRoot = projectDir;
  const hasDomain = selected.includes("domain");

  for (const pkg of selected) {
    const config = getPackageConfig(pkg);
    if (!config) continue;

    const packageDir = join(projectDir, "packages", pkg);
    const packageName = `${pkgName}/${pkg}`;
    const ctx = {
      projectName: projectName ?? "workspace",
      packageName,
      hasDomain,
    };

    const stubsDir = resolvePackageStubsDir(config.stubsDir, pkg, projectRoot);
    await generateFromStubs(stubsDir, packageDir, ctx);
  }
}
