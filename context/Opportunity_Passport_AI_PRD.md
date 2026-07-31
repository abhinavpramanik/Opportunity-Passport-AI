# Opportunity Passport AI --- Product Requirements Document (PRD)

## Vision

**One Intelligent Passport. Unlimited Opportunities.**

Opportunity Passport AI is an AI-powered Personal Opportunity
Intelligence Platform that transforms a traditional resume into a living
digital passport. Instead of only helping users find jobs, it
continuously discovers careers, scholarships, government schemes,
financial guidance, insurance, learning pathways, mentors, startup
grants, and global mobility opportunities.

## Hackathon Strategy

This MVP is **demo-first**.

-   No database
-   No authentication backend
-   No external APIs required
-   All data hardcoded in `/data`
-   Focus on premium UX, storytelling, animations, and believable AI

The goal is to make judges feel like they are seeing a production-ready
startup.

------------------------------------------------------------------------

# Target Users

-   Students
-   Fresh Graduates
-   Working Professionals
-   Career Switchers
-   Gig Workers
-   Entrepreneurs

------------------------------------------------------------------------

# Tech Stack

## Frontend

-   Next.js (App Router)
-   TypeScript
-   Tailwind CSS
-   shadcn/ui
-   Framer Motion

## Visualization

-   React Flow (Opportunity Graph)
-   Recharts

## Icons

-   Lucide React

## AI (Demo)

-   Hardcoded AI responses
-   Simulated Gemini outputs
-   Prompt-driven static content

## Data

All data stored as static TypeScript files.

    /data
      user.ts
      passport.ts
      jobs.ts
      scholarships.ts
      schemes.ts
      insurance.ts
      finance.ts
      timeline.ts
      mentor.ts
      alerts.ts

------------------------------------------------------------------------

# Product Flow

Landing Page → Generate Passport → AI Generation Sequence → Opportunity
Passport Dashboard → Explore Modules → Future Simulator → AI Mentor →
Opportunity Graph

------------------------------------------------------------------------

# Core Features

## 1. Landing Page

-   Hero section
-   Animated globe/passport
-   CTA: Generate Opportunity Passport
-   Tagline: "One Intelligent Passport. Unlimited Opportunities."

## 2. AI Generation Sequence

Animated progress:

-   Uploading Profile
-   Extracting Skills
-   Building AI Profile
-   Matching Jobs
-   Checking Scholarships
-   Finding Government Schemes
-   Calculating Financial Readiness
-   Generating Opportunity Passport

Duration: \~15 seconds with smooth transitions.

## 3. Opportunity Passport Dashboard

Display cards: - Employability Score - Learning Score - Financial
Readiness - Insurance Readiness - Global Mobility Score - Government
Eligibility Count

Include: - Opportunity Summary - AI Insights - Quick Actions -
Notifications

## 4. Opportunity Discovery

Hardcoded personalized: - Jobs - Internships - Scholarships - Government
Schemes - Startup Grants - Mentors - Learning Paths

## 5. Opportunity Graph

Interactive React Flow graph.

User → Skills → Certifications → Jobs → Scholarships → Finance → Global
Mobility → Startup

Graph expands visually.

## 6. Future Simulator

Interactive sliders: - Learn AI - Move to Singapore - Higher Studies -
Startup

Outputs: - Salary - Savings - Career Growth - Insurance Need - Global
Mobility

## 7. AI Mentor

Chat interface with predefined conversations.

Personas: - Career Coach - Recruiter - Financial Advisor - Scholarship
Advisor - Startup Mentor

## 8. Government Benefits

Eligibility cards: - Skill India - Startup India - PM Internship - Mudra
Loan - AICTE Scholarship - SkillsFuture (Singapore)

## 9. Finance & Insurance

Cards for: - Savings Plan - Emergency Fund - Insurance Recommendation -
Investment Suggestions

## 10. Global Mobility

India → Singapore page: - Eligibility - Missing Skills - Expected
Salary - Visa Readiness - Recommended Certifications

## 11. Opportunity Timeline

Animated career timeline from graduation to global career.

## 12. Notifications

Apple-style notification center: - New scholarship - Job
recommendation - Certification reminder - Scheme eligibility

------------------------------------------------------------------------

# UI / UX Principles

-   Apple-inspired minimal UI
-   Premium spacing
-   Soft gradients
-   Glassmorphism where appropriate
-   Dark mode
-   Micro animations everywhere
-   No clutter
-   Mobile responsive

------------------------------------------------------------------------

# Navigation

-   Dashboard
-   Passport
-   Opportunities
-   Graph
-   AI Mentor
-   Future Simulator
-   Finance
-   Government
-   Mobility
-   Settings

------------------------------------------------------------------------

# Demo Data

Create one default user:

Name: Alex Sharma Age: 22 Degree: B.Tech CSE Skills: React, Next.js,
Node.js, Python, AI Goal: Software Engineer in Singapore

All recommendations should be tailored to this user.

------------------------------------------------------------------------

# Fake AI Behaviour

Never expose static data directly.

Always simulate: - AI thinking - Loading states - Typing animation -
Progressive reveal - AI insight cards

------------------------------------------------------------------------

# Success Criteria

The MVP should feel like: - Apple Wallet - LinkedIn - ChatGPT - Spotify
Wrapped combined into one seamless experience.

------------------------------------------------------------------------

# Phase-wise Implementation

## Phase 1 --- Project Foundation

-   Initialize Next.js
-   Configure Tailwind & shadcn/ui
-   Create layout, theme, navigation
-   Add static data layer

## Phase 2 --- Landing Experience

-   Hero section
-   Product branding
-   Animated CTA
-   Passport generation entry

## Phase 3 --- AI Generation

-   Multi-step loading animation
-   Fake AI processing
-   Transition into dashboard

## Phase 4 --- Dashboard

-   Passport cards
-   Scores
-   AI insights
-   Opportunity summary
-   Notifications

## Phase 5 --- Opportunity Modules

-   Jobs
-   Scholarships
-   Government
-   Finance
-   Insurance
-   Learning
-   Mentorship

## Phase 6 --- Interactive Features

-   Opportunity Graph
-   Future Simulator
-   AI Mentor
-   Timeline

## Phase 7 --- Polish

-   Framer Motion animations
-   Responsive design
-   Empty states
-   Hover interactions
-   Skeleton loaders

## Phase 8 --- Demo Optimization

-   Smooth navigation
-   Remove unfinished elements
-   Optimize transitions
-   Ensure every interaction feels premium

------------------------------------------------------------------------

# Non-Goals

-   No backend
-   No authentication server
-   No database
-   No API integrations
-   No payment system
-   No CRUD

Everything should be hardcoded for demonstration while maintaining
production-quality UX.
