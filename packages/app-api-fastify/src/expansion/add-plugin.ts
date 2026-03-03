/**
 * scaffold api-fastify add-plugin — Add a plugin to a scaffolded Fastify app.
 */

import { existsSync, readFileSync, writeFileSync } from "fs";
import { mkdir, writeFile } from "fs/promises";
import { dirname, join, resolve } from "path";
import { fileURLToPath } from "url";
import { SCAFFOLD_MARKER_PLUGINS } from "@workspace/app-api";
import { formatEntityName, renderTemplate, toCamelCase } from "@workspace/core-utils";
import { validateCommandName } from "@workspace/core-utils";

const __dirname = dirname(fileURLToPath(import.meta.url));
const EXPANSION_STUBS = join(__dirname, "..", "..", "stubs", "expansion");

export async function executeAddPlugin(
  projectDir: string,
  appName: string,
  name: string,
): Promise<boolean> {
  const pluginName = formatEntityName(validateCommandName(name), "service");
  const pluginCamel = toCamelCase(pluginName);
  const appDir = resolve(projectDir, "apps", appName);
  const pluginsDir = resolve(appDir, "src", "plugins");
  await mkdir(pluginsDir, { recursive: true });

  const pluginPath = resolve(pluginsDir, `${pluginName}.ts`);
  if (existsSync(pluginPath)) return false;

  const template = readFileSync(join(EXPANSION_STUBS, "plugin.ts.stub"), "utf-8");
  const rendered = renderTemplate(template, {
    pluginName: pluginCamel,
    camelName: pluginCamel,
  });
  await writeFile(pluginPath, rendered);

  patchIndexForPlugin(appDir, pluginCamel, pluginName);
  return true;
}

function patchIndexForPlugin(appDir: string, pluginCamel: string, pluginName: string): void {
  const indexPath = resolve(appDir, "src", "index.ts");
  if (!existsSync(indexPath)) {
    console.error(`Error: ${indexPath} not found. Ensure the API app was scaffolded.`);
    process.exit(1);
  }
  let content = readFileSync(indexPath, "utf-8");
  const importPath = `./plugins/${pluginName}.js`;
  const importName = `${pluginCamel}Plugin`;

  if (content.includes(importPath)) return;

  const importLine = `import { ${importName} } from "${importPath}";\n`;
  const lastImportMatch = content.match(/import .+ from .+;\n/g);
  const lastImport = lastImportMatch?.[lastImportMatch.length - 1];
  const insertImportAfter = lastImport ? content.indexOf(lastImport) + lastImport.length : 0;
  content = content.slice(0, insertImportAfter) + importLine + content.slice(insertImportAfter);

  const registerLine = `fastify.register(${importName});\n`;
  const markerIdx = content.indexOf(SCAFFOLD_MARKER_PLUGINS);
  if (markerIdx !== -1) {
    const lineEnd = content.indexOf("\n", markerIdx);
    const insertAt = lineEnd !== -1 ? lineEnd + 1 : markerIdx + SCAFFOLD_MARKER_PLUGINS.length;
    content = content.slice(0, insertAt) + registerLine + content.slice(insertAt);
  } else {
    const fastifyIdx = content.indexOf("const fastify = Fastify");
    if (fastifyIdx !== -1) {
      const lineEnd = content.indexOf("\n", fastifyIdx);
      const insertAt = lineEnd !== -1 ? lineEnd + 1 : fastifyIdx + "const fastify = Fastify".length;
      content =
        content.slice(0, insertAt) +
        `${SCAFFOLD_MARKER_PLUGINS}\n` +
        registerLine +
        content.slice(insertAt);
    }
  }

  writeFileSync(indexPath, content);
}
