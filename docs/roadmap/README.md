# Scaffold CLI Expansion Roadmap

This folder contains the vision, architecture, and detailed roadmap for expanding the scaffolding CLI tool. The goal is to support **dozens of app types, service packages, and expansion commands** that enable deterministic, AI-agent-friendly code generation.

## Start Here

**[INDEX.md](./INDEX.md)** — Master directory with links to every feature, app type, service, and expansion command. Each item has its own file for granular review and specification.

## Granular Structure

| Folder                             | Purpose                                                 |
| ---------------------------------- | ------------------------------------------------------- |
| [vision/](vision/)                 | Strategic context, principles, expansion philosophy     |
| [architecture/](architecture/)     | Registry pattern, stubs, naming, DI, validation         |
| [app-types/](app-types/)           | One folder per app type, one file per expansion command |
| [services/](services/)             | One folder per service, one file per expansion command  |
| [ui-domain/](ui-domain/)           | UI and ui-lib package expansions                        |
| [verticals/](verticals/)           | Industry templates (SaaS, e-commerce, CMS, etc.)        |
| [implementation/](implementation/) | Phasing, priorities, first sprint                       |

## Quick Stats (Target)

- **App types:** 8 existing + 8 proposed = **16 total**
- **Service packages:** 5 existing + 12 proposed = **17 total**
- **Expansion commands:** ~**120** across all types
- **Vertical presets:** **6** industry templates (SaaS, E-commerce, CMS, Internal Tools, Dev Tools, Data Pipeline)

## Core Philosophy

> **Architecture is the new prompt.**

The scaffolding tool doesn't just create structure—it **injects deterministic patterns** so AI coding agents follow the rails. Every expansion command:

1. Creates files in **fixed locations**
2. Patches **registry files** (not main entry)
3. Uses **Mustache stubs** with consistent placeholders
4. Follows **naming conventions** (kebab-case files, PascalCase exports)
5. Enables **co-generation** when expansions depend on each other

## Current Implementation Status

| Area               | Implemented                  | Planned                                               |
| ------------------ | ---------------------------- | ----------------------------------------------------- |
| CLI expansion      | `add-command`, `add-service` | —                                                     |
| Backend expansion  | —                            | `add-route`, `add-middleware`, `add-plugin`           |
| Frontend expansion | —                            | `add-page`, `add-layout`, `add-component`             |
| MCP expansion      | —                            | `add-tool`, `add-resource`, `add-prompt`              |
| Service expansion  | —                            | `svc-prisma add-model`, `svc-auth add-provider`, etc. |
| Vertical presets   | —                            | `--vertical saas`, `--vertical ecommerce`, etc.       |
