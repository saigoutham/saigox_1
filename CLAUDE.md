# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Start dev server (Next.js 16 + Turbopack)
npm run build        # Production build
npm run start        # Serve production build
npm run lint         # ESLint (flat config, v9)
```

No test runner is configured.

## Architecture

This is a **Next.js 16 App Router** portfolio site with a gaming/RPG-themed "Three Realms" narrative structure. Single-page app with scroll-driven sections.

### Tech Stack
- **React 19** with TypeScript (strict mode)
- **Tailwind CSS v4** — theme defined inline in `app/globals.css` via `@theme inline`, no tailwind.config file
- **GSAP + Framer Motion** for scroll-triggered animations and entrance effects
- **Lenis** for smooth scrolling, synchronized with GSAP ScrollTrigger via `SmoothScrollProvider`
- **Zustand** for persisted client state (localStorage key: `realm-of-goutham`)
- **Formspree** for contact form backend

### Path Alias
`@/*` maps to the project root. Use `@/components`, `@/lib`, `@/data`, `@/store`, etc.

### Page Structure
`app/page.tsx` is the sole page — a client component that renders sections in order:
```
Hero → RealmGate(0) → ActTwoStrategist → RealmGate(1) → ActThreeVisionary → RealmGate(2) → ActOneFoundation → [Stats + Contact side-by-side] → Footer
```

Component names don't match act numbers — `ActTwoStrategist` renders as Act I, `ActThreeVisionary` as Act II, `ActOneFoundation` as Act III. This is intentional after a reorder.

### Color System
- **Accent**: Coral `#FF6B6B` (global default, also Strategist realm)
- **Purple**: `#a855f7` (Visionary realm)
- **Green**: `#10b981` (Foundation realm)
- **Amber**: `#f59e0b` (awards, legendary rarity)
- Realm colors change dynamically via `--realm-accent` CSS variable, updated by `RealmGate` on scroll

### Key Patterns

**GlassCard** (`components/ui/GlassCard.tsx`): Universal card with rarity system (`common|rare|epic|legendary`), cursor-follow glow, and 3D tilt. Used everywhere.

**ScrollReveal** (`components/animations/ScrollReveal.tsx`): Wraps content to animate in on scroll. Most section content uses this.

**RealmGate** (`components/effects/RealmGate.tsx`): Scroll-driven transition between acts. Updates `--realm-accent` CSS variables when 50% scrolled, which changes accent colors site-wide.

**Zustand Store** (`store/useRealmStore.ts`): Persists preloader state, easter egg discoveries, sound toggle, visit count. Has version-based migration for localStorage schema changes.

### Data Files
All portfolio content lives in `data/` as typed constants:
- `missions.ts` — 5 case studies with approach, results, learnings, tags
- `skills.ts` — skill branches with nodes and metrics
- `stats.ts` — character stats with letter grades (S/A/B/C)
- `awards.ts` — 8 achievement badges
- `photos.ts` — 14 wildlife/macro photos (images in `public/images/photos/`)
- `realms.ts` — 3 realm definitions with accent colors

### Environment Variables
```
NEXT_PUBLIC_FORMSPREE_ENDPOINT  # Contact form endpoint
NEXT_PUBLIC_SITE_URL            # Canonical URL for SEO
```

### Deployment
Configured for Netlify (`netlify.toml`) and Vercel. Resume PDF served from `public/resume.pdf`.
