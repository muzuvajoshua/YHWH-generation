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

## Pages

- **/** — Dashboard home with KPIs, charts, and activity feed
- **/analytics** — Revenue trends, regional breakdown, marketing channels
- **/workspace** — AI chat interface for generating custom dashboards
- **/reports** — Pre-built reports with team productivity and tasks
- **/settings** — Configuration (profile, API key, appearance)

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
├── app/              # Next.js App Router pages
│   ├── api/          # AI route handlers
│   ├── analytics/    # Analytics page
│   ├── workspace/    # AI chat workspace
│   ├── reports/      # Reports page
│   └── settings/     # Settings page
├── components/
│   ├── blocks/       # Dashboard block components
│   ├── genui/        # Generative UI (renderer, grid, chat)
│   ├── shell/        # App shell (sidebar, topbar, cmd palette)
│   └── ui/           # Primitive UI components
├── lib/
│   ├── ai/           # AI orchestration layer
│   └── data/         # Mock datasets
└── types/            # TypeScript types & Zod schemas
```
