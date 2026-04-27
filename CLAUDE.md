# giffen.me

Astro static site. Executive-positioning site for Andrew Giffen.

## Site Purpose

giffen.me is an executive-positioning site for a CTPO/CPO candidate targeting Series A/B vertical AI companies in RegTech, LegalTech, and compliance SaaS — with EU/UK focus.

The audience: founders, executive recruiters, and VC-backed hiring managers evaluating whether Andrew is the person who can run their product and technology organization.

Every content and design decision should pass this test:

> "Does this make Andrew look like someone who owns revenue and makes hard calls at organizational scale — or does it make him look like a hobbyist?"

If it looks like a hobbyist: remove it, reframe it, or move it to giffenlabs.ca.

## Content rules

### Always
- Lead with what changed, not what was built. Business outcome first; the stack (if mentioned at all) comes last.
- Use operational scale numbers: 74K calls, 2.5M sentences, 500+ screening questions, # of PMs in org, decade-long horizons.
- Position the CTO stint as a proof point of capability across product + technology, not a detour.
- Direct, confident voice. No hedging. No "passionate about," "leveraged," "synergy," "robust."

### Never
- Use the words "experiments" or "lab" anywhere on the site (navigation, copy, project labels).
- Use specific revenue or ARR numbers ($70M, $35M, NRR%, NPS). Operational scale only.
- Name the current employer (Enhesa). Use "global compliance SaaS company."
- Feature projects with no business outcome or organizational impact.
- Feature failed, stuck, or unfinished projects on the homepage.
- Use advisory or consulting CTA language ("let's build something together").
- Lead a project description with the tech stack.
- Mention "the CAIO asked me to take Anthropic's course" anywhere — it reads as flex.

## Voice
- First person where it sounds human. Skip "I'm a product leader who…" framing — it's implied by the site.
- Write like someone who doesn't need to prove they belong in the room.
- Regular dashes (`-`), not em dashes.
- Don't name other people unless explicitly okayed.

## Two-site architecture

**giffen.me** — executive positioning
- Selected work (production AI, enterprise scale, business outcomes)
- Writing (thought leadership, AI strategy, org-level frameworks, industry POVs)
- About (career narrative, what's next)
- No personal projects, no tutorials, no failed experiments

**giffenlabs.ca** — everything else (separate site, not yet built)
- Personal builds (Brown Note, Throughline, Audit Quest, etc.)
- Tutorials ("Your First 10 Minutes With Claude Code", "How I ship products in 1-hour chunks")
- Personal essays ("The Puzzle That Never Ends", "Less Time More Done")
- Stuck projects ("Love Will Tear Us Apart")

**Routing decision:** if it would impress a Series-A founder hiring a CTPO → giffen.me. If it would interest a fellow builder but not a hiring exec → giffenlabs.ca.

## Currently on this site

### Featured on homepage
- Work: NextGen Platform Migration, PM Insights, EHS Applicability Engine
- Writing: What's Your New Shape? (PM competency model), Competitive Intelligence System on WhatsApp, The Pressure Test

### On /work only
- enforcement-actions-scraper, privacy-proxy, green-building-gamer

### On /writing only
- agents-are-untrusted-processes, the-privacy-proxy-pattern, building-an-app-then-vs-now, the-dimension-spotify-cant-measure, when-two-prototypes-collide, ai-features-that-earn-trust, ai-kills-the-crud-app, beyond-agile, experimentation-advantage, how-much-can-we-automate, integration-complexity, nextgen-migration, response-to-tosd, the-bifurcation, the-comet-problem, the-new-team

## Structure

- Routes: `/`, `/work`, `/work/[slug]`, `/writing`, `/writing/[slug]`, `/about`, `/contact`
- Content collections in `src/content/`: `work/`, `writing/`
- Static assets: `public/images/work/`, `public/images/writing/`, `public/work/` (embedded demos)
- Theming: light/dark via `data-theme` on `<html>`, toggle in header, system-pref aware. Vars in `src/styles/global.css`.

## Workflow notes

- Vercel auto-deploys on push to `main`. Stage changes on a feature branch (`redesign`); don't push until ready.
- No MDX — plain markdown only. HTML allowed inline.
- `andrew@giffen.me` is the email. Never `andy@`.
