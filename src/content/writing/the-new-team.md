---
title: "The New Team: What Product Teams Look Like When Code Is Automated"
description: "When anyone on the team can build, the roles and ratios that defined software teams for decades stop making sense. Here's what replaces them."
date: "2026-02-18"
tag: "Musing"
excerpt: "The old model was clear: PMs write tickets, designers make mocks, engineers build, QA tests. One PM to five or eight engineers. That ratio made sense when code was the bottleneck. It doesn't make sense when code is automated. Here's what the new team looks like."
---

*This is part 3 of a three-part series on how AI is reshaping product management. [Part 1](/writing/beyond-agile) covers why agile needs to evolve, and [Part 2](/writing/the-comet-problem) covers the urgency gap.*

## Code Is Automated. Thinking Isn't.

Let me be precise about what's happening, because the terminology matters.

This isn't "vibe coding." That phrase implies you're just prompting and accepting whatever comes out. That's not what serious builders are doing with AI. What's actually happening is code automation. The thinking, the directing, the product decisions, the architecture choices, those are all still human. But the act of translating those decisions into working code is increasingly automated.

That distinction matters because it reframes the entire conversation about teams. The question isn't "will AI replace engineers." The question is "what happens to team composition when the mechanical act of writing code is no longer the bottleneck."

The answer is: everything changes.

## The Old Model

For the past two decades, software teams have been organized around a basic constraint: code is expensive and slow to produce.

That constraint created the team structures we all know. One PM defines the work. One designer mocks it up. Five to eight engineers build it. QA tests it. The handoff chain is long because each step requires specialized skills, and the engineering step takes the most time and people.

The PM-to-engineer ratio exists because of this bottleneck. You need one person to keep five engineers pointed in the right direction because those five engineers represent the scarce, expensive resource. Story points, sprint planning, backlog grooming, all of it is infrastructure for managing that scarcity.

But what happens when the scarcity disappears?

## The Ratio Breaks

Here's a simple litmus test: what is the effort to ship a product into customers' hands that adds real value?

I built Brown Note, a peer support app with a Django backend, a REST API, and cross-platform mobile apps for iOS and Android, in about three weeks for roughly $350. Push notifications, social auth, a sticker economy, content moderation. A real product for real users.

A solo developer without AI could have built the same thing, but it would have taken months and a lot more grey hairs. A traditional team would have spent weeks just on sprint planning and technical design before writing a line of code.

Three weeks. $350. That's the new math.

And if that's what one person with AI can do, the old ratios don't hold. You don't need five engineers when code automation handles the volume. You don't need a dedicated QA person when AI can generate comprehensive test suites. You don't need a project manager to coordinate handoffs when the handoffs barely exist.

The team gets smaller. But the output doesn't.

## Everyone Becomes a Builder

Here's the part that gets interesting. When code is automated, the barrier to building isn't technical skill anymore. It's understanding the problem.

**PMs as builders.** A PM who can direct AI to build a working prototype doesn't need to write a spec, hand it to engineering, wait two weeks, review the result, write feedback, and wait again. They can go from idea to working software in an afternoon. The spec-to-build-to-feedback loop that used to take a sprint collapses into a single session. That's not a marginal improvement. That's a structural change in how products get made.

**Designers as builders.** A designer who can ship a real interface, not a static mock in Figma, but actual working UI, doesn't need to hand off and hope the engineer interprets the design correctly. They can build the thing, feel it, test it with users, and iterate. The gap between "what I designed" and "what got built" shrinks to zero.

**Stakeholders as builders.** This is the one nobody's talking about yet. When a business stakeholder needs a custom report, a specific workflow, or a one-off tool, they no longer have to submit a ticket and wait for engineering capacity. AI can help them build it directly. Not everything. Not the mission-critical systems. But the long tail of internal tools and custom workflows that clog up every engineering backlog? Those can increasingly be self-served.

The common thread: building is no longer a specialized function. It's becoming a general capability. And that changes what you actually need on a team.

## What Elevates, What Compresses

Not every role changes the same way.

**Senior engineers become architects.** The engineer who understands systems, who can make architectural decisions about scale, security, and reliability, who can review AI-generated code and catch the subtle issues, that person becomes more valuable, not less. The work moves from writing code to designing systems and ensuring quality. AI is great at producing code. It's not great at knowing whether the code will hold up at scale or whether the architecture will paint you into a corner in six months.

**Junior engineering work gets compressed.** The entry-level tasks, implementing a CRUD endpoint, building a standard UI component, writing boilerplate, those are exactly what code automation handles best. This doesn't mean junior engineers disappear. But the path to value shifts. Juniors who can think about systems and architecture early will advance faster. Juniors who define their value by lines of code written will struggle.

**PMs and designers become the new junior engineers.** Not in title, but in function. When a PM can build a working prototype and a designer can ship real UI, they're covering ground that used to require junior engineering headcount. The team doesn't need as many hands on keyboards. It needs more brains on problems.

**Junior PMs get squeezed.** If the PM role shifts from ticket-writing and backlog management to customer insight and strategic betting, the junior PM whose main skill is process management is in a tough spot. The path forward is to get closer to customers faster. Understand the problem deeply. Develop product judgment. The process skills are table stakes now, not differentiators.

## The Three-Person Team

If I were hiring a team to build a product today, here's what I'd want: three people.

**A PM with vision and technical fluency.** Someone who understands the customer problem deeply, can direct AI to build solutions, and has enough technical literacy to make architectural tradeoffs. This person sets the direction, talks to customers, and ships features directly when they can.

**A designer who delights.** Customers have to love using the product. That's a hard problem that AI doesn't solve. AI can generate interfaces, but it can't make someone feel something when they use your app. A designer who understands user behavior, who sweats the details, who can build and iterate on real experiences, that's irreplaceable.

**A technical engineer/architect.** The product has to scale. It has to be secure. It has to be maintainable. Someone needs to own the system, review the AI-generated code, make the infrastructure decisions, and ensure that the fast iteration doesn't create a house of cards. This is senior-level work, and it's more important than ever.

That team of three, with AI handling code automation, can outship a traditional squad of ten. Not because they work harder. Because the coordination costs, the handoff delays, the ceremony overhead, all of it disappears when you're three people in a room who trust each other.

## Singular Vision, Collaborative Execution

I honestly believe that anything with a singular vision is better than something designed by committee. Music, movies, products, websites. They are more interesting, more coherent, and more compelling when there is a strong voice guiding them.

That vision can come from the PM, the CEO, the engineering lead, anyone who understands the customer problem deeply enough to have conviction about the solution. The role doesn't matter. The proximity to the problem matters.

But here's the thing: every vision gets better with collaboration. I know Brown Note would be a better product if I had my team from work pushing me on it. They challenge my assumptions. They think outside my perspective. They catch the things I'm too close to see.

The winning formula isn't a solo genius. It's a strong vision surrounded by people who sharpen it. Voices around a clear direction, close to a real customer problem, with fast feedback cycles. That combination wins every time. AI just makes the feedback cycles faster and the team smaller.

## Strategy Becomes the Scarce Resource

Here's the risk nobody's talking about enough: if everyone can build, who's deciding what should be built?

When code was the bottleneck, the limiting factor was engineering capacity. There was a natural filter: only the highest-priority items made it through the sprint. That filter was blunt and often wrong, but it existed.

When code automation removes that filter, you can build anything. And "we can build anything" without strong strategic direction becomes "we build everything," which is a recipe for unfocused products, feature bloat, and teams that are shipping fast but going nowhere.

This is why the PM role, specifically the strategic PM role, becomes more important in the new model. Someone has to be the filter. Someone has to say "build this, not that" with conviction. Someone has to stay close enough to the customer to know which problems are worth solving and which are distractions.

The teams that thrive in the new model won't be the ones that ship the most. They'll be the ones with the clearest sense of what matters and the discipline to ignore everything else.

## The Best Product People Have Always Been Builders

Here's what I keep coming back to.

The best PMs, the best designers, the best founders have always wanted to get their hands on the thing. They've always been frustrated by the gap between "I know what this should be" and "now I have to wait for someone else to build it." They've sketched on whiteboards, hacked together prototypes in tools that weren't meant for it, learned just enough code to be dangerous. They were builders trapped in roles that wouldn't let them build.

AI removed the barrier.

If you're a PM who's been itching to prototype your own ideas, you can now. If you're a designer who's been handing off mocks and hoping they get built right, you can build them yourself. If you're a founder with a vision and no engineering team, the engineering team is in your terminal.

This isn't a future state. This is right now. The tools exist. The cost is near zero. The only thing standing between you and the thing you've been wanting to build is the old mental model that says you need a team, a budget, and a roadmap first.

You don't. You need a problem you understand, taste in what good looks like, and the willingness to start. The best product people have always been builders at heart. Now they can actually be builders in practice.

So build something.

*This is the final part of a three-part series. [Part 1: Beyond Agile](/writing/beyond-agile) explores why our current processes need to evolve. [Part 2: The Comet Problem](/writing/the-comet-problem) makes the case for urgency.*
