---
title: "Migrating 50M ARR Without the Big Bang: Lessons from a NextGen Product Migration"
description: "Hard-won lessons from successfully migrating $50M ARR from a legacy flagship product to a modern platform - without the big bang approach"
date: "2026-01-13"
tag: "Case Study"
excerpt: "After migrating $50M in ARR from our legacy product to NextGen over 22 months, we learned that the difference between success and disaster comes down to one core insight: you can have fixed scope or fixed timeline, but never both. Here's everything we learned the hard way."
---

## The Setup: Why Most Migrations Fail

Migrating an existing customer base from a legacy product to a new platform is one of the highest-risk initiatives a software company can undertake. You're asking customers who have built workflows, expertise, and muscle memory around your existing product to leap into the unknown. Get it wrong, and you risk churn, damaged relationships, and potentially your business.

After successfully migrating $50M ARR to our NextGen product over 22 months across 5 cohorts, here are the lessons we learned - many of them the hard way.

## Core Principle: Fixed Scope OR Fixed Timeline (Never Both)

This is the fundamental truth that will make or break your migration: **you cannot have both fixed scope and fixed timeline.**

Since you need feature parity to move a client, you have a fixed scope by definition. Therefore, your timeline must be flexible. And since you have to communicate *some* timeline to stakeholders and customers, you should pad your engineering estimates by 25-35% depending on how well your team knows the legacy system.

Why such aggressive padding? Because legacy systems are archaeological sites - there's *always* hidden complexity buried in there. That "simple" reporting feature? It's actually calling into three other systems, has special logic for seven enterprise clients, and generates Excel files with macros that someone wrote in 2014.

## Turn Complexity Into Opportunity

Your migration is your chance for spring cleaning. Every feature you port is an opportunity to ask: "Could we do this simpler?"

**Real example**: We had a macro-heavy Excel export that clients loved. Instead of recreating that complex macro system in NextGen, we turned it into a single-sheet, macro-free Excel export. 

The key? We sold it as an **enhancement** - without macros, they could now collaborate with colleagues using Google Sheets or Excel Online. This gave us:
- Free feature development (simpler is faster)
- A genuine value-add for customers
- Reduced system complexity going forward

Look for these opportunities everywhere. Talk to customers about the *problem they're solving* rather than the *feature they're using*. You might find that their workflow has evolved, or that your original solution was more complex than it needed to be.

### Round the Edges, Wait for Feedback

Here's a powerful principle we applied: **All legacy features were migrated, but all had their edges rounded.**

What does this mean? We implemented the core functionality but stripped away edge cases, rarely-used options, and complexity. Then we waited for strong feedback from UAT or actual clients before bringing complexity back in.

**Concrete example**: We completely removed exports from the system initially and are only slowly reintroducing them in 2026 based on actual customer demand and usage patterns. 

This approach:
- Keeps your initial scope manageable
- Forces you to validate which complexity is actually necessary
- Prevents you from rebuilding features nobody uses
- Gives you data-driven prioritization for future development

The result? A cleaner, more maintainable codebase that delivers what customers actually need, not what you think they might need someday.

## The Cohort Strategy: Your Secret Weapon

Break your customer base into cohorts based on feature usage. We created 5 cohorts, starting with just 10 customers in our first group. This single decision unlocks multiple advantages:

### 1. **Earlier Production Readiness**
You can start upgrading customers as soon as *their* required features are ready, even if the full product isn't complete. Getting even 5-10 customers onto the new system early is invaluable.

### 2. **Risk Reduction**
Find flaws with a smaller group of customers before they become company-threatening issues. Every bug you catch with 10 customers is a disaster you avoided with 1,000 customers.

Our first cohort of 10 customers uncovered issues we never would have caught in testing. These were real-world workflow patterns and edge cases that only surface when actual customers use the system in production.

### 3. **Team Focus**
Nothing focuses an engineering team like real customers using their code. There's a massive difference between "feature complete" and "production ready" - your team will learn this gap quickly with real users.

### 4. **Momentum Building**
Each successful cohort migration becomes proof that the new system works. This builds confidence in both your team and your remaining customers.

## The Reality of Timeline: Expect Asymmetry

Here's what our timeline actually looked like:
- **First 50% of customers**: 1 year and 15 days
- **Remaining 50% of customers**: 9 additional months

Why did the second half take almost as long as the first? **Partner integrations.** 

While we controlled our own product timeline, the second half of our customer base worked with partners who also needed to upgrade their connections to our NextGen platform. This external dependency was something we couldn't accelerate through better engineering or planning - it required coordination across multiple organizations.

**Lesson**: Map your dependencies early. If your customers rely on integrations, APIs, or partner connections, factor in *their* migration timelines, not just yours.

## When Leadership Must Step In: The Excel Power Users

The cohort that relied heavily on legacy Excel exports was our hardest group to migrate. These were power users who had built critical workflows around complex macro-enabled spreadsheets.

For this group, I personally reached out to each customer and demoed the solution one-on-one. This wasn't something I could delegate - these customers needed to see that leadership understood how critical their workflows were and that we had a real solution.

The breakthrough? Once I found their pain point around **collaboration** and showed how the macro-free approach solved it in NextGen, they all came around quickly. They were stuck emailing Excel files back and forth, unable to use modern collaboration tools. Our "simpler" solution was actually an upgrade to their entire workflow.

**Lesson**: Identify your highest-risk cohort early. Sometimes over-communication means executive involvement. Don't underestimate the value of personal attention for customers who have the most to lose in a migration.

## Cultural Considerations: One Size Does Not Fit All

If you're operating globally, expect different regions to handle change management differently - and plan accordingly.

**What we learned**:
- **US & Europe**: We could upgrade clients with very short notice periods. These markets were comfortable with rapid change and trusted our process.
- **Japan**: Required a 3-month notice window. The cultural expectation was for extensive communication, detailed planning documentation, and a longer preparation period.

Neither approach is wrong - they reflect different business cultures and risk tolerances. The mistake is assuming your domestic change management playbook will work everywhere.

**Action item**: Before setting your global rollout schedule, talk to regional teams about local expectations for system changes. Build these timelines into your cohort planning from day one.

## Keeping Distributed Teams Aligned

Our development team is based in Portugal. For a 22-month migration project with a distributed team, maintaining alignment and motivation is critical.

**What worked for us**: Two onsite meetings during the project.

These weren't optional feel-good gatherings - they were strategic investments in team cohesion. When you're asking engineers to grind through legacy system complexity for nearly two years, face-to-face time makes a massive difference in:
- Maintaining shared vision and purpose
- Building trust across the team
- Solving architectural challenges that are hard to resolve over video calls
- Celebrating milestones together
- Reinforcing that this work matters

If you're running a distributed team through a long migration, budget for in-person time. The cost is trivial compared to the risk of a team losing motivation or alignment halfway through.

## Measuring Success: Beyond "Migrated"

By 2025, we hit 50% migration. But we didn't just count migrated customers - we tracked:

1. **Overall usage metrics**: Were customers actually using the new system, or just logging in once and going back to old workflows?
2. **Net Promoter Score (NPS)**: Were migrated customers happy with the new experience?

These metrics told us whether we were truly succeeding or just checking a box. A migrated customer who's frustrated isn't a win - it's a churn risk waiting to happen.

**Lesson**: Define what "successfully migrated" really means before you start. Customer count alone isn't enough.

## Avoid the Big Bang at All Costs

A big-bang upgrade where everyone switches on the same date is a recipe for catastrophe. You *will* have issues - the question is whether you discover them with 50 customers or 500.

With our cohort approach, we found issues with 10 customers, then 50, then 150 - each time refining the process before scaling further. By the time we reached our final cohorts, the migration was nearly routine.

## Over-Communicate (Then Communicate More)

Identify high-risk or high-complexity features and talk to those customers directly. Understand:
- What problem are they solving with this feature?
- What's their actual workflow?
- Where are the pain points they've learned to live with?

**Real example**: We had a very complicated content publication process. By talking to customers during the migration, we discovered we could eliminate entire steps in their workflow. The result? Increased time-to-value for customers AND reduced operating costs for us.

## Take Customers on the Journey

Don't just announce the migration - involve customers in shaping it:

- **Hold CAB (Customer Advisory Board) meetings** regularly
- **Show mockups and prototypes** early and often
- **Explain your design decisions** - customers want to understand the "why"
- **Listen to pushback** - when taken in good faith, most customers are thrilled to be heard and will become champions of the migration

Customer involvement has a hidden benefit: educated customers are easier to support. They understand the trade-offs you made and why the new system works differently.

## The Hidden Cost: Technical Debt Cannot Be Ignored

We actually stayed on budget for the migration itself - a rare achievement in software projects of this scale. We had excellent technical managers on the engineering side who kept costs within check.

But here's the painful lesson: **We cut back on technical debt work during the migration, and we paid for it immediately in Q1.**

When you're pushing hard on a deadline, it's tempting to defer technical debt cleanup. "We'll handle it after the migration" becomes the mantra. The problem? That technical debt doesn't wait politely - it compounds.

The moment the migration pressure lifted, all that deferred maintenance came due. We spent Q1 paying down debt we should have addressed incrementally during the project.

**Lesson**: Budget time for technical debt during your migration, not after. Your future self will thank you. The "savings" from deferring this work are illusory - you're just moving costs from one quarter to another, usually with interest.

## Additional Best Practices

### Build Your Migration Toolkit
Create standardized materials that you'll use repeatedly:
- Communication templates for each migration phase
- Checklists for pre/during/post migration
- Data validation scripts
- Customer training materials
- Internal runbooks

Invest time upfront to make each cohort migration smoother than the last. By cohort 3, you should have a well-oiled machine.

### Define Success Criteria for Each Cohort
Before migrating any cohort, establish clear success metrics:
- What does "successfully migrated" mean?
- What performance benchmarks must we hit?
- What's our rollback plan if things go wrong?
- How long is the "white glove" support period?

### Plan for Dual-Running Periods
Some cohorts will need to run both systems in parallel for a transition period. Budget for this - both technically and in terms of support resources.

### Document Your Technical Debt
You won't fix everything during migration. Document what you're explicitly choosing NOT to address so you can plan for it later. This prevents future teams from thinking "why did they build it this way?"

### Invest in Data Validation
Build comprehensive scripts to validate data integrity before and after migration. Customers will forgive a lot, but not data loss or corruption.

### Account for External Dependencies
Your migration timeline isn't just about your engineering velocity. Factor in:
- Partner platform upgrades
- Third-party integration updates
- Customer IT department approval processes
- Regional change management requirements

The second 50% of our migration taught us this the hard way.

### Celebrate Wins
Migrations are long, grueling projects. Celebrate each cohort success with both your team and the customers. Recognition matters when you're in month 18 of a 22-month journey.

## The Bottom Line

Migrating $50M in ARR isn't a technical project - it's a change management project with a technical component. Your success depends on:

1. **Realistic timelines** with appropriate padding (and acceptance that dependencies may double your timeline)
2. **Ruthless scope management** - round the edges, wait for feedback to add complexity back
3. **Cohort-based rollout** starting small (we started with just 10 customers)
4. **Cultural sensitivity** for global rollouts (3 months in Japan vs. days in the US)
5. **Executive involvement** for highest-risk cohorts (I personally demoed to every Excel power user)
6. **Team cohesion** for distributed teams (two onsite meetings over 22 months)
7. **Continuous technical debt** management (don't defer it - you'll pay with interest)
8. **Meaningful success metrics** beyond just "migrated" count (usage and NPS matter)

Treat this migration as your chance to reimagine your product without the baggage of legacy decisions. Your customers - and your engineering team - will thank you.

Over 22 months, we proved that methodical, customer-centric migrations work. The cohort that took 3 months to plan and 2 weeks to execute taught us more than any amount of internal testing could have. And by the time we reached our final cohorts, we had a battle-tested process that made the impossible feel routine.

The fact that we wouldn't change anything if we could do it over? That's not because we had perfect foresight - it's because we built feedback loops into every stage, stayed close to our customers, and adapted as we learned. Your migration will teach you different lessons, but the principles remain the same: start small, communicate constantly, simplify ruthlessly, and treat it as a journey, not a death march.

---

*What lessons have you learned from major product migrations? Share your experiences in the comments below.*