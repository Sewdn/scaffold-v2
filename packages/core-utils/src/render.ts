import Mustache from "mustache";

/**
 * Render a Mustache template with the given context.
 * Used by scaffold core and app-types for stub/template generation.
 */
export function renderTemplate(template: string, context: Record<string, unknown>): string {
  return Mustache.render(template, context);
}
