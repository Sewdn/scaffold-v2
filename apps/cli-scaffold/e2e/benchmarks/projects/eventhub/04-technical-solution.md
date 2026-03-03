# EventHub — Technical Solution / Architecture

## System Overview

EventHub is a web application with:

- A **public-facing frontend** for browsing events and RSVPing
- An **API** serving event and RSVP data to third-party consumers
- A **CLI** for administrative operations (events, RSVPs, organizers)
- A **data service** that owns persistence and exposes a programmatic API for CRUD operations
- **Shared domain types** for Event, Organizer, RSVP, Tag

Both the API and CLI consume the data service; neither accesses persistence directly.

## Architecture Guidelines

### Monorepo Structure

- **Apps**: frontend (web), API (backend), CLI (administration)
- **Packages**: domain (shared types), svc-events (data service)
- **Optional**: ui-events (event UI components) if using a module pattern

### Technology Preferences

- **Frontend**: React-based SPA (Next.js or Vite) with server-side rendering or static generation where beneficial.
- **API**: REST or REST-like HTTP API. Lightweight framework preferred.
- **CLI**: Command-line framework (e.g. oclif) for admin commands.
- **Data Service**: TypeScript package; no HTTP. Exposes functions for CRUD. Persistence via SQLite or in-memory for MVP.
- **Styling**: Utility-first CSS (e.g. Tailwind).
- **Language**: TypeScript throughout.

### Components to Set Up

1. **Data Service (svc-events)**
   - Owns persistence (SQLite, in-memory, or file for MVP)
   - Exposes a service API: `listEvents`, `getEventById`, `createEvent`, `updateEvent`, `deleteEvent`, `listRsvpsForEvent`, `createRsvp`, `cancelRsvp`
   - Handles capacity enforcement (waitlist when full)
   - Returns domain types; no HTTP layer
   - Depends on domain only

2. **API Application**
   - Integrates the data service (imports and calls svc-events)
   - Exposes REST endpoints that map to data service operations:
     - `GET /events`, `GET /events/:id`, `POST /events`, `PUT /events/:id`, `DELETE /events/:id`
     - `GET /events/:id/rsvps`, `POST /events/:id/rsvps`, `DELETE /events/:id/rsvps/:rsvpId`
   - CORS configured for frontend origin
   - Third-party API consumers call the API; the API delegates to the data service

3. **CLI Application**
   - Integrates the same data service (imports and calls svc-events)
   - Exposes CLI commands for administration:
     - `events list`, `events show <id>`, `events create`, `events update <id>`, `events delete <id>`
     - `rsvps list <eventId>`, `rsvps create <eventId>`, `rsvps cancel <eventId> <rsvpId>`
   - Same CRUD operations as the API, but via command line
   - Used for admin tasks, seeding data, debugging

4. **Frontend Application**
   - Public pages: event list, event detail, RSVP form
   - Organizer pages: create/edit event, view RSVPs (MVP can be minimal)
   - Fetch from API; handle loading and error states

5. **Domain Package**
   - Types: Event, Organizer, RSVP, Tag, Location (as needed)
   - Shared between data service, API, CLI, and frontend

### Data Flow

- **Third-party consumers / Frontend** → API (HTTP) → Data Service
- **Administrators** → CLI (commands) → Data Service
- **Data Service** → persistence (single source of truth)

### Non-Functional Requirements

- **Build**: `bun run build` (or equivalent) succeeds for all packages.
- **Dev**: Hot reload for frontend and API during development.
- **Responsive**: Frontend works on mobile and desktop.

## MVP Implementation Notes

- Events and RSVPs stored via data service; SQLite or in-memory for MVP.
- No authentication: organizer actions can be protected by a simple shared secret or omitted for MVP (focus on public listing + RSVP).
- Pagination on event list (e.g. 10–20 per page).
- Capacity: when event is at capacity, new RSVPs go to waitlist; display waitlist position if desired.
- CLI: useful for seeding test events, inspecting RSVPs, bulk operations.
