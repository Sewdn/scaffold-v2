# Club Member Admin — Project Briefing (Problem Space)

## Business Context

The project concerns a **member management system for a sports club** (e.g. table tennis club, tennis club, or similar). The club needs an automated system to manage members, organize events, and facilitate communication with members via email.

Members should not need to create complex accounts. Communication must be low-friction via email. Admins must be able to create and manage events via email. Members must be able to register for events via email. Members must be able to register other members via email (flexible and easy). Members must be able to respond to invitations via email. Members must be able to ask questions via email (e.g. "how much do I owe?"). The club can send manual emails via the same inbox (not only automated ones). Every reply to emails (whether automatically or manually sent) is processed by the AI agent.

## Current Challenges

### 1. Member Management

- Members must be registered and tracked with their contact details (email addresses)
- Per season, the club must track who is active, who has paid membership fees, and who plays in which team with what ranking
- Metadata per member must be maintainable

### 2. Event Management

- Various events are organized throughout the year
- Members must be able to register for events
- Per event, extra information must be trackable (e.g. sandwich orders, menu registrations, dinner participation)
- RSVP tracking is essential

### 3. Payments

- There are costs associated with:
  - Annual membership (membership fee)
  - Event registration itself
  - Certain orders/extra options (via custom fields)
- The system must track who owes what
- Payment status must be tracked (who has paid, when, how much is still outstanding)
- Admins must be able to register payments by sending an overview of bank transactions via email

### 4. Communication

- Members do not want to create complex accounts
- Communication must be low-friction via email
- Admins must be able to create and manage events via email
- Members must be able to register for events via email
- Members must be able to register other members via email (flexible and easy)
- Members must be able to respond to invitations via email
- Members must be able to ask questions via email (e.g. "how much do I owe?")
- The club can send manual emails via the same inbox (not only automated)
- Every reply to emails (automatically or manually sent) is processed by the AI agent

### 5. Automation

- Email processing must be automated
- AI agent must be able to read, understand, and process emails
- AI agent must be able to perform actions in the system via API calls
- AI agent must be able to generate personalized responses

## Vision for Solution

### Architecture

The system consists of four main components:

1. **Backend API** (REST API):
   - Central data layer for all entities (members, events, seasons, payments)
   - Exposes REST endpoints for CRUD operations
   - Manages authentication and authorization for admin access

2. **Frontend Admin UI**:
   - Web-based administration interface
   - Authentication via **magic link** system (no username/password)
   - Magic link can be requested via:
     - Admin UI: leave email address to receive magic link
     - Email: magic link can also be requested via email
   - Provides overview lists and management functionality
   - Accessible to admins and board members

3. **MCP Server**:
   - Wrapper around the backend API
   - Exposes tools/functions that an AI agent can invoke
   - Facilitates integration between email processing and the management platform
   - Enables the AI agent to:
     - Query data (members, events, payments)
     - Register data (new events, registrations, payments)
     - Execute complex queries

4. **Email Integration** (Gmail API):
   - **Critical component** of the setup
   - One central inbox is set up using Gmail and the Gmail API
   - All incoming emails are read and processed via the Gmail API
   - AI agent processes incoming emails and generates responses
   - Outgoing emails can be sent via Gmail API (automatically) or manually by the club
   - Every reply to emails (both automatically and manually sent) is processed by the AI agent

### Key Principles

- **Low Friction**: Members do not need to create accounts; communication happens via email
- **Automation**: AI agent processes emails and performs actions without manual intervention
- **Flexibility**: System must support different types of events and extra fields
- **Transparency**: Members can always ask questions and query their status
- **Manageability**: Admins have full control via admin UI and can manage everything via email too
- **Validation and Control**: Before actions are executed in the system, requests are validated. On errors or ambiguities, a control email is sent first with corrective questions. Actions are only executed after validation.
- **Always Respond**: Every email sent to the system is always answered. No email is left without a response.
- **System Has the Last Word**: The system always has the final say on all decisions.

## Business Opportunities

1. **Operational Efficiency**: Fewer manual hours; fewer errors and conflicts.
2. **Member Satisfaction**: Low-friction communication via email; no account creation required.
3. **Scalability**: Other clubs (sports, hobby, community) could adopt the system.
4. **AI Integration**: Demonstrates practical AI agent integration for small organizations.
5. **Open Source**: The platform could be shared with other clubs, building reputation and contributor base.

## Next Steps

Define domain, scope, and technical approach. MVP focuses on member management, event management, payments, email integration, and AI agent integration. Admin UI and MCP server in Phase 1; advanced workflows and bulk operations in Phase 2.
