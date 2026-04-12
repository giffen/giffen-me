---
title: "Throughline"
description: "A song-level music recommendation graph that explodes artists into individual songs and connects them by traceable musical dimensions"
date: "2026-04-12"
status: "in-progress"
tags: ["music", "graph-db", "neo4j", "recommendation-engine", "data-visualization"]
pattern: 3
liveUrl: "https://throughline.giffen.me"
image: "/images/lab/throughline.png"
featuredImage: "/images/lab/throughline-feature.png"
published: true
---

## The Problem

Every music recommendation system treats artists as atomic units. Spotify tags Royel Otis as "indie pop" and recommends more indie pop. But their song *Car* channels The Smiths, *Moody* channels Beck, and *Oysters in My Pocket* channels The Jam. Three songs, zero fingerprint overlap, one genre tag. The recommendations are mid because the model is lossy.

Throughline is an attempt to model music at the song level instead. Every connection between two songs has a reason you can read.

## What It Does

You start at a song. You see its fingerprint exploded across 18 dimensions — guitar tone, vocal style, drum feel, body response, emotional register, artistic voice. You follow an edge to a connected song. Each edge has a human-authored explanation: *"Both channel Johnny Marr's arpeggiated jangle, but at different tempos."* You can filter by dimension category, toggle between "more like this" and "surprise me," and listen to every song via embedded Spotify players.

The graph currently holds ~70 songs with ~260 song-to-song connections across 18 fingerprint dimensions. Songs are tagged with preference data (loved, liked, neutral, disliked) that feeds an anti-fingerprint — dimensions to avoid when recommending.

## Key Findings

Building this surfaced things about music recommendation that I hadn't seen articulated elsewhere:

1. **Producer is the strongest predictor of preference** — but it's necessary, not sufficient. Every Royel Otis song I love is produced by Blake Slatkin or Omer Fedi. Every one I dislike is produced by Dan Carey. But some Slatkin tracks are boring because they're pastiche.

2. **Body response is tempo-dependent.** Swaying at 165 BPM is a fundamentally different physical sensation than drifting at 128 BPM. The system enforces a ±15 BPM constraint on body-response edges.

3. **Artistic voice is the dimension Spotify can't measure.** A song can have the right production, the right tempo, the right guitar tone, and still feel derivative. The difference between a song that channels an influence and a song that cosplays as one is the most important dimension — and the hardest to automate.

4. **Your anti-fingerprint is as informative as your fingerprint.** The Royel Otis songs I dislike share dimensions with songs I love (same band, sometimes same producer). The *divergent* dimensions are the real signal.

## Tech Stack

- **Neo4j Aura** — graph database for song/artist/producer/label nodes and SOUNDS_LIKE edges
- **FastAPI** — Python backend with ontology validation, preference API, search
- **vis.js** — force-directed graph visualization (Map of Metal-inspired constellation)
- **Spotify Embeds** — listen to any song from the side panel
- **Ontology-driven schema** — formal JSON schema with node types, relationship constraints, and tempo validation

## What's Next

- More songs, more preference data, sharper fingerprint
- Review extractor — use critical reviews + LLM to surface candidate fingerprint values for human confirmation
- Community contribution model — let others add their corners of the graph
- Blog post with the full Royel Otis case study

Read the [companion essay](/writing/the-dimension-spotify-cant-measure) for the full story of how this project evolved and what it revealed about music recommendation.
