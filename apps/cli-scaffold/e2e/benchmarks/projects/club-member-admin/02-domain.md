# Club Member Admin — Project Domain

## User Roles

### Admin / Board Member

- Has access to the admin UI via **magic link** authentication
- Magic link can be requested via:
  - Admin UI: leave email address to receive magic link
  - Email: magic link can also be requested via email
- Can use all functionality via admin UI
- Can also use all functionality via email (automated via AI agent)
- Can create, modify, and manage events
- Can manage members
- Can manage competitions and teams
- Can query overviews
- Can send reminders

### Member

- No account required
- Communicates exclusively via email
- Can register for events via email
- Can register other members for events via email (by mentioning names)
- Can ask questions via email (e.g. payment status)
- Receives invitations and reminders via email

## Core Entities

### Member

A member of the sports club.

**Attributes:**
- `id`: Unique identifier
- `email`: Email address (unique, primary contact)
- `firstName`: First name (optional)
- `lastName`: Last name (optional)
- `metadata`: Free metadata (key-value pairs for extra information)
- `createdAt`: Creation date
- `updatedAt`: Last update date

**Relationships:**
- Has many `SeasonMembership` records (one per season)
- Has many `EventRegistration` records (registrations for events)
- Has many `Payment` records (payments)

**Business Rules:**
- Email address must be unique
- Members are added via email address
- Members do not need to create accounts

### Season

A season of the sports club (e.g. 2024–2025).

**Attributes:**
- `id`: Unique identifier
- `name`: Name of the season (e.g. "Season 2024–2025")
- `startDate`: Start date of the season
- `endDate`: End date of the season
- `isActive`: Whether this is the active season
- `createdAt`: Creation date
- `updatedAt`: Last update date

**Relationships:**
- Has many `SeasonMembership` records (members participating in this season)
- Has many `Competition` records (competitions within this season)

**Business Rules:**
- Only one active season at a time
- Seasons can overlap but typically have a clear start/end

### SeasonMembership

Links a member to a season with season-specific information.

**Attributes:**
- `id`: Unique identifier
- `memberId`: Reference to Member
- `seasonId`: Reference to Season
- `isActive`: Whether the member is active in this season
- `hasPaidMembershipFee`: Whether membership fee has been paid
- `isPlaying`: Whether the member plays in this season
- `createdAt`: Creation date
- `updatedAt`: Last update date

**Relationships:**
- Belongs to one `Member`
- Belongs to one `Season`
- Has many `TeamMembership` records (per competition)

**Business Rules:**
- A member can have only one SeasonMembership per season
- Only active members can register for events
- `isActive` determines whether a member receives invitations

### Event

An event organized by the club.

**Attributes:**
- `id`: Unique identifier
- `name`: Name of the event
- `description`: Description of the event
- `date`: Date of the event
- `time`: Time of the event (optional)
- `location`: Location (optional)
- `rsvpDeadline`: RSVP deadline
- `isActive`: Whether the event is active (can still receive registrations)
- `registrationFee`: Registration cost for the event (optional)
- `customFields`: Configuration of extra fields (e.g. sandwich orders, menu, dinner)
  - Array of field definitions with:
    - `name`: Field name
    - `type`: Type (text, select, number, boolean, etc.)
    - `options`: Options for select fields (optional)
    - `required`: Whether the field is required
    - `hasCost`: Whether there is a cost associated
    - `cost`: Cost amount (optional)
- `createdAt`: Creation date
- `updatedAt`: Last update date

**Relationships:**
- Has many `EventRegistration` records (registrations)
- Has many `Payment` records (via EventRegistration)

**Business Rules:**
- Only active members (in the active season) can register
- RSVP deadline must be before the event date
- Custom fields can be configured dynamically per event
- If `registrationFee` is set, a Payment record is automatically created on registration

### EventRegistration

A member's registration for an event.

**Attributes:**
- `id`: Unique identifier
- `eventId`: Reference to Event
- `memberId`: Reference to Member
- `status`: Registration status
  - `pending`: No response yet
  - `confirmed`: Confirmed (member is attending)
  - `declined`: Declined (member is not attending)
- `customFieldValues`: Values for the event's custom fields
  - Object with key-value pairs where:
    - Key = custom field name
    - Value = entered value
- `registeredAt`: When the registration was recorded
- `updatedAt`: Last update date

**Relationships:**
- Belongs to one `Event`
- Belongs to one `Member`
- Has many `Payment` records (for costs linked to custom fields)

**Business Rules:**
- A member can have only one EventRegistration per event
- Status can be changed via email (RSVP)
- Custom field values are stored when the member registers

### Payment

A payment that must be made or has been made.

**Attributes:**
- `id`: Unique identifier
- `memberId`: Reference to Member
- `eventRegistrationId`: Reference to EventRegistration (optional, if payment is linked to an event)
- `description`: Description of the payment (e.g. "Sandwich order - Event X")
- `amount`: Amount to be paid
- `paidAmount`: Amount already paid
- `status`: Payment status
  - `pending`: Not yet paid
  - `partial`: Partially paid
  - `paid`: Fully paid
- `paidAt`: When the payment was made (optional)
- `paymentMethod`: Payment method (optional)
- `notes`: Notes (optional)
- `createdAt`: Creation date
- `updatedAt`: Last update date

**Relationships:**
- Belongs to one `Member`
- May belong to one `EventRegistration` (optional)

**Business Rules:**
- `paidAmount` cannot exceed `amount`
- Status is automatically calculated from `paidAmount` and `amount`
- Payments can be added via:
  - Admin UI (manual)
  - AI agent after email processing (automatic on registrations)
  - AI agent after processing bank transaction overview (bulk registration)

### Competition

A competition within a season (e.g. "Regional League", "Youth Division").

**Attributes:**
- `id`: Unique identifier
- `seasonId`: Reference to Season
- `name`: Name of the competition
- `description`: Description (optional)
- `startDate`: Start date (optional)
- `endDate`: End date (optional)
- `isActive`: Whether the competition is active
- `createdAt`: Creation date
- `updatedAt`: Last update date

**Relationships:**
- Belongs to one `Season`
- Has many `Team` records (teams in this competition)
- Has many `TeamMembership` records

### Team

A team within a competition.

**Attributes:**
- `id`: Unique identifier
- `competitionId`: Reference to Competition
- `name`: Team name
- `description`: Description (optional)
- `createdAt`: Creation date
- `updatedAt`: Last update date

**Relationships:**
- Belongs to one `Competition`
- Has many `TeamMembership` records (members in this team)

### TeamMembership

Links a member to a team within a competition.

**Attributes:**
- `id`: Unique identifier
- `memberId`: Reference to Member
- `teamId`: Reference to Team
- `competitionId`: Reference to Competition (denormalized for faster queries)
- `createdAt`: Creation date
- `updatedAt`: Last update date

**Relationships:**
- Belongs to one `Member`
- Belongs to one `Team`
- Belongs to one `Competition`

**Business Rules:**
- A member can be in multiple teams (different competitions)
- A member can have only one TeamMembership per team

## Entity Relationships Diagram

```
Member
  ├── 1:N SeasonMembership
  ├── 1:N EventRegistration
  ├── 1:N Payment
  └── 1:N TeamMembership

Season
  ├── 1:N SeasonMembership
  └── 1:N Competition

Competition
  ├── 1:N Team
  └── 1:N TeamMembership

Team
  └── 1:N TeamMembership

Event
  ├── 1:N EventRegistration
  └── 1:N Payment (via EventRegistration)

EventRegistration
  ├── N:1 Event
  ├── N:1 Member
  └── 1:N Payment

Payment
  ├── N:1 Member
  └── N:1 EventRegistration (optional)
```

## Domain Concepts

### RSVP (Répondez S'il Vous Plaît)

- Status tracking for event registrations
- Can be changed via email
- Status: pending, confirmed, declined

### Custom Fields

- Dynamic fields per event
- Support different types (text, select, number, boolean)
- Can have costs
- Values stored in EventRegistration.customFieldValues

### Active Members

- Members with `isActive = true` in the active season
- Only active members receive invitations
- Only active members can register for events

### Payment Tracking

- Automatic tracking of payments for:
  - Annual membership (membership fee)
  - Event registration costs (`registrationFee`)
  - Custom fields with costs
- Payments can be registered by:
  - Automatic creation on registrations (when there are costs)
  - Manual addition via admin UI
  - Bulk registration via email: admin sends bank transaction overview, AI agent matches and registers
