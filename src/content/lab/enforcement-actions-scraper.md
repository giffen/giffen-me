---
title: "Enforcement Actions Scraper"
description: "An automated pipeline that collects environmental enforcement actions from 23 regulatory sources across 16 jurisdictions, enriches them with Claude, and serves them through a PostgreSQL-backed REST API"
date: "2026-03-09"
status: "in-progress"
tags: ["scraping", "node.js", "postgresql", "api", "ehs", "compliance", "claude-api", "railway"]
image: "/images/lab/enforcement-scraper-poster.png"
featuredImage: "/images/lab/enforcement-scraper-feature.png"
published: true
---

## The Problem

Tracking environmental enforcement actions globally is painful. Every regulatory agency publishes data differently -- different formats, different update cadences, different levels of detail. The EPA uses one API, the UK Environment Agency uses another, France publishes PDFs, and the EU has three separate portals depending on which type of enforcement you're looking at. If you want a unified picture of what's happening in global EHS enforcement, you're doing a lot of manual work.

I wanted to build something that does this automatically, enriches the raw data into a consistent schema, and exposes it through a clean API that could eventually be handed off to a larger team.

## Architecture

The system has three layers with a clear separation between them:

**Scraper Pipeline** -- 23 Node.js scrapers run in parallel, each targeting a specific regulatory source. They handle the messy reality of different APIs, HTML scraping, PDF parsing, and Excel downloads. The orchestrator deduplicates results, selects the top actions by penalty severity, and passes them to Claude for enrichment.

**Claude Enrichment** -- Raw scraper output is messy. Entity names are inconsistent, penalty structures vary, and there's no standard domain classification. Claude takes each raw action and produces a structured record with normalized entity names, business impact assessments, penalty breakdowns, and EHS domain classification (Environmental, Health & Safety, Chemical Management, etc).

**PostgreSQL + REST API** -- Enriched actions are upserted into PostgreSQL with a unique constraint on (entity, date, jurisdiction) for deduplication. A read-only REST API serves the data with filtering by jurisdiction, domain, and date range. This API is the handoff surface -- it's documented with an OpenAPI spec so it can be reimplemented in any language.

```
Scrapers (23 sources)
    |
    v
Claude API enrichment
    |
    v
PostgreSQL (upsert)
    |
    v
REST API (/api/v1/*)  <-- Enhesa reimplements this in .NET
    |
    v
Regulatory Radar frontend
```

## Sources

The pipeline currently covers 23 sources across 16 jurisdictions:

- **North America** -- EPA ECHO (USA), Canada EOR, Mexico PROFEPA
- **UK & Ireland** -- UK Environment Agency, Ireland EPA, Scotland SEPA
- **EU** -- EUR-Lex Environmental, EU Safety Gate, EU Infringements
- **Western Europe** -- France Georisques, Belgium Flanders, Germany UBA, Netherlands Luchtmeetnet, Italy ARPA Lombardia, Spain Inspections, Poland GIOS
- **Asia-Pacific** -- Japan Sanpainet, Korea Waste, India CPCB, Australia (QLD, VIC, NSW)
- **South America** -- Brazil IBAMA

Each scraper handles the specific quirks of its source -- rate limiting, pagination, authentication, format conversion.

## The Enhesa Migration Path

This was built as a preview for Enhesa, where I work. The key architectural decision: the REST API is a clean seam. The Node.js scraper pipeline stays as-is (it's doing the hard work of dealing with 23 different data sources). Enhesa's engineering team reimplements only the API layer in ASP.NET, reading from the same PostgreSQL database. The frontend doesn't change. The OpenAPI spec documents the exact contract.

| Component | Stays (Node.js) | Reimplemented (.NET) |
|---|---|---|
| 23 scrapers + orchestrator | Yes | No |
| Claude API enrichment | Yes | No |
| Management dashboard | Yes | No |
| PostgreSQL schema | Shared | Shared |
| REST API | Preview only | ASP.NET Web API |

## Stack

- **Runtime** -- Node.js 22
- **Database** -- PostgreSQL 16 (Railway managed)
- **Hosting** -- Railway (single service: API + dashboard)
- **Enrichment** -- Claude API (Anthropic)
- **Frontend** -- React SPA on Vercel (separate repo)
- **Contract** -- OpenAPI 3.0.3 spec

## Current Status

The pipeline is running in production on Railway with 227 enforcement actions loaded, the admin dashboard is live for triggering scrapes and monitoring source health, and the Regulatory Radar frontend is connected via API. Next steps: scheduled daily cron runs and expanding source coverage.
