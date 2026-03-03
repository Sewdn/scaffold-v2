# RecipeVault — Project Scope (Solution Space)

## High-Level Goals

1. **Centralized Storage** — All recipes in one searchable, structured repository.
2. **Easy Organization** — Collections for grouping recipes by theme or use case.
3. **Discovery** — Search and filter by ingredients, tags, time, difficulty.
4. **Personal First** — MVP serves a single user; multi-user and sharing in Phase 2.
5. **Extensibility** — Architecture supports meal planning, sharing, and integrations later.

## Epic Features

### Epic 1: Recipe Management

- Create, edit, delete recipes
- Structured ingredients (quantity, unit, name) and steps
- Metadata: servings, prep/cook time, difficulty, tags
- Source/attribution field

### Epic 2: Collections

- Create, edit, delete collections
- Add/remove recipes from collections
- View collection as a list of recipe cards

### Epic 3: Search & Filter

- Full-text search on title, description, ingredients
- Filter by tag, difficulty, time
- Sort by date, title, prep time

### Epic 4: Meal Planning (Phase 2)

- Create meal plans for a date range
- Assign recipes to days
- Optional: generate shopping list from selected recipes

### Epic 5: Sharing (Phase 2)

- Share individual recipes via link
- Share collections with specific users
- Public recipe gallery (optional)

### Epic 6: Multi-User & Auth (Phase 2)

- User accounts and authentication
- Per-user recipes and collections
- Invite-based or open registration

## Roadmap

### MVP (Phase 1)

- Recipe CRUD with structured ingredients and steps
- Collections: create, add/remove recipes, view
- Search and filter (in-memory or simple DB query)
- Single-user mode: no auth; data stored locally or in single-tenant DB
- Web app + API; responsive layout

### Phase 2

- User accounts and authentication
- Multi-user data isolation
- Sharing (links, shared collections)
- Meal planning with date assignment

### Phase 3

- Shopping list generation
- Public recipe gallery
- Admin moderation
- Optional: nutrition, scaling, unit conversion

### Out of Scope (Initial)

- Social features (comments, ratings, follows)
- Recipe import from URLs
- Mobile native apps
- Payment or subscriptions
