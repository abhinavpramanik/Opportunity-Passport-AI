# Phase 1: Project Foundation

## Objective
Set up the initial project structure and foundation for the Opportunity Passport AI MVP.

## Tasks

### 1. Project Initialization
- Initialize Next.js (App Router) with TypeScript using `npx create-next-app@latest`.
- Configure Tailwind CSS v3 with custom theme tokens (colors, fonts, spacing).
- Install and initialize shadcn/ui (`npx shadcn-ui@latest init`).
- Install all core dependencies: `framer-motion`, `react-flow-renderer`, `recharts`, `lucide-react`.
- Create `.gitignore` and `README.md`.

### 2. Folder Structure
```
app/
components/
components/ui/
data/
hooks/
lib/
types/
public/
```

### 3. Static Data Layer (all hardcoded)
Create the following mock data files in `/data/`:
- `user.ts` — Demo user: Alex Sharma, 22, B.Tech CSE, skills, goals
- `passport.ts` — Scores: Employability, Learning, Finance, Insurance, Global Mobility
- `jobs.ts` — Matched jobs and internships
- `scholarships.ts` — Scholarship listings
- `schemes.ts` — Government scheme eligibility
- `finance.ts` — Savings, emergency fund, investment data
- `insurance.ts` — Insurance recommendations
- `mentor.ts` — AI Mentor personas and predefined responses
- `timeline.ts` — Career timeline events
- `notifications.ts` — (also used as `alerts.ts` per PRD; unified as `notifications.ts`)
- `learning.ts` — Course roadmap, certificates, future skills
- `mobility.ts` — India → Singapore transition data
- `graph.ts` — Node/edge data for the Opportunity Graph

### 4. Type Definitions
Create `/types/index.ts` with TypeScript interfaces for all data models:
`User`, `PassportScore`, `Job`, `Scholarship`, `Scheme`, `FinanceData`, `InsuranceData`, `MentorPersona`, `TimelineEvent`, `Notification`, `Course`, `MobilityData`, `GraphNode`, `GraphEdge`.

### 5. Design System
- Set Inter font via `next/font/google`.
- Configure Tailwind with:
  - Primary: `#2563EB`, Accent: `#7C3AED`, Success: `#22C55E`, Warning: `#F59E0B`, Error: `#EF4444`
  - Background: Dark slate/zinc palette
  - Border radius: `xl`
  - 8pt spacing grid
- Define global CSS variables in `globals.css`.

### 6. Base Layout & Navigation
- Implement root `layout.tsx` with sidebar navigation.
- Navigation links: Dashboard, Passport, Opportunities, Graph, AI Mentor, Future Simulator, Finance, Government, Mobility, Settings.
- Create a shell `Settings` page (mentioned in nav but not detailed in PRD — include as a minimal preferences/profile page).

## Missing Items Found in Context (Addressed Here)
- `alerts.ts` (PRD) vs `notifications.ts` (MDD): **Unified as `notifications.ts`**.
- `learning.ts` and `mobility.ts` data files: **Not listed in PRD data section but required by feature specs**. Added.
- `graph.ts` data file: **Required for React Flow but omitted from both docs**. Added.
- `Settings` page: **In navigation spec but has no screen specification**. Added as minimal profile settings page.
- TypeScript type definitions file: **Not mentioned in either document**. Added as essential for TypeScript project.
- `.gitignore` and `README.md`: **Not mentioned but required for professional project setup**. Added.

## Notes
- Everything is hardcoded. No backend or database.
- Focus on premium UI foundation — every subsequent phase builds on this.
- All data should feel realistic and personalized to "Alex Sharma".
