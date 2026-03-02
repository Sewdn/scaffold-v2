import { Command } from "commander";
import { resolve } from "path";
import { existsSync } from "fs";
import { formatEntityName, validateComponentName } from "@workspace/core-utils";

export const componentCommand = new Command("component")
  .description("Add a component to a UI package")
  .argument("<name>", "Component name")
  .option("-p, --package <pkg>", "Target UI package name", "ui-lib")
  .action(async (name: string, options: { package: string }) => {
    const componentName = formatEntityName(validateComponentName(name), "component");
    const targetPkg = options.package;
    const projectDir = process.cwd();

    const pkgDir = resolve(projectDir, "packages", targetPkg);
    if (!existsSync(resolve(pkgDir, "package.json"))) {
      console.error(`Error: Package ${targetPkg} not found.`);
      process.exit(1);
    }

    const componentDir = resolve(pkgDir, "src", "components", componentName);

    console.log(`\nAdding component ${componentName} to ${targetPkg}\n`);

    // Create component directory and files
    const { writeFile, mkdir } = await import("fs/promises");
    await mkdir(componentDir, { recursive: true });
    await writeFile(
      resolve(componentDir, `${componentName}.tsx`),
      `import type { ReactNode } from "react";

export function ${componentName}({ children }: { children?: ReactNode }) {
  return <div>{children ?? "${componentName}"}</div>;
}
`,
    );
    await writeFile(
      resolve(componentDir, "index.ts"),
      `export { ${componentName} } from './${componentName}';\n`,
    );

    console.log(`\nCreated component ${componentName} in packages/${targetPkg}/src/components/\n`);
  });
