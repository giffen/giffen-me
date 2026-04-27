---
title: "PM Insights — Customer Intelligence System"
description: "An AI customer-intelligence system that queries 74,000+ recorded calls and 2.5 million transcript sentences. Changed how the product team prioritizes — from gut feel to a queryable source of truth."
date: "2026-01-20"
status: "ongoing"
tags: ["AI", "Customer Intelligence", "Production"]
pattern: 3
image: "/images/work/pm-insights-feature.webp"
featuredImage: "/images/work/pm-insights-feature.webp"
published: true
---

## The result

Before this existed, the PM team prioritized based on memory and whoever was loudest in the last call. Now they prioritize against a queryable source of truth across thousands of conversations and the full active enterprise client base.

The roadmap stopped being a function of recall bias and started being a function of evidence.

## How it works

A customer-intelligence system that ingests recorded calls and meeting transcripts, runs AI analysis per-client, and surfaces churn risk, sentiment, feature requests, and complaints into a dashboard the PM team uses every week.

Operational scale:

- 74,000+ recorded calls
- 2.5 million transcript sentences
- Per-client analysis runs nightly across the active enterprise client base

I designed the analysis pipeline, picked the model strategy, built the prototype, and shipped it into production with the engineering team.

## Why it matters

The PM organization could now answer questions that used to take a week of stakeholder interviews in a single dashboard query. "What are our enterprise customers saying about onboarding this quarter?" used to be a project. It became a filter.

## What I learned building it

The hard problem wasn't the AI. It was getting noisy, incomplete signal — call transcripts have hold music, off-topic tangents, half-finished thoughts — to produce stable enough analysis that PMs trusted it.

Trust was the deliverable. The AI was the means.
