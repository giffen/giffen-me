---
title: "Love Will Tear Us Apart"
description: "An 8-bit proximity app that plays your song when you're close to the people who matter"
date: "2025-01-11"
status: "backlog"
tags: ["mobile-app", "location-services", "8-bit", "spotify-api", "apple-music", "couples"]
pattern: 2
published: true
---

## The Concept

A charming 8-bit styled app for sharing location with someone special. Define the relationship (lover, friend, enemy) and set a song that plays when you're near each other. Simple premise, delightful execution—your theme song plays when you finally meet up.

## Learning Objectives

- Mobile app integration with system location services
- Third-party music API integration (Apple Music / Spotify)
- Triggering audio playback based on proximity events
- Privacy-conscious location sharing architecture
- Cross-device coordination and real-time updates

## Considerations

| Criticism | Mitigation |
|-----------|------------|
| Network effect problem—both need app | Target couples directly, market as a gift/shared download |
| Limited use case = limited retention | Add async features (send a "ping," leave location-triggered notes) |
| Privacy concerns with location sharing | Aggressive permissions UX, easy off-switch, no server-side storage |
| No clear monetization path | One-time purchase or tip jar—don't force subscriptions on utility apps |
| Spotify/Apple Music integration is finicky | Start with local audio files, add streaming as v2 |
