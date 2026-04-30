---
title: "Throughline"
description: "A graph database with explicit, named musical evidence on every connection: the architecture for steerable, explainable recommendations. Validated on music; portable to compliance, where regulations, substances, and enforcement actions have the same relational shape."
date: "2026-04-29"
status: "in-progress"
tags: ["AI", "Architecture", "Graph"]
pattern: 3
liveUrl: "https://throughline.giffen.me"
image: "/images/work/throughline-feature.webp"
featuredImage: "/images/work/throughline-feature.webp"
published: true
---

## What this is

A song-level music graph that explodes artists into individual songs and connects them by traceable musical dimensions. Each connection between two songs has a reason you can read: "both channel Johnny Marr's arpeggiated jangle, but at different tempos." 1,450 songs across 250 artists, ~1,860 prose-annotated SOUNDS_LIKE edges plus ~27,500 reified dimension-value relationships across 18 dimensions, served from a Neo4j backend through a FastAPI layer to both a search-first mobile UI and a force-directed graph visualization.

I built this on music because I wanted to validate a graph-database approach to a domain I understand at gut level before bringing it into compliance work. The architectural question I keep coming back to in regulated AI: could we model the relationships between regulations, substances, customer facilities, and enforcement actions as a queryable graph instead of a stack of relational tables? Each of those entities has connections to the others, and the connections are usually the part that matters - but the data model treats them as flat lists.

Music turned out to be a useful test domain for the same reason finance was a useful test domain for the [Privacy Proxy](/work/privacy-proxy): production data is unforgiving, and you want to know an architecture holds up before you commit.

## How it works

Three layers, with deliberate seams between them.

**Neo4j Aura.** Graph database for song / artist / producer / label nodes and SOUNDS_LIKE edges, validated by a formal JSON ontology that constrains node types, relationship types, and tempo bands.

**FastAPI backend.** Python service handling search, natural-language intent parsing (Claude Haiku 4.5), playlist generation across the SOUNDS_LIKE graph, and edge traversal queries. Per-query cost runs to fractions of a cent.

**vis.js visualization.** Force-directed constellation explorer. Click a song, see its 18-dimension fingerprint. Follow an edge, see the prose reason for the connection (most edges authored by Claude Sonnet 4.6 over LLM-extracted audio features; a few hundred handwritten as seed data). YouTube embeds with a sticky playlist player let you listen as you traverse the result set.

## What I learned that's portable to compliance

1. **Edge typing matters more than node typing.** The schema spent its first two iterations getting the node taxonomy right; the edges were an afterthought. That order is wrong. The relationships carry most of the meaning - in music it's "covers a riff from" vs "shares a producer with" vs "channels the same body response"; in compliance it would be "applies to" vs "supersedes" vs "is enforced under." Get the edge ontology right first, then the node taxonomy almost writes itself.

2. **The model is only as good as the constraints you can encode in the schema.** Tempo bands are a hard constraint in music; jurisdictional applicability is a hard constraint in regulation. Encoding constraints in the ontology, not in application code, is what makes the graph queryable instead of just stored.

3. **The interesting dimension is the one you can't measure.** In music it's artistic voice - the difference between a song that channels an influence and one that cosplays as it. The compliance equivalent is auditor judgment about applicability where the regulation is silent on intent. The graph surfaces candidates; the human still decides.

4. **Anti-fingerprints are as informative as fingerprints.** What I dislike is more diagnostic than what I like, because the divergent dimensions are the real signal. The compliance parallel: which regulations *don't* apply to a facility is often more informative than which ones do.

## What I took from it

The architecture works. A graph DB with a formal ontology, an edge-typed model where the relationships carry the meaning, and a query layer that respects encoded constraints is the right shape for any domain where the connections matter more than the entities. The compliance version of this pattern is the one I'd carry into production.

Live at [throughline.giffen.me](https://throughline.giffen.me). Companion essay: [The Dimension Spotify Can't Measure](/writing/the-dimension-spotify-cant-measure).
