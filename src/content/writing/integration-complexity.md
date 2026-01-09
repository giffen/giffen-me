---
title: "Integration Complexity: A Mental Model"
description: "A framework for evaluating and prioritizing integration work."
date: "2025-09-20"
tag: "Framework"
excerpt: "A framework for evaluating and prioritizing integration work based on customer value, technical effort, and strategic alignment."
---

## The Problem with Integration Prioritization

Every B2B product eventually faces the integration question: "Which third-party tools should we connect to?" The backlog fills up with requests—Salesforce, HubSpot, Slack, Zapier, Jira, the list never ends.

Without a framework, prioritization becomes political. Whoever has the loudest customer or the most persistent sales rep wins. This leads to a patchwork of integrations, some heavily used, others gathering dust.

I needed a systematic way to evaluate integration requests that balanced customer value against technical cost.

## The Framework

Every integration gets scored on three dimensions:

### 1. Customer Value (0-10)

This isn't just "how many customers want it"—it's a weighted assessment:

| Factor | Weight |
|--------|--------|
| Request frequency | 25% |
| Revenue at risk (churn/expansion) | 30% |
| Segment alignment (ICP fit) | 25% |
| Competitive necessity | 20% |

A Salesforce integration requested by 50 enterprise customers threatening to churn scores higher than a niche tool requested by 5 SMB accounts.

### 2. Technical Complexity (0-10, inverted)

Lower is better. Factors include:

- **API quality**: Is the docs good? Is there a sandbox? Rate limits?
- **Data model alignment**: How well does their object model map to ours?
- **Authentication complexity**: OAuth 2.0 is straightforward; custom SAML is not.
- **Maintenance burden**: Will this break every time they update their API?

Score starts at 10 (trivial) and decreases based on complexity factors.

### 3. Strategic Alignment (0-10)

Does this integration support where we're going?

- Reinforces our positioning in target segment: +3
- Enables a new use case we're betting on: +3
- Creates a moat (hard for competitors to replicate): +2
- Partner co-marketing opportunity: +2

An integration that's technically easy but strategically irrelevant shouldn't jump the queue.

## The Prioritization Score

**Priority Score = (Customer Value × 0.4) + (Technical Feasibility × 0.3) + (Strategic Alignment × 0.3)**

This weights customer value highest (we're here to serve customers) while ensuring we don't ignore technical reality or strategic direction.

## Worked Example

**Integration Request: HubSpot CRM sync**

| Dimension | Score | Reasoning |
|-----------|-------|-----------|
| Customer Value | 8 | High request volume, 3 enterprise accounts contingent on it, strong ICP fit |
| Technical Complexity | 7 | Good API, decent docs, but complex object model for custom properties |
| Strategic Alignment | 6 | Supports mid-market push, but Salesforce is bigger priority |

**Priority Score**: (8 × 0.4) + (7 × 0.3) + (6 × 0.3) = 3.2 + 2.1 + 1.8 = **7.1**

Compare this to:

**Integration Request: Obscure industry-specific CRM**

| Dimension | Score | Reasoning |
|-----------|-------|-----------|
| Customer Value | 3 | Only 2 requests, small accounts |
| Technical Complexity | 4 | Poor API, no sandbox, custom auth |
| Strategic Alignment | 2 | Not in our target segment |

**Priority Score**: (3 × 0.4) + (4 × 0.3) + (2 × 0.3) = 1.2 + 1.2 + 0.6 = **3.0**

HubSpot wins. By a lot. And now you have a rationale to share with the sales rep pushing for the niche CRM.

## Using the Framework in Practice

### Quarterly Integration Review

Every quarter, we:
1. Collect all integration requests from the past 90 days
2. Score each one using the framework
3. Stack rank by priority score
4. Allocate engineering capacity to top N integrations

### Saying No (With Data)

The framework makes "no" easier. Instead of "we're not doing that," it's "here's the score—it didn't make the cut this quarter, but we'll re-evaluate as the data changes."

### Tracking Post-Launch

After shipping an integration, we track:
- Adoption rate (% of eligible customers using it)
- Support ticket volume
- Revenue influenced

This feeds back into the model—if our predictions were wrong, we adjust the weighting.

## Limitations

No framework is perfect. This one struggles with:

- **Truly novel integrations** where there's no historical signal
- **Platform bets** (like Zapier) that enable many use cases indirectly
- **Customer concentration risk** where one huge customer skews the data

For these edge cases, judgment still matters. The framework is a starting point, not a replacement for thinking.

## The Outcome

Since implementing this framework:

- Integration backlog is transparent and defensible
- Engineering time is allocated to highest-impact work
- Sales has a clear answer for "when are we building X integration"
- We've shipped fewer integrations, but they're more adopted

The goal was never to build more integrations—it was to build the *right* ones.
