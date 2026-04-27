---
title: "Privacy Proxy"
description: "An architectural pattern for running external AI models against sensitive data without the data ever leaving the trust boundary. Tested on personal finance; the same shape applies to medical, legal, HR, and regulatory workflows."
date: "2026-03-15"
status: "in-progress"
tags: ["AI", "Security", "Architecture"]
pattern: 4
image: "/images/work/privacy-proxy-feature.webp"
featuredImage: "/images/work/privacy-proxy-feature.webp"
published: true
---

## What this is

Production AI in regulated industries needs trust boundaries you can point at and explain. Sending PII to an external model endpoint - even one you trust - isn't an option for medical records, legal documents, HR data, or regulatory filings. The standard answer is "use a private model," which solves one problem at the cost of giving up the frontier.

This is the other answer: a deterministic local trust boundary between personal data and external AI APIs. PII never crosses it. The model only ever sees placeholders. Real values get restored on the way back, inside the controlled environment.

I built it on personal finance because financial documents are unforgiving and high-stakes - bank statements, tax forms, registered-account summaries - which made it a useful test domain for an architecture I'd want to defend on regulated work. Same Mistral and Claude calls, same sanitization pipeline, same pre-flight gate. Different vocabulary; same architecture.

## How it works

Three layers, with the trust boundary clearly marked.

**Local PII sanitization.** Two-pass scrubbing - regex against a Canadian-specific patterns file, then a spaCy NER fallback for anything contextual the regex missed. An optional third pass uses a local LLM (Mistral 7B via Ollama) for fuzzy detection on documents with unusual formatting. The lesson here: deterministic pattern matching beats LLMs at structured PII detection. The local LLM's value is catching what you didn't think to write a pattern for.

**Pre-flight gate.** Before anything leaves the server, the sanitized text gets scanned one final time against every pattern. If anything matches, the pipeline aborts with an error. This matters more than the sanitization itself. Three cleaning passes are great, but the real safety guarantee is the hard stop.

**Magnitude bucketing.** This is the design decision I'd carry into any regulated-domain version of this pattern. Stripping numeric values entirely makes the analysis useless - the model can't flag anomalies it can't see. But sending exact figures defeats the purpose. The compromise: values get bucketed into ranges. The model sees `$[AMOUNT_5K_RANGE]` instead of `$4,832.17`. Enough to reason about patterns; not enough to reconstruct actual figures. The privacy-utility tradeoff is the most portable idea here.

## What I took from it

A pattern that's portable across any sensitive-domain LLM workflow - medical records, legal documents, HR data, regulatory filings. Swap the patterns file and the rest of the architecture stays. The point isn't the finance use case; it's having a trust boundary that survives a security review.
