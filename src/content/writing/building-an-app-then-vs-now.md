---
title: "Building an App in 2018 vs 2026: $18K and 20 Months vs $354 and 24 Days"
description: "I built the same type of app twice - once with a team, a grant, and a year and a half of planning, and once alone with AI in under a month. Here's what changed."
date: "2026-03-01"
tag: "Case Study"
excerpt: "In 2018, four of us spent $18,000 and 20 months building an iOS app called Flusher. In 2026, I spent $354 and 24 days building Brown Note - a more complex app, on both platforms, by myself. Both apps were born from the same disease. The difference is what happened in between."
---

## Same Disease, Two Apps, Eight Years Apart

I have Crohn's Disease. It's a chronic inflammatory bowel condition that, among other things, means I spend a lot of time in the bathroom. It's isolating, it's frustrating, and it's not something most people talk about.

In 2017, that frustration turned into an app idea. In 2026, it turned into another one. Both apps were motivated by the same problem - helping people find dignity and support when dealing with digestive conditions. But the experience of building them could not have been more different.

This is the story of building the same type of product twice, eight years apart, and what it says about how the economics of building software have changed.

## Flusher: The 2018 App

![Flusher login screen](/images/writing/flusher/login.png)
*The Flusher login screen - clean toilet logo, teal accent, straightforward auth*

![Flusher map view](/images/writing/flusher/map.png)
*Washroom pins across downtown Toronto - the core experience*

![Flusher map zoomed in](/images/writing/flusher/map_location.png)
*Zoomed into the Yonge-Dundas area showing nearby washroom locations*

![Flusher washroom preview](/images/writing/flusher/map_washroom_preview.png)
*Tapping a pin showed the washroom name, building, and accessibility features*

![Flusher washroom details](/images/writing/flusher/washroom_details.png)
*The detail screen - cleanliness ratings, wait times, and user notes*

Flusher was a mobile app for finding accessible public washrooms. The idea was straightforward: you're out in the city with a digestive condition, you need a bathroom *now*, and you want to know where the nearest clean, accessible one is. The app would map public restrooms, let users rate and review them, and eventually let people list private bathrooms for a small fee.

### The Team

There were four of us working through a small company. We each brought something different. One co-founder led the project and handled operations. Another did UX research and design. The third brought technical chops. And I was the product person with the lived experience that motivated the whole thing.

### The Grant

In November 2017, we were accepted into Ryerson University's Accessibility Project through The Chang School of Continuing Education. The grant funded development of accessibility-focused technology. We were thrilled - one co-founder's email when the acceptance came through was just "OMG!!!!"

The total funding was **$18,000**.

### The Timeline

Here's how those 20 months actually played out:

| When | What Happened |
|------|---------------|
| **Aug 2017** | Brainstorming phase. One co-founder built a UXPin mockup. Another compiled Toronto park washroom data into spreadsheets with GPS coordinates. We kicked around names - Poo-go, Shittr, RimTouchr - before landing on Flusher. |
| **Oct 2017** | Created a Trello board. Started organizing tasks. |
| **Nov 2017** | Grant approved. Launched flusher.co with a Mailchimp signup. Set up G-Suite email addresses. |
| **Jan 2018** | Monthly planning meetings began. Every second Saturday, 11am to 2pm, four people on a call. Our designer shared a first wireframe draft. Our project lead submitted the scope and budget to Ryerson. The team zeroed out our own hourly rates to redirect more money to the development budget. |
| **Mar 2018** | First milestone slip. "Basically everything is a month out from the previous estimates." Signed terms with Ryerson. |
| **Apr 2018** | First formal status report submitted to Ryerson. |
| **Jun 2018** | Email to the team: "To be candid... we're way behind schedule." Development timelines pushed to late summer/fall. Second milestone slip. |
| **Sep 2018** | Hired an outside developer. Approved for the Apple Developer Program. Pivoted user research from online surveys to in-person interviews. |
| **Nov 2018** | Last Trello activity. |
| **Apr 2019** | A writer from *Gastroenterology and Endoscopy News* reached out for an interview and screenshots. The app existed, it was real, it was in the App Store. But it didn't stay there long. |

Twenty months. Four people. $18,000. Monthly status reports to a university. Three documented timeline slips. And an app that made it to the App Store but eventually faded away.

I want to be clear: this isn't a failure story. The team was talented and committed. Our project lead was incredible. The UX research was thorough. The technical instincts were sharp. We built a real thing, and a medical publication wanted to write about it. The problem wasn't the people. It was the process. In 2018, this is just what building an app looked like.

## Brown Note: The 2026 App

![Brown Note login screen](/images/writing/brown-note/IMG_0041.PNG)
*Brown Note login - social sign-in, warm brown palette, a toilet with a personality*

![Brown Note dashboard](/images/writing/brown-note/IMG_0035.PNG)
*The dashboard - streak tracking, nugget balance, and two clear CTAs: post a message or help someone*

![Brown Note compose screen](/images/writing/brown-note/IMG_0036.PNG)
*Writing a note - 500 characters, attach a sticker, send it to someone who needs it*

![Brown Note inbox](/images/writing/brown-note/IMG_0037.PNG)
*The inbox - real messages from real people dealing with real stuff*

![Brown Note sticker store](/images/writing/brown-note/IMG_0038.PNG)
*The sticker store - spend Nuggets on collectibles like "Classic Pile" and "GI Joe"*

![Brown Note sticker unlock](/images/writing/brown-note/IMG_0040.PNG)
*Unlocking "The Porcelain Paladin" - rare stickers with burst animations and haptics*

Brown Note is a peer support app for people with IBS, Crohn's, and other digestive conditions. You're stuck on the toilet feeling alone, so you write an anonymous message. It gets delivered to someone in the community who writes back with encouragement. No profiles, no medical records - just one person saying "I get it" to another.

It has a gamification layer. Nuggets (points) for helping others, a sticker shop, achievement unlocks, daily streaks - all wrapped in a warm, slightly silly aesthetic that leans into the poop humor. Because sometimes the best way to cope with a serious disease is to not take yourself too seriously.

### The Team

Me. And Claude.

I acted as PM and tech lead - making architecture decisions, reviewing every line of code, testing on physical devices, and providing all the domain knowledge and product taste. Claude wrote roughly 90% of the code. I've written about that dynamic in detail in my [Brown Note case study](/writing/building-brown-note).

### The Budget

| Item | Cost |
|------|------|
| Claude Max subscription (2 months) | $200 |
| Apple Developer Program | $99 |
| Google Play Developer | $25 |
| Railway hosting | ~$15 |
| Domain (brownnote.app) | ~$15 |
| SendGrid, Stripe, Expo | $0 (free tiers) |
| **Total** | **~$354** |

### The Timeline

| When | What Happened |
|------|---------------|
| **Jan 21** | First commit. Started building the Django backend. |
| **Feb 7** | REST API stable - 26 endpoints, JWT auth, moderation system, 95 automated tests. Started the React Native mobile app the same day. |
| **Feb 11** | Mobile app complete - 13 screens, state management, animations, haptics. |
| **Feb 13** | Social sign-in (Google + Apple), push notifications, privacy policy. |
| **Feb 15** | Submitted to the App Store. |
| **Feb 17** | Android internal testing link sent to friends. |
| **Feb 18** | First App Review rejection. Fixed and resubmitted same day. |
| **Feb 20** | Approved. "Welcome to the App Store." |

Twenty-four days. One person. $354. No status reports. No milestone documents. No planning meetings. And an app that's live on both iOS and Android with a full backend, push notifications, and a gamification system.

## The Numbers Side by Side

| | Flusher (2018) | Brown Note (2026) |
|---|---|---|
| **Time to app store** | ~20 months | 24 days |
| **Team size** | 4 + contractor | 1 + AI |
| **Total cost** | $18,000 | ~$354 |
| **Platforms** | iOS only | iOS + Android |
| **Backend endpoints** | Unknown | 26 REST endpoints |
| **Automated tests** | None documented | 95 |
| **Status reports filed** | 4+ to Ryerson | 0 |
| **Timeline slips** | 3 documented | 0 |
| **App Store rejections** | Unknown | 1 (fixed same day) |

That's roughly a **50x cost difference** and a **25x time difference**. And the 2026 app shipped more.

## Side by Side: The Apps Themselves

The numbers tell one story. The screenshots tell another.

Both apps open with a login screen featuring a toilet. Both have a teal/brown color palette. Both were built by the same person with the same disease for the same community. But look at what $18K and a team of five got you in 2018 versus what $354 and a solo builder got you in 2026.

Flusher's login is clean - email, password, a toilet icon. Brown Note's login has social sign-in (Google and Apple), a tagline, and a character with a face on the toilet. Small thing, but social auth alone would have been a significant chunk of Flusher's development budget.

Flusher's core screen is a map with pins. It does one thing and does it well - shows you where bathrooms are. Brown Note's dashboard has a streak counter, a nugget balance, recent replies, and two action buttons. It's a full engagement loop on a single screen.

Flusher's detail screen shows cleanliness ratings and wait times for a single washroom. Brown Note's inbox shows 15 messages from people dealing with Crohn's flares, food anxiety, and exhaustion. One app maps toilets. The other maps human connection.

And then there's the sticker store. Flusher didn't have anything like it because gamification features would have added months to an already-slipping timeline. Brown Note has a full collectible economy with common, rare, and legendary stickers - "Classic Pile," "GI Joe," "The Porcelain Paladin" - with unlock animations and haptic feedback. In 2018, that's a feature you cut to ship. In 2026, it took an afternoon.

The point isn't that Brown Note is a "better" app. They solve different problems. But the depth and polish that's possible when one person can build without constraints - that's new.

## What Actually Changed

It's tempting to say "AI" and leave it at that. And yes, having an AI engineer that can produce clean, tested code on demand is the single biggest factor. But the shift is more nuanced than that.

### The planning tax disappeared

With Flusher, we spent months on activities that weren't building: writing project scopes, revising budget spreadsheets, submitting status reports, scheduling and attending planning meetings, researching clone apps, drafting RFPs for developers, interviewing contractors.

None of this was wasted effort in context. We had a grant with reporting requirements, and coordinating four people requires structure. But it meant that the vast majority of those 20 months were spent on everything *around* the code. The actual building was a fraction of the timeline.

With Brown Note, I just... built it. When I had a question about architecture, I thought about it and made a decision. When I needed a wireframe, I described what I wanted and it appeared as working code. The feedback loop went from weeks to minutes.

### The hiring bottleneck vanished

Flusher didn't have a developer for almost a year. The team spent months researching outsource coding services, exploring platforms like CodementorX, and eventually hiring a contractor. That single dependency - "we need someone who can write code" - dominated the timeline.

In 2026, that bottleneck doesn't exist. AI can write the code. The constraint shifted from "can we find and afford a developer" to "do I know what I want to build." Product thinking became the limiting factor, not engineering capacity.

### The cost of experimentation collapsed

At $18K with a grant and reporting requirements, every decision carried weight. Pivoting the user research approach from surveys to interviews warranted a paragraph in a status report. Adjusting the budget by $1,000 required a revised spreadsheet submitted to the university.

At $354, I could try things and throw them away. The Django web app was built first as a monolith, then I added a REST API layer alongside it, then I built the mobile app against that API. If any of those steps hadn't worked, I'd have lost days, not months or thousands of dollars.

### What didn't change

The hard parts of building a product are exactly the same in 2026 as they were in 2018:

- **Knowing what to build.** AI can write code, but it can't tell you that people with IBS need encouragement at 2am on the toilet. That comes from lived experience.
- **Taste.** The warm-cream-and-brown aesthetic, the poop humor, the decision to reward kindness instead of suffering - those are human judgment calls.
- **The unglamorous details.** Figuring out that `railway.json` overrides `Procfile`. Learning that Apple requires Developer Mode enabled on test devices. Discovering that expo-notifications changed its API in SDK 54. None of this is in any tutorial, and none of it is intellectually hard, but all of it will stop you cold.
- **Shipping.** The gap between "it works on my machine" and "it's in the App Store" is still a slog of screenshots, metadata, review rejections, and privacy policies. AI helps with the code, but you still have to push through the last mile yourself.

## The Uncomfortable Implication

Here's what I keep coming back to. Flusher wasn't a failure of effort or talent. Four smart, motivated people worked on it for almost two years. They secured funding from a university. They hired a developer. They shipped an app. By any reasonable 2018 standard, that's a success story.

But by 2026 standards, the entire Flusher project - the grant application, the team coordination, the monthly reporting, the contractor search, the $18,000 budget - could be replaced by one person with a $100/month AI subscription and three weekends.

That's not a commentary on the people involved. It's a commentary on how fast the floor has dropped out from under the cost of building software. The skills that mattered in 2018 - coordinating teams, managing budgets, writing status reports, hiring developers - are still valuable in many contexts. But for getting a product from idea to app store, they've been largely automated away.

The new bottleneck is product sense. Knowing what to build, for whom, and why. Having the taste to make it feel right and the conviction to ship it. Everything downstream of those decisions has gotten 50x cheaper and 25x faster.

## The Part That Actually Matters

Both of these apps were built for the same reason: to help people with Crohn's Disease. Flusher wanted to help them find a bathroom. Brown Note wants to help them feel less alone while they're in one. Both came from the same lived experience - mine - and the same frustration that nobody was building for this community.

Here's the thing about niche health products: they almost never make financial sense. Crohn's Disease affects maybe 1 in 300 people. IBS is more common, but the overlap of "has a digestive condition" and "would download an app about it" is a small market. When it costs $18,000 and two years to build, you *have* to think about recouping that investment. You need a revenue model, a growth strategy, a path to sustainability. The grant itself required milestones, budget justifications, and quarterly reporting - because $18K is real money that needs to be accounted for.

At $354, none of that math applies. Brown Note doesn't need to make money. It doesn't need to "scale." It doesn't need a business model that justifies the investment, because there's barely an investment to justify. It can just exist - a small, warm, slightly silly app that's there for someone at 2am when their Crohn's is flaring and they feel completely alone.

That's the real shift. Not just that apps are cheaper and faster to build, but that the barrier to entry has dropped so low that products can exist purely to create value in the lives that need them. No grant applications. No investors. No break-even analysis. Just someone who understands a problem, building something to help.

There are thousands of small, underserved communities like the Crohn's and IBS community - people with rare diseases, niche accessibility needs, invisible conditions that don't have enough market size to attract venture capital. In 2018, building for them required institutional support. In 2026, it requires a weekend and a willingness to ship.

If you've been living with a problem that nobody's building for - that's not a market gap anymore. It's an invitation.
