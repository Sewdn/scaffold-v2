# Club Member Admin — Technical Solution / Architecture

## System Overview

The system consists of four main components that work together:

1. **Backend API** (Elysia.js + Bun) — Lightweight routing layer
2. **Frontend Admin UI** (ViteJS + React 19 + TanStack Query + Eden)
3. **MCP Server** (Bun)
4. **Email Processing Service** (Bun + Gmail API + AI)

**Service-Oriented Architecture:**
- Backend apps are lightweight and contain only routing
- Business logic is implemented in separate service packages
- Services are wired to Elysia routes
- Scaffolding commands are available for service setup

### Architecture Diagram

```
┌─────────────────┐
│  Gmail API      │
│  (Inbox)        │
└────────┬────────┘
         │
         ▼
┌─────────────────────────────────────┐
│  Email Processing Service           │
│  - Gmail API Integration            │
│  - AI Agent (LLM Integration)       │
│  - Email parsing & validation       │
└────────┬─────────────────────────────┘
         │
         ▼
┌─────────────────┐
│  MCP Server      │◄─────┐
│  - Tools wrapper │       │
└────────┬────────┘       │
         │                 │
         ▼                 │
┌─────────────────┐        │
│  Backend API    │        │
│  (Elysia.js)   │────────┘
│  - REST API     │
│  - Auth         │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Database       │
│  (SQLite)       │
│  - Prisma ORM   │
│  - svc-database │
└─────────────────┘
         │
         ▼
┌─────────────────┐
│  Frontend       │
│  Admin UI       │
│  (ViteJS)       │
└─────────────────┘
```

## Component Details

### 1. Backend API (apps/backend-api)

**Technology:**
- **Runtime**: Bun
- **Framework**: Elysia.js
- **Database**: SQLite (native Bun support, deploy as embedded database)
- **ORM**: Prisma with SQLite driver
- **Authentication**: Magic link system (custom implementation with JWT via jose)
- **API Documentation**: @elysiajs/swagger

**Architecture:**
- **Lightweight routing layer**: Backend app contains only routing
- **Service packages**: Business logic in separate service packages (packages/svc-*)
- **Service wiring**: Services are imported and wired to Elysia routes
- **Scaffolding**: Commands available to set up services

**Structure:**
```
apps/backend-api/
├── src/
│   ├── index.ts                 # Entry point
│   └── routes/                  # API routes (lightweight, routing only)
│       ├── members.ts           # Wires to svc-data member module
│       ├── seasons.ts           # Wires to svc-data season module
│       ├── competitions.ts      # Wires to svc-data competition module
│       ├── teams.ts             # Wires to svc-data team module
│       ├── events.ts            # Wires to svc-data event module
│       ├── registrations.ts     # Wires to svc-data registration module
│       ├── payments.ts          # Wires to svc-data payment module
│       └── auth.ts              # Wires to svc-auth service
│
packages/
├── svc-member/                  # Member service package
│   └── src/
│       ├── member.service.ts    # Business logic
│       └── member.repository.ts
├── svc-event/                   # Event service package
├── svc-payment/                 # Payment service package
├── svc-auth/                    # Auth service package
└── svc-database/                # Database service package
    └── src/
        ├── prisma.ts            # Prisma client setup
        └── database.service.ts  # Database operations
```

**Key Features:**
- RESTful API endpoints for all CRUD operations
- Magic link authentication (no username/password)
- Request validation with Zod
- Error handling and logging
- Swagger API documentation

**API Endpoints (High-level):**
- `/api/members` — Member management
- `/api/seasons` — Season management
- `/api/competitions` — Competition management
- `/api/teams` — Team management
- `/api/events` — Event management
- `/api/registrations` — Registration management
- `/api/payments` — Payment management
- `/api/auth` — Authentication (magic link)

### 2. Frontend Admin UI (apps/frontend-vite-admin)

**Technology:**
- **Framework**: ViteJS with React 19
- **UI Components**: Shadcn primitives (Radix)
- **Styling**: Tailwind CSS
- **State Management**:
  - TanStack Query for server state (direct communication with backend API)
  - React Context for data providers
  - useLocalStorage for persisted state
- **Form Handling**:
  - React Hook Form with Zod for validation
  - Declarative Form Builder component for form configuration
- **API Client**: @elysiajs/eden for end-to-end type-safe API calls

**Structure:**
```
apps/frontend-vite-admin/
├── src/
│   ├── app/                     # App routes/pages
│   │   ├── page.tsx             # Dashboard
│   │   ├── members/
│   │   ├── events/
│   │   ├── payments/
│   │   └── auth/
│   ├── components/              # UI components
│   │   ├── ui/                  # Shadcn components
│   │   ├── features/            # Feature components
│   │   └── forms/               # Form components
│   ├── hooks/                   # Custom hooks
│   ├── lib/                     # Utilities
│   └── contexts/                # React contexts
│       └── auth.context.tsx
```

**Key Features:**
- Magic link authentication flow
- Dashboard with overviews
- CRUD interfaces for all entities
- Declarative forms via FormBuilder component
- Forms with validation (Zod)
- Export functionality
- Responsive design

### 3. MCP Server (apps/mcp-mcp)

**Technology:**
- **Runtime**: Bun
- **Framework**: MCP Protocol implementation
- **Integration**: Backend API via HTTP client

**Structure:**
```
apps/mcp-mcp/
├── src/
│   ├── index.ts                 # MCP server entry
│   ├── tools/                   # MCP tools
│   │   ├── members.tools.ts
│   │   ├── events.tools.ts
│   │   ├── registrations.tools.ts
│   │   ├── payments.tools.ts
│   │   └── search.tools.ts
│   ├── helpers/                 # Helper functions
│   │   ├── api-client.ts        # Backend API client
│   │   └── validation.ts
│   └── types/                   # Type definitions
```

**MCP Tools (High-level):**
- `get_member` — Query member by email address
- `search_members` — Search members by name (fuzzy search)
- `get_event` — Query event
- `list_events` — List events
- `create_event` — Create event
- `create_registration` — Create registration
- `update_registration` — Update registration
- `get_payments` — Query payments
- `create_payment` — Create payment
- `update_payment` — Update payment
- `register_bulk_payments` — Bulk register payments

### 4. Email Processing Service

**Technology:**
- **Runtime**: Bun
- **Gmail API**: googleapis npm package
- **Push Notifications**: Google Cloud Pub/Sub (webhook-based)
- **AI Integration**: LLM API (OpenAI/Anthropic/etc.)
- **MCP Client**: Communicates with MCP Server

**Architecture:**
- **Thin wrapper**: Email processing app is a lightweight wrapper around service packages
- **Service packages**: Gmail and AI functionality in separate service packages
- **Service wiring**: Email processing app wires services together
- **Webhook-based**: Uses Gmail Push Notifications via Google Cloud Pub/Sub (preferred)
- **Fallback**: Polling via cronjob as alternative (if webhooks not possible)

**Structure:**
```
apps/email-processor/            # New app (to scaffold)
├── src/
│   ├── index.ts                 # Entry point (lightweight routing)
│   └── routes/                  # Email processing routes
│       ├── webhook.ts           # Gmail Pub/Sub webhook endpoint
│       ├── incoming.ts          # Incoming email processing
│       └── outgoing.ts          # Outgoing email sending
│
packages/
├── svc-gmail/                   # Gmail service package
│   └── src/
│       ├── gmail.service.ts     # Gmail API client
│       ├── reader.service.ts    # Email reader (inbox)
│       ├── sender.service.ts    # Email sender
│       └── watch.service.ts     # Gmail watch management
├── svc-ai/                      # AI service package
│   └── src/
│       ├── ai-agent.service.ts  # Main AI agent
│       ├── parser.service.ts    # Email parser
│       └── validator.service.ts # Request validator
└── workflows/                   # Email workflows (optional as package)
    ├── registration.workflow.ts
    ├── event-creation.workflow.ts
    └── payment.workflow.ts
```

**Key Features:**
- Gmail Push Notifications via Google Cloud Pub/Sub (webhook-based)
- Email parsing and intent detection
- AI agent for email interpretation
- Validation and control emails
- Automatic response generation
- MCP tools invocation for data operations
- Fallback polling mechanism (if needed)

## Data Layer

### Database Schema (SQLite via Prisma)

**Database Choice:**
- **SQLite**: Lightweight database that can be deployed as embedded database
- **Native Bun Support**: Bun has native SQLite support
- **No external database needed**: Suitable for lightweight deployment

**Prisma Schema Structure:**
```prisma
// Core entities
model Member { ... }
model Season { ... }
model SeasonMembership { ... }
model Competition { ... }
model Team { ... }
model TeamMembership { ... }
model Event { ... }
model EventRegistration { ... }
model Payment { ... }
```

**Data Layer Service Package:**
- **svc-data**: Single data layer service package
- Contains Prisma client setup and configuration
- Contains modules for all entities (Member, Season, Competition, Team, Event, Registration, Payment)
- Each module contains both business logic and database access
- Database migrations and seeding
- Type-safe database access for all modules

## Authentication & Authorization

### Magic Link Authentication

**Flow:**
1. Admin requests magic link (via UI or email)
2. Backend generates temporary token (JWT)
3. Token is sent via email
4. Admin clicks link in email
5. Frontend validates token with backend
6. Backend returns session token
7. Frontend uses session token for API calls

**Implementation:**
- JWT tokens via `jose` library
- Token expiry (e.g. 15 minutes for magic link, 24 hours for session)
- Secure token storage (httpOnly cookies)
- Token refresh mechanism

## Email Processing Flow

### Incoming Email Processing

1. **Gmail Push Notifications (Preferred)**
   - Google Cloud Pub/Sub topic receives Gmail notifications
   - Push subscription sends webhook POST to endpoint
   - Email processing service receives webhook
   - New emails detected via push notifications

   **Alternative: Polling (Fallback)**
   - Service polls Gmail inbox regularly via cronjob
   - New emails detected via polling

2. **Email Parsing**
   - Email is parsed (sender, subject, body)
   - Thread detection (replies linked to original email)

3. **Intent Detection**
   - AI agent analyzes email content
   - Identifies intent (registration, question, admin action, etc.)

4. **Validation**
   - Request is validated
   - On errors: control email is sent
   - On success: processing continues

5. **Action Execution**
   - AI agent uses MCP tools to query/register data
   - Business logic is executed

6. **Response Generation**
   - AI agent generates personalized response
   - Email is sent via Gmail API

## Package Structure

### Service Packages (packages/svc-*)

**Core Services:**
- **svc-data** — Data layer service (Prisma client + business logic + database access)
  - Contains modules for: Member, Season, Competition, Team, Event, Registration, Payment
  - Each module contains both business logic and database access
  - Single source of truth for all data operations
- **svc-auth** — Authentication service logic

**Email & AI Services:**
- **svc-gmail** — Gmail API integration service
  - Read inbox (incoming emails)
  - Read outbox (sent emails via Gmail API)
  - Send emails
- **svc-ai** — AI agent service (LLM integration, parsing, validation)

### UI Packages (packages/ui-*)

**ui** — Core Shadcn components
**ui-lib** — Custom UI components library
**ui-member** — Member management UI components
**ui-event** — Event management UI components
**ui-payment** — Payment management UI components

### Shared Packages

**domain** — Shared domain types and interfaces
**typescript-config** — Shared TypeScript configs
**eslint-config** — Shared ESLint configs

## MVP Implementation Notes

- **Database**: SQLite for MVP; migrations via Prisma
- **Auth**: Magic link only; no username/password
- **Email**: Gmail API required; configure credentials
- **AI**: LLM API required (OpenAI/Anthropic); configure API key
- **MCP**: MCP server must be running for email processing to invoke tools
- **Validation**: All requests validated before system actions; control emails on failure
- **Always respond**: Every incoming email must receive a response
