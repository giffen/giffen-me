---
title: "How I Ship Products in 1-Hour Chunks with Claude Code"
description: "A PM's workflow for building real software with AI — PRDs, phased plans, and evening sessions that actually work when you have limited time."
date: "2026-02-14"
tag: "Workflow"
excerpt: "I'm a product manager with a baby. I get maybe an hour or two at night to code. Here's the workflow I've developed with Claude that lets me make consistent progress on real projects without losing my place — and why persistent context files are the key to the whole thing."
---

I'm a product manager with a baby. My coding window is roughly 9 PM to 11 PM, after the bottle and before I collapse. That's it. Maybe an hour, maybe two, a few nights a week.

In that time, I recently shipped [Brown Note](/writing/building-brown-note) — a full-stack Django web app, a 26-endpoint REST API with 146 tests, and a cross-platform React Native mobile app with push notifications, social auth, and a sticker economy. From first commit to App Store submission in about three weeks.

I'm not saying that to brag. I'm saying it because the workflow matters more than the tools, and I think the workflow I've landed on is worth sharing.

## The Problem with AI Coding

Most people use AI coding tools one of two ways: they either paste code into a chat and ask questions, or they let an AI agent loose on their codebase and hope for the best. Both work for small tasks. Neither works for building a real product over multiple sessions.

The first approach loses context every time you close the tab. The second approach loses context when the AI runs out of memory. And both assume you're sitting down for a long, uninterrupted stretch — which, if you're a parent or have a day job or both, you're not.

My problem was specific: how do I make meaningful progress on a software project in one-hour increments, across many evenings, using AI as my primary engineer?

The answer turned out to be treating the project like I would at work — as a PM.

## The Workflow

### Step 1: Chat the PRD into Existence

Every project starts in Claude.ai — not Claude Code, just the regular chat interface. I describe the app I want to build. Not in technical terms, but as a product person: who's it for, what problem does it solve, what should the experience feel like.

Then we go back and forth. Claude asks good questions. I answer them. We iterate on scope, user flows, gamification mechanics, moderation strategy, whatever the project needs. It's like a brainstorming session with a cofounder who never gets tired and never checks their phone.

The output of this conversation is a proper PRD — a markdown file with sections for problem statement, target users, feature requirements, technical architecture, and success metrics. For Brown Note, this was a 42K-character document covering everything from the nugget economy to crisis detection to content moderation philosophy.

This step usually takes one or two sessions. It's the most important step, and it's the one most AI-assisted developers skip entirely.

### Step 2: Drop the PRD into .context

Here's where the workflow gets concrete. In my project repo, I maintain a `.context/` folder. It lives alongside the code but isn't code — it's the project's brain.

```
brown-note/
├── .context/
│   ├── brown-note-prd.md              # The full PRD from Step 1
│   ├── mobile-strategy-plan.md        # Phase plan (Step 3)
│   ├── brown-note-support-brief.md    # Feature-specific brief
│   ├── my-replies-web-plan.md         # Session-level plan
│   └── CLAUDE.md                      # Persistent context for Claude Code
├── core/
├── api/
└── ...
```

When I open Claude Code in this directory, it reads the `.context/` folder and immediately understands the project — not just the code, but the product intent, the architectural decisions, and where we left off. No "let me explain the project to you" preamble. No re-establishing context from last night. It just knows.

### Step 3: Break the Work into Phases

This is the key step. I put Claude Code into planning mode and feed it the PRD. Then I say something like: "I have about 1-2 hours per evening to work on this. Break this into phases, and break each phase into sessions I can complete in a single sitting."

What comes back is a phased development plan — a separate markdown file in `.context/` — with realistic scope for each session. For the Brown Note mobile strategy, this looked like:

- **Phase 1 (API Layer):** 8 sessions across ~2.5 weeks. Session 1 was installing DRF and configuring JWT auth. Session 8 was writing tests and generating API docs.
- **Phase 2 (Mobile App):** 6 sessions across ~4 days. Each session built 2-3 screens.
- **Phase 3 (Launch Prep):** 4 sessions covering social auth, push notifications, privacy policy, and App Store metadata.

Each session had a clear scope, clear deliverables, and a clear "done" state. When I sat down at 9 PM, I didn't have to figure out what to work on. I opened the plan, found the next unchecked session, and started.

### Step 4: Work a Session

A typical evening session looks like this:

1. Open Claude Code in the project directory
2. It reads `.context/` and picks up the project state
3. I say something like "We're on Phase 2, Session 4 — inbox and message detail screens"
4. Claude Code enters planning mode, reviews the phase plan, and proposes an approach
5. I approve or adjust, then we build
6. At the end of the session, we update the plan — check off what's done, note any decisions made, add any new items that surfaced
7. Close the laptop. Go to bed.

The plan file is the continuity layer. It doesn't matter that Claude Code doesn't remember last night's session. The plan remembers. The `.context/` folder remembers. The git history remembers. When I sit down tomorrow night, we're right back where we left off.

### Step 5: Add Feature Briefs as Needed

Sometimes a feature is complex enough to warrant its own document. When I wanted to add Stripe support to Brown Note, I created a separate brief in `.context/` — just for that feature. It covered the UX approach, the Stripe integration pattern, the navigation placement, and the specific constraints ("optional, low pressure, no paywalls").

Claude Code reads this alongside the main PRD and phase plan. The more context in `.context/`, the better the output — but only if the context is well-organized and up to date. Stale context is worse than no context.

## Why This Works

Three reasons:

**1. Context survives sessions.** This is the whole game. AI tools are powerful but amnesiac. The `.context/` folder gives Claude Code a persistent memory that I control. It's not magic — it's just markdown files in a folder — but the effect is transformative. Every session starts warm, not cold.

**2. Scoping creates momentum.** When you have limited time, the worst thing is sitting down and spending 20 minutes figuring out what to do. Pre-scoped sessions eliminate that. You sit down, you build, you ship something small, you feel good. That feeling compounds across evenings.

**3. The PM/engineer split is natural.** I think about the product during the day — in the shower, on a walk, while feeding the baby. I make decisions about scope, UX, architecture. Then at night, I sit down with Claude Code and execute. I'm the PM during the day and the tech lead at night, and Claude is the engineer who never sleeps. That division of labor plays to everyone's strengths.

## Is This Novel?

Honestly, I'm not sure. The PRD-to-plan-to-code pipeline is emerging as a pattern in AI-assisted development. Some people call it "PRD-driven development." There are tools and frameworks being built around it.

But the specific combination — chatting a PRD into existence in Claude.ai, dropping it into a `.context/` folder for Claude Code, breaking work into time-boxed evening sessions, and using persistent markdown files as the continuity layer — I haven't seen anyone else describe this exact workflow. Maybe because the people building with AI tools tend to have more time than I do, so they don't need the session structure. Or maybe everyone's doing some version of this and not writing it up.

What I do know is that it works. It works for someone with an hour a night. It works for solo projects. And the principles — persistent context, pre-scoped sessions, clean separation between product thinking and engineering execution — would scale to a team.

## The .context Folder is the Whole Trick

If you take one thing from this post, let it be the `.context/` folder. Not because the folder itself is special — it's just a directory with markdown files. But because it forces you to externalize your project knowledge into a format that both you and the AI can read.

A PRD in your head is useless to Claude Code. A PRD in `.context/brown-note-prd.md` is a shared understanding. A phase plan you remember is fragile. A phase plan in `.context/mobile-strategy-plan.md` with checkboxes is durable.

The AI coding tools will keep getting better. Context windows will get bigger. Memory will get longer. But the discipline of writing down what you're building, why you're building it, and what you're doing next — that's a human habit that makes AI tools dramatically more effective right now.

## What I'd Improve

A few things I'm still iterating on:

- **Session retrospectives.** I should be capturing "what surprised me" or "what took longer than expected" at the end of each session. That would help scope future sessions more accurately.
- **Better phase transitions.** Moving from Phase 1 (API) to Phase 2 (Mobile) involved some context thrash. A "phase handoff" document might help.
- **Automated context updates.** Right now I manually update the plan files. Claude Code could probably do this more systematically if I built it into the workflow.

## Try It

If you're building something with AI tools and you feel like you're losing context between sessions, try this:

1. Create a `.context/` folder in your project
2. Write a PRD (even a rough one) and drop it in there
3. Break your work into sessions you can finish in one sitting
4. Write the session plan as a markdown file with checkboxes
5. Update the plan at the end of every session

That's it. No framework, no dependencies, no config. Just markdown files and discipline.

If you want to see the full project that came out of this workflow, I wrote a [detailed case study on building Brown Note](/writing/building-brown-note) — from architecture decisions to costs to what it's actually like to PM an AI engineer.
