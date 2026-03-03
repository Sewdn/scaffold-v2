# EventHub — Project Scope (Solution Space)

## High-Level Goals

1. **Centralized Discovery** — Residents can browse all upcoming events in one place.
2. **Simple RSVP** — Residents can RSVP with minimal friction (email only for MVP).
3. **Organizer Empowerment** — Organizers can create events and see who is attending.
4. **Scalability** — Architecture supports future features (notifications, moderation, federation).
5. **Maintainability** — Codebase is clear, tested, and documented for volunteer developers.

## Epic Features

### Epic 1: Event Management

- Create, edit, and publish events
- Event metadata: title, description, date/time, location, format, capacity, tags
- Draft vs. published status
- Organizer view of own events

### Epic 2: Event Discovery

- Public listing of published events
- Filter by date range, format (in-person/online), tags
- Sort by date
- Event detail page with full info and RSVP action

### Epic 3: RSVP & Attendance

- RSVP with email (no account required for MVP)
- Capacity enforcement: when full, option for waitlist
- Organizer view of RSVP list (names/emails)
- Cancel own RSVP

### Epic 4: Organizer & Admin (Phase 2)

- Organizer registration/verification
- Admin moderation (approve, flag, remove events)
- Tag management
- Basic analytics (views, RSVPs per event)

### Epic 5: Notifications & Calendar (Phase 3)

- Email reminders before events
- Calendar export (iCal)
- Optional push notifications

## Roadmap

### MVP (Phase 1)

- Event CRUD (create, read, update) — organizer-facing
- Event listing and detail — public-facing
- RSVP with email, capacity, waitlist
- In-memory or file-based persistence acceptable; database preferred
- Single web app + API; no auth (organizer identified by simple token or session)

### Phase 2

- Organizer accounts and authentication
- Admin moderation and tag management
- Database persistence (e.g. SQLite or PostgreSQL)
- Email notifications for RSVP confirmation

### Phase 3

- Calendar export
- Advanced search and recommendations
- Federation with other EventHub instances (optional)

### Out of Scope (Initial)

- Payment or ticketing
- Social features (comments, ratings)
- Mobile native apps (web-first)
