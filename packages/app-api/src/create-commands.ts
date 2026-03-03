import { Command } from "commander";
import { ensureProjectRoot, formatEntityName, resolveAppByPrefix } from "@workspace/core-utils";
import { validateCommandName } from "@workspace/core-utils";
import type { ApiExpansionAdapter, ApiExpansionCommands } from "./types.js";

/**
 * Create the unified API expansion commands for an app type.
 * All API apps (Elysia, Fastify, Hono) use the same command names and options.
 */
export function createApiExpansionCommands(
  adapter: ApiExpansionAdapter,
  commandName: string,
): ApiExpansionCommands {
  const { apiPrefix } = adapter;

  const addCrudRoutesSub = new Command("add-crud-routes")
    .description("Add CRUD routes + handlers for an entity (list, get, create, update, delete)")
    .argument("<name>", "Entity name (kebab-case, e.g. users)")
    .option("-a, --app <name>", "Target API app (required if project has multiple)")
    .option("-p, --path <path>", "URL path (default: /<name>)")
    .action(async (name: string, options: { app?: string; path?: string }) => {
      const projectDir = process.cwd();
      ensureProjectRoot(projectDir);
      const appName = resolveAppByPrefix(projectDir, apiPrefix, options.app);
      const created = await adapter.executeAddCrudRoutes(
        projectDir,
        appName,
        name,
        options.path,
      );
      if (!created) {
        console.log(
          `\nCRUD routes already exist: apps/${appName}/src/routes/${name}.ts (skipped)\n`,
        );
        return;
      }
      const routeName = formatEntityName(validateCommandName(name), "service");
      console.log(`\nCreated CRUD routes in apps/${appName}/`);
      console.log(`  Routes: src/routes/${routeName}.ts`);
      console.log(`  Handlers: src/handlers/${routeName}.ts`);
      console.log(`  Wired in src/routes/registry.ts`);
      console.log(`  Endpoints: GET / (paged), GET /:id, POST /, PUT /:id, DELETE /:id\n`);
    });

  const addMiddlewareSub = new Command("add-middleware")
    .description("Add middleware to a scaffolded API app")
    .argument("<name>", "Middleware name (kebab-case, e.g. auth)")
    .option("-a, --app <name>", "Target API app (required if project has multiple)")
    .action(async (name: string, options: { app?: string }) => {
      const projectDir = process.cwd();
      ensureProjectRoot(projectDir);
      const appName = resolveAppByPrefix(projectDir, apiPrefix, options.app);
      const created = await adapter.executeAddMiddleware(projectDir, appName, name);
      if (!created) {
        console.log(
          `\nMiddleware already exists: apps/${appName}/src/middleware/${name}.ts (skipped)\n`,
        );
        return;
      }
      const middlewareName = formatEntityName(validateCommandName(name), "service");
      console.log(`\nCreated middleware in apps/${appName}/src/middleware/`);
      console.log(`  File: src/middleware/${middlewareName}.ts`);
      console.log(`  Registered in src/index.ts\n`);
    });

  const addPluginSub = new Command("add-plugin")
    .description("Add a plugin to a scaffolded API app")
    .argument("<name>", "Plugin name (kebab-case, e.g. metrics)")
    .option("-a, --app <name>", "Target API app (required if project has multiple)")
    .action(async (name: string, options: { app?: string }) => {
      const projectDir = process.cwd();
      ensureProjectRoot(projectDir);
      const appName = resolveAppByPrefix(projectDir, apiPrefix, options.app);
      const created = await adapter.executeAddPlugin(projectDir, appName, name);
      if (!created) {
        console.log(`\nPlugin already exists: apps/${appName}/src/plugins/${name}.ts (skipped)\n`);
        return;
      }
      const pluginName = formatEntityName(validateCommandName(name), "service");
      console.log(`\nCreated plugin in apps/${appName}/src/plugins/`);
      console.log(`  File: src/plugins/${pluginName}.ts`);
      console.log(`  Registered in src/index.ts\n`);
    });

  const addHandlerSub = new Command("add-handler")
    .description("Add a handler file (no routes; wire manually in route plugins)")
    .argument("<name>", "Handler name (kebab-case, e.g. users)")
    .option("-a, --app <name>", "Target API app (required if project has multiple)")
    .action(async (name: string, options: { app?: string }) => {
      const projectDir = process.cwd();
      ensureProjectRoot(projectDir);
      const appName = resolveAppByPrefix(projectDir, apiPrefix, options.app);
      const created = await adapter.executeAddHandler(projectDir, appName, name);
      if (!created) {
        console.log(
          `\nHandler already exists: apps/${appName}/src/handlers/${name}.ts (skipped)\n`,
        );
        return;
      }
      const handlerName = formatEntityName(validateCommandName(name), "service");
      console.log(`\nCreated handler in apps/${appName}/src/handlers/`);
      console.log(`  File: src/handlers/${handlerName}.ts\n`);
    });

  const apiCommand = new Command(commandName)
    .description(
      "Expand scaffolded API apps with CRUD routes, middleware, plugins, and handlers",
    )
    .addCommand(addCrudRoutesSub)
    .addCommand(addMiddlewareSub)
    .addCommand(addPluginSub)
    .addCommand(addHandlerSub);

  function getExpansionCommands() {
    const cmdObj = apiCommand as unknown as { commands?: readonly Command[] };
    const subs = cmdObj.commands ?? [];
    return subs.map((cmd) => {
      const name =
        typeof cmd.name === "function" ? cmd.name() : ((cmd as { _name?: string })._name ?? "");
      const desc =
        typeof cmd.description === "function"
          ? cmd.description()
          : ((cmd as { _description?: string })._description ?? "");
      return {
        name,
        description: desc,
        usage: `scaffold ${commandName} ${name} [options]`,
      };
    });
  }

  return { apiCommand, getExpansionCommands };
}
