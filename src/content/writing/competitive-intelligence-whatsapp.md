---
title: "How I Built a Competitive Intelligence System I Manage From WhatsApp"
description: "A product leader's guide to building an AI-powered competitive intelligence system using NanoClaw, Ollama, and WhatsApp - one that accumulates knowledge over months and produces deliverables for the whole team."
date: "2026-04-05"
tag: "Case Study"
excerpt: "I had automated research bots emailing me competitive insights, but the information sat in my inbox half-read and never synthesized. So I built a system that never forgets - one that accumulates knowledge over months, answers questions via WhatsApp, and produces battlecards, positioning summaries, and trend analyses for other teams."
---

I had a problem that I suspect a lot of product leaders share: I was supposed to be on top of competitive analysis, and I wasn't.

Not because I didn't care - I had automated research bots running, emailing me insights about competitors and the moves they were making in market. The information was arriving. But it was arriving into my inbox, where it sat alongside everything else, half-read and never synthesized. When someone on the commercial team asked me what a competitor had been up to over the last quarter, I'd end up doing the research again from scratch.

What I actually wanted was something that never forgets. Something that accumulates knowledge over months, so I could go back and see not just what a competitor did last week, but their change velocity - how fast they're executing on a stated strategy, and whether that pace is accelerating.

So I built one.

## The Setup

The system runs on [NanoClaw](https://github.com/anthropics/nanoclaw), an open-source framework for running Claude as a personal agent. The architecture is straightforward:

1. Automated research bots collect competitive intelligence and feed it into the system
2. A local RAG pipeline indexes everything using Ollama embeddings and stores it in a SQLite vector database
3. Claude agents run in isolated containers, with access to the full knowledge base via semantic search
4. WhatsApp is the interface - I text it questions, it texts back answers grounded in months of accumulated data

Each piece existed before I wired them together. The research bots were already running. I was already using WhatsApp through NanoClaw for other things. I'd been playing with Ollama so I could run a local LLM for private documents like financials. The RAG layer was the new piece, and it turned out to be the piece that made everything else useful.

## Why Ollama, Why Local

I didn't have a GPU, and I didn't need one. Ollama runs the embedding model (nomic-embed-text) on CPU just fine - embeddings don't need the raw throughput that inference does. The real reason I went local was privacy. Some of the documents flowing through this system are sensitive: pricing analysis, internal strategy notes, financial data. Keeping the embedding pipeline on my own hardware meant I didn't have to think about what I was sending to a third-party API.

## Why WhatsApp

No grand design philosophy here. I was already using it. The best interface for a system you want to actually use is the one you already have open. I text a question about a competitor, and the answer comes back in the same thread where I'm coordinating with my team. No context switch, no separate app to remember to check.

## What It Actually Does

The system indexes every piece of competitive intelligence it receives - product launches, pricing changes, partnership announcements, hiring patterns, feature releases. When I query it, it doesn't just retrieve documents. It searches semantically across months of accumulated data and synthesizes.

I can ask things like: "How has [competitor]'s enterprise strategy evolved since January?" and get an answer that draws on dozens of data points collected over that period, not just the most recent one.

But the unexpected benefit was what it enabled for other teams. Since the system is sitting on a structured, searchable body of competitive intelligence, it was easy to prompt it to package that information into formats other people need. Battlecards for the sales team. Competitive positioning summaries for marketing. Quarterly trend analyses for the exec team. Work product I used to either do manually (badly, because time) or not do at all.

## What I'd Tell Another PM

You don't need to build this from scratch. Most of the components are off-the-shelf or open source. The hard part isn't the technology - it's recognizing which of your responsibilities would benefit from an AI system that accumulates knowledge over time rather than starting fresh every conversation.

For me, it was competitive analysis: a job that's inherently longitudinal, where the value compounds with history, and where I was already generating the raw data but failing to synthesize it. If you have a similar responsibility - one where you're collecting information but not retaining it systematically - the same pattern applies.

The thing that changed for me wasn't my day-to-day workflow. It's that a responsibility I was letting slip is now something I'm completely on top of. And it produces deliverables I can hand to other teams without carving out half a day to write them.
