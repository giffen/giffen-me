---
title: "Brown Note"
description: "A peer support app for bathroom isolation - because you're not alone on the throne"
date: "2026-02-14"
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

This project was a departure from my usual B2B work. I wanted to explore:

- **B2C with gamification**: Sticker collections, nugget economy, trust scores, and reward loops that drive engagement without exploiting users
- **Mobile development**: My first React Native app, built with Expo alongside a Django web version
- **AI-assisted engineering**: ~90% of the code was written by Claude, with me acting as PM/tech lead. I wrote about the full process in [the case study](/writing/building-brown-note).

## Design Philosophy

The experience feels like passing a handwritten note—something tactile and delightful. Warm cream backgrounds, rich brown tones, classic serif typography, and a writing UX that makes you *want* to craft a message.

Stickers are central to the gamification. Users earn Nuggets through engagement (writing notes, responding, daily check-ins, receiving hearts) and spend them in a sticker shop. There are also achievement stickers for milestones. When you unlock something or receive a message, the app spikes your dopamine with burst animations and haptic feedback.

The vibe is intentionally silly. IBS is a serious disease, and sometimes the best way to cope is through poop jokes and a supportive community that gets it.

## Key Challenges

Building this responsibly meant tackling some tricky problems:

1. **The cold start problem**: Early on, you need replies to feel fast. Smart routing to active users and push notifications help close the loop.

2. **Moderation**: Anonymous note-passing can go sideways fast. Content moderation checks every message and reply, paired with a trust score system and 3-strike bans.

3. **Ethical gamification**: Rewarding kindness, not suffering. Private milestones over global leaderboards. Free core experience, always.

4. **Two-repo architecture**: The Django web app and the React Native mobile app share zero code—connected only through a REST API. The API was built as an additive layer, so the web app never broke during mobile development.

## Tech Stack

- **Backend**: Django, PostgreSQL, Django REST Framework, SimpleJWT, django-allauth
- **Mobile**: React Native (Expo), TypeScript, Zustand, Expo Router
- **Infrastructure**: Railway (auto-deploy), Expo EAS Build, Expo Push Notifications
- **Auth**: Email/password, Google OAuth, Apple Sign-In
- **Payments**: Stripe Checkout for optional supporter donations

## Core Features

- Anonymous message posting and random delivery to community members
- Reply system with hearts from message authors
- Nugget economy (earn by posting, replying, check-ins, receiving hearts)
- Sticker shop and achievement collection
- Push notifications for replies, hearts, and achievement unlocks
- Tabbed inbox with sent messages and sent replies
- Trust score system with automated moderation
- Social sign-in (Google + Apple)

## Status

Live at [brownnote.app](https://brownnote.app) with the mobile app available on iOS and Android. Read the [full case study](/writing/building-brown-note) for the build breakdown, architecture decisions, and costs.
