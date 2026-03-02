import { Command } from "commander";
import { resolve } from "path";
import { existsSync, readFileSync } from "fs";
import { Effect } from "effect";
import { createServicePackage } from "../init/create-package-files.js";
import { createUIPackage } from "../init/create-package-files.js";
import { runSteps } from "../orchestrator.js";
import { formatEntityName, validateModuleName } from "@workspace/core-utils";

export const moduleCommand = new Command("module")
  .description("Add a module (service + UI packages)")
  .argument("<name>", "Module name")
  .action(async (name: string) => {
    const moduleName = formatEntityName(validateModuleName(name), "module");
    const projectDir = process.cwd();

    const rootPkgPath = resolve(projectDir, "package.json");
    if (!existsSync(rootPkgPath)) {
      console.error("Error: Not in a project root. Run scaffold init first.");
      process.exit(1);
    }

    let projectName = "workspace";
    try {
      const pkg = JSON.parse(readFileSync(rootPkgPath, "utf-8")) as { name?: string };
      if (pkg?.name?.startsWith("@") && pkg.name.endsWith("/root")) {
        projectName = pkg.name.slice(1, -5);
      }
    } catch {
      // ignore
    }

    console.log(`\nAdding module ${moduleName} (service + UI packages)\n`);
    await createServicePackage(projectDir, projectName, moduleName);
    await createUIPackage(projectDir, projectName, moduleName);

    console.log("Running bun install...\n");
    await Effect.runPromise(
      runSteps([{ type: "bun", command: "install", cwd: "" }], { cwd: projectDir, verbose: true }),
    ).catch((err) => {
      console.error("Error:", err?.message ?? err);
      process.exit(1);
    });

    console.log(`\nCreated module ${moduleName}:`);
    console.log(`  - packages/svc-${moduleName}`);
    console.log(`  - packages/ui-${moduleName}\n`);
  });
