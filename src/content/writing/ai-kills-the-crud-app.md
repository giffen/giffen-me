---
title: "AI, SaaS, and the End of Charging for Code"
description: "Development costs are approaching zero. Cloning costs are approaching zero. So where does product value actually live now?"
date: "2026-02-17"
tag: "Musing"
excerpt: "557,000 apps were submitted to the Apple App Store in 2025 — up 24% from the year before. Development costs are collapsing, cloning is trivial, and your pricing power is evaporating. The PMs who know their customers best are the ones who'll survive this."
---

The product managers who know their customers best are about to have the best decade of their careers. Everyone else is in trouble.

Here's why.

## The Cost of Building Just Collapsed

A [recent piece from NicheHunt](https://nichehunt.app/blog/ai-going-to-kill-app-subscriptions) laid out the numbers: 557,000 new apps were submitted to the Apple App Store in 2025, up 24% from the year before. The thesis is straightforward — AI has dropped the cost of building software from "hire a team for six months" to "a weekend with Claude." And when building is cheap, cloning is cheaper.

This isn't speculative. It's already happening. Apple isn't fighting it — they're leaning in, integrating AI tooling directly into Xcode. The flood is here and the gates are open.

The NicheHunt piece focuses on what this means for subscription pricing, and it's right: if your app can be rebuilt in a weekend, you can't charge $10/month for it. Someone will undercut you at $5. Someone else will do it for a one-time purchase. Someone else will make it free to get distribution for something else. The race to the bottom isn't coming. It's in progress.

But I think the more interesting question isn't about pricing. It's about where value lives now that code is nearly free.

## Two Kinds of Software Survive

Not all software is equally vulnerable to this. I think there are two categories that retain pricing power even in a world of near-zero development costs.

**Content platforms.** Spotify, Netflix, YouTube Premium — you're not paying for the app. You're paying for the catalog. Nobody's cloning Spotify's licensing deals with a weekend hackathon. The software is a delivery mechanism for content that has its own economics. These subscriptions survive because the moat is the content, not the code.

**Systems of record.** Jira, Salesforce, Workday — these survive despite themselves. Not because they're good (most people using Jira would love to use literally anything else), but because the data is entrenched. Ten years of epics, sprints, and velocity charts live in Jira. The integrations are wired in. The workflows are built around it. Could you build a better project management tool with AI in a month? Probably. Would a company with 500 engineers migrate to it? Not a chance. The switching cost is the moat, not the product quality.

Everything in between — the standalone CRUD apps, the utility tools, the "we put a nice UI on a database" products — is in the blast zone. If your product is a thin layer of interface over basic data operations, someone can now replicate that layer in a weekend. Your $15/month subscription is about to become someone else's free tier.

## The Niche Explosion

Here's the part that's actually exciting.

When building costs drop to near zero, use cases that were never economically viable suddenly become buildable. A peer support app for people with a specific chronic illness. A scheduling tool for a specific type of freelancer. A habit tracker designed for a specific hobby. These products were never worth a VC-funded team. They're absolutely worth a solo builder with AI and an evening.

I built [Brown Note](https://brownnote.app) — a niche peer support app for people with digestive conditions — in about three weeks. That product would never have existed in the old economics. The addressable market is too small, the revenue potential too modest. But the cost to build it was roughly $350, so it doesn't need to be a venture-scale business. It just needs to be useful to the people who need it.

This is the flip side of the "appocalypse." Yes, generic tools are getting commoditized. But the long tail of specific, opinionated, niche products is about to explode. That's great for users. It's great for builders who deeply understand a specific audience. It's terrible for anyone whose strategy is "build a generic tool and charge a premium."

## What's Your Moat If It's Not Code?

If the code is free, the value has to live somewhere else. Here's where I think it lands:

**Customer knowledge.** Understanding what your users actually need — not what they say they need, not what the competitor built — is the hardest thing to replicate. AI can clone your features. It can't clone your insight into why those features exist and what to build next.

**Data and integrations.** Products that connect to other systems, accumulate user data over time, and become more valuable with use have natural retention. A CRM that's wired into your email, calendar, Slack, and billing system is hard to leave even if a better one appears tomorrow.

**Community and trust.** People stick with products they trust, built by teams (or individuals) they trust. An anonymous app that handles sensitive health conversations needs to earn trust over months. A new clone can copy the features but not the reputation.

**Taste.** This is the squishy one, but it matters. Opinionated products built by people who genuinely use them feel different from clones built to capture market share. Users can tell. It's the difference between an app built by someone who has the problem and an app built by someone who googled the problem.

## What This Means for Product Managers

This is where I get genuinely excited about the future of product work.

For the past decade, a huge chunk of product management has been resource negotiation. Can we get two dev squads for six months to build this? Is it worth the engineering investment? What's the ROI on this feature given it'll take a quarter to ship? Half the job was justifying why something deserved to be built at all.

AI collapses that constraint. When the cost of building drops by 10x, you can take more swings. You can build the delighter feature that makes users smile but doesn't move a revenue needle. You can test the risky idea without betting a quarter of headcount on it. You can ship the thing your customers have been asking about for years that never made it past prioritization because the ROI math didn't work at the old cost structure.

The PM role shifts from "what can we afford to build" to "what should we build." From resource allocation to customer insight. From managing capacity to making bets.

The PMs who thrive in this world aren't the ones who are best at writing tickets and managing sprints. They're the ones who are closest to their customers. The ones who understand the problem deeply enough to know which features matter and which are noise. The ones who can say "build this, not that" with conviction — because they've done the research, had the conversations, and lived in the problem space.

Code was the bottleneck. Now judgment is.

## The Bottom Line

The cost of building software is approaching zero. That's going to be painful for anyone selling generic tools at premium prices. It's going to be painful for developers who defined their value by the ability to write code. And it's going to be great for customers, who'll get more choices, lower prices, and products built for increasingly specific needs.

For builders and product people, the playbook is simple even if the execution is hard: know your customers better than anyone else, build things that are hard to clone even when the code is easy to copy, and stop treating the code as the product. The code was never the product. It was always the customer relationship. We just couldn't see that clearly when building was expensive.

Now there's nowhere to hide.
