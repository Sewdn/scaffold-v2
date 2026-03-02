import { Command } from "commander";
import { resolve } from "path";
import { existsSync } from "fs";
import { Effect } from "effect";
import { outro } from "@clack/prompts";
import chalk from "chalk";
import { createBaseStructure } from "../init/create-base-structure.js";
import { runSteps } from "../orchestrator.js";
import { getAppInitSteps, SCRIPTS_DIR } from "../init/init-steps.js";
import { createAppEntryFiles } from "../init/create-app-files.js";
import { formatEntityName, validateProjectName } from "@workspace/core-utils";
import { APP_TYPE_PREFIX, type AppType } from "../registry.js";
import { getAppTypeConfig, hasGeneratePhase, isReactFrontend } from "../app-types/registry.js";
import { ensureUIPackagesExist, hasUIPackages } from "../init/optional-packages.js";
import { promptForCreateOptions } from "../ui/create-options.js";
import { createUIEnvironment } from "../ui/ui-environment.js";

function parseOptionalPackages(
  packages: string | string[] | undefined,
  flags: { domain?: boolean; svcConfig?: boolean; ui?: boolean; uiLib?: boolean },
): import("../init/optional-packages.js").OptionalPackage[] {
  const OPTIONAL_PACKAGES = ["domain", "svc-config", "ui", "ui-lib"] as const;
  const fromFlags: (typeof OPTIONAL_PACKAGES)[number][] = [];
  if (flags.domain) fromFlags.push("domain");
  if (flags.svcConfig) fromFlags.push("svc-config");
  if (flags.ui) fromFlags.push("ui");
  if (flags.uiLib) fromFlags.push("ui-lib");
  if (fromFlags.length > 0) return fromFlags;

  const raw = Array.isArray(packages) ? packages : packages ? [packages] : [];
  if (raw.length > 0) {
    const list = raw.flatMap((p) => p.split(",")).map((s) => s.trim());
    return list.filter((p): p is (typeof OPTIONAL_PACKAGES)[number] =>
      OPTIONAL_PACKAGES.includes(p as (typeof OPTIONAL_PACKAGES)[number]),
    );
  }
  return [];
}

export const createCommand = new Command("create")
  .description("Create a new monorepo project (interactive, TanStack-style UX)")
  .argument("[name]", "Project name")
  .option(
    "-p, --packages <list>",
    "Optional packages: domain, svc-config, ui, ui-lib (comma-separated)",
  )
  .option("--domain", "Include domain package")
  .option("--svc-config", "Include svc-config package")
  .option("--ui", "Include ui package")
  .option("--ui-lib", "Include ui-lib package")
  .option("--no-git", "Skip git initialization")
  .option("--non-interactive", "Skip interactive prompts, use defaults", false)
  .action(
    async (
      name: string | undefined,
      options: {
        packages?: string | string[];
        domain?: boolean;
        svcConfig?: boolean;
        ui?: boolean;
        uiLib?: boolean;
        git?: boolean;
        nonInteractive?: boolean;
      },
    ) => {
      const env = createUIEnvironment(options.nonInteractive);

      let projectName: string;
      let optionalPackages: import("../init/optional-packages.js").OptionalPackage[];
      let apps: Array<{ type: AppType; name: string }>;
      let initGit: boolean;

      if (options.nonInteractive) {
        if (!name) {
          env.log.error("Project name is required in non-interactive mode.");
          process.exit(1);
        }
        projectName = formatEntityName(validateProjectName(name), "project");
        optionalPackages = parseOptionalPackages(options.packages, {
          domain: options.domain,
          svcConfig: options.svcConfig,
          ui: options.ui,
          uiLib: options.uiLib,
        });
        apps = [];
        initGit = options.git !== false;
      } else {
        const opts = await promptForCreateOptions(name ? { initialProjectName: name } : undefined);
        projectName = opts.projectName;
        optionalPackages = opts.optionalPackages;
        apps = opts.apps;
        initGit = options.git ?? opts.initGit;
      }

      const projectDir = resolve(process.cwd(), projectName);

      if (existsSync(projectDir)) {
        env.log.error(`Directory ${projectName} already exists.`);
        process.exit(1);
      }

      env.intro(`Creating your monorepo in ${projectName}...`);

      const spin = env.spinner("Setting up project structure");
      spin.start();

      try {
        await createBaseStructure({
          projectName,
          projectDir,
          optionalPackages,
          verbose: false,
        });
        spin.stop("Project structure ready");
      } catch (err) {
        spin.stop("Failed");
        env.log.error(err instanceof Error ? err.message : String(err));
        process.exit(1);
      }

      const installSpin = env.spinner("Installing dependencies");
      installSpin.start();
      try {
        await Effect.runPromise(
          runSteps([{ type: "bun", command: "install", cwd: "" }], {
            cwd: projectDir,
            verbose: false,
          }),
        );
        installSpin.stop("Dependencies installed");
      } catch (err) {
        installSpin.stop("Failed");
        env.log.error(err instanceof Error ? err.message : String(err));
        process.exit(1);
      }

      for (let i = 0; i < apps.length; i++) {
        const { type: appType, name: appName } = apps[i];
        const dirName = `${APP_TYPE_PREFIX[appType]}-${appName}`;
        const appDir = `apps/${dirName}`;
        const patchScriptPath = `${SCRIPTS_DIR}/patch-package-json.mjs`;
        const context = {
          projectName,
          appName: dirName,
          appType,
          appDir,
          projectDir,
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
          env.log.error(`Unknown app type: ${appType}`);
          process.exit(1);
        }

        const reactFrontend = isReactFrontend(appType);
        const uiExists = hasUIPackages(projectDir);
        const addUIPackages = uiExists || optionalPackages.includes("ui");

        if (reactFrontend && addUIPackages && !uiExists) {
          await ensureUIPackagesExist(projectDir, projectName);
        }

        const appSpin = env.spinner(`Adding ${appType} app: ${dirName}`);
        appSpin.start();

        try {
          for (const phase of config.phases) {
            if (phase.type === "generate") {
              const steps = getAppInitSteps({
                appDir,
                appName: dirName,
                appBaseName: appName,
                appType,
                projectName,
              });
              if (steps.length > 0) {
                await Effect.runPromise(
                  runSteps(steps, {
                    cwd: projectDir,
                    context,
                    verbose: false,
                    allowInteractive: !options.nonInteractive,
                    beforeInteractiveStep: () => appSpin.stop("Running interactive setup..."),
                  }),
                );
              }
            } else {
              const steps = phase.getSteps(appTypeContext);
              if (steps.length > 0) {
                await Effect.runPromise(
                  runSteps(steps, {
                    cwd: projectDir,
                    context,
                    verbose: false,
                    allowInteractive: !options.nonInteractive,
                    beforeInteractiveStep: () => appSpin.stop("Running interactive setup..."),
                  }),
                );
              }
            }
          }

          if (reactFrontend && (addUIPackages || hasUIPackages(projectDir))) {
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
                { cwd: projectDir, context, verbose: false },
              ),
            );
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

          appSpin.stop(`Added ${dirName}`);
        } catch (err) {
          appSpin.stop("Failed");
          env.log.error(err instanceof Error ? err.message : String(err));
          process.exit(1);
        }
      }

      if (apps.length > 0) {
        const installSpin2 = env.spinner("Installing app dependencies");
        installSpin2.start();
        try {
          await Effect.runPromise(
            runSteps([{ type: "bun", command: "install", cwd: "" }], {
              cwd: projectDir,
              verbose: false,
            }),
          );
          installSpin2.stop("Dependencies installed");
        } catch (err) {
          installSpin2.stop("Failed");
          env.log.error(err instanceof Error ? err.message : String(err));
          process.exit(1);
        }
      }

      if (initGit) {
        const gitSpin = env.spinner("Initializing git repository");
        gitSpin.start();
        try {
          await Effect.runPromise(
            runSteps([{ type: "shell", command: "git init", cwd: "" }], {
              cwd: projectDir,
              verbose: false,
            }),
          );
          gitSpin.stop("Git initialized");
        } catch {
          gitSpin.stop("Skipped (git may not be installed)");
        }
      }

      const basePkgs = ["typescript-config"];
      const pkgList = optionalPackages.length > 0 ? [...basePkgs, ...optionalPackages] : basePkgs;
      const appList =
        apps.length > 0 ? apps.map((a) => `${APP_TYPE_PREFIX[a.type]}-${a.name}`).join(", ") : null;

      outro(chalk.green(`Your monorepo is ready in '${projectName}'.`));
      console.log("");
      console.log(chalk.gray("  Packages:") + ` ${pkgList.join(", ")}`);
      if (appList) {
        console.log(chalk.gray("  Apps:") + ` ${appList}`);
      }
      console.log("");
      console.log(chalk.cyan("  Use the following commands to get started:"));
      console.log(chalk.gray("  %") + ` cd ${projectName}`);
      console.log(chalk.gray("  %") + ` bun run build`);
      console.log("");
    },
  );
