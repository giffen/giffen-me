---
title: "Brown Note"
description: "A peer support app for bathroom isolation - because you're not alone on the throne"
date: "2026-01-15"
status: "complete"
tags: ["mobile", "gamification", "health-tech", "peer-support", "b2c", "community"]
image: "/images/lab/brown-note.png"
featuredImage: "/images/lab/brown-note-feature.png"
liveUrl: "https://www.brownnote.app"
published: true
---

## The Problem

I have Crohn's Disease and have spent a large part of my life in the bathroom. Whether it's prepping for a colonoscopy, my body reacting poorly to Sunday dinner, or my immune system deciding I should slow down and not leave the house—it can be incredibly frustrating and lonely spending so much time by yourself on the toilet.

Brown Note is a note-passing app designed to connect people with IBS in their moments of need. Send a note from the throne, and it gets randomly delivered to another member who can reply with words of encouragement. Simple as that.

## Learning Goals

This project is a departure from my usual B2B work. I want to explore:

- **B2C with gamification**: Leaderboards, energy systems, sticker collections, and reward loops that drive engagement without exploiting users
- **Delivery algorithms**: Routing messages to the right people at the right time with a small user base is a fascinating constraint
- **Mobile development**: This will be my first mobile app, alongside a web version

## Design Philosophy

The experience should feel like passing a handwritten note—something tactile and delightful. Rich colors, classic novel-style typography, and a writing UX that makes you *want* to craft a message.

Stickers are central to the gamification. Users earn points through engagement (writing notes, responding, daily check-ins) and spend them in a sticker shop. There are also milestone stickers for membership duration and receiving positive feedback. When you unlock something or receive a message, the app should absolutely spike your dopamine.

The vibe is intentionally silly. IBS is a serious disease, and sometimes the best way to cope is through poop jokes and a supportive community that gets it.

## Key Challenges

Building this responsibly means tackling some tricky problems:

1. **The cold start problem**: Early on, you need replies to feel fast. Solutions include volunteer "Lifeguards," smart routing to active users, and optional AI fallbacks.

2. **Moderation at scale**: Anonymous note-passing can go sideways fast. Starting with structured replies and a trust ladder helps reduce toxicity.

3. **Health data sensitivity**: Matching people by condition is useful but risky. The MVP focuses on feelings (anxious/stuck/embarrassed) rather than medical history.

4. **Ethical gamification**: Rewarding kindness, not suffering. Private milestones over global leaderboards. Free core experience, always.

5. **Competing with "good enough"**: Reddit and Discord exist. Brown Note differentiates on immediacy, privacy, and the specific moment of bathroom isolation that other platforms don't design for.

## Core Features (MVP)

- Profile creation with optional IBS background
- Daily check-in (feelings, food, symptoms)
- Inbox for creating and replying to notes
- Sticker shop and collection
- Lifetime leaderboard

## Status

Currently in the concept and research phase. Exploring technical approaches for the matching algorithm and moderation systems.
