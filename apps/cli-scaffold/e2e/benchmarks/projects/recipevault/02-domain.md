# RecipeVault — Project Domain

## Core Entities

### Recipe

- **Definition**: A single recipe with ingredients, steps, and metadata.
- **Attributes**: Title, description, servings, prep_time, cook_time, difficulty, ingredients (structured list), steps (ordered list), tags, source/attribution, owner reference, visibility (private, shared, public), created/updated timestamps.
- **Relationships**: Has one Owner (User); has many Tags; belongs to many Collections (many-to-many).

### Collection

- **Definition**: A named group of recipes (e.g. "Weeknight Dinners", "Holiday Favorites").
- **Attributes**: Name, description, owner reference, visibility, created/updated timestamps.
- **Relationships**: Has one Owner; contains many Recipes (many-to-many).

### User

- **Definition**: A person who owns and manages recipes and collections.
- **Attributes**: Name, email, optional avatar, created timestamp.
- **Relationships**: Has many Recipes; has many Collections; may share with other Users (Phase 2).

### Tag

- **Definition**: A label for categorizing recipes (e.g. "vegetarian", "quick", "dessert").
- **Attributes**: Name, slug.
- **Relationships**: Many-to-many with Recipes.

### MealPlan (Phase 2)

- **Definition**: A plan assigning recipes to specific days.
- **Attributes**: Owner, date range, slots (date + recipe reference).
- **Relationships**: Has one Owner; references many Recipes.

### Ingredient

- **Definition**: Structured ingredient entry within a recipe.
- **Attributes**: Quantity, unit, name, optional notes.
- **Relationships**: Belongs to one Recipe (embedded or separate table).

## User Roles

### Cook (Recipe Owner)

- **Definition**: A user who creates and manages their own recipes and collections.
- **Responsibilities**: Create/edit/delete recipes, organize into collections, search and filter, optionally share.
- **Relationships**: Uses the main web app; owns Recipes and Collections.

### Viewer (Phase 2)

- **Definition**: A user with read-only access to shared recipes or collections.
- **Responsibilities**: Browse shared content, copy recipes to own vault.
- **Relationships**: May have limited account or anonymous access.

### Administrator (Phase 3)

- **Definition**: Platform moderator for community-wide content.
- **Responsibilities**: Moderate shared content, manage tags, handle reports.
- **Relationships**: Uses admin UI.

## Relationships Diagram

```
User ──< Recipe >── Tag (many-to-many)
 │         │
 │         └── Ingredient (embedded)
 │
 └──< Collection >── Recipe (many-to-many)
```

## Workflow Entities

### Recipe Lifecycle

- **Draft** → Recipe created but not in any collection; owner can edit.
- **Published** → Recipe visible in owner's vault; can be added to collections.
- **Shared** → Recipe or collection shared with specific users or made public (Phase 2).

### Collection Lifecycle

- **Private** → Only owner sees it.
- **Shared** → Specific users or link-based sharing (Phase 2).
