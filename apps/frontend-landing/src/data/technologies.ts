/**
 * Technology overview for the scaffolding tool.
 * Add logo URLs to the `logo` field when assets are available.
 */

export type TechCategory =
  | "core"
  | "frontend"
  | "backend"
  | "ui"
  | "tooling"
  | "data"
  | "protocols";

export interface Technology {
  id: string;
  name: string;
  category: TechCategory;
  /** Logo URL — add when assets are ready */
  logo?: string;
}

export const TECHNOLOGIES: Technology[] = [
  // Core infrastructure
  { id: "typescript", name: "TypeScript", category: "core" },
  { id: "bun", name: "Bun", category: "core" },
  { id: "turborepo", name: "Turborepo", category: "core" },
  { id: "effect", name: "Effect", category: "core" },
  { id: "node", name: "Node.js", category: "core" },
  // Frontend frameworks & runtimes
  { id: "react", name: "React", category: "frontend" },
  { id: "nextjs", name: "Next.js", category: "frontend" },
  { id: "vite", name: "Vite", category: "frontend" },
  { id: "tanstack", name: "TanStack", category: "frontend" },
  { id: "astro", name: "Astro", category: "frontend" },
  { id: "starlight", name: "Starlight", category: "frontend" },
  // Backend
  { id: "elysia", name: "Elysia.js", category: "backend" },
  // UI & styling
  { id: "tailwind", name: "Tailwind CSS", category: "ui" },
  { id: "shadcn", name: "Shadcn", category: "ui" },
  { id: "radix", name: "Radix UI", category: "ui" },
  { id: "lucide", name: "Lucide", category: "ui" },
  // Tooling & packages
  { id: "prisma", name: "Prisma", category: "data" },
  { id: "mcp", name: "MCP SDK", category: "protocols" },
  { id: "reveal", name: "Reveal.js", category: "tooling" },
  { id: "commander", name: "Commander.js", category: "tooling" },
  { id: "eslint", name: "ESLint", category: "tooling" },
  { id: "zod", name: "Zod", category: "tooling" },
  { id: "mustache", name: "Mustache", category: "tooling" },
];

export const CATEGORY_LABELS: Record<TechCategory, string> = {
  core: "Core",
  frontend: "Frontend",
  backend: "Backend",
  ui: "UI & Styling",
  tooling: "Tooling",
  data: "Data",
  protocols: "Protocols",
};
