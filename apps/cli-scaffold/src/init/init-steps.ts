import { dirname, join } from "path";
import { fileURLToPath } from "url";
import type { CommandStep } from "../types/template.js";
import { getAppTypeConfig, hasGeneratePhase, type GeneratePhase } from "../app-types/registry.js";
import { BASE_DEV_DEPS, ROOT_DEV_DEPS, ROOT_OVERRIDES } from "@workspace/scaffold-deps";

const __dirname = dirname(fileURLToPath(import.meta.url));
export const SCRIPTS_DIR = join(__dirname, "../../scripts");

/**
 * Build steps for base monorepo using bun init, turbo, and init commands.
 * Run with cwd = parent of project (process.cwd() when project is projectName/).
 */
export function getBaseInitSteps(_projectName: string): CommandStep[] {
  const rootMerge = JSON.stringify({
    workspaces: ["packages/*", "apps/*"],
    scripts: {
      build: "turbo build",
      dev: "turbo dev",
      lint: "turbo lint",
      format: "oxfmt",
      "format:check": "oxfmt --check",
      storybook: "turbo storybook",
      "dora:index": "bunx @butttons/dora index",
    },
    packageManager: "bun@1.2.2",
    engines: { node: ">=20" },
    overrides: ROOT_OVERRIDES,
  });

  return [
    { type: "shell", command: `mkdir -p {{projectName}}/apps {{projectName}}/packages` },
    { type: "shell", command: `cd {{projectName}} && bun init -y` },
    {
      type: "exec",
      command: "node",
      args: [
        `${SCRIPTS_DIR}/patch-package-json.mjs`,
        `@{{projectName}}/root`,
        "--merge",
        rootMerge,
      ],
      cwd: "{{projectName}}",
    },
    {
      type: "bun",
      command: "add",
      args: ["-d", ...ROOT_DEV_DEPS],
      cwd: "{{projectName}}",
    },
    {
      type: "exec",
      command: "node",
      args: [`${SCRIPTS_DIR}/write-turbo.mjs`],
      cwd: "{{projectName}}",
    },
    {
      type: "exec",
      command: "node",
      args: [`${SCRIPTS_DIR}/write-tsconfig.mjs`],
      cwd: "{{projectName}}",
    },
  ];
}

/**
 * Steps to create a package with explicit options (e.g. dynamic svc-X, ui-X packages).
 */
export function getPackageInitSteps(options: {
  packageDir: string;
  packageName: string;
  dependencies: string[];
  devDependencies: string[];
  scripts?: Record<string, string>;
  mkdirPaths?: string[];
}): CommandStep[] {
  const {
    packageDir,
    packageName,
    dependencies,
    devDependencies,
    scripts = {},
    mkdirPaths = ["src"],
  } = options;
  const merge: Record<string, unknown> = {
    private: true,
    type: "module",
    module: "./src/index.ts",
    types: "./src/index.ts",
    scripts: { build: "tsc", lint: "oxlint", ...scripts },
  };
  const dirs = mkdirPaths.map((p) => `${packageDir}/${p}`).join(" ");

  const steps: CommandStep[] = [
    { type: "shell", command: `mkdir -p ${dirs}` },
    { type: "bun", command: "init", args: ["-y"], cwd: packageDir },
    {
      type: "exec",
      command: "node",
      args: [
        `${SCRIPTS_DIR}/patch-package-json.mjs`,
        packageName,
        "--merge",
        JSON.stringify(merge),
      ],
      cwd: packageDir,
    },
  ];
  if (dependencies.length > 0) {
    steps.push({ type: "bun", command: "add", args: dependencies, cwd: packageDir });
  }
  if (devDependencies.length > 0) {
    steps.push({ type: "bun", command: "add", args: ["-d", ...devDependencies], cwd: packageDir });
  }
  steps.push({
    type: "exec",
    command: "node",
    args: [`${SCRIPTS_DIR}/write-tsconfig.mjs`],
    cwd: packageDir,
  });
  if (devDependencies.some((d) => d.includes("oxlint"))) {
    steps.push({
      type: "exec",
      command: "node",
      args: [`${SCRIPTS_DIR}/write-oxlint-for-package.mjs`],
      cwd: packageDir,
    });
  }
  return steps;
}

/**
 * Steps to create a package from PackageConfig.
 * Uses config for directory setup, merge, dependencies, and scripts.
 */
export function getPackageInitStepsFromConfig(
  config: import("@workspace/core-pkg-types").PackageConfig,
  ctx: import("@workspace/core-pkg-types").PackageContext,
): CommandStep[] {
  const merge = config.getMerge(ctx);
  const scripts = config.getScripts?.(ctx) ?? {
    build: "tsc",
    lint: "oxlint",
  };
  const fullMerge = { ...merge, scripts };
  const deps = config.getDependencies(ctx);
  const devDeps = config.getDevDependencies(ctx);
  const mkdirPaths = config
    .getMkdirPaths(ctx)
    .map((p) => `${ctx.packageDir}/${p}`)
    .join(" ");

  const steps: CommandStep[] = [
    { type: "shell", command: `mkdir -p ${mkdirPaths}` },
    { type: "bun", command: "init", args: ["-y"], cwd: ctx.packageDir },
    {
      type: "exec",
      command: "node",
      args: [
        `${SCRIPTS_DIR}/patch-package-json.mjs`,
        ctx.packageName,
        "--merge",
        JSON.stringify(fullMerge),
      ],
      cwd: ctx.packageDir,
    },
  ];
  if (deps.length > 0) {
    steps.push({ type: "bun", command: "add", args: deps, cwd: ctx.packageDir });
  }
  if (devDeps.length > 0) {
    steps.push({ type: "bun", command: "add", args: ["-d", ...devDeps], cwd: ctx.packageDir });
  }
  const tsconfigArgs = [`${SCRIPTS_DIR}/write-tsconfig.mjs`];
  if (config.id === "ui" || config.id === "ui-lib") {
    tsconfigArgs.push("--jsx", "react-jsx");
  }
  steps.push({
    type: "exec",
    command: "node",
    args: tsconfigArgs,
    cwd: ctx.packageDir,
  });
  if (devDeps.some((d) => d.includes("oxlint"))) {
    steps.push({
      type: "exec",
      command: "node",
      args: [`${SCRIPTS_DIR}/write-oxlint-for-package.mjs`],
      cwd: ctx.packageDir,
    });
  }
  return steps;
}

/**
 * Steps to create an app using bun init + bun add.
 * Uses the app-types registry; returns steps for the first generate phase.
 */
export function getAppInitSteps(options: {
  appDir: string;
  appName: string;
  appBaseName?: string;
  appType: string;
  projectName: string;
}): CommandStep[] {
  const { appDir, appName, appBaseName, appType, projectName } = options;
  const config = getAppTypeConfig(appType);
  if (!config || !hasGeneratePhase(config)) return [];

  const phase = config.phases.find((p) => p.type === "generate") as GeneratePhase | undefined;
  if (!phase) return [];

  const ctx = { projectName, appName, appBaseName: appBaseName ?? appName, appDir };
  const pkgName = `@${projectName}/${appName}`;
  const merge = phase.getMerge(ctx);
  const deps = phase.getDependencies(ctx);
  const mkdirPaths = phase
    .getMkdirPaths(ctx)
    .map((p) => `${appDir}/${p}`)
    .join(" ");

  return [
    { type: "shell", command: `mkdir -p ${mkdirPaths}` },
    { type: "bun", command: "init", args: ["-y"], cwd: appDir },
    {
      type: "exec",
      command: "node",
      args: [`${SCRIPTS_DIR}/patch-package-json.mjs`, pkgName, "--merge", JSON.stringify(merge)],
      cwd: appDir,
    },
    { type: "bun", command: "add", args: deps, cwd: appDir },
    { type: "bun", command: "add", args: ["-d", ...BASE_DEV_DEPS], cwd: appDir },
    {
      type: "exec",
      command: "node",
      args: [`${SCRIPTS_DIR}/write-tsconfig.mjs`],
      cwd: appDir,
    },
    {
      type: "exec",
      command: "node",
      args: [`${SCRIPTS_DIR}/write-oxlint-for-package.mjs`],
      cwd: appDir,
    },
  ];
}
