import { Command } from "commander";
import { resolve } from "path";
import { existsSync, readFileSync } from "fs";
import { Effect } from "effect";
import { createServicePackage } from "../init/create-package-files.js";
import { createUIPackage } from "../init/create-package-files.js";
import { runSteps } from "../orchestrator.js";
import { formatEntityName, validatePackageName } from "@workspace/core-utils";

export const packageCommand = new Command("package")
  .description("Add a generic package")
  .argument("<name>", "Package name")
  .option("-t, --type <type>", "Package type: ui or service", "service")
  .action(async (name: string, options: { type: string }) => {
    const pkgName = formatEntityName(validatePackageName(name), "package");
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

    const pkgType = options.type === "ui" ? "ui" : "service";
    console.log(`\nAdding ${pkgType} package ${pkgName}\n`);

    if (pkgType === "ui") {
      await createUIPackage(projectDir, projectName, pkgName);
    } else {
      await createServicePackage(projectDir, projectName, pkgName);
    }

    console.log("Running bun install...\n");
    await Effect.runPromise(
      runSteps([{ type: "bun", command: "install", cwd: "" }], { cwd: projectDir, verbose: true }),
    ).catch((err) => {
      console.error("Error:", err?.message ?? err);
      process.exit(1);
    });

    const prefix = pkgType === "ui" ? "ui-" : "svc-";
    console.log(`\nCreated package packages/${prefix}${pkgName}\n`);
  });
