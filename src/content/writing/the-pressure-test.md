---
title: "The Pressure Test"
description: "Planning used to be the part of engineering you skipped. With AI, it's the part that matters most."
date: "2026-04-14"
tag: "Musing"
excerpt: "I've been shipping three to five days of work per evening on a real project and the bottleneck isn't typing speed or context length. It's whether I spent ten minutes pressure-testing the plan before I started. The agents that stress-test my design have become the single highest-leverage part of my workflow - and the one I almost skipped the first time."
---

Last night I shipped Release B of [Green Building Gamer](/work/green-building-gamer) in about three hours. It's a project I'm building with DNICHE Partners - their idea, their design, my build. The release was scoped as six working days of work. A new Lightning Round game mode, 87 new T/F questions, five database migrations, a separate leaderboard system, firm-branded PDF reports. Everything built, tested, committed, deployed to production. One evening.

This isn't me bragging about Claude Code. A lot of that six-day estimate was padding - a real development team would have shipped it in three. But even three days compressed into three hours is a 10x multiplier, and I can feel what the multiplier actually comes from.

It isn't the code generation. It isn't the typing speed. It's the planning.

## The Bottleneck Moved

For most of my engineering career, planning was the part you tried to get through fast. The velocity-positive move was to stop debating and start coding, because the plan was going to change anyway and the only way to learn what was actually hard was to hit the hard parts. Design docs were tax. Architecture diagrams were theatre. You wrote the code and the code told you where the plan was wrong.

That calculus stopped working for me around six months ago. With AI doing most of the implementation, I found the binding constraint had moved. The 10x acceleration in code production didn't translate into a 10x acceleration in shipped features - because the limiting step was no longer typing. It was "what exactly are we building and in what order and what are the dependencies and what breaks first."

The human bottleneck shifted from execution to direction. Which is historically the part of the job that gets the least formal tooling.

## What a Pressure Test Is

Here's what I actually do now when I start a non-trivial feature. I'll describe it for the Release B build specifically, because the receipts are fresh.

Step one is I write up what I think I'm building. Just a bulleted scope. "Three features: Lightning Round, firm-branded PDFs, grandmaster badges. Here's my rough schema, here's the route list, here's the effort estimate." Five minutes of thinking, no more.

Step two is I ask four or five clarifying questions to the user - the human who wants this built. Things I genuinely don't know that would change the plan. "Should Lightning Round count toward the main leaderboard?" "Do you want firm logos uploaded via admin UI or via direct URL paste?" "What's the minimum session length that should count toward CEU hours?" I get opinionated answers back and write them down as "locked-in decisions."

Step three - and this is the step I didn't do the first time I used Claude Code, and it cost me - I hand the whole thing to a Plan agent and ask it to pressure-test. Not to build it. Not to refine it. To tear it apart. "Here's my design. Flag architectural issues, missing pieces I haven't accounted for, better alternatives, security concerns, and tell me if my effort estimates are realistic."

The Plan agent for Release B came back with a review that reshaped the whole build. Specifically it caught that my original plan assumed duel scoring points were persisted in the database. They weren't. I'd written the scoring function six weeks earlier but the answer route only returned the points to the client - nothing saved them. My leaderboard RPC would have aggregated zeros. I would have shipped a broken feature and only noticed when I tested it end-to-end.

It also caught that duels never set `completed_at`. I'd never built a duel completion endpoint. The quiz flow had one, but the duel flow didn't. Three features I wanted to ship - CEU hours filtering, leaderboard aggregation, the Grandmaster Defeated badge - all depended on that timestamp being set. If I'd started implementation without the pressure test, I'd have built features one at a time, hit the `completed_at is null` problem on the third one, and had to rip out and redo work.

And it caught that my idea to mechanically convert existing MCQs into True/False statements was going to produce awful content. "Which of the following is NOT..." doesn't invert. Numeric answers ("3 points" vs "5 points") become tautological. "All of the above" has no meaning as a standalone statement. I would have generated 300 garbage T/F questions, tried to play the game, realized the content was unusable, and spent half a day clawing it back.

Those three catches, found in one pressure test, were worth 4-6 hours of avoided rework. The pressure test itself took 10 minutes of my time and about $0.40 of API cost.

## Why It Wasn't Obvious

When I first started using Claude Code seriously, I resisted the planning phase because it felt like friction. "I have a capable AI engineer available immediately, why am I spending time writing documents at it instead of just telling it what to build?" That instinct is correct in every other context of my career. With a human team, the move is to start building. The plan is worthless the moment you write it.

What I missed is that the plan's value scales inversely with how fast you can execute. When execution takes weeks, the plan is going to be stale and wrong by the time you build against it, so it's not worth sweating. When execution takes hours, the plan is still fresh when you need it, so investing 20 minutes in making it right returns 4 hours in avoided rework.

There's a deeper reason too. When I'm executing, I'm in "make it work" mode. I'm focused on the current file, the current function, the current test. I don't have the headspace to ask "wait, is my whole data model wrong?" But when I'm planning, I do have that headspace - especially when I have an agent whose entire job is to question my assumptions. The pressure test isn't just a bug catcher. It's an enforced mode switch into architectural thinking that I wouldn't do otherwise.

## What the Plan Agent Actually Does

I'm going to be specific about this because I think the value is hidden in the details.

The Plan agent is not smarter than me about the project. It doesn't know the codebase the way I do. It can't see what I've been looking at for the last hour. What it can do is read my plan fresh, with no prior context, and react to it the way a new senior engineer would if you handed them a design doc cold.

That fresh-read perspective is worth something I can't generate from inside my own head. When I've been living in a codebase for weeks, I stop noticing assumptions I've baked in. The Plan agent reads "on duel completion, check the session score" and asks "how are you computing the session score - is it stored somewhere?" I know how it's stored. I wrote the function. But the agent didn't write the function, and its question exposes that the function's output never gets saved. A fresh pair of eyes is the oldest engineering tool there is and AI gave me one on-demand.

The other thing the Plan agent does well is effort estimation. When I say "Lightning Round game UI, 1.5 days," the agent says "1.5 days doesn't account for swipe gesture tuning across mobile and desktop, content authoring you haven't budgeted, or QA time for the new question type." It doesn't disagree with my architecture, it just disagrees with my schedule. Every time, it's right. I'm a systematic optimist about scope and a systematic pessimist about risk. The agent is neither, so its estimates are less wrong than mine.

## The Workflow That Fell Out

Here's what my workflow actually looks like now for a non-trivial feature:

- **10 min** - write rough scope + 4-5 clarifying questions for the human
- **5 min** - human answers, I lock in the decisions
- **10 min** - launch a Plan agent, hand over the scope + context, request a pressure test
- **5 min** - read the review, decide which criticisms to incorporate and which to dismiss, update the plan
- **Everything else** - execution

Planning is ~30 minutes of a multi-hour session. That used to feel like a lot. Now it feels like the cheapest 30 minutes in the whole workflow, because every minute I spend there saves me 15 minutes of undoing work I shouldn't have started.

The execution time is bounded below by real-world constraints - migrations have to apply, CI has to run, builds have to compile, the human has to test. But execution time above the floor is almost entirely a function of how wrong the plan was. A good plan runs clean. A bad plan runs and then gets rewritten and then runs again and then gets patched and then the tests reveal something and the dependencies get restructured and suddenly it's 2am and you have a branch full of commits you're not proud of.

## The Broader Pattern

I don't think this is specific to Claude Code. I think it's a general shape of the AI-accelerated craft. Whatever your tool is - code, copy, design, legal drafting, research - the same compression is happening. Execution is getting cheap. Direction is still expensive. The leverage moves to whoever can hold the highest-quality plan in their head and stress-test it fastest.

And that's oddly good news for experienced people. Pressure-testing a plan is a skill you only get by being wrong a lot. The thing a Plan agent does in 60 seconds is a compressed version of what a senior engineer learns by shipping twenty broken features. If you have 15 years of scar tissue from ambitious plans that fell apart, you already know which questions to ask. You just couldn't ask them fast enough before.

Now you can.

I'd been holding back on a few of my more ambitious personal projects because the planning overhead was killing me. "Do I really want to spend a week architecting this before I know if the idea is any good?" With a pressure-test loop, the answer is yes - because the architecting is 30 minutes, not a week. And the 30 minutes is what makes the next few hours not be wasted.

If you're using AI coding tools and you're frustrated that the speed boost hasn't translated into more ambitious projects, try this. Write your next plan. Hand it to an agent. Ask it to tear the plan apart. Tell it to be specific about risks and effort. Read the review. Fix what you agree with. Then start building.

You'll ship more in one evening than you did last week. Not because you type faster. Because you started from the right place.
