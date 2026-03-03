import { Command } from "commander";
import { resolve } from "path";
import { existsSync } from "fs";
import { Effect } from "effect";
import { outro } from "@clack/prompts";
import chalk from "chalk";
import { createBaseStructure } from "../init/create-base-structure.js";
import { runSteps } from "../orchestrator.js";
import { getAppInitSteps, SCRIPTS_DIR } from "../init/init-steps.js";
import { formatEntityName, validateAppName, validateProjectName } from "@workspace/core-utils";
import { APP_TYPE_PREFIX, type AppType } from "../registry.js";
import {
  getAppTypeConfig,
  getDefaultAppName,
  hasGeneratePhase,
  isReactFrontend,
} from "../app-types/registry.js";
import { createAppEntryFiles } from "../init/create-app-files.js";
import {
  OPTIONAL_PACKAGES,
  hasUIPackages,
  type OptionalPackage,
} from "../init/optional-packages.js";
import { scaffoldCliExampleDefaults } from "@workspace/app-cli";
import { promptProjectName, promptOptionalPackages, promptApps } from "../ui/ui-prompts.js";

function parseOptionalPackages(
  packages: string | string[] | undefined,
  flags: { domain?: boolean; svcConfig?: boolean; ui?: boolean; uiLib?: boolean },
): OptionalPackage[] {
  const fromFlags: OptionalPackage[] = [];
  if (flags.domain) fromFlags.push("domain");
  if (flags.svcConfig) fromFlags.push("svc-config");
  if (flags.ui) fromFlags.push("ui");
  if (flags.uiLib) fromFlags.push("ui-lib");
  if (fromFlags.length > 0) return fromFlags;

  const raw = Array.isArray(packages) ? packages : packages ? [packages] : [];
  if (raw.length > 0) {
    const list = raw.flatMap((p) => p.split(",")).map((s) => s.trim());
    return list.filter((p): p is OptionalPackage =>
      OPTIONAL_PACKAGES.includes(p as OptionalPackage),
    );
  }
  return [];
}

export const projectCommand = new Command("project")
  .description("Create a new monorepo project with optional apps")
  .argument("[name]", "Project name")
  .option("-a, --apps <types...>", "App types to add")
  .option("-n, --app-names <names...>", "App names (same order as apps)")
  .option(
    "-p, --packages <list>",
    "Optional packages: domain, svc-config, ui, ui-lib (comma-separated)",
  )
  .option("--domain", "Include domain package")
  .option("--svc-config", "Include svc-config package")
  .option("--ui", "Include ui package (Shadcn base)")
  .option("--ui-lib", "Include ui-lib package")
  .option("--non-interactive", "Run without prompts", false)
  .option("--no-example-command", "Skip scaffolding example command (CLI apps only)")
  .option("--no-example-service", "Skip scaffolding example service (CLI apps only)")
  .action(
    async (
      name: string | undefined,
      options: {
        apps?: string[];
        appNames?: string[];
        packages?: string | string[];
        domain?: boolean;
        svcConfig?: boolean;
        ui?: boolean;
        uiLib?: boolean;
        nonInteractive?: boolean;
        exampleCommand?: boolean;
        exampleService?: boolean;
      },
    ) => {
      let projectName: string;
      if (name) {
        projectName = formatEntityName(validateProjectName(name), "project");
      } else if (options.nonInteractive) {
        console.error("Error: Project name is required.");
        process.exit(1);
      } else {
        projectName = await promptProjectName();
      }
      const projectDir = resolve(process.cwd(), projectName);

      if (existsSync(projectDir)) {
        console.error(`Error: Directory ${projectName} already exists.`);
        process.exit(1);
      }

      let optionalPackages = parseOptionalPackages(options.packages, {
        domain: options.domain,
        svcConfig: options.svcConfig,
        ui: options.ui,
        uiLib: options.uiLib,
      });

      if (optionalPackages.length === 0 && !options.nonInteractive) {
        optionalPackages = await promptOptionalPackages();
      }

      let apps: string[] = (options.apps ?? [])
        .flatMap((a) => (typeof a === "string" ? a.split(",") : [a]))
        .map((s) => s.trim())
        .filter(Boolean);
      let appNames: string[] = (options.appNames ?? [])
        .flatMap((a) => (typeof a === "string" ? a.split(",") : [a]))
        .map((s) => s.trim());

      if (apps.length === 0 && !options.nonInteractive) {
        const selectedApps = await promptApps();
        apps = selectedApps.map((a) => a.type);
        appNames = selectedApps.map((a) => a.name);
      }

      if (apps.length > 0 && appNames.length !== apps.length) {
        console.error("Error: --app-names must have same count as --apps.");
        process.exit(1);
      }

      if (apps.length > 0 && appNames.length === 0) {
        appNames = apps.map((t) => getDefaultAppName(t));
      }

      console.log(`\nCreating monorepo at ${projectDir}\n`);
      await createBaseStructure({ projectName, projectDir, optionalPackages });

      console.log("Running bun install...\n");
      await Effect.runPromise(
        runSteps([{ type: "bun", command: "install", cwd: "" }], {
          cwd: projectDir,
          verbose: true,
        }),
      ).catch((err) => {
        console.error("Error:", err?.message ?? err);
        process.exit(1);
      });

      if (apps.length > 0) {
        for (let i = 0; i < apps.length; i++) {
          const appType = apps[i].trim() as AppType;
          const appName = formatEntityName(validateAppName(appNames[i]), "app");
          const prefix = APP_TYPE_PREFIX[appType];
          const dirName = `${prefix}-${appName}`;
          const appDir = `apps/${dirName}`;

          const config = getAppTypeConfig(appType);
          if (!config) {
            console.error("Error: Unknown app type:", appType);
            process.exit(1);
          }

          const context = {
            projectName,
            appName: dirName,
            appType,
            appDir,
            projectDir,
            patchScriptPath: `${SCRIPTS_DIR}/patch-package-json.mjs`,
          };
          const appTypeContext = {
            projectName,
            appName: dirName,
            appDir,
            projectDir,
            appType,
            patchScriptPath: `${SCRIPTS_DIR}/patch-package-json.mjs`,
          };

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
                    verbose: true,
                    allowInteractive: !options.nonInteractive,
                  }),
                ).catch((err) => {
                  console.error("Error adding app:", err?.message ?? err);
                  process.exit(1);
                });
              }
            } else {
              const steps = phase.getSteps(appTypeContext);
              if (steps.length > 0) {
                await Effect.runPromise(
                  runSteps(steps, {
                    cwd: projectDir,
                    context,
                    verbose: true,
                    allowInteractive: !options.nonInteractive,
                  }),
                ).catch((err) => {
                  console.error("Error adding app:", err?.message ?? err);
                  process.exit(1);
                });
              }
            }
          }

          if (isReactFrontend(appType) && hasUIPackages(projectDir)) {
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
                { cwd: projectDir, context, verbose: true },
              ),
            ).catch((err) => {
              console.error("Error adding UI packages:", err?.message ?? err);
              process.exit(1);
            });
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
        }

        console.log("\nRunning bun install...\n");
        await Effect.runPromise(
          runSteps([{ type: "bun", command: "install", cwd: "" }], {
            cwd: projectDir,
            verbose: true,
          }),
        ).catch((err) => {
          console.error("Error:", err?.message ?? err);
          process.exit(1);
        });
      }

      // Dora init and index after entire project is set up; then configure skills
      console.log("\nInitializing Dora...\n");
      await Effect.runPromise(
        runSteps(
          [
            { type: "shell", command: "dora init && dora index", cwd: "", optional: true },
            {
              type: "exec",
              command: "node",
              args: [`${SCRIPTS_DIR}/write-dora-setup.mjs`, "--post-init"],
              cwd: "",
              optional: true,
            },
          ],
          { cwd: projectDir, verbose: true },
        ),
      ).catch(() => {
        console.warn("Dora setup skipped or failed. Run 'dora init && dora index' manually.");
      });

      outro(chalk.green(`Monorepo created in ${projectName}/`));
      if (apps.length > 0) {
        console.log(
          chalk.gray("  Apps:") +
            ` ${apps.map((a, i) => `${APP_TYPE_PREFIX[apps[i] as AppType]}-${appNames[i]}`).join(", ")}`,
        );
      }
      console.log("");
      console.log(chalk.cyan("  Run:") + chalk.gray(` cd ${projectName} && bun run build`));
      console.log("");
    },
  );
