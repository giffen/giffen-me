---
title: "Global Enforcement Pipeline"
description: "An automated pipeline that normalizes environmental enforcement actions from 23 regulatory sources across 16 jurisdictions into a single queryable compliance dataset, with AI-imposed structure and a clean REST API."
date: "2026-03-09"
status: "in-progress"
tags: ["AI", "Compliance", "Architecture"]
pattern: 5
image: "/images/work/enforcement-actions-scraper-feature.webp"
featuredImage: "/images/work/enforcement-actions-scraper-feature.webp"
published: true
---

## What this is

Tracking environmental enforcement actions globally is painful. Every regulatory agency publishes data differently - different formats, different cadences, different levels of detail. The EPA uses one API, the UK Environment Agency uses another, France publishes PDFs, and the EU has three separate portals depending on which type of enforcement you're after.

This pipeline normalizes all of it: 23 source-specific scrapers running in parallel, an AI enrichment layer that imposes a consistent schema, and a clean REST API anyone can read from. The result is a single queryable dataset of regulatory enforcement activity across 16 jurisdictions - the kind of compliance intelligence layer that's expensive to build inside a single product team and worth proving out independently.

## How it works

Three layers with a deliberate seam between them.

**Scraper pipeline.** 23 source-specific scrapers handle the messy reality of different APIs, HTML pages, PDFs, and Excel downloads. An orchestrator deduplicates and ranks the results.

**Claude enrichment.** Raw scraper output is messy: entity names are inconsistent, penalty structures vary, and there's no standard domain classification. The enrichment layer takes each action and produces a structured record - normalized entity names, business impact assessments, penalty breakdowns, EHS domain classification.

**PostgreSQL + REST API.** Enriched actions are upserted into PostgreSQL with a unique constraint on (entity, date, jurisdiction). A read-only REST API serves the data with filtering by jurisdiction, domain, and date range. The API is the clean handoff surface - documented with an OpenAPI spec so it can be reimplemented in any language.

## Sources

23 sources across 16 jurisdictions:

- **North America** - EPA ECHO (USA), Canada EOR, Mexico PROFEPA
- **UK & Ireland** - UK Environment Agency, Ireland EPA, Scotland SEPA
- **EU** - EUR-Lex Environmental, EU Safety Gate, EU Infringements
- **Western Europe** - France Georisques, Belgium Flanders, Germany UBA, Netherlands Luchtmeetnet, Italy ARPA Lombardia, Spain Inspections, Poland GIOS
- **Asia-Pacific** - Japan Sanpainet, Korea Waste, India CPCB, Australia (QLD, VIC, NSW)
- **South America** - Brazil IBAMA

## What I took from it

The pattern here - extract unstructured regulatory content, impose structure, make it queryable - is the same shape as the production AI work I do for a living. The architecture is the point: a clean seam between the messy scraper layer and the API surface, so the data-acquisition complexity stays contained and the consumption surface stays portable.

That separation is the call I'd make again at a much larger scale. Anyone can replace the API layer in any language. The messy work of dealing with 23 different data sources stays where it belongs.
