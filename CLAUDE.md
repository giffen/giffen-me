# giffen.me

Astro static site. Professional site for Andrew Giffen.

## Site Purpose

giffen.me positions Andrew for forward-deployed product roles: senior forward-deployed PM at AI companies, or a player-coach head of forward deployed / solutions at a vertical AI company. Regulated industries (compliance, legal, insurance, health) are his edge. He's in Toronto and wants remote. (Repositioned 2026-10-30; the earlier CTPO/CPO EU/UK pitch is retired.)

The pitch in one line: **he takes AI from pilot to production inside regulated enterprises, and he builds a lot of it himself.**

The audience: hiring managers and recruiters at AI companies deploying into enterprises, and founders of vertical AI companies.

Every content decision should pass this test:

> "Does this show Andrew can get AI into production inside a demanding enterprise customer - and build it himself - or is it a hobby with no outcome?"

## Content rules

### Always
- Lead with what changed, not what was built. Outcome first; the stack (if mentioned at all) comes last.
- Use operational scale numbers: 74K calls, 2.5M sentences, 500+ screening questions, # of PMs in org.
- Show hands-on building as evidence. Personal builds belong on the homepage only when they're shipped or in TestFlight, described by what they do, and linked to their write-up on giffenlabs.ca.
- Position the interim CTO stint and the early customer-facing roles (partner enablement, business relations) as forward-deployed experience.
- Direct, confident voice. No hedging. No "passionate about," "leveraged," "synergy," "robust."

### Never
- Use specific revenue or ARR numbers ($70M, $35M, NRR%, NPS). Operational scale only.
- Name the current employer (Enhesa). Use "global compliance SaaS company."
- Say he's "actively exploring" or looking for roles. Describe the work he wants more of instead; he's 6-12 months from a search and has a new internal role.
- Use advisory or consulting CTA language ("let's build something together").
- Lead a project description with the tech stack.
- Mention "the CAIO asked me to take Anthropic's course" anywhere - it reads as flex.

## Titles

- Until 2026-12-31: Director of Product Management (hero says "Director of Product"; footer "Current Role").
- From 2027-01-01: Director, Forward Deployed Solutions and Incubation (an IC role). Update the hero, About and footer then, not before.

## Voice
- First person where it sounds human. Skip "I'm a product leader who…" framing - it's implied by the site.
- Write like someone who doesn't need to prove they belong in the room.
- Regular dashes (`-`), not em dashes.
- Don't name other people unless explicitly okayed.

## Two-site architecture

**giffen.me** - professional
- Selected work (production AI, enterprise rollouts, outcomes)
- Writing (enterprise AI, product strategy, how he builds with AI)
- Builds: a short homepage section linking to shipped personal products on giffenlabs.ca
- About (career narrative, the work he wants more of)

**giffenlabs.ca** - the builder's field guide (separate repo: giffen-labs)
- Full write-ups of personal builds (specimens) and the build journal
- Personal essays ("The Puzzle That Never Ends")

**Routing decision:** if it shows he can deploy AI into enterprises or build it himself → giffen.me (or a homepage link to giffenlabs). If it's a personal essay or a deep build log → giffenlabs.ca.

Old giffen.me URLs for posts that moved to giffenlabs.ca redirect there via `vercel.json`.

## Currently on this site

### Featured on homepage
- Work: EHS Applicability Engine, PM Insights, NextGen Platform Migration
- Writing: AI Features that Earn Trust, Integration Complexity, How I Ship Products in 1-Hour Chunks, The Pressure Test
- Builds: Brown Note, Throughline, Automatic Pocket (links to giffenlabs.ca specimens)

### On /work only
- enforcement-actions-scraper, privacy-proxy, throughline

### On /writing only
- everything else in `src/content/writing/`

## Structure

- Routes: `/`, `/work`, `/work/[slug]`, `/writing`, `/writing/[slug]`, `/about`, `/contact`
- Content collections in `src/content/`: `work/`, `writing/`
- Static assets: `public/images/work/`, `public/images/writing/`, `public/work/` (embedded demos)
- Theming: light/dark via `data-theme` on `<html>`, toggle in header, system-pref aware. Vars in `src/styles/global.css`.

## Workflow notes

- Vercel auto-deploys on push to `main`. Stage changes on a feature branch (`redesign`); don't push until ready.
- No MDX — plain markdown only. HTML allowed inline.
- `andrew@giffen.me` is the email. Never `andy@`.
