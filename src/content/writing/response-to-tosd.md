---
title: "Same Destination, Different Routes: A Response to Time-Oriented Software Development"
description: "Niels Pflaeging and BetaCodex argue we should dissolve dev teams and organize around time. I argue AI is about to do that for us. We're both right."
date: "2026-02-20"
tag: "Musing"
excerpt: "Niels Pflaeging's Time-Oriented Software Development framework argues that dev teams are the problem and time-boxing is the solution. My recent series argues that AI collapses the build cycle and naturally reshapes teams. We're converging on the same conclusion from opposite directions, and the combination is more compelling than either take alone."
---

## Two Conversations, One Conclusion

Niels Pflaeging recently shared two pieces with me that stopped me in my tracks. The first is [BetaCodex White Paper #26](https://betacodex.org/white-papers/paper/introducing-time-oriented-software-development-26), which introduces Time-Oriented Software Development (TOSD). The second is his Substack piece, ["Placing Software Development in the Hands of Development Teams Is a Bad Mistake."](https://nielspflaeging.substack.com/p/placing-software-development-in-the)

I'd just finished publishing a [three-part series](/writing/beyond-agile) on how AI is reshaping product teams. Reading Pflaeging's work felt like finding someone who'd been digging a tunnel from the other side of the mountain and broken through to the same cavern.

We agree on almost everything that's broken. We disagree on why it's finally going to change. I think we're both right, and the combination is more interesting than either argument alone.

## Where We Agree

The diagnosis is almost identical.

**Agile drifted from its principles.** Pflaeging calls out the movement for producing "little progress in how software development is organized" while getting lost in peripheral debates about story formats, scaling frameworks, and role definitions. In [Beyond Agile](/writing/beyond-agile), I make the same argument: we kept the vocabulary and lost the philosophy. Standups became status reports. Sprints became mini-waterfalls. The manifesto imagined something fast and human. We built something slow and bureaucratic.

**The real bottleneck is coordination, not code.** Pflaeging cites Harvard research showing that coding isn't the limiting factor. Requirements gathering, design decisions, code review, testing, deployment, and cross-team coordination are where the time goes. I've been arguing the same thing from the AI angle: when code automation compresses the build cycle, the bottleneck shifts from "can we build it" to "should we build it." Same observation, different lens.

**Sprints create artificial batching.** TOSD proposes strict time-boxing of 1 to 3 days per item, with one day being ideal. My series argues for continuous flow over sprint boundaries. We're both rejecting the two-week batch as an arbitrary constraint that creates waiting, but Pflaeging is more prescriptive about the alternative.

**Roles serve the process, not the work.** Pflaeging wants to eliminate Scrum Masters and Product Owners entirely. I argue that AI compresses those roles naturally because smaller teams need less coordination overhead. Different mechanism, same outcome: the roles that exist to manage complexity disappear when you reduce the complexity.

**Developers should be business people.** This is Pflaeging's most provocative point. Dissolve dev teams. Embed developers in business-focused cells. Make them "business people who happen to develop software" with direct responsibility for customer outcomes. In [The New Team](/writing/the-new-team), I argue the inverse: PMs and designers are becoming builders. We're converging on the same blurred boundary from opposite directions.

## Where We Diverge

The divergence isn't in the destination. It's in the mechanism.

**Pflaeging's solution is structural.** Reorganize around time. Dissolve teams. Create business cells. Replace coordination roles with an "OK Point" handshake between conceptualization and realization. The change is organizational and deliberate. You redesign the org chart.

**My argument is technological.** AI collapses the build cycle. When one person can do what used to take a squad, teams naturally shrink. When the build time drops from weeks to hours, sprint boundaries stop making sense. When PMs can prototype directly, the handoff chain shortens by itself. You don't redesign the org chart. The org chart redesigns itself because the economics changed.

This is a meaningful difference. Structural change requires leadership buy-in, organizational courage, and a willingness to break familiar patterns. Technological change just happens. Companies don't decide to adopt AI-driven development the way they decide to restructure their teams. The tools show up, people start using them, and the old structures start feeling unnecessary.

Pflaeging is arguing that we should change how we organize. I'm arguing that we're going to have to, because the tools are making the current structures obsolete regardless of whether leadership wants them to change.

## Where The Combination Gets Interesting

Here's what I think is most compelling: Pflaeging's framework explains *why* the current structures don't work. AI explains *why the timing is right* to finally change them.

TOSD has been around as a concept, but structural reorganization is hard to sell when the existing structures, however inefficient, produce software that ships. "Your teams are organized wrong" is a tough pitch when the teams are hitting their sprint commitments. The counterargument is always: "It's working well enough. Why take the risk?"

AI removes that counterargument. When a three-person team with code automation can outship a ten-person squad with sprints, the "well enough" defense collapses. The structural change Pflaeging advocates isn't just theoretically better anymore. It's becoming economically necessary.

Think about it from a competitive standpoint. If your competitor adopts a TOSD-like structure with AI-enabled builders, they're shipping faster, spending less on coordination, and getting closer to customer problems. Your ten-person squad with two-week sprints and a Scrum Master isn't competing on features anymore. It's competing on overhead.

Pflaeging's principles also solve a problem I flagged in my series: if everyone can build, who maintains the codebase? His "OK Point" handshake between conceptualization and realization is a lightweight quality gate that doesn't require heavyweight process. Combined with the architect role I described in The New Team, you get a model where building is fast and decentralized but quality is still governed by someone who owns the system.

## The Part Neither of Us Has Figured Out

I'll be honest about where both arguments get thin: the transition.

Pflaeging's structural approach requires organizations to fundamentally rethink how they're set up. That's a massive change management challenge. Most companies won't do it voluntarily.

My technological argument assumes that AI adoption will force the change naturally. But "naturally" can mean "painfully and slowly, with a lot of resistance." The fact that a better structure exists doesn't mean companies will adopt it. Plenty of organizations still run waterfall in 2026.

The real question isn't whether the future looks like what Pflaeging and I are both describing. I think it does. The question is how long the messy middle lasts, and how many organizations cling to the old structures while their competitors move on.

I suspect the answer is: the companies closest to their customers will change first, because they'll feel the competitive pressure most directly. The companies insulated by enterprise contracts and switching costs will change last. And the ones in between will change when they start losing deals to smaller, faster teams that are organized around outcomes instead of process.

## What I'd Add to TOSD

If I could contribute one idea to Pflaeging's framework, it would be this: the "OK Point" handshake doesn't have to be between two humans anymore.

In the TOSD model, conceptualization and realization are separated by a handshake where someone defining the requirement confirms alignment with someone implementing it. That's a good pattern. But when the person conceptualizing can also realize the work through code automation, the handshake becomes internal. The PM thinks about the problem, directs AI to build it, reviews the output, and iterates. Conceptualization and realization happen in the same session, by the same person.

That doesn't eliminate the need for quality gates. You still need the architect reviewing the system. You still need design review for user experience. But the primary loop, the one that used to require a ticket, a sprint, and a handoff, can now happen in a single sitting.

TOSD's time-boxing principle of 1 to 3 days per item aligns perfectly with this. When a PM can conceptualize and realize a feature in one day, the time box isn't a constraint. It's the natural cadence.

## The Bigger Picture

What excites me about reading Pflaeging's work alongside my own is that the convergence suggests something real is emerging. When people coming from organizational theory and people coming from AI-assisted development land on the same conclusions independently, it's not a coincidence. It's a signal.

The signal is: the way we've organized software development for the past twenty years was a response to constraints that are disappearing. Expensive code, large teams, long build cycles, heavy coordination. Remove those constraints and the organizational structures built around them stop making sense.

What replaces them is smaller, faster, more autonomous units of work. People who are close to customer problems, empowered to build solutions, and held accountable for outcomes rather than output. Whether you call it TOSD or code automation or the new team or something else entirely, the direction is the same.

The structures are dissolving. The question is whether you're leading the change or waiting for it to happen to you.
