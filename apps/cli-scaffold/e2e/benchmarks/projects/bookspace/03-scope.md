# BookSpace — Project Scope (Solution Space)

## High-Level Goals

1. **Single Source of Truth** — All spaces, sessions, and bookings in one system.
2. **Self-Service Booking** — Members can book and cancel without staff intervention.
3. **No Double-Booking** — Capacity enforced; conflicts prevented.
4. **Staff Efficiency** — Staff can manage spaces and sessions from a dedicated UI.
5. **Extensibility** — Architecture supports recurring sessions, notifications, and member integration later.

## Epic Features

### Epic 1: Space Management

- Create, edit spaces with name, capacity, description
- List spaces for staff view

### Epic 2: Session Management

- Create one-off sessions (space, date, time, capacity)
- Edit/cancel sessions
- List sessions (filter by space, date range)
- Phase 2: Recurring sessions

### Epic 3: Member Booking

- View available sessions (calendar or list)
- Book a session (member identified by email for MVP)
- Cancel own booking
- See waitlist when session is full

### Epic 4: Staff Dashboard

- View all spaces and sessions
- Create/edit sessions
- View bookings per session
- Cancel sessions or bookings if needed

### Epic 5: Notifications (Phase 2)

- Booking confirmation email
- Reminder before session
- Cancellation notice

### Epic 6: Recurring Sessions (Phase 2)

- Define recurrence (weekly, monthly)
- Generate session instances

### Epic 7: Member Management (Phase 2)

- Member accounts and authentication
- Member directory for staff
- Integration with existing membership system (optional)

## Roadmap

### MVP (Phase 1)

- Space CRUD
- Session CRUD (one-off only)
- Booking: create, cancel; capacity enforcement; waitlist
- Member identified by email (no auth)
- Two UIs: member-facing (browse, book) and staff-facing (manage spaces, sessions)
- In-memory or SQLite persistence

### Phase 2

- Recurring sessions
- Email notifications (confirmation, reminder, cancellation)
- Member accounts and authentication

### Phase 3

- Calendar view (week/month)
- Member directory
- Reports and analytics
- Optional: payment for paid sessions

### Out of Scope (Initial)

- Payment processing
- Equipment-specific booking (e.g. book specific 3D printer)
- Mobile native apps
- Integration with external calendar systems
