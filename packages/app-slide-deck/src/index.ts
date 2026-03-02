/**
 * @workspace/app-slide-deck — Slide deck app-type scaffolding for the scaffold CLI.
 * Exports a factory to create the slide-deck app type config.
 * Scripts phase only (no stubs) — Vite + Reveal.js.
 */

import { getScriptSteps } from './config.js';

/**
 * Create the slide-deck app type config.
 * Called by cli-scaffold app-types registry.
 */
export function createSlideDeckAppType() {
  const slideDeck = {
    id: 'slide-deck',
    description: 'Reveal.js presentation',
    dirPrefix: 'slides',
    phases: [
      {
        type: 'scripts' as const,
        getSteps: () => getScriptSteps(),
      },
    ],
  };

  return { slideDeck };
}
