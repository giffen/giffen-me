---
title: "The App That Won't Ship: Why Love Will Tear Us Apart Is Stuck"
description: "An 8-bit proximity app that plays a song when you're near someone you care about. The concept is simple. Shipping it is not."
date: "2026-04-16"
tag: "Reflection"
excerpt: "I've been building an 8-bit app that plays a song when you're near someone you've designated a lover, a friend, or an enemy. The concept is charming. The build is stuck. Here's why proximity is the hardest product surface I've worked on, and why I'm still going to finish it."
---

## The Pitch

Two phones. Two people. One song.

When you get within a certain distance of someone you've designated — a lover, a friend, an enemy — your phone plays the song you've picked for them. Joy Division for your ex. "Eye of the Tiger" for the guy in the next cubicle. Something soft for your partner. The app is 8-bit, pixelated, deliberately unserious. It is not an AI app. It does not summarize anything. It does not have a chat bubble.

It plays a song when you walk up to someone.

That's the whole product.

## Why I Wanted To Build It

Most of what I've shipped this year has an AI story stapled to it. That's fine — the tools are genuinely transformative and the case studies write themselves — but the risk of writing only about AI is that every project starts to look the same. Another agentic workflow. Another prompt harness. Another essay about taste vs. execution.

Love Will Tear Us Apart is a break from that. It's dumb in the best sense. It doesn't solve a workflow problem, it doesn't save you time, it isn't a productivity tool. It's a small physical delight. You walk up to your person, and a song plays. That's it. That's the joke. That's the feature.

I want to be the guy who ships weird specific things, not just the guy who ships AI things. So I picked something that had no path to looking like a ChatGPT wrapper, because even the idea of one felt like a tell.

## Why It's Stuck

You cannot test a proximity app alone.

That sentence sounds obvious. It is not. When you build almost anything else — a CRUD app, an API, a mobile UI — you can sit at your desk, iterate in tight loops, and the only variable is your code. Proximity is different. To test whether the trigger fires, you need:

1. A second phone with the app installed.
2. A second person holding that phone.
3. Actual physical distance between you and them.
4. Patience for both of you while the location services settle.
5. Willingness to do that loop again every time you change something.

I have a baby. I have evenings. I do not have a second person who wants to stand 40 metres away from me in the park while I debug a BLE fallback for the fifteenth time.

That's the first reason it's stuck. But it's not the biggest one.

## The OS Is Hostile To The Use Case

Mobile operating systems are designed to prevent exactly this kind of app from running well.

Both iOS and Android aggressively throttle background location services, kill apps that try to stay resident, and hide the behaviours that matter most (how often your app wakes up, how accurate the location fix actually is) behind probabilistic APIs that change between OS versions. Geofencing APIs exist, but they're optimised for "notify me when I arrive at a Starbucks" — not "check continuously whether another moving target is nearby."

The realistic architectures are all bad:

- **Continuous foreground location**: works, kills your battery in a morning, gets you flagged on the store listings.
- **Geofence around the other person's live location**: requires a server relaying their position, creates a privacy surface you have to defend, and the update cadence is sluggish on battery-saving modes.
- **Bluetooth Low Energy peer discovery**: works at close range, doesn't need the server, but both phones need the app in the foreground or with very specific background entitlements. Not reliable in real conditions.
- **Hybrid of the above**: what you actually want. Also the most code and the most edge cases.

Every one of those paths has a failure mode that only shows up when you test with two people in the real world. Which you can't easily do, for the reason above. It's a chicken-and-egg loop: I can't validate the architecture until I test it, and I can't test it cheaply enough to iterate.

## Music APIs Don't Want This Product To Exist

Here is the other part I didn't anticipate.

The mental model is "I tap a song in the app, and when we meet, it plays." The reality is that neither Spotify nor Apple Music makes it easy to play an arbitrary track on demand from another app.

- **Spotify** requires the user to have Premium, the app installed, active playback context, and an active device. If any of that isn't true, the play call silently does nothing. There is no graceful fallback. The UX becomes "the song was supposed to play but didn't, and you have no idea why."
- **Apple Music** is better, but only on iOS, and the MusicKit authentication flow is its own small swamp. Subscription-gated content means you have to handle the case where the user doesn't have Apple Music. Which is most users.
- **Local audio files** work perfectly. But "pick your song" from a library of things you already own is a worse experience than "pick your song from the thing you already use."

The cleanest path is probably: start with local audio only, ship that, and add streaming as a second-class option later. That's what the lab notes say. But shipping local-audio-only turns the pitch from "your song plays" into "a song you downloaded and uploaded to the app plays," and that's a meaningfully worse product.

## The UX Edge Cases Are Mean

Even if the location and audio layers worked, the UX has questions I haven't answered:

- **How close is close?** 5 metres is "we can see each other." 50 metres is "we're in the same square." 500 metres is "we're in the same neighbourhood." Each value changes what the app feels like. I haven't picked one.
- **Does it re-trigger?** If we stand together for an hour, does the song play once? Every 5 minutes? Once per day? Getting this wrong turns a delight into an annoyance in about 90 seconds.
- **What about indoors?** GPS accuracy falls apart in buildings. Two people in the same office building might never trigger. Two people in adjacent buildings might trigger constantly.
- **Who consents to what?** "Enemy" is a fun marketing beat until you think about it for 30 seconds. If I designate you my enemy and set Darth Vader's theme to play when I see you, you haven't consented to being tracked. The consent model has to be symmetric or the app is a stalking tool.

Every one of these has a reasonable answer. None of the answers are obvious. All of them need testing with real humans who are not me.

## What "Done" Actually Looks Like

If I were going to ship this properly, here's the shortlist:

1. **Local audio only for v1.** Bundle a handful of royalty-free 8-bit tracks and let the user assign them. Skip the streaming swamp entirely until the core loop is proven.
2. **Symmetric consent.** Pairing is bidirectional. Both people have to tap accept. No unilateral enemy-ing.
3. **BLE-first, location-assisted.** Use Bluetooth proximity as the primary trigger, fall back to geofencing only for the initial "you're in the same area" wake.
4. **Single re-trigger per session.** Plays once when you meet. Doesn't loop. Doesn't nag. Leaves you wanting more.
5. **Test with at least three real pairs of people.** Not me and a second phone in my other hand.

That's a real two-to-three weekend project for someone without a day job, a baby, and several other half-finished ideas. I don't currently have any of those things.

## Why I'm Posting This Anyway

The pattern I want to avoid is the one where every essay on this site is a victory lap. "Shipped it in 24 days." "Shipped it in a weekend." "Shipped it before my kid woke up from his nap." The "guy who ships shit" brand is nice, but it's a lie by omission if I never write about the things that are stuck.

Love Will Tear Us Apart is stuck. Not because the idea is bad — I still think it's delightful — but because the surface is genuinely hard and I haven't committed the time to cut through it. That's a real signal. The projects that ship in a weekend ship in a weekend because their hard parts map cleanly to software. The ones that don't are the ones where the hard parts live in the physical world.

Proximity is physical. Two phones, two people, real distance, real battery drain, real OS throttling. You can't prompt your way past any of that. You have to go outside, with another human, and try it.

I will. Eventually. When I do, there'll be a second post, and it'll either say "here's the build" or "here's why I finally killed it." Either one is an honest ending.

For now, the file stays open in the IDE. The icon design sits in Figma. The lab entry still says `status: backlog`.

That's the real state of most projects most of the time, and pretending otherwise is the biggest story I could tell you.
