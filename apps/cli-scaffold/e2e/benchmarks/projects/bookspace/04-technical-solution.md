# BookSpace — Technical Solution / Architecture

## System Overview

BookSpace is a web application with:

- A **member-facing frontend** for browsing sessions and making bookings
- A **staff-facing frontend** for managing spaces, sessions, and bookings (can be separate app or different routes)
- An **API** serving spaces, sessions, and bookings to third-party consumers
- A **CLI** for administrative operations (spaces, sessions, bookings)
- A **data service** that owns persistence and exposes a programmatic API for CRUD operations
- **Shared domain types** for Space, Session, Booking, Member

Both the API and CLI consume the data service; neither accesses persistence directly.

## Architecture Guidelines

### Monorepo Structure

- **Apps**: frontend-member (or member routes), frontend-staff (or staff routes), API, CLI (administration)
- **Packages**: domain (shared types), svc-bookings (data service)
- **Optional**: ui-bookings (booking UI components) if using module pattern

### Technology Preferences

- **Frontend**: React-based. Two apps or two route trees (member vs staff).
- **API**: REST. Resources: `/spaces`, `/sessions`, `/bookings`
- **CLI**: Command-line framework (e.g. oclif) for admin commands.
- **Data Service**: TypeScript package; no HTTP. Exposes functions for CRUD. Persistence via SQLite or in-memory for MVP.
- **Styling**: Utility-first CSS; responsive.
- **Language**: TypeScript throughout.

### Components to Set Up

1. **Data Service (svc-bookings)**
   - Owns persistence (SQLite, in-memory, or file for MVP)
   - Exposes a service API: `listSpaces`, `getSpaceById`, `createSpace`, `updateSpace`, `deleteSpace`, `listSessions`, `getSessionById`, `createSession`, `updateSession`, `deleteSession`, `listBookingsForSession`, `createBooking` (with capacity check), `cancelBooking`, `listBookingsByMember`
   - Handles capacity enforcement (waitlist when full)
   - Returns domain types; no HTTP layer
   - Depends on domain only

2. **API Application**
   - Integrates the data service (imports and calls svc-bookings)
   - Exposes REST endpoints that map to data service operations:
     - `GET /spaces`, `GET /spaces/:id`, `POST /spaces`, `PUT /spaces/:id`, `DELETE /spaces/:id`
     - `GET /sessions`, `GET /sessions/:id`, `POST /sessions`, `PUT /sessions/:id`, `DELETE /sessions/:id` (with query params for space, date range)
     - `GET /sessions/:id/bookings`, `POST /sessions/:id/bookings`, `DELETE /sessions/:id/bookings/:bookingId`
     - `GET /bookings?memberEmail=...` (for "my bookings")
   - Third-party API consumers call the API; the API delegates to the data service

3. **CLI Application**
   - Integrates the same data service (imports and calls svc-bookings)
   - Exposes CLI commands for administration:
     - `spaces list`, `spaces show <id>`, `spaces create`, `spaces update <id>`, `spaces delete <id>`
     - `sessions list`, `sessions show <id>`, `sessions create`, `sessions update <id>`, `sessions delete <id>`
     - `bookings list <sessionId>`, `bookings create <sessionId>`, `bookings cancel <sessionId> <bookingId>`
     - `bookings list-by-member <email>` (for "my bookings")
   - Same CRUD operations as the API, but via command line
   - Used for admin tasks, seeding spaces/sessions, inspecting bookings

4. **Member Frontend**
   - Session list (filter by date, space)
   - Session detail with "Book" button
   - Booking form (email)
   - "My bookings" view (list by email)
   - Cancel booking action
   - Fetch from API

5. **Staff Frontend**
   - Space list and CRUD
   - Session list and CRUD
   - Session detail with booking list
   - Cancel session or booking
   - Fetch from API

6. **Domain Package**
   - Types: Space, Session, Booking, Member
   - Shared across data service, API, CLI, and frontends

### Data Flow

- **Third-party consumers / Member & Staff Frontends** → API (HTTP) → Data Service
- **Administrators** → CLI (commands) → Data Service
- **Data Service** → persistence (single source of truth)

### Non-Functional Requirements

- **Build**: Full monorepo builds successfully
- **Responsive**: Member UI works on mobile (members book on the go)
- **Consistency**: No double-booking; capacity enforced at data service level

## MVP Implementation Notes

- No auth: member identified by email for booking. Staff could use a simple shared secret or no auth for MVP (internal use).
- Sessions: one-off only. Recurrence in Phase 2.
- Waitlist: when session is full, store booking with status "waitlist" and optional position.
- Capacity: count confirmed bookings per session; reject or waitlist when at capacity. Logic lives in data service.
- Two UIs: can be two separate apps (frontend-member, frontend-staff) or one app with route-based access (e.g. `/member/*` vs `/staff/*`).
- CLI: useful for seeding spaces and sessions, inspecting bookings, bulk operations.
