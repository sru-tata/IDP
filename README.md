# Learning Intelligence Platform

A gamified Internal Development Platform (IDP): "Netflix for Learning" for
manufacturing teams, built on the full **Education / Experience / Exposure
(EEE)** framework — not just courses — with a real **YouTube integration**,
a full **Candidate learning experience**, and an **HR / Manager analytics
dashboard**.

## The EEE framework

Most learning platforms only cover the "E" for Education. This one covers
all three:

- **Education** — the original course catalog, all backed by real YouTube
  videos (see below).
- **Experience** — **Job Rotations**: real, time-boxed hands-on placements
  (Quality Control Floor, Automation & Robotics Cell, Plant Operations
  Shadow, Supply Chain Hub, Industry 4.0 Lab). Applying → active →
  completing a rotation awards a much bigger competency boost than a
  course, matching how real L&D frameworks weight hands-on experience.
- **Exposure** — **GEMS stretch projects** (cross-functional projects
  alongside your day job) and **external platform exposure**: Tata
  Innovista, Tata InFuse, seminars, webinars, conferences and Technology
  Day. Lighter weight than a rotation, but spreads a smaller boost across
  multiple competencies at once.

All three genuinely move the needle: `CompetencyContext.addContribution()`
is the single place skill readiness is computed from, and Education,
Experience and Exposure all call into it with different weights. This
shows up:

- **In the Skill Tree** — every role's tree now has Experience (amber,
  briefcase badge) and Exposure (pink, sparkle badge) nodes woven into the
  same prerequisite graph as courses, e.g. finish the Six Sigma course →
  do the Quality Floor rotation → unlocks Advanced Quality Systems.
- **On a dedicated `/grow` hub page** — browse and join every Job
  Rotation, GEMS project and external event independently of any one
  role's tree.
- **As an "EEE Mix" widget** — on Dashboard, Profile and the Grow page,
  showing your live Education/Experience/Exposure split.
- **On the HR side** — a Department EEE Engagement breakdown (`/hr/insights`)
  plus an AI insight flagging departments that are Education-heavy and
  Experience/Exposure-light (a real leading indicator, not just readiness
  after the fact).

## Two logins, one app

Visit `/login` and choose a role (any name/credentials sign you in — this
is a frontend demo auth layer, see below):

- **Employee (Candidate)** → the full Netflix-for-Learning + EEE
  experience: Home, Dashboard, Skill Tree, Explore, **Grow**, Profile.
- **HR / Manager** → the analytics dashboard mirroring the POC deck:
  - **Dashboard** — org-wide hero stats, Team Competency Overview, Department
    Skill Readiness (4-band legend), live Department Challenges.
  - **Employees** — searchable, department-filterable directory with a
    full readiness/streak/XP/target-role drill-down per person.
  - **Insights** — org readiness trend chart, AI-Powered Insights, and the
    Department EEE Engagement breakdown.

Auth is intentionally frontend-only for this pass (`context/AuthContext.jsx`,
persisted to `localStorage`) — the existing backend is a generic chat/RAG
template with no user directory, so real authentication against it was out
of scope. See "Backend" below for what is and isn't wired up there.

## YouTube integration

Every course (and every Education-type skill tree node) wraps a real
YouTube video ID — thumbnails, channel names, durations and view counts
all resolve from the real video (`mock/youtubeVideos.js`). "Start
Learning" opens a real embedded player; "Watch on YouTube" deep-links out.

## Backend

The FastAPI service in `/backend/DemoApp` has:

- `settings.py` — filled in with the NeuroNest sandbox credentials (Mongo:
  `IDP_Platform_DB` / `IDP_Platform_DB_Admin`; Milvus: `IDP_Platform_DB` /
  `IDP_Platform_Admin` + token; LLM key/base URL).
- `idp/` — a REST API domain (`/idp/*`) covering courses, competencies,
  career roles + skill trees, the demo user, and HR analytics, backed by
  MongoDB. `idp/seed.py` seeds those collections from `idp/seed_data/*.json`
  (ported 1:1 from the original frontend mock data, so both stay in sync).
  Run `python -m idp.seed` from `backend/DemoApp` to populate a real Mongo
  cluster once network access is available.
- The original chat/RAG template (WebSocket `/ws`, PDF → Milvus ingestion)
  is untouched and still boots exactly as documented.

**Scope note:** the `idp/` REST API and seed data currently cover courses,
competencies, skill trees, users and HR analytics — it does **not** yet
include the Job Rotation / GEMS / External Events (Experience/Exposure)
catalogs added in this pass, which are still frontend-only mock data
(`mock/jobRotations.js`, `mock/gemsProjects.js`, `mock/externalEvents.js`).
Porting those into `idp/` following the same pattern is the natural next
step. Separately, the frontend's service layer (`services/*.service.js`)
is not yet wired to call `idp/*` — it's still mock-data-driven throughout;
wiring it up (with automatic fallback to mock data if the backend is
unreachable) is the other natural next step.

Run it exactly as documented in the sandbox template:

```bash
cd backend/DemoApp
pip install -r requirements.txt
uvicorn app:app --host 0.0.0.0 --port 8001
```

## Getting started (frontend)

```bash
cd frontend
npm install
npm start        # dev server on http://localhost:3000
npm run build    # production build → frontend/build
```

## Project structure

```
frontend/src/apps/DemoApp/
├── components/       course, dashboard, gamification, navigation,
│                      profile, skillTree, hr, grow, ui
├── context/           Auth, HR, User, Learning, Competency, Grow,
│                      SkillTree, Course
├── layouts/            MainLayout (candidate), HRLayout (HR/manager)
├── mock/               Courses, YouTube video library, per-role skill
│                      trees, HR/org analytics, job rotations, GEMS
│                      projects, external events
├── pages/              Login, Home, Dashboard, SkillTree, Explore,
│                      Grow, Profile, HR/*
├── routes/              AppRoutes, ProtectedRoute (role-based guard)
├── services/            youtube, learning, role, competency, user,
│                      leaderboard, recommendation, hr
└── utils/               youtube helpers, recommendation engine,
                        search, feed builder, skill tree layout,
                        course hydration, hr bands

backend/DemoApp/
├── idp/                 courses/competencies/roles/users/HR REST API +
│                      MongoDB seed data
├── settings.py           NeuroNest sandbox credentials
└── app.py, db_manager.py, DemoApp_service.py, ...   original chat/RAG
                        template, unchanged
```
