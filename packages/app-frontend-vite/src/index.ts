/**
 * @workspace/app-frontend-vite — Frontend Vite app-type scaffolding for the scaffold CLI.
 * Exports a factory to create the frontend-vite app type config.
 * Scripts phase only (no stubs) — uses bunx create-vite.
 */

import { getScriptSteps } from "./config.js";

/**
 * Create the frontend-vite app type config.
 * Called by cli-scaffold app-types registry.
 */
export function createFrontendViteAppType() {
  const frontendVite = {
    id: "frontend-vite",
    description: "Vite frontend application",
    dirPrefix: "frontend",
    defaultAppName: "web",
    isReactFrontend: true,
    phases: [
      {
        type: "scripts" as const,
        getSteps: getScriptSteps,
      },
    ],
  };

  return { frontendVite };
}
