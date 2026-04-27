---
title: "The Dimension Spotify Can't Measure"
description: "I built a Neo4j graph of my music library to pressure-test a graph-database architecture I want to bring into regulatory work. The most interesting thing I found was a dimension no algorithm can detect — and a clean parallel to the compliance problem I do for a living."
date: "2026-04-12"
tag: "Case Study"
excerpt: "Before I bring a graph-database approach to production regulatory data, I wanted to validate the model on a domain I understand at gut level. So I built it on my music library. Here's what I learned about graphs — and why it changes how I'd architect the compliance version."
---

## Why I built a music graph (the part that matters for my day job)

I run a compliance product. The architectural question I keep coming back to: could we model the relationships between regulations, substances, customer facilities, and enforcement actions as a queryable graph instead of a stack of relational tables? Each of those entities has connections to the others, and the connections are usually the part that matters — but the data model we have today treats them as flat lists.

Before I bring a graph-database approach to production work, I wanted to validate the model on a domain I understand at gut level. Production data is unforgiving and high-stakes; you need to know the architecture holds up before you commit. So I built it on my music library.

Same Neo4j, same query patterns, same edge typing, same explorer UI. Songs instead of regulations. Production credits instead of substance classifications. "Body response at 165 BPM" instead of "applies-to relationships between facility types." Different vocabulary; same architecture.

What I learned about my music was the side effect. The real thing I was after was the architectural lessons. The music is the test data.

## The night I realized Spotify doesn't know me

I was listening to Royel Otis — an Australian duo I'd gotten deep into — when it hit me that three of my favorite songs by them had almost nothing in common.

*Car* sounds like The Smiths filtered through reverb-soaked LA production. Johnny Marr's arpeggiated jangle, bright sadness, 165 BPM but you sway rather than jump. *Moody* sounds like Beck's *Guero* — 85 BPM slacker groove, laconic vocals, descending guitar riff. And *Oysters in My Pocket* sounds like The Jam — 168 BPM mod-punk, shouty vocals, choppy guitar, 2:42 and done.

Same band. Zero overlap. Spotify calls all of it "indie pop."

This is the fundamental problem with music recommendation: it treats artists as atomic units. One genre tag per artist, one cluster, one set of recommendations. But I don't listen to *Royel Otis*. I listen to *Car* for a completely different reason than I listen to *Oysters in My Pocket*. Flattening that into one node throws away the most interesting information.

So I built a system to see what happens when you don't flatten it.

## Exploding the artist

The idea is simple: instead of connecting artists to artists, connect songs to songs. And instead of using genre tags, use specific, traceable dimensions — guitar tone, vocal style, drum feel, body response, emotional register, lyrical mode. Each edge between two songs has a reason you can read.

I called it [Throughline](https://throughline.giffen.me). A Neo4j graph database with a visual explorer on top. Click a song, see its fingerprint, follow edges to connected songs, listen via embedded Spotify players.

Here's what *Car* looks like when you explode it:

| Element | Points toward | Why |
|---|---|---|
| Outro guitar — jangly, arpeggiated | The Smiths, Aztec Camera | Johnny Marr's DNA |
| Dreamy, hazy vocals | Mac DeMarco, Beach Fossils | Lo-fi warmth |
| "Bright sadness" — melancholy that shimmers | The Cure, Alvvays | Deceptively bright |
| 165 BPM kinetic sway | Cloud Nothings, In Between Days | Same physical register |

And here's *Moody*:

| Element | Points toward | Why |
|---|---|---|
| 85 BPM slacker groove | Beck, Pavement | Late-90s slacker DNA |
| Laconic, detached vocal | Beck, Mac DeMarco | Can't be bothered, and that's the point |
| Layered harmonies | Beach Boys | Reviewers literally called them "Beach Boys-like" |
| Head-nod body response | Chamber of Reflection, Veins of Glass | Same physical register at same tempo |

**Zero overlap.** The songs that share dimensions with *Car* share nothing with *Moody*. Spotify would recommend the same 20 artists for both. The graph recommends completely different songs — and it's right.

## The first thing that broke

I was feeling good about the system until I recommended Beach House's *Space Song* as a match for *Car* on body response. Both "make you sway," I'd written. But *Space Song* is 100 BPM and *Car* is 165 BPM. The sway at 165 is kinetic — your body moves with the guitar lines, there's energy in it. The sway at 100 is a drift — your eyes close, you dissolve. They're different physical sensations.

This was embarrassing because it's exactly the kind of mistake Spotify's algorithm makes. Matching on a dimension name without matching on the physical reality.

The fix was a constraint: body response and tempo feel edges are only valid if both songs are within 15 BPM of each other. The validator now rejects connections that violate this. Once I enforced it, the recommendations clicked.

Cloud Nothings' *I'm Not Part of Me* — 165 BPM, jangle guitar, bright wistful chords, the exact same kinetic sway as *Car* — surfaced as a top match. I'd never heard it. I put it on. It belonged on the playlist. That's when I knew the system was working.

## Producer as the hidden dimension

With the three original songs mapped, I added more Royel Otis tracks. Liked ones: *i hate this tune*, *Kool Aid*, *more to lose*, *Sofa King*, *Say Something*. Disliked ones: *Heading for the Door*, *Adored*, *She's Got a Gun*, *Bull Breed*.

Then I looked at what separated them.

| I love | I don't |
|---|---|
| Shimmering, jangly guitar | Distorted, angular guitar |
| Hazy, vulnerable vocals inside the mix | Assertive vocals projected over the mix |
| Warm, intimate production | Crisp, angular, post-punk production |
| Creates a mood and sustains it | Hits hard immediately, attacks |
| Introspective — sitting with ambiguity | Extroverted — racing to resolution |

The pattern was striking. But the strongest predictor wasn't any of those dimensions — it was **producer**. Every single song I loved on their album *hickey* was produced by Blake Slatkin or Omer Fedi. Every single song I disliked was produced by someone else (Dan Carey, J Lloyd). The producer wasn't just a credit — it was the dimension that determined whether I'd engage with the song at all.

This sent me down a rabbit hole. If Slatkin is my producer, what else has he made? I pulled his discography and found his work with Gracie Abrams, Omar Apollo, and Wallows. Added those songs to the graph. The connections were real — same warm, intimate, reverb-touched production palette across different artists. The through-line wasn't genre. It was a specific human's aesthetic choices in a studio.

## The dimension that broke the model

Then something unexpected happened. There were three Slatkin-produced Royel Otis tracks I didn't love. I didn't *hate* them — they were fine. But I'd never add them to a playlist. They were just... boring.

*who's your boyfriend* channels New Order so faithfully that Royel Otis disappears into the reference. *shut up* borrows David Bowie's *Golden Years* synth palette so directly it feels like a costume. The production was warm and right — same Slatkin palette I loved on *Car* and *Moody*. But the *song* was missing something.

This broke the "producer = preference" model in the most useful possible way. Producer sets the floor — warm enough to engage. But the ceiling comes from whether the artist brings something genuinely theirs to the material.

I started calling this dimension **artistic voice**:

- **Distinctive**: the song could only be by this artist. *Car* has Smiths DNA but sounds like Royel Otis.
- **Influenced**: you hear the references, but the artist is present. *more to lose* channels The Cure but stays itself.
- **Referential**: the reference overwhelms the artist. *who's your boyfriend* is a New Order costume.
- **Invisible**: the artist adds nothing. Lounge covers, cash-grab nostalgia compilations.

This is the dimension Spotify can't measure. No audio feature captures it. No genre tag encodes it. You can't detect it with spectral analysis or collaborative filtering. A critic can hear it. A fan can feel it. An algorithm can't.

## The anti-fingerprint

The disliked songs turned out to be as valuable as the loved ones. They gave me an **anti-fingerprint** — a set of dimensions to avoid when the system recommends "more like this."

But here's the important nuance: the anti-fingerprint is context-dependent, not global. When I ask "more like *Car*," the system should filter out angular production, assertive vocals, and distorted guitars. But when I ask "surprise me," those filters should be off. Because I also love Death Cab's *A Song for Kelly Huckabee* — a 78 BPM plodding narrative that shares almost nothing with *Car*. I love it for the lyrics and the drums. A single shared edge (lyrical mode: narrative) pulls me into completely different territory.

The anti-fingerprint answers "more of this specific thing." The open graph answers "what else might I love for reasons I haven't considered." Both are valid queries, and the system needs to support both — or it becomes a bubble machine.

## What I actually built

[Throughline](https://throughline.giffen.me) is a Neo4j graph with a FastAPI backend and a vis.js constellation explorer. Songs are green dots (loved), blue (liked), grey (neutral), red (disliked). Edges are colored by dimension category — blue for tonal, orange for rhythmic, purple for emotional, green for compositional. Edge width shows how many dimensions two songs share. Click a song to see its fingerprint and Spotify player. Click an edge to see why those two songs are connected.

The graph currently holds about 70 songs across my full taste range — from Aesop Rock to Beirut to Stromae to Dire Straits. It's not a product. It's a proof of concept for a methodology: song-level fingerprinting with traceable, human-authored edges.

The ontology has 18 dimensions organized into four categories (tonal, rhythmic, emotional, compositional), with tempo constraints on physical dimensions and a preference system that feeds the anti-fingerprint. The newest dimension — artistic voice — is also the most important. It's the one that explains why two songs with identical production, identical tempo, and identical guitar tone can feel completely different.

## What this means

I'm not claiming I built a better recommendation engine. Spotify has billions of data points and thousands of engineers. I have 70 songs and a week of evenings.

But I am claiming that there's a category of musical knowledge that their system structurally cannot capture. The difference between influence and pastiche. The physical distinction between swaying at 165 BPM and drifting at 128 BPM. The fact that producer matters more than genre for predicting my engagement. The reason I love Kishi Bashi covering Talking Heads but hate every lounge cover ever made.

These are things a human ear knows instantly and no algorithm can detect. The question isn't whether to replace the algorithm — it's whether there's a useful system that sits alongside it, capturing the dimensions it misses.

Throughline is my attempt to find out. It's [live](https://throughline.giffen.me), it's messy, and it's the most interesting thing I've built in a while.
