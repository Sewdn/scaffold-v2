# EventHub — Project Domain

## Core Entities

### Event

- **Definition**: A scheduled activity that residents can discover and attend.
- **Attributes**: Title, description, start/end datetime, location (address or "online"), format (in-person, online, hybrid), capacity, organizer reference, status (draft, published, cancelled), created/updated timestamps.
- **Relationships**: Has one Organizer; has many RSVPs; may have Tags.

### Organizer

- **Definition**: A person or group that creates and manages events.
- **Attributes**: Name, contact email, optional description, verification status.
- **Relationships**: Has many Events; has many RSVPs (indirectly via Events).

### RSVP

- **Definition**: A resident's commitment to attend an event.
- **Attributes**: Event reference, attendee email/identifier, status (going, waitlist, cancelled), created timestamp.
- **Relationships**: Belongs to one Event; represents one Attendee.

### Attendee

- **Definition**: A resident who browses and RSVPs to events.
- **Attributes**: Email (or anonymous identifier), optional name for display.
- **Relationships**: Has many RSVPs.

### Tag

- **Definition**: A category or label for filtering events (e.g. "volunteer", "workshop", "family-friendly").
- **Attributes**: Name, slug, optional description.
- **Relationships**: Many-to-many with Events.

### Location

- **Definition**: A place where events can occur (optional; events can have freeform address).
- **Attributes**: Name, address, coordinates (optional), is_online.
- **Relationships**: Has many Events (optional; MVP may use freeform address on Event).

## User Roles

### Resident (Attendee)

- **Definition**: A community member who discovers and attends events.
- **Responsibilities**: Browse events, filter by date/type/location, RSVP, cancel RSVP.
- **Relationships**: Uses the public-facing web app; no account required for MVP (email-only RSVP).

### Organizer

- **Definition**: A person or group that creates and manages events.
- **Responsibilities**: Create events, edit/cancel own events, view RSVP list.
- **Relationships**: Uses organizer-facing UI; may overlap with Resident.

### Administrator

- **Definition**: A trusted volunteer who manages the platform.
- **Responsibilities**: Moderate events, manage organizers, configure tags and settings.
- **Relationships**: Uses admin UI; Phase 2+.

## Relationships Diagram

```
Organizer ──< Event >── Tag (many-to-many)
    │            │
    │            └──< RSVP >── Attendee
    │
    └── (optional: Location)
```

## Workflow Entities

### Event Lifecycle

- **Draft** → Organizer creates event, not visible to residents.
- **Published** → Event appears in listings; residents can RSVP.
- **Cancelled** → Event hidden; existing RSVPs notified (Phase 2).

### RSVP Lifecycle

- **Going** → Attendee is confirmed (within capacity).
- **Waitlist** → Attendee is on waitlist (over capacity).
- **Cancelled** → Attendee removed; capacity freed.
