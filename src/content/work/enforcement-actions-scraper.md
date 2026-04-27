---
title: "Compliance Scraper"
description: "An automated pipeline that collects environmental enforcement actions from 23 regulatory sources across 16 jurisdictions, enriches them through the Claude API, and serves them through a clean REST API."
date: "2026-03-09"
status: "in-progress"
tags: ["AI", "Compliance", "Open Source"]
pattern: 5
image: "/images/work/enforcement-actions-scraper-feature.webp"
featuredImage: "/images/work/enforcement-actions-scraper-feature.webp"
published: true
---

## What this is

Tracking environmental enforcement actions globally is painful. Every regulatory agency publishes data differently — different formats, different cadences, different levels of detail. The EPA uses one API, the UK Environment Agency uses another, France publishes PDFs, and the EU has three separate portals depending on which type of enforcement you're after.

So I built something that does it automatically: 23 scrapers running in parallel, an AI enrichment layer that imposes a consistent schema, and a clean REST API anyone can read from.

It's a personal project. It's also how I usually learn a stack — by building something real on it before it shows up in production work.

## How it works

Three layers with a deliberate seam between them.

**Scraper pipeline.** 23 source-specific scrapers handle the messy reality of different APIs, HTML pages, PDFs, and Excel downloads. An orchestrator deduplicates and ranks the results.

**Claude enrichment.** Raw scraper output is messy: entity names are inconsistent, penalty structures vary, and there's no standard domain classification. The enrichment layer takes each action and produces a structured record — normalized entity names, business impact assessments, penalty breakdowns, EHS domain classification.

**PostgreSQL + REST API.** Enriched actions are upserted into PostgreSQL with a unique constraint on (entity, date, jurisdiction). A read-only REST API serves the data with filtering by jurisdiction, domain, and date range. The API is the clean handoff surface — documented with an OpenAPI spec so it can be reimplemented in any language.

## Sources

23 sources across 16 jurisdictions:

- **North America** — EPA ECHO (USA), Canada EOR, Mexico PROFEPA
- **UK & Ireland** — UK Environment Agency, Ireland EPA, Scotland SEPA
- **EU** — EUR-Lex Environmental, EU Safety Gate, EU Infringements
- **Western Europe** — France Georisques, Belgium Flanders, Germany UBA, Netherlands Luchtmeetnet, Italy ARPA Lombardia, Spain Inspections, Poland GIOS
- **Asia-Pacific** — Japan Sanpainet, Korea Waste, India CPCB, Australia (QLD, VIC, NSW)
- **South America** — Brazil IBAMA

## What I took from it

The pattern here — extract unstructured regulatory content, impose structure, make it queryable — is the same shape as the production AI work I do for a living. This is the version where I get to make the hard architectural calls myself.

The clean seam between the scraper layer and the API layer is the part I'm most proud of. Anyone can replace the API layer in any language; the messy work of dealing with 23 different data sources stays where it is.
