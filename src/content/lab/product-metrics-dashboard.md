---
title: "Product Metrics Dashboard"
description: "Real-time analytics dashboard for tracking key product health indicators."
date: "2025-10-10"
status: "complete"
tags: ["React", "D3.js", "SQL"]
pattern: 4
repoUrl: "https://github.com/agiffen/metrics-dashboard"
---

## The Problem I Was Trying to Solve

Our team was drowning in dashboards—Amplitude for product analytics, Looker for business metrics, Datadog for infrastructure. Getting a holistic view of product health meant opening five tabs and mentally stitching together the story.

I wanted a single view that answered: "Is the product healthy right now?"

## What I Learned

### Define "Health" First

Before building anything, I had to define what "healthy" means for our product. We settled on five key indicators:

1. **Activation Rate** — % of signups completing onboarding
2. **Daily Active Users** — Engagement baseline
3. **Error Rate** — Technical stability
4. **Time to Value** — How fast users reach their "aha moment"
5. **NPS Trend** — Customer sentiment

### The "Traffic Light" Pattern

Each metric gets a status: green, yellow, or red. The rules are explicit:

```typescript
const getStatus = (metric: Metric): Status => {
  if (metric.value >= metric.greenThreshold) return 'green';
  if (metric.value >= metric.yellowThreshold) return 'yellow';
  return 'red';
};
```

At a glance, anyone can see if something needs attention.

### Real-Time Without Over-Engineering

Used a simple polling approach instead of WebSockets:
- Dashboard polls every 60 seconds
- Server caches query results for 30 seconds
- Good enough for "real-time" without infrastructure complexity

## The Tech Stack

- **React 18** — UI framework
- **D3.js** — Custom visualizations
- **TanStack Query** — Data fetching and caching
- **PostgreSQL** — Metrics warehouse
- **dbt** — Data transformations

## What I'd Do Differently

1. **Start with fewer metrics** — We launched with 12 indicators. Nobody looked at 7 of them. Now we have 5.

2. **Add annotations** — "Why did this metric spike on Tuesday?" Needed context around data points.

3. **Mobile view from the start** — Execs wanted to check metrics on their phones. Retrofitting responsive design was painful.

## Outcome

Morning standups went from 15 minutes of "let me pull up the data" to 30 seconds of "dashboard is green, moving on." 

The dashboard became the single source of truth for product health, which means debates now start with shared data rather than competing spreadsheets.
