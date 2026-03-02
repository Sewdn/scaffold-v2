import { Command } from "commander";
import { resolve } from "path";
import { existsSync, readFileSync } from "fs";
import { Effect } from "effect";
import { outro } from "@clack/prompts";
import chalk from "chalk";
import { runSteps } from "../orchestrator.js";
import { createAppEntryFiles } from "../init/create-app-files.js";
import { getAppInitSteps, SCRIPTS_DIR } from "../init/init-steps.js";
import { ensureUIPackagesExist, hasUIPackages } from "../init/optional-packages.js";
import { formatEntityName, validateAppName } from "@workspace/core-utils";
import { APP_TYPES, APP_TYPE_PREFIX, type AppType } from "../registry.js";
import { getAppTypeConfig, isReactFrontend, hasGeneratePhase } from "../app-types/registry.js";
import { promptWithUI, promptApps, promptAppName } from "../ui/ui-prompts.js";
import { scaffoldCliExampleDefaults } from "@workspace/app-cli";

export const appCommand = new Command("app")
  .description("Add an application to the project")
  .argument("[name]", "App name")
  .option("-t, --type <type>", `App type (one of: ${APP_TYPES.join(", ")})`)
  .option("--with-ui", "Include UI and UI-lib packages (React frontends only)")
  .option("--no-with-ui", "Do not include UI packages")
  .option("--non-interactive", "Run without prompts", false)
  .option("--no-example-command", "Skip scaffolding example command (CLI apps only)")
  .option("--no-example-service", "Skip scaffolding example service (CLI apps only)")
  .action(
    async (
      name: string | undefined,
      options: {
        type?: string;
        withUi?: boolean;
        nonInteractive?: boolean;
        exampleCommand?: boolean;
        exampleService?: boolean;
      },
    ) => {
      let appType = options.type as AppType | undefined;
      let appName = name;

      // If name looks like an app type (e.g. "scaffold app cli"), treat it as type
      if (!appType && appName && APP_TYPES.includes(appName as AppType)) {
        appType = appName as AppType;
        appName = undefined;
      }

      // Interactive: no type -> multiselect app types, then scaffold each
      if (!appType && !options.nonInteractive) {
        const appsToAdd = await promptApps();
        if (appsToAdd.length === 0) {
          console.log("No apps selected.");
          return;
        }
        const ctx = getProjectContext();
        for (const { type, name: n } of appsToAdd) {
          await scaffoldOneApp(n, type as AppType, options, ctx);
        }
        return;
      }

      if (!appType) {
        console.error("Error: App type is required. Use --type with one of:", APP_TYPES.join(", "));
        process.exit(1);
      }

      if (!APP_TYPES.includes(appType as AppType)) {
        console.error("Error: Invalid app type. Must be one of:", APP_TYPES.join(", "));
        process.exit(1);
      }

      if (!appName && !options.nonInteractive) {
        appName = await promptAppName(appType);
      } else if (!appName) {
        console.error("Error: App name is required.");
        process.exit(1);
      } else {
        appName = formatEntityName(validateAppName(appName), "app");
      }

      const ctx = getProjectContext();
      await scaffoldOneApp(appName, appType, options, ctx);
    },
  );

function getProjectContext(): { projectDir: string; projectName: string } {
  const projectDir = process.cwd();
  const rootPkgPath = resolve(projectDir, "package.json");
  if (!existsSync(rootPkgPath)) {
    console.error("Error: Not in a project root. Run scaffold init first.");
    process.exit(1);
  }
  let projectName = "workspace";
  try {
    const pkg = JSON.parse(readFileSync(rootPkgPath, "utf-8")) as { name?: string };
    const name = pkg?.name;
    if (name && name.startsWith("@") && name.endsWith("/root")) {
      projectName = name.slice(1, -5);
    }
  } catch {
    // ignore
  }
  return { projectDir, projectName };
}

async function scaffoldOneApp(
  appName: string,
  appType: AppType,
  options: {
    withUi?: boolean;
    nonInteractive?: boolean;
    exampleCommand?: boolean;
    exampleService?: boolean;
  },
  ctx: { projectDir: string; projectName: string },
): Promise<void> {
  const { projectDir, projectName } = ctx;
  const prefix = APP_TYPE_PREFIX[appType];
  const dirName = `${prefix}-${appName}`;
  const appDir = `apps/${dirName}`;
  const patchScriptPath = `${SCRIPTS_DIR}/patch-package-json.mjs`;
  const runContext = {
    projectName,
    projectDir,
    appName: dirName,
    appType,
    appDir,
    patchScriptPath,
  };
  const appTypeContext = {
    projectName,
    appName: dirName,
    appDir,
    projectDir,
    appType,
    patchScriptPath,
  };

  const config = getAppTypeConfig(appType);
  if (!config) {
    console.error("Error: Unknown app type:", appType);
    process.exit(1);
  }

  const reactFrontend = isReactFrontend(appType);
  const uiExists = hasUIPackages(projectDir);
  let addUIPackages = options.withUi === true || uiExists;
  if (
    reactFrontend &&
    addUIPackages === false &&
    !options.nonInteractive &&
    options.withUi !== false
  ) {
    addUIPackages = await promptWithUI();
  }

  console.log(`\nAdding ${appType} app "${appName}" at ${appDir}\n`);

  if (reactFrontend && addUIPackages && !uiExists) {
    console.log("  Creating UI and UI-lib packages...\n");
    await ensureUIPackagesExist(projectDir, projectName);
  }

  for (const phase of config.phases) {
    if (phase.type === "generate") {
      const steps = getAppInitSteps({
        appDir,
        appName: dirName,
        appBaseName: appName,
        appType,
        projectName,
      });
      if (steps.length === 0) continue;
      try {
        await Effect.runPromise(
          runSteps(steps, {
            cwd: projectDir,
            context: runContext,
            verbose: true,
            allowInteractive: !options.nonInteractive,
          }),
        );
      } catch (err) {
        const msg =
          err && typeof err === "object" && "message" in err
            ? String((err as Error).message)
            : String(err);
        console.error("Error:", msg);
        process.exit(1);
      }
    } else {
      const steps = phase.getSteps(appTypeContext);
      if (steps.length === 0) continue;
      try {
        await Effect.runPromise(
          runSteps(steps, {
            cwd: projectDir,
            context: runContext,
            verbose: true,
            allowInteractive: !options.nonInteractive,
          }),
        );
      } catch (err) {
        const msg =
          err && typeof err === "object" && "message" in err
            ? String((err as Error).message)
            : String(err);
        console.error("Error:", msg);
        process.exit(1);
      }
    }
  }

  if (reactFrontend && addUIPackages) {
    try {
      await Effect.runPromise(
        runSteps(
          [
            {
              type: "bun",
              command: "add",
              args: [`@${projectName}/ui@workspace:*`, `@${projectName}/ui-lib@workspace:*`],
              cwd: appDir,
            },
          ],
          { cwd: projectDir, context: runContext, verbose: true },
        ),
      );
    } catch (err) {
      const msg =
        err && typeof err === "object" && "message" in err
          ? String((err as Error).message)
          : String(err);
      console.error("Error adding UI packages:", msg);
      process.exit(1);
    }
  }

  if (hasGeneratePhase(config)) {
    await createAppEntryFiles({
      projectName,
      appName: dirName,
      appType,
      appDir: resolve(projectDir, appDir),
      projectRoot: projectDir,
    });
  }

  if (appType === "cli") {
    await scaffoldCliExampleDefaults(projectDir, dirName, {
      skipCommand: options.exampleCommand === false,
      skipService: options.exampleService === false,
    });
  }

  console.log("\nRunning bun install...\n");
  try {
    await Effect.runPromise(
      runSteps([{ type: "bun", command: "install", cwd: "" }], { cwd: projectDir, verbose: true }),
    );
  } catch (err) {
    const msg =
      err && typeof err === "object" && "message" in err
        ? String((err as Error).message)
        : String(err);
    console.error("Error:", msg);
    process.exit(1);
  }

  outro(chalk.green(`Created app in ${appDir}`));
  console.log(chalk.gray("  Package:") + ` @${projectName}/${dirName}`);
  console.log("");
}
