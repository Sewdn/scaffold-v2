# BookSpace — Project Briefing (Problem Space)

## Business Context

A makerspace and coworking facility offers workshops, equipment training sessions, and open studio time. Members book spaces (e.g. woodshop, 3D printer room, conference room) and sessions (e.g. "Intro to CNC", "Open Studio Friday"). Currently, booking is done via spreadsheets, Doodle polls, and manual email. Double-bookings happen, capacity is unclear, and members have no self-service way to see availability or cancel.

The facility has 5–10 bookable spaces, 20–50 recurring sessions per month, and about 100 members. They need a system that members can use themselves, that staff can manage, and that can scale as they add more spaces and sessions.

## Current Challenges

1. **Double-Booking**: No single source of truth. Staff and members use different tools; conflicts occur.
2. **No Self-Service**: Members must email or call to book. Staff spend hours on manual scheduling.
3. **Visibility**: Members cannot see what is available when. They ask "is the woodshop free tomorrow afternoon?"
4. **Capacity**: Sessions have limits (e.g. 8 people for CNC intro). No enforcement; overbooking happens.
5. **Recurring Sessions**: Many sessions repeat (e.g. every Friday). Manually creating each instance is error-prone.
6. **Cancellations**: No clear process. Members cancel by email; staff may forget to free the slot.

## Vision for Solution

BookSpace will be a booking system for spaces and sessions that:

- Provides a member-facing calendar and booking interface
- Allows staff to define spaces, sessions, and recurring schedules
- Enforces capacity and prevents double-booking
- Supports cancellations and waitlists
- Sends notifications (booking confirmation, reminders, cancellations)
- Can integrate with existing member management (Phase 2)

The system should feel simple and reliable; members should trust that their booking is confirmed.

## Business Opportunities

1. **Operational Efficiency**: Fewer manual hours; fewer errors and conflicts.
2. **Member Satisfaction**: Self-service booking is faster and more convenient.
3. **Revenue**: Better utilization of spaces; optional paid sessions or premium tiers.
4. **Data**: Usage data informs space planning and session scheduling.
5. **Replication**: Other makerspaces or coworking spaces could adopt the system.

## Next Steps

Define domain, scope, and technical approach. MVP focuses on spaces, sessions, and bookings with capacity enforcement. Staff and member UIs in Phase 1; notifications and recurring sessions in Phase 2.
