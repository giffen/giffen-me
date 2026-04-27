---
title: "Privacy Proxy"
description: "A local pipeline that strips PII from sensitive documents before sending them to Claude for analysis. The specific use case is personal finance; the more useful idea is the architectural pattern."
date: "2026-03-15"
status: "in-progress"
tags: ["AI", "Security", "Architecture"]
pattern: 4
image: "/images/work/privacy-proxy-feature.webp"
featuredImage: "/images/work/privacy-proxy-feature.webp"
published: true
---

## What this solves

I wanted Claude to analyze my financial documents — bank statements, tax forms, RRSP summaries. Claude is genuinely good at that kind of reasoning. But I'm not sending my Social Insurance Number, account numbers, and exact figures to an API endpoint, even one I trust. Sensitive PII shouldn't leave the network if it doesn't have to.

So I built a pipeline where I can run a command on a bank statement PDF and get back a full analysis from Claude — with my real values restored at the end — without any personal data ever crossing the network boundary.

## Why the pattern matters

The specific use case is finance. The more useful idea is the architectural pattern: a deterministic local trust boundary between personal data and external AI APIs.

PII never crosses the boundary. Deterministic local tools (regex + NER) do the stripping. A pre-flight gate scans the sanitized output one more time before anything leaves the server, and aborts if anything matches. Claude only ever sees placeholders. The mapping back to real values lives in encrypted session storage that never leaves the network.

The same architecture applies to any sensitive-domain analysis — medical records, legal documents, HR data, regulatory filings. Swap the regex patterns and the rest is portable.

## How it works

Three layers, with the trust boundary clearly marked.

**Local PII sanitization.** Two-pass scrubbing — regex against a Canadian-specific patterns file, then a spaCy NER fallback for anything contextual the regex missed. An optional third pass uses a local LLM (Mistral 7B via Ollama) for fuzzy detection on documents with unusual formatting. The lesson here: deterministic pattern matching beats LLMs at structured PII detection. The local LLM's value is catching what you didn't think to write a pattern for.

**Pre-flight gate.** Before anything leaves the server, the sanitized text gets scanned one final time against every pattern. If anything matches, the pipeline aborts with an error. This matters more than the sanitization itself. Three cleaning passes are great, but the real safety guarantee is the hard stop.

**Magnitude bucketing.** This is the design decision I'm most pleased with. Stripping dollar amounts entirely would make financial analysis useless — Claude can't flag unusual spending if it can't see numbers. But sending exact figures defeats the purpose. The compromise: amounts get bucketed into ranges. Claude sees `$[AMOUNT_5K_RANGE]` instead of `$4,832.17`. Enough to reason about patterns; not enough to reconstruct actual figures. The privacy-utility tradeoff is the most reusable idea in the project.

## What I took from it

A pattern that's portable across any sensitive-domain LLM workflow. The CTPO-flavored framing: production AI in regulated industries needs trust boundaries you can point at and explain. This is one shape that pattern can take.
