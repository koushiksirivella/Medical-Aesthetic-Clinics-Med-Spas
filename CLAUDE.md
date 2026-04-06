# CLAUDE.md — Medical Aesthetic Clinic (Next.js)

## Project Identity
- **Project:** Koushik AI Automation — Medical Aesthetic Clinics / Med Spas
- **Stack:** Next.js 16 + React 19 + TypeScript + Tailwind v4 + shadcn/ui
- **Dev server:** `npm run dev` → http://localhost:3000
- **GitHub:** https://github.com/koushiksirivella/Medical-Aesthetic-Clinics-Med-Spas
- **Username:** koushiksirivella
- **Email:** koushiksirivella@gmail.com
- **Branch:** `main`

## Brand Tokens
- Primary bg: `#111111` | Cream: `#F8F6F3` | Gold: `#C6A75E` | Gold hover: `#A88A45`
- Fonts: Playfair Display (headings) + Inter (body) — loaded in `app/layout.tsx`
- CSS helpers: `.luxury-bg`, `.grain-overlay`, `.gold-glow`, `.card-lift`, `.gold-rule`

## Key Files
- `app/page.tsx` — Main landing page
- `app/layout.tsx` — Root layout with fonts
- `app/globals.css` — All brand tokens and utility classes
- `app/demo/page.tsx` — Pre-qualification application form (9 fields)
- `app/demo/calendar/page.tsx` — Calendly booking embed
- `app/demo/confirmation/page.tsx` — Post-booking confirmation
- `app/demo/sign-in/page.tsx` — Sign-in flow (WebGL dot matrix effect)
- `components/ui/` — 37+ shadcn/custom components
- `lib/utils.ts` — `cn()` utility for className merging

## Pages
- `/` — Main landing page
- `/demo` — Pre-qualification form (rejects 0–20 leads/month)
- `/demo/calendar` — Calendly embed (awaiting real URL from user)
- `/demo/confirmation` — Post-booking with prep checklist
- `/demo/sign-in` — Sign-in flow with canvas reveal effect

## Brand Assets (in workspace "Brand Assets" folder)
- `kkk3.json` — Full brand & positioning spec
- `Koushik_AI_Automation_Private_Demo_Booking_Funnel.json` — Funnel spec
- `Koushik_AI_Automation_Claude_Code_Landing_Page.json` — Landing page design spec
- `Koushik_AI_Automation_Claude_Code_72H_Deployment.json` — Deployment checklist

## Deploy
- DO NOT push `/demo` funnel pages to GitHub until user explicitly says to
- Last pushed: initial landing page (33 files)

## Rules
- Use `cn()` from `@/lib/utils` for className merging
- Follow shadcn/ui patterns for new components
- All new components go in `components/ui/`
- Do not use default Tailwind blue/indigo — use gold brand palette
- Do not use `transition-all`
- Pair Playfair Display (headings) with Inter (body) — never same font for both
- Mobile-first responsive
