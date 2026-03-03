# RecipeVault — Technical Solution / Architecture

## System Overview

RecipeVault is a web application with:

- A **frontend** for browsing, creating, and organizing recipes
- An **API** serving recipe and collection data to third-party consumers
- A **CLI** for administrative operations (recipes, collections, tags)
- A **data service** that owns persistence and exposes a programmatic API for CRUD operations
- **Shared domain types** for Recipe, Collection, Tag, Ingredient

Both the API and CLI consume the data service; neither accesses persistence directly.

## Architecture Guidelines

### Monorepo Structure

- **Apps**: frontend (web), API (backend), CLI (administration)
- **Packages**: domain (shared types), svc-recipes (data service)
- **Optional**: ui-recipes (recipe UI components) if using a module pattern

### Technology Preferences

- **Frontend**: React-based SPA. SSR beneficial for SEO if public recipes in Phase 2; for MVP, client-side is fine.
- **API**: REST or REST-like. Resource-oriented: `/recipes`, `/collections`, `/tags`
- **CLI**: Command-line framework (e.g. oclif) for admin commands.
- **Data Service**: TypeScript package; no HTTP. Exposes functions for CRUD. Persistence via SQLite or in-memory for MVP.
- **Styling**: Utility-first CSS; responsive by default.
- **Language**: TypeScript throughout.

### Components to Set Up

1. **Data Service (svc-recipes)**
   - Owns persistence (SQLite, in-memory, or file for MVP)
   - Exposes a service API: `listRecipes`, `getRecipeById`, `createRecipe`, `updateRecipe`, `deleteRecipe`, `listCollections`, `getCollectionById`, `createCollection`, `updateCollection`, `deleteCollection`, `addRecipeToCollection`, `removeRecipeFromCollection`, `listTags`
   - Supports search/filter (by tag, difficulty, search term) in list operations
   - Returns domain types; no HTTP layer
   - Depends on domain only

2. **API Application**
   - Integrates the data service (imports and calls svc-recipes)
   - Exposes REST endpoints that map to data service operations:
     - `GET /recipes`, `GET /recipes/:id`, `POST /recipes`, `PUT /recipes/:id`, `DELETE /recipes/:id` (with query params for search/filter)
     - `GET /collections`, `GET /collections/:id`, `POST /collections`, `PUT /collections/:id`, `DELETE /collections/:id`
     - `POST /collections/:id/recipes/:recipeId`, `DELETE /collections/:id/recipes/:recipeId`
     - `GET /tags`
   - Pagination on list endpoints
   - Third-party API consumers call the API; the API delegates to the data service

3. **CLI Application**
   - Integrates the same data service (imports and calls svc-recipes)
   - Exposes CLI commands for administration:
     - `recipes list`, `recipes show <id>`, `recipes create`, `recipes update <id>`, `recipes delete <id>`
     - `collections list`, `collections show <id>`, `collections create`, `collections update <id>`, `collections delete <id>`
     - `collections add-recipe <collectionId> <recipeId>`, `collections remove-recipe <collectionId> <recipeId>`
     - `tags list`
   - Same CRUD operations as the API, but via command line
   - Used for admin tasks, importing recipes, bulk operations

4. **Frontend Application**
   - Recipe list (with search/filter), recipe detail, recipe create/edit form
   - Collection list, collection detail (recipes in collection), collection create/edit
   - Shared layout, navigation between recipes and collections
   - Fetch from API; handle loading and error states

5. **Domain Package**
   - Types: Recipe, Collection, Tag, Ingredient
   - Shared between data service, API, CLI, and frontend

### Data Flow

- **Third-party consumers / Frontend** → API (HTTP) → Data Service
- **Administrators** → CLI (commands) → Data Service
- **Data Service** → persistence (single source of truth)

### Non-Functional Requirements

- **Build**: Full monorepo builds successfully
- **Responsive**: Usable on tablet and desktop (mobile-friendly)
- **Performance**: List and search should feel snappy (< 500ms for typical queries)

## MVP Implementation Notes

- Single-user: no auth. Data stored via data service; SQLite or in-memory for MVP.
- Ingredients: store as JSON array of `{ quantity, unit, name }` on Recipe.
- Steps: ordered array of strings.
- Tags: simple string array on Recipe; derive tag list from all recipes for filter UI.
- Collections: many-to-many with recipes; data service supports add/remove by recipe ID.
- CLI: useful for importing recipes, bulk edits, inspecting data.
