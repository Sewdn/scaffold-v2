# Club Member Admin — Project Scope (Solution Space)

## High-Level Goals

The system aims to provide an **automated member management platform** for a sports club that:

1. **Low-Friction Communication** — Facilitates communication via email without requiring members to create accounts
2. **Automated Email Processing** — Provides automated email processing via an AI agent that can read, understand, and process emails
3. **Full Member Management** — Supports member management including season membership, competitions, teams, and events
4. **Flexible Event Organization** — Enables flexible event organization with the ability to add extra orders (e.g. sandwiches, menus, dinners) per event and manage these via dynamic custom fields and RSVP tracking
5. **Payment Tracking** — Provides payment tracking for membership fees, event registrations, and extra orders
6. **Admin Management** — Enables admin management via both web interface and email
7. **Transparency** — Allows members to always query their status via email

## User Roles

### Admin / Board Member

- Has access to the admin UI via **magic link** authentication
- Magic link can be requested via admin UI or email
- Can use all functionality via admin UI
- Can also use all functionality via email (automated via AI agent)
- Can create, modify, and manage events
- Can manage members
- Can manage competitions and teams
- Can query overviews
- Can send reminders
- Can register payments via bank transaction overview

### Member

- No account required
- Communicates exclusively via email
- Can register for events via email
- Can register other members for events via email (by mentioning names)
- Can ask questions via email (e.g. payment status)
- Receives invitations and reminders via email

## Epic Features

### Epic 1: Member Management

Management of members, seasons, competitions, and teams.

### Epic 2: Event Management

Management of events, registrations, and RSVP tracking.

### Epic 3: Payment Management

Tracking and management of payments for membership fees, event registrations, and extra orders.

### Epic 4: Email Integration & AI Agent

Automatic processing of incoming emails via Gmail API and AI agent.

### Epic 5: Admin Interface

Web-based administration interface with magic link authentication.

### Epic 6: MCP Server

Wrapper around backend API that exposes tools for the AI agent.

## Feature Scope

### Epic 1: Member Management

#### 1.1 Member Management
- **CRUD operations for members**
  - Create, view, modify, and delete members
  - Email address as primary identifier (unique)
  - Metadata per member (key-value pairs)
- **Member search and filtering**
  - Search by name, email address
  - Filter by active status, season
- **Member list overviews**
  - Overview of all members
  - Overview per season
  - Export functionality

#### 1.2 Season Management
- **Seasons management**
  - Create, modify, delete seasons
  - Set active season (only one active season)
  - Manage start and end dates
- **Season overviews**
  - Overview of all seasons
  - Identify active season

#### 1.3 SeasonMembership Management
- **Season membership management**
  - Link members to seasons
  - Set active status per season
  - Track membership fee payment status
  - Track play status (isPlaying)
- **Season overviews**
  - Overview of active members per season
  - Overview of members with paid membership fee
  - Overview of members who play

#### 1.4 Competition Management
- **Competitions management**
  - Create, modify, delete competitions within a season
  - Support multiple competitions per season
- **Competition overviews**
  - Overview of competitions per season
  - Identify active competitions

#### 1.5 Team Management
- **Teams management**
  - Create, modify, delete teams within a competition
  - Manage team name and description
- **Team overviews**
  - Overview of teams per competition

#### 1.6 TeamMembership Management
- **Team membership management**
  - Link members to teams within competitions
  - Members can be in multiple teams (different competitions)
  - One TeamMembership per team per member
- **Team overviews**
  - Overview of members per team
  - Overview of teams per member

### Epic 2: Event Management

#### 2.1 Event Management
- **Events management**
  - Create, modify, delete events
  - Event details: name, description, date, time, location
  - Set RSVP deadline
  - Manage active status (can still receive registrations)
  - Set registration costs (registrationFee)
- **Custom Fields configuration**
  - Configure dynamic fields per event
  - Support different field types (text, select, number, boolean)
  - Define options for select fields
  - Set required fields
  - Set cost per custom field
- **Event overviews**
  - Overview of all events
  - Filter by active/inactive events
  - Filter by date

#### 2.2 EventRegistration Management
- **Registrations management**
  - Create registrations for members
  - Manage RSVP status (pending, confirmed, declined)
  - Store custom field values per registration
  - Modify and cancel registrations
- **Registration validation**
  - Check if member is active
  - Check if event is active
  - Check if member is already registered (one registration per event)
  - Validate custom field values against available options
- **Registration overviews**
  - Overview of registrations per event
  - Status per member (registered, declined, no response)
  - Export functionality

#### 2.3 RSVP Tracking
- **RSVP status tracking**
  - Change status via email
  - Automatic status updates on registration
- **RSVP overviews**
  - Overview of pending/confirmed/declined per event
  - Members who have not yet responded

### Epic 3: Payment Management

#### 3.1 Payment Management
- **Payments management**
  - Create, modify, delete payment records
  - Link payments to members
  - Link payments to event registrations (optional)
  - Manage description, amount, and payment status
- **Payment status tracking**
  - Automatically calculate status (pending, partial, paid)
  - Track paid amount
  - Record payment date
- **Payment overviews**
  - Overview of payments per member
  - Overview of outstanding payments
  - Overview of paid payments
  - Filter by status, date, event

#### 3.2 Payment Sources
- **Automatic payment creation**
  - Create payment records on event registration (registrationFee)
  - Create payment records for custom fields with costs
  - Create payment records for membership fee (SeasonMembership)
- **Manual payment creation**
  - Admins can manually add payments via admin UI
- **Bulk payment registration**
  - Register payments via bank transaction overview (email)
  - Match transactions with existing Payment records
  - Identify unmatched transactions

#### 3.3 Payment Queries
- **Members can query payment status**
  - Via email: "How much do I still owe?"
  - Overview of outstanding payments
  - Overview of payment history
  - Overview of orders with costs

### Epic 4: Email Integration & AI Agent

#### 4.1 Gmail API Integration
- **Email inbox management**
  - One central inbox via Gmail API
  - Read incoming emails
  - Send outgoing emails
  - Support email threading

#### 4.2 Email Processing
- **Incoming email processing**
  - Process all incoming emails
  - Analyze email context (sender, subject, content)
  - Identify email type (registration, question, admin action, etc.)
- **Email validation**
  - Validate requests before executing actions
  - Send control emails on errors or ambiguities
  - Ask corrective questions

#### 4.3 AI Agent Functionality
- **Email interpretation**
  - Read and understand emails
  - Identify intent
  - Extract entities (names, events, orders, etc.)
- **Action execution**
  - Call MCP tools to query data
  - Call MCP tools to register data
  - Execute complex queries
- **Response generation**
  - Generate personalized responses
  - Generate confirmation emails
  - Generate control emails with corrective questions
  - Generate overviews (registrations, payments, etc.)
- **Always respond**
  - Every email is always answered
  - No email is left without a response

#### 4.4 Email Workflows
- **Member registration workflow**
  - Members can register via email
  - Members can register other members via email
  - Validation and control emails
  - Confirmation emails with CC to other members
- **Admin workflows via email**
  - Create event via email
  - Send invitations (optional, automatic or manual)
  - Query overviews via email
  - Send reminders via email
  - Register payments via bank transaction overview
- **Member questions workflow**
  - Members can ask questions via email
  - AI agent answers questions (e.g. payment status)
  - Generate personalized responses

### Epic 5: Admin Interface

#### 5.1 Authentication
- **Magic link authentication**
  - Request magic link via admin UI (leave email address)
  - Request magic link via email
  - Magic link validation and session management
  - No username/password system

#### 5.2 Dashboard & Overviews
- **Dashboard**
  - Overview of active events
  - Overview of recent registrations
  - Overview of outstanding payments
  - Statistics and metrics
- **Member overviews**
  - Member list with filters
  - View member details
  - Season membership overviews
- **Event overviews**
  - Event list with filters
  - View event details
  - Registration overview per event
  - RSVP status overview
- **Payment overviews**
  - Payment list with filters
  - Outstanding payments overview
  - Payment history

#### 5.3 CRUD Operations
- **Members management**
  - Create, modify, delete members
  - Manage metadata
- **Seasons management**
  - Create, modify, delete seasons
  - Set active season
- **Competitions management**
  - Create, modify, delete competitions
- **Teams management**
  - Create, modify, delete teams
- **TeamMembership management**
  - Link members to teams
- **Events management**
  - Create, modify, delete events
  - Configure custom fields
- **Registrations management**
  - Create, modify, cancel registrations
  - Change RSVP status
- **Payments management**
  - Create, modify, delete payments
  - Update payment status

### Epic 6: MCP Server

#### 6.1 MCP Tools — Data Queries
- **Member queries**
  - Query members by email address
  - Search members by name
  - Filter members by active status
  - Query member overviews
- **Event queries**
  - Query events
  - Query event details
  - Query active events
- **Registration queries**
  - Query registrations per event
  - Query registrations per member
  - Query RSVP status
- **Payment queries**
  - Query payments per member
  - Query outstanding payments
  - Query payment history

#### 6.2 MCP Tools — Data Registration
- **Register members**
  - Create new members
  - Modify members
- **Register events**
  - Create new events
  - Modify events
  - Configure custom fields
- **Register registrations**
  - Create new registrations
  - Modify registrations
  - Update RSVP status
  - Register custom field values
- **Register payments**
  - Create new payments
  - Modify payments
  - Update payment status
  - Bulk register payments (bank transaction overview)

#### 6.3 MCP Tools — Complex Operations
- **Member search**
  - Fuzzy search on names
  - Find multiple members based on description
- **Validation**
  - Validate registrations
  - Validate custom field values
  - Validate payments
- **Matching**
  - Match transactions with payments
  - Match members based on description

## Roadmap

### MVP (Phase 1)

- Member CRUD
- Season CRUD
- Event CRUD with custom fields
- EventRegistration CRUD with RSVP
- Payment CRUD and tracking
- Admin UI with magic link authentication
- MCP Server with core tools
- Basic email integration (Gmail API)
- AI agent for email processing (registration, questions, payment queries)
- SQLite persistence

### Phase 2

- Competition and Team management
- Bulk payment registration via email
- Email workflows: event creation, reminders, invitations
- Admin overviews and reports
- Export functionality

### Phase 3

- Recurring events
- Advanced notifications
- Analytics and reporting
- Optional: payment gateway integration

### Out of Scope (Initial)

- Payment gateway integration (manual registration only)
- Mobile native apps
- Integration with external calendar systems
- Real-time sync
