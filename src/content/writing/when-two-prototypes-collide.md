---
title: "When Two Prototypes Collide"
description: "How my colleague's parallel enforcement intelligence project turned a solo tracker into something neither of us could have built alone."
date: "2026-03-11"
tag: "Case Study"
excerpt: "My colleague and I had been building the same thing without knowing it. She had the analytical depth — severity scoring, outlier detection, GDPR coverage. I had the infrastructure — 23 scrapers, a PostgreSQL pipeline, a React frontend. When we compared notes, the merge took an afternoon. Here's why building first and coordinating later can be better than planning together upfront."
---

## Two Projects, Same Problem

I'd been building an enforcement tracker for a few weeks. It scraped 23 regulatory sources across 16 countries — EPA, UK Environment Agency, EU Safety Gate, a dozen others — enriched the raw data through Claude, stored it in PostgreSQL, and displayed everything on an interactive globe. It was solid infrastructure. You could spin the globe, click a country, filter by topic and date range, and see enforcement actions on a map.

Then my colleague showed me what she'd been working on.

She'd been building EnforcementWatch — her own enforcement intelligence tool, independently. Different tech choices, different architecture, but pointed at the exact same problem: making sense of global enforcement data.

We hadn't coordinated. There was no sprint planning meeting where we divided the work. She'd seen the same gap I had and started filling it from a different direction.

## What Each Project Did Better

When we sat down and compared the two projects side by side, the gaps were complementary. Almost perfectly so.

**My project had the plumbing.** Twenty-three scrapers running in parallel, each handling the specific quirks of its regulatory source — rate limiting, pagination, format conversion, authentication. A Claude enrichment pipeline that normalized messy raw data into a consistent schema. PostgreSQL with deduplication. A REST API with an OpenAPI spec. A React frontend with D3 map projections.

But the data model was shallow. Every enforcement action was a dot on a map. A $500M SEC settlement looked the same as a $10K waste disposal fine. The heatmap colored countries by action count, which meant five routine citations made a country look hotter than one landmark case. And I only covered EHS — environment, health, and safety. No data privacy, no corporate governance, no consumer protection.

**Her project had the intelligence.** A severity scoring system calibrated against domain medians, so a fine's significance was relative to what's normal for that type of violation. Outlier detection that flagged statistically unusual cases. Coverage across three categories — EHS, ESG, and Product safety. Research into sources I hadn't considered: GDPR fines from the DPC, SEC litigation releases, FTC consumer protection actions, OSHA workplace safety data.

But she didn't have the scraper infrastructure to automate collection, or the frontend to visualize it.

Neither project was complete. Together, they covered the full picture.

## The Merge

The merge happened in one sitting. Not a rewrite — a synthesis. Her ideas, implemented in the codebase that already had the infrastructure to support them.

**Severity scoring replaced action counting.** The old heatmap was binary — red or not red. The new system scores each enforcement action on a continuous 1-10 scale using a log-based ratio against the domain median fine:

```
score = 4 + 3 * log10(fine / domain_median)
```

A fine at the median scores 4. Ten times the median scores 7. A hundred times scores 10. Jail time and site closures add bonuses. The heatmap now weights by severity sum, so a $310M GDPR fine against LinkedIn doesn't look the same as a $15K waste disposal violation. The math handles it automatically.

**The domain taxonomy tripled.** From 10 EHS-only domains to 21 across three categories: EHS (environment, health, safety), ESG (data privacy, climate disclosure, greenwashing, corporate governance, anti-corruption, supply chain due diligence, human rights), and Product (consumer protection, product safety, advertising, food safety). The frontend gained a category toggle. The enrichment pipeline learned to classify into all 21.

**Nine new scrapers filled the source gaps.** Her research identified agencies I hadn't built scrapers for — OSHA, SEC, FTC, CPSC, FDA, the EU GDPR enforcement tracker, UK HSE, South Africa's Green Scorpions, Singapore's NEA. The US alone went from a single EPA scraper to six sources. Coverage jumped from 16 to 20 jurisdictions.

**Outlier detection surfaced what matters.** Actions where the fine exceeds 3x the domain median get flagged. These surface in a dedicated Insights card and get a visual indicator in the list. Simple heuristic, immediate value.

## Why This Worked

The interesting part isn't the technical merge. It's that building independently and merging was *better* than planning together would have been.

If we'd coordinated from the start, we would have divided the work: "you take the scrapers, I'll take the scoring model." One person would have built infrastructure without understanding what intelligence layer it needed to support. The other would have designed analytics without understanding the data pipeline's constraints. We'd have spent meetings aligning on interfaces before either of us had a working system to test those interfaces against.

Instead, we each built something real. And when we compared the two working systems, the conversation was concrete. Not "how should we model severity?" but "your log-scale scoring against domain medians is smarter than my action counting — let's use that." Not "what sources should we cover?" but "you've already identified the GDPR tracker API and the SEC RSS feeds — let me build scrapers for those."

You can't have that conversation with a design document. You can only have it when both sides have built something and discovered, through building, what the actual problems are.

There's a version of this that fails — two people build the same thing, neither backs down, and you end up with a political fight about whose codebase survives. That didn't happen here because the projects were genuinely complementary. She wasn't going to rebuild my 23 scrapers. I wasn't going to independently invent her scoring model. The merge was additive. Almost nothing was thrown away from either project.

## The Uncomfortable Implication

The uncomfortable implication for how most teams work: maybe the best way to explore a problem space isn't to plan together upfront. Maybe it's to let two people build independently, compare what they learned, and merge the best parts.

This only works under specific conditions. The problem space has to be large enough that two people naturally explore different parts of it. The people have to be willing to adopt each other's ideas without ego. And the merge has to be technically feasible — you can't merge two incompatible architectures without a rewrite.

But when those conditions hold, the result is better than either person could have planned alone. Not because collaboration is magic, but because building is the fastest way to learn what a problem actually needs, and two people building independently learn twice as much.

## Where It Stands

32 scrapers across 20 jurisdictions. Three domain categories. Continuous severity scoring with outlier detection. Country heatmap weighted by severity. The enrichment pipeline classifies into 21 domains and supports 30+ currencies. From a solo EHS tracker to a full-spectrum compliance intelligence tool — because my colleague had the same idea at the same time and neither of us waited for permission to start building.
