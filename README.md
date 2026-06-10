# AI Dashboard OS

An AI-native dashboard operating system built with Next.js 16, React 19, and the Vercel AI SDK. Users can talk naturally to the UI to generate dashboards, charts, reports, and analytics in real-time.

## Architecture

### Server-First Frontend
- **Server Components** for all static content (KPI cards, insights, activity feeds, comparisons)
- **Client Islands** only where interactivity is required (charts, chat, sidebar, command palette)
- Minimal JavaScript shipped to the browser

### AI-Native Design
- **Zod-constrained structured output** — AI generates validated `DashboardLayout` objects
- **Block registry architecture** — AI composes pre-approved UI blocks, never arbitrary HTML
- **Generative UI** — natural language → structured layout → rendered dashboard
- **Fallback system** — works without API key using intelligent pattern-matched mock data

### Block Types
`kpi-card` · `line-chart` · `bar-chart` · `pie-chart` · `area-chart` · `table` · `insight-panel` · `activity-feed` · `comparison-card` · `metrics-widget` · `notes-panel` · `alert-panel`

## Design System — "Lattice"

A unified visual language inspired by Linear, Vercel and modern analytics tooling.

- **Surfaces:** three semantic tiers (`surface-1` / `surface-2` / `surface-overlay`) declared as CSS custom properties in `globals.css`.
- **Borders:** subtle / default / strong opacity tokens; no ad-hoc opacity values in components.
- **Type scale:** Inter for prose and Inter Display for headings; JetBrains Mono for all numeric values (KPIs, table cells, axis ticks).
- **Radii:** 6 / 8 / 12 / 16 — small / default / card / modal.
- **Motion:** 150 / 220 / 320 ms paired with `cubic-bezier(0.16, 1, 0.3, 1)`.
- **Accent:** a single violet accent; no gradient buttons.
- **Layout helpers:** `<PageHeader />`, `<SectionHeader />`, `<Container />`, `<StatValue />`, `<StatTrend />` enforce consistency across pages.
- **Responsive shell:** the sidebar collapses on desktop and becomes a swipe-friendly drawer on mobile; the top bar exposes a `⌘K` palette and notification controls.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router, Turbopack) |
| UI | React 19, Tailwind CSS v4, Radix UI |
| AI | Vercel AI SDK, Anthropic Claude Sonnet |
| Charts | Recharts |
| Tables | TanStack Table |
| Animation | Framer Motion |
| Validation | Zod |
| Icons | Lucide React |

## Getting Started

```bash
# Install dependencies
npm install

# Set up environment (optional - works without API key)
# Add your ANTHROPIC_API_KEY to .env.local for live AI generation

# Development
npm run dev

# Production build
npm run build && npm start
```

## Routes

Marketing surface (public):
- **/** — Cinematic landing: hero, feature bento, product preview, pricing, testimonials, CTA
- **/signin** — Split-screen sign-in (Server Action + zod-validated form state)
- **/signup** — Split-screen sign-up

App surface (gated, `/app/*`):
- **/app** — Dashboard home with KPIs, charts, and activity feed
- **/app/analytics** — Revenue trends, regional breakdown, marketing channels
- **/app/workspace** — AI chat interface for generating custom dashboards
- **/app/reports** — Pre-built reports with team productivity and tasks
- **/app/settings** — Configuration (profile, API key, appearance, sign-out)

Routes are split by route group: `(app)/layout.tsx` requires a session and
mounts the dashboard shell. Marketing routes live at the top level with their
own nav and footer. A mock session cookie (`src/lib/auth/session.ts`) gates
the `(app)` group; swap it for your real provider without touching the UI.

## AI System

The AI workspace accepts natural language requests like:
- "Show me quarterly revenue performance"
- "Create a marketing KPI dashboard"
- "Compare team productivity"
- "Analyze customer churn"

The system:
1. Processes the natural language request
2. Generates a structured `DashboardLayout` via `generateObject` with Zod schema
3. Validates the output against type-safe schemas
4. Dynamically assembles UI blocks from the registry
5. Renders the complete dashboard with animations

## Deployment

Optimized for Vercel:
```bash
vercel
```

Set `ANTHROPIC_API_KEY` in your Vercel environment variables for live AI.

## Project Structure

```
src/
├── app/
│   ├── layout.tsx           # Root <html><body>, fonts
│   ├── template.tsx         # Pass-through (route-group layouts own chrome)
│   ├── globals.css          # Lattice tokens + marketing motion + aurora/grid
│   ├── page.tsx             # Marketing landing
│   ├── signin/page.tsx      # Auth: sign in
│   ├── signup/page.tsx      # Auth: sign up
│   ├── api/
│   │   ├── chat/route.ts    # zod-validated, { ok, data } envelope
│   │   └── generate/route.ts
│   └── (app)/               # Gated dashboard route group
│       ├── layout.tsx       # requireSession() → mount AppShell
│       └── app/
│           ├── page.tsx
│           ├── analytics/
│           ├── workspace/
│           ├── reports/
│           └── settings/
├── components/
│   ├── blocks/              # 12 typed, registry-rendered dashboard blocks
│   ├── genui/               # Streaming chat, grid, renderer, skeleton
│   ├── shell/               # AppShell, Sidebar, TopBar, CommandPalette
│   ├── marketing/           # Hero, FeaturesBento, ProductPreview, Pricing…
│   ├── auth/                # AuthShell + Sign-in / Sign-up forms
│   ├── motion/              # Reveal, StaggerGroup, Magnetic, Parallax
│   ├── settings/            # SettingsForm (client island)
│   └── ui/                  # Primitives (Card, Button, Dialog, …)
├── lib/
│   ├── ai/                  # Anthropic via generateObject + zod schema
│   ├── api/                 # JSON envelope helpers (ok/fail/parseJson)
│   ├── auth/                # session.ts (server-only), types.ts, actions.ts
│   ├── data/                # Mock datasets
│   └── utils.ts
└── types/                   # Block schemas & DashboardLayout (zod)
```

### Design system — motion grammar

`globals.css` defines the Lattice tokens *and* the motion grammar:
`aurora`, `spotlight`, `grid-pattern`, `text-gradient[-violet]`,
`marquee`, `caret`, `float-soft`, `reveal`, `stagger-item`. The
`reduced-motion` media query disables every one — accessibility first.

`components/motion/` provides three primitives composed everywhere:
- `<Reveal>` — IntersectionObserver-driven fade-up, SSR-safe.
- `<StaggerGroup>` — annotates children with a `--stagger-i` index for cascading reveals.
- `<Magnetic>` — pointer-only cursor attraction. No-ops on touch + reduced-motion.
