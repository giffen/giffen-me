---
title: "User Interview Framework"
description: "A structured approach to conducting and synthesizing user research."
date: "2025-09-05"
status: "complete"
tags: ["UX", "Research", "Notion"]
pattern: 5
---

## The Problem I Was Trying to Solve

User interviews were happening, but insights weren't making it into product decisions. Notes lived in scattered Google Docs, patterns weren't being identified, and by the time we'd remember "didn't someone say something about this?" the context was lost.

I needed a system that made research findable, synthesizable, and actionable.

## What I Learned

### Structure Enables Synthesis

The framework has three layers:

**1. Interview Template**
```markdown
## Context
- User role:
- Company size:
- Using product for:

## Key Jobs to Be Done
1. 
2. 
3. 

## Pain Points (verbatim quotes)
- 

## Workarounds They've Built
- 

## What Would Make Them Switch
- 
```

**2. Tagging Taxonomy**
Every insight gets tagged with:
- Theme (onboarding, pricing, integrations, etc.)
- Sentiment (positive, negative, neutral)
- Confidence (direct quote, paraphrase, inference)
- User segment

**3. Synthesis Database**
A Notion database where:
- Each row is a discrete insight
- Tags allow filtering across all interviews
- Linked back to source interview

### The "5 Interviews" Rule

After 5 interviews with a specific segment, you have enough signal to identify patterns. More interviews have diminishing returns—better to act on what you've learned.

## The Tech Stack

- **Notion** — Database and templates
- **Otter.ai** — Transcription
- **Dovetail** — Highlight and tag analysis (optional)
- **Miro** — Affinity mapping for synthesis sessions

## What I'd Do Differently

1. **Record everything** — Started with just notes. Lost so much nuance. Now every interview is recorded (with permission).

2. **Involve engineers early** — They hear problems differently. Started including a dev in synthesis sessions.

3. **Time-box synthesis** — It's easy to spend forever organizing notes. Set a 2-hour limit per batch of interviews.

## Outcome

We now have a searchable database of 80+ interviews spanning 18 months. When someone asks "what do users think about X?", we can answer in minutes instead of shrugging.

More importantly, product decisions now cite specific user quotes. "Users said X" carries more weight when you can link to the source.
