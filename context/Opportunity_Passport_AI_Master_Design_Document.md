# Opportunity Passport AI

# Master Design Document (MDD)

> Version: 1.0 Target: Singapore India Hackathon MVP Framework:
> Next.js + TypeScript + Tailwind + shadcn/ui

------------------------------------------------------------------------

# 1. Product Vision

## Mission

Build an AI-powered Opportunity Intelligence Platform that helps every
individual discover career, education, finance, insurance, government
and global opportunities through a single Opportunity Passport.

## Vision Statement

**One Intelligent Passport. Unlimited Opportunities.**

------------------------------------------------------------------------

# 2. Design Philosophy

-   Apple-level simplicity
-   Linear.app minimalism
-   Stripe dashboard polish
-   ChatGPT conversational AI
-   Spotify Wrapped storytelling

Core principles: - Minimal - Premium - Motion-first - AI-first -
Accessible - Responsive

------------------------------------------------------------------------

# 3. Target Users

1.  Student
2.  Graduate
3.  Professional
4.  Career Switcher
5.  Gig Worker
6.  Entrepreneur

------------------------------------------------------------------------

# 4. MVP Scope

## Included

-   Landing Page
-   AI Passport Generation
-   Dashboard
-   Opportunity Passport
-   Jobs
-   Scholarships
-   Government Schemes
-   Finance
-   Insurance
-   Learning
-   AI Mentor
-   Future Simulator
-   Opportunity Graph
-   Global Mobility
-   Notifications

## Excluded

-   Backend
-   Database
-   Authentication server
-   Payments
-   CRUD
-   Real AI APIs

Everything is hardcoded.

------------------------------------------------------------------------

# 5. Folder Structure

``` text
app/
components/
components/ui/
data/
hooks/
lib/
types/
public/
```

------------------------------------------------------------------------

# 6. Static Data Files

user.ts passport.ts jobs.ts scholarships.ts schemes.ts finance.ts
insurance.ts mentor.ts timeline.ts notifications.ts

------------------------------------------------------------------------

# 7. Navigation

Dashboard Passport Opportunities Government Finance Insurance Learning
Graph Simulator Mentor Mobility Settings

------------------------------------------------------------------------

# 8. Screen Specifications

## Landing

Hero Tagline Animated Globe Passport Mockup Generate Passport CTA

Animation: Floating passport Gradient background Mouse parallax

------------------------------------------------------------------------

## AI Generation

Multi-step loader

Uploading Profile Extracting Skills Understanding Goals Scanning
Opportunities Checking Schemes Building Passport

Animated progress.

------------------------------------------------------------------------

## Dashboard

Cards: - Employability - Learning - Finance - Insurance - Global
Mobility - Govt Eligibility

Widgets: - Opportunity Feed - AI Insights - Timeline - Notifications

------------------------------------------------------------------------

## Opportunity Passport

Sections: Personal Profile Scores Skills Achievements Recommendations

Passport should resemble Apple Wallet.

------------------------------------------------------------------------

## Opportunity Graph

Library: React Flow

Nodes: User Skills Courses Jobs Scholarships Government Finance
Insurance Singapore

Interactive zoom.

------------------------------------------------------------------------

## Future Simulator

Inputs: Salary Country Learning Startup

Outputs: Salary Savings Insurance Career Growth Opportunity Index

Use sliders.

------------------------------------------------------------------------

## AI Mentor

Personas: Career Coach Recruiter Finance Advisor Scholarship Advisor
Startup Mentor

Typing animation. Static responses.

------------------------------------------------------------------------

## Government

Cards: Skill India Startup India Mudra PM Internship SkillsFuture

Eligibility badges.

------------------------------------------------------------------------

## Finance

Emergency Fund Investments Savings Credit Loans

Charts with Recharts.

------------------------------------------------------------------------

## Insurance

Health Life Travel Professional

Recommendation cards.

------------------------------------------------------------------------

## Learning

Roadmap Courses Certificates Future Skills

------------------------------------------------------------------------

## Global Mobility

India → Singapore

Visa Skills Salary Living Cost Readiness

------------------------------------------------------------------------

# 9. Design System

Typography: Inter

Radius: xl

Spacing: 8pt grid

Buttons: Primary Secondary Ghost

Cards: Glass effect Soft shadow

Icons: Lucide

------------------------------------------------------------------------

# 10. Colors

Primary: #2563EB

Accent: #7C3AED

Success: #22C55E

Warning: #F59E0B

Error: #EF4444

Background: Slate / Zinc

------------------------------------------------------------------------

# 11. Motion

Framer Motion everywhere.

Use: Fade Scale Slide Stagger Card hover Page transition Number counting

Never abrupt changes.

------------------------------------------------------------------------

# 12. Charts

Recharts

Use: Radar Line Area Radial Progress Bar

------------------------------------------------------------------------

# 13. AI Illusion

Never instantly reveal results.

Show: Thinking... Scanning... Matching... Ranking... Predicting...

Progressive reveal.

------------------------------------------------------------------------

# 14. Opportunity Engines

Career Engine - Gemini (simulated) - Job matching

Learning Engine - Recommendation logic

Finance Engine - Salary prediction - Savings

Government Engine - Eligibility rules

Insurance Engine - Risk recommendation

Mobility Engine - Singapore readiness

------------------------------------------------------------------------

# 15. Tech Stack

Frontend - Next.js - React - Tailwind - shadcn/ui

Backend (mock) - Node patterns - Static services

AI - Gemini (mock) - Prompt engineering - Vector search (simulated)

Visualization - React Flow - Recharts

Infrastructure - Docker - Vercel

------------------------------------------------------------------------

# 16. Demo Script

1.  Open landing.
2.  Generate Passport.
3.  AI loading animation.
4.  Dashboard reveal.
5.  Open Opportunity Graph.
6.  Run Future Simulator.
7.  Ask AI Mentor.
8.  Show Government Schemes.
9.  Show Singapore Mobility.
10. End on Opportunity Passport.

------------------------------------------------------------------------

# 17. Phase-wise Build Plan

## Phase 1

Project setup Design system Routing

## Phase 2

Landing Hero Navigation

## Phase 3

AI generation experience

## Phase 4

Dashboard

## Phase 5

Passport Jobs Learning Finance

## Phase 6

Graph Simulator Mentor

## Phase 7

Animations Responsive Accessibility

## Phase 8

Demo polish Performance Presentation mode

------------------------------------------------------------------------

# 18. Acceptance Criteria

-   Premium UI
-   Smooth animations
-   No broken states
-   Mobile responsive
-   Consistent spacing
-   Apple-like experience
-   Judges understand product in under 60 seconds

------------------------------------------------------------------------

# 19. Future Roadmap

-   Real Gemini integration
-   MongoDB
-   Authentication
-   Government APIs
-   Scholarship APIs
-   Job APIs
-   Insurance APIs
-   RAG
-   Vector database
-   AI Agents
-   Multi-language
-   Mobile app

------------------------------------------------------------------------

# Final Instruction for Antigravity

Do NOT generate a CRUD application.

Generate a premium, production-quality startup demo with cinematic
interactions, polished animations, believable AI behavior, and hardcoded
data. Prioritize storytelling, UX, and visual quality over backend
functionality.
