---
title: "Green Building Gamer"
description: "A bilingual certification-prep app for Gulf-region green building professionals. Built with a partner firm - their domain expertise and design system, my build. Shipped in days."
date: "2026-04-14"
status: "complete"
tags: ["Product", "Education", "Bilingual"]
pattern: 3
image: "/images/work/green-building-gamer-feature.webp"
featuredImage: "/images/work/green-building-gamer-feature.webp"
liveUrl: "https://green-building-gamer.vercel.app"
published: true
---

## What this is

A 60-second, gamified certification-prep app for Gulf-region green building professionals - LEED, Mostadam (Saudi Arabia), and serious tooling for regional standards that have almost no study material today.

The brief came from a partner firm with deep regional expertise, a clear pitch deck, and a design system. They knew the buyers, the certification market, and the content. The build was the missing layer; I shipped it.

## Why it mattered

By 2026, Saudi Arabia alone is projected to need thousands of certified sustainability professionals. The Mostadam rating system has been published since 2019. The study tooling gap between supply and demand was just open air. Existing tools either don't cover the regional standards or look like a children's museum exhibit about recycling. The market wanted something serious.

## What we shipped

- Three game modes (practice quiz, AI duel, lightning round) sharing one question bank
- 142 reviewed multiple-choice questions across LEED v4.1 BD+C and Mostadam D+C
- Full bilingual EN/AR with proper RTL layout
- Firm-branded PDF activity reports for continuing-education hour tracking - the sleeper feature; LEED AP holders need 30 CEU hours every two years and nobody enjoys assembling that paperwork manually
- Team leaderboards scoped by organization, with per-user opt-out and pseudonym support
- Role-based admin backend for SME content review, with row-level security on every table
- 68 integration tests covering scoring, AI opponent probabilities, session flows, and badge logic

## Design discipline

The partner brief rejected every green-tech cliché - no mint greens, no cartoon trees. They sent a design system grounded in *Architectural Vanguard*: deep authoritative navy, Space Grotesk display type at editorial scale, blueprint-grid SVG accents at 10% opacity, glassmorphic surfaces, no 1px borders anywhere - section breaks come from tonal shifts, not lines. It's serious and precise. Exactly what a compliance officer at a Gulf consulting firm wants their tools to look like.

## What I took from it

The collaboration model is the part I find most interesting. Domain experts with a clear vision, a strong design system, and ready content - paired with a builder who can ship - can compress what used to be a multi-quarter delivery into days. The MVP shipped overnight. Two follow-on releases each shipped the same evening they were planned.

That speed has limits. It works because the partner brought clarity. When the brief is fuzzy, no amount of build velocity rescues it - and that's the operational point worth taking into product leadership: brief quality is the rate-limiter, not engineering capacity.

## Status

Live in pilot at [green-building-gamer.vercel.app](https://green-building-gamer.vercel.app) with the partner team and a small group of LEED AP candidates working through the content. Next release is on hold pending real-world feedback from the first external pilot.
