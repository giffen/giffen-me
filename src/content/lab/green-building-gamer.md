---
title: "Green Building Gamer"
description: "A gamified certification prep app for Gulf region green building professionals - LEED, Mostadam, and the first serious tooling for regional standards"
date: "2026-04-14"
status: "complete"
tags: ["game", "education", "gamification", "next.js", "supabase", "claude-code", "leed", "mostadam", "certification-prep", "collaboration"]
image: "/images/lab/gbg-poster.png"
featuredImage: "/images/lab/gbg-feature.png"
liveUrl: "https://green-building-gamer.vercel.app"
published: true
---

## The Collaboration

This one isn't mine. DNICHE Partners brought me the idea, the pitch deck, the design direction, the domain expertise, and the four SMEs to validate content. I built it with them. The founders know the Gulf region green building market cold - which certifications matter, which firms would pay, what the content has to look like. My job was to turn their vision into shipped software.

I'm writing this up as a lab post because I think it's a good case study in a model that's increasingly workable in 2026: domain experts with a strong idea and a design system, paired with an AI-accelerated builder, shipping in days instead of quarters. DNICHE didn't need a development agency. They didn't need to hire a full-time engineer. They needed someone who could take their brief and ship it, and the tooling is finally good enough that one person can do that on evenings and weekends.

If you're reading this and you're in a similar position - a non-technical founder with a clear vision and no patience for a six-month build cycle - this is the shape of collaboration I'd recommend trying.

## The Problem

Green building certification prep in the Gulf region is a mess. LEED has decent global tooling - flashcards, webinars, prep courses. But Mostadam (Saudi Arabia), GSAS (Qatar), and Estidama (Abu Dhabi) have almost nothing. Architects and engineers chasing those credentials study from 260-page PDFs. That's the whole study plan. Read the PDF. Hope it sticks.

By 2026 Saudi Arabia alone is projected to need thousands of certified sustainability professionals. The Mostadam rating system was published in 2019. The study tooling gap between supply and demand is just open air. DNICHE spotted this gap, knew the buyers, and had a clear pitch: a 60-second pop-quiz app for green-building engineers, mobile-first, gamified, bilingual.

Green Building Gamer is the execution of that pitch. Three game modes, 200+ questions, bilingual English and Arabic, leaderboards, PDF activity reports for continuing education hours, and an aesthetic that doesn't treat professionals like kindergarteners.

## The Concept

The founders handed me a pitch deck that called it a "60-second pop-quiz app for green-building engineers." That framing survived into the final product but the details changed a lot.

The core loop is three game modes sharing one question bank:

1. **Practice Quiz** - pick a standard, category, and difficulty. Answer 10/20/40 multiple-choice questions with explanations. This is the study-session mode.
2. **AI Duel** - 60-second head-to-head against a simulated opponent. Player vs Player was on the wishlist but a real-time matchmaker is 1-2 weeks of fragile infrastructure. A probabilistic AI opponent with three difficulty tiers (plus a Grandmaster tier that filters to hard-only questions) delivers 80% of the feel for a half-day of work.
3. **Lightning Round** - 60 seconds of True/False swipes. Arcade mode. Speed bonus for fast answers, streak multipliers, no penalty for wrong. Feels nothing like studying.

On top of the game modes sits the stuff that makes this sellable to firms: team leaderboards scoped by organization, grandmaster defeat badges, a Trophy Case on the profile page, CEU activity reports that export as branded PDFs for LEED AP credential renewal logging. The PDF feature alone is the sleeper hit - LEED AP holders need 30 continuing education hours every two years and nobody enjoys assembling that paperwork manually.

## Design Philosophy

There's a visual stereotype green-tech apps fall into. Mint greens, cartoonish earth icons, happy trees, Comic Sans vibes in the headings. It looks like a children's museum exhibit about recycling.

The founders wanted the opposite. They sent over a design brief from Google Stitch called **Architectural Vanguard** and it reframed the whole project. The brief rejected every green-tech cliche and pointed instead at Masdar City - the futuristic Abu Dhabi sustainability development that treats sustainability as a high-stakes engineering discipline, not a Pinterest board.

The design tokens that came with it:

- **Deep authoritative navy** (#002f4a) as the primary color, not the usual electric green
- **Space Grotesk** for display and headlines, tight letter spacing, big editorial scale
- **Inter** for body text, with IBM Plex Arabic for the RTL flip
- **No 1px borders anywhere** - section boundaries are defined by tonal surface shifts (background color changes), not lines
- **Structural gradient** CTAs that subtly transition from primary to primary-container
- **Architectural line-art accents** - subtle SVG paths mimicking blueprint grids or solar panel schematics, placed asymmetrically in card corners at 10% opacity
- **Glassmorphism** for the header and bottom nav - `backdrop-filter: blur(24px)` over a semi-transparent surface

It's not playful. It's not friendly. It's serious and precise and premium. Which is exactly what a compliance officer at a Gulf consulting firm wants their tools to look like.

## What We Built

The MVP shipped in a single overnight build session. The two follow-on releases (A and B) each shipped the same evening they were planned. Here's the full feature surface:

**Study modes:**
- Practice quiz with per-standard, per-category, per-difficulty filters
- AI Duel with 4 difficulty tiers (Easy / Medium / Hard / Grandmaster)
- Lightning Round with swipe gestures and keyboard shortcuts

**Content:**
- 142 reviewed MCQ questions across LEED v4.1 BD+C and Mostadam D+C
- 87 hand-authored True/False statements for Lightning Round
- Full bilingual EN/AR with RTL layout support
- SME admin backend for question review, editing, flagging, bulk approval
- JSON import pipeline for adding new questions

**Engagement features:**
- Daily streak tracking with best-streak record
- Three grandmaster badges (Defeated, Hot Streak, Flawless Victory) with full-screen celebration overlays
- Trophy Case on the profile page
- Main and Lightning leaderboards scoped by Global / Firm / Team with 7d / 30d / All Time periods

**Organizational features:**
- Organizations and teams with admin-managed membership
- Firm-branded PDF activity reports (logo uploaded via admin panel, rendered in the PDF header next to the GBG wordmark)
- Per-user opt-out for leaderboard visibility
- Per-user display name (pseudonym support)

**CEU reporting:**
- PDF activity report generator with date range picker
- 2-minute session floor, 30-minute per-session cap (prevents gaming the hours)
- Per-standard breakdown
- Legal disclaimer footer (GBG is not an accredited CE provider - logs self-directed study time only)

**Infrastructure:**
- Full auth via Supabase with email/password and password reset
- Role-based admin panel
- Row-level security on every table
- SECURITY DEFINER RPCs for cross-user reads (leaderboard) that expose only safe display columns
- 68 integration tests covering scoring, AI opponent probabilities, session flows, and badge logic

## Key Challenges

**Writing a believable AI opponent.** The duel mode has a simulated AI that fires back answers with configurable difficulty. Each tier has a target correct-answer probability and an average response time, with gaussian-distributed variance. The tricky part was tuning the difficulty penalty - when the player gets a very_hard question, the AI's effective accuracy drops by 15 percentage points. Without that penalty, Hard AI just trounces the player on hard questions, which feels unfair. With too much penalty, it feels patronizing. The Grandmaster tier ships at 0.95 base with existing penalties, landing at ~0.87 on hard and ~0.80 on very_hard questions. Wins feel earned. Losses feel fair.

**Excluding Lightning from the main leaderboard.** Lightning Round has no fixed deck - you play cards until the timer runs out. That's ~30 answers in 60 seconds at typical human speed. Duel mode is 10 fixed questions. At equal skill, Lightning players generate 3-5x the scorable events. If we'd rolled Lightning into the main leaderboard, Lightning players would dominate every ranking on day one. Fix: parameterize the `get_leaderboard` RPC with a `game_mode` argument. Default to `'main'` (practice + duel only), accept `'lightning'` explicitly. The frontend toggles between modes. Same RPC, same tables, separate rankings. One-line flip when we're ready to merge them.

**The duel completion route that didn't exist.** When I planned Release A I ran the whole thing past a Plan agent for pressure-testing. It caught a latent bug I'd missed: duels never called a completion endpoint. `completed_at` was always null. That didn't matter for the quiz flow (which does call complete) but it blocked three downstream features - CEU hours filtering (requires completed_at), leaderboard aggregation (requires completed_at), and the Grandmaster Defeated badge trigger. Building `/api/duel/complete` moved from "someday polish" to "must ship before anything else in Release A." Without that review, we'd have shipped half the release broken.

**PDF generation on Vercel serverless.** `@react-pdf/renderer` works well on Node runtime but Edge runtime breaks it - `import path from "path"` doesn't exist on Edge. Solution: `export const runtime = 'nodejs'` on the generate route, and register fonts from `public/fonts/` at module load. Inter and Space Grotesk TTFs ship with the app so the PDFs match the web design exactly. Arabic PDFs were deferred - `@react-pdf/renderer` doesn't reliably handle RTL shaping and getting it right would add a full day. English-only PDFs in v1, Arabic in v1.1.

**Timer bugs in Lightning Round.** The first version of the Lightning timer had the queue length in its useEffect dep array, so every swipe recreated the interval, which reset the 1000ms tick clock. If you swiped faster than a second per card, the timer literally never ticked down. Fix: a `gameStarted` boolean that flips to true when the first batch loads, and the timer effect depends on `[gameStarted, isFinished]` only. The timer starts once and runs independently of queue churn. Always check your dep arrays.

## Tech Stack

- **Frontend:** Next.js 16 (App Router), TypeScript, Tailwind CSS v4, shadcn/ui primitives
- **Auth + DB:** Supabase (Postgres + Row Level Security) via `@supabase/ssr`
- **i18n:** `next-intl` with EN/AR locale files and RTL layout via CSS logical properties (`ps-*`, `me-*`, `text-start`)
- **Fonts:** Space Grotesk (display), Inter (body), Noto Sans Arabic (Arabic), all via `next/font/google`
- **PDF:** `@react-pdf/renderer` forced to Node runtime
- **Content pipeline:** Claude (me) generated the MCQ and T/F question banks from the LEED and Mostadam source PDFs, then seeded them via service-role scripts
- **Design tool:** Google Stitch for the Architectural Vanguard style system and screen mocks
- **Hosting:** Vercel with GitHub auto-deploy
- **Build tool:** Claude Code for the whole implementation, with pressure-testing Plan agents catching load-bearing issues before each release

## Current Status

Live in pilot at **[green-building-gamer.vercel.app](https://green-building-gamer.vercel.app)** with five users from DNICHE Partners - four SMEs reviewing content and one product lead driving. The question bank is being reviewed and tightened in the admin panel. First external pilot group (a Gulf consulting firm with 3-4 LEED AP candidates) kicks off shortly.

The next release is on hold pending real-world pilot feedback. The backlog has daily email reminders, self-serve org signup via invite links, additional grandmaster badges, and a fresh batch of T/F questions written to be harder than the first 87. If the pilot hits engagement targets, GSAS and Estidama content (Qatar and UAE regional standards) is the biggest content lift planned for the year.
