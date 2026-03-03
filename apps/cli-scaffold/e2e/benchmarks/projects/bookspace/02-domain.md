# BookSpace — Project Domain

## Core Entities

### Space

- **Definition**: A physical room or area that can be booked (e.g. woodshop, conference room).
- **Attributes**: Name, description, capacity (max people), equipment list (optional).
- **Relationships**: Has many Sessions; has many Bookings (via Sessions).

### Session

- **Definition**: A bookable time slot.
- **Attributes**: Title, description, space reference, start/end datetime, capacity, status (scheduled, cancelled).
- **Relationships**: Belongs to one Space; has many Bookings.

### Booking

- **Definition**: A member's reservation for a session.
- **Attributes**: Session reference, member reference, status (confirmed, waitlist, cancelled), created timestamp.
- **Relationships**: Belongs to one Session; belongs to one Member.

### Member

- **Definition**: A person who can book sessions.
- **Attributes**: Name, email, optional member ID, status (active, suspended).
- **Relationships**: Has many Bookings.

## User Roles

### Member

- **Definition**: A facility member who books sessions.
- **Responsibilities**: View calendar, book sessions, cancel own bookings, see waitlist position.
- **Relationships**: Uses member-facing web app.

### Staff

- **Definition**: Facility staff who manage spaces and sessions.
- **Responsibilities**: Create/edit spaces, create sessions, view all bookings, cancel or modify sessions.
- **Relationships**: Uses staff-facing UI.

### Administrator

- **Definition**: System admin. Manages members, configures settings, views reports. Phase 2+.
- **Relationships**: Uses admin UI.

## Relationships Diagram

```
Space ──< Session >──< Booking >── Member
```

## Workflow Entities

### Session Lifecycle

- **Scheduled** → Visible; members can book (up to capacity).
- **Full** → At capacity; new bookings go to waitlist.
- **Cancelled** → Session removed; all bookings notified (Phase 2).

### Booking Lifecycle

- **Confirmed** → Member has a spot.
- **Waitlist** → Session full; member on waitlist.
- **Cancelled** → Booking removed; capacity freed; waitlist may advance.
