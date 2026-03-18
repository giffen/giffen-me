---
title: "The Privacy Proxy Pattern"
description: "A design pattern for using cloud AI to analyze sensitive documents without sending raw PII to the API. Not perfect — but meaningfully better than what most people actually do."
date: "2026-03-17"
tag: "Guide"
excerpt: "I wanted Claude to analyze my bank statements. I wasn't going to paste my SIN into an API call. So I built a local sanitization proxy that strips PII before it leaves my network. Here's the pattern, the tradeoffs, and where it falls short."
---

## The Problem Everyone Ignores

Here's what most people do when they want AI to help with their finances: they copy-paste a bank statement into ChatGPT. Full name, account numbers, transaction amounts, sometimes their Social Insurance Number right there in the text. They do this because the alternative — manually redacting everything — is tedious enough that nobody bothers.

I wanted Claude to analyze my bank statements — spending categorization, anomaly detection, tax insights. But I wasn't going to send my SIN, my account numbers, and my exact financial figures to a cloud API. Not because I distrust Anthropic specifically, but because the principle matters: if sensitive PII doesn't need to leave my network, it shouldn't.

So I built a local proxy that sits between my documents and the API. It strips PII before anything leaves, sends sanitized text to Claude for analysis, and restores the real values in the response on my end. The pattern is generalizable — it works for any sensitive domain where you want cloud-grade reasoning on data you can't send to the cloud.

## The Pattern

The privacy proxy has four stages: sanitize, gate, reason, restore.

### Stage 1: Multi-Pass Sanitization

A single detection method isn't enough. Different types of PII have different shapes, and no single tool catches everything.

**Pass 1 — Regex pattern matching.** A configuration file defines patterns for known PII formats: Social Insurance Numbers (XXX-XXX-XXX), bank account and transit numbers, RRSP/TFSA identifiers, postal codes, phone numbers, email addresses. This catches the structured, predictable PII — the stuff with a known format. It also catches contextual patterns like text following "Account holder:" or "Client name:".

**Pass 2 — NLP named entity recognition.** A small NER model (spaCy's `en_core_web_sm`) runs as a fallback to catch names and organizations the regex missed. Regex is great at structured patterns but blind to "John Smith deposited funds" where the name doesn't follow a labeled field. NER catches these through contextual understanding.

**Pass 3 (optional) — Local LLM review.** The sanitized text goes to a local language model (Mistral 7B running on Ollama) for a fuzzy sweep — "does anything in this text look like personal information?" This is the slowest pass (15-30 seconds per page on CPU) and catches the least, because the first two passes handle virtually everything. It's there for when paranoia is warranted: tax documents with unusual formatting, statement layouts you haven't tested the regex patterns against.

Each pass replaces detected PII with semantic placeholders: `[NAME_1]`, `[ACCT_1]`, `[ADDR_1]`. The mapping from placeholder to real value is stored locally, encrypted at rest.

### Stage 2: Magnitude Bucketing

This is the design decision that makes the whole thing useful.

Stripping dollar amounts entirely would make financial analysis pointless — Claude can't flag unusual spending if it can't see the numbers. But sending exact figures defeats the purpose of sanitization.

The compromise: amounts above a configurable threshold get bucketed into magnitude ranges. `$4,832.17` becomes `$[AMOUNT_5K_RANGE]`. `$127.50` becomes `$[AMOUNT_100_RANGE]`. Claude sees enough to reason about spending patterns ("your dining category is unusually high this month compared to your transportation") without knowing the exact figures.

This is a deliberate privacy/utility tradeoff. You lose precision — Claude can't tell you the exact difference between two months. You gain analysis — Claude can still identify trends, anomalies, and category distributions. For personal finance use, this is the right tradeoff. For regulatory reporting, it wouldn't be.

### Stage 3: Pre-Flight Gate

Before anything leaves the machine, the sanitized text is scanned one final time against every regex pattern from the configuration. If anything matches, the pipeline aborts.

This matters more than the sanitization itself. The first three passes try to make the text safe. The gate verifies that it is safe. If a SIN somehow survived all three passes — maybe a weird formatting variant the regex didn't account for — the gate catches it and refuses to proceed.

This is defense in depth borrowed from security engineering. You don't just try to prevent bad outcomes; you add a hard stop that checks the result before committing to an irreversible action.

### Stage 4: Reasoning and Restoration

The sanitized text plus the user's query goes to the cloud API. The system prompt explicitly instructs the model to use placeholders as-is, never guess or reconstruct real values, and decline any request to reveal information behind placeholders.

The response comes back with placeholders intact: "Based on your spending, [NAME_1], your [AMOUNT_5K_RANGE] in dining is significantly higher than your [AMOUNT_1K_RANGE] in transportation." The proxy swaps the placeholders back to real values using the encrypted mapping. The final output reads naturally with real names and amounts restored.

The mapping never leaves the local machine. The cloud API never sees the real values. The user gets a fully de-anonymized analysis.

## Where This Falls Short

I want to be honest about the limitations, because the gap between "meaningfully better than pasting into ChatGPT" and "actually secure" is larger than it looks.

**Regex misses novel formats.** If your bank starts formatting account numbers differently, or a new document type uses a PII pattern you haven't seen before, the regex won't catch it. The NER and LLM passes help, but they're fallbacks, not guarantees. You need to maintain the pattern config as you encounter new document types.

**Small NER models miss unusual names.** `en_core_web_sm` is a lightweight model. It handles common English names well but struggles with transliterated names, compound surnames, or names that double as common words. For a personal tool processing your own documents — where you know your own name appears — this is manageable. For a general-purpose system, you'd want a larger model.

**Spending patterns themselves can be identifying.** Even with perfect PII redaction, the pattern of transactions can identify someone. If you always buy coffee at the same time from the same chain, that behavioral fingerprint persists through sanitization. This is a fundamental limitation of any redaction approach — you can strip identifiers but you can't strip behavioral signatures without destroying analytical value.

**This isn't regulatory-grade.** If you're building something that needs to comply with PIPEDA, GDPR, or HIPAA, regex plus NER plus a pre-flight gate is not sufficient. You'd want structured extraction with field-level allowlisting — parsing the document into known fields and explicitly selecting which fields to send, rather than trying to detect and remove PII from unstructured text. The detect-and-remove approach is inherently best-effort. The extract-and-allowlist approach is deterministic.

**The model might still infer redacted information.** Large language models can sometimes infer information from context. If the sanitized text says "[NAME_1] received a [AMOUNT_50K_RANGE] settlement from [ORG_1] related to workplace injury in [CITY_1]," a sufficiently capable model might narrow down the possibilities. This is an open research problem, not something a sanitization proxy can solve.

## When To Use This

This pattern makes sense when:

- You're processing your own personal documents (you know what PII to expect)
- The analysis is for your own use (not regulatory or legal)
- The alternative is "paste it into ChatGPT with everything visible" (which is what most people do)
- You want cloud-grade reasoning but can't or won't send raw data to the cloud

It doesn't make sense when:

- You need regulatory compliance (use field-level allowlisting instead)
- You're processing documents for other people (the PII patterns you don't know about are the dangerous ones)
- The stakes of a PII leak are existential (litigation, medical records, classified material)

The honest framing: this is meaningfully better than what most people actually do, with clear-eyed acknowledgment of where it falls short. It's a locked front door, not a vault. Most people don't even have the door.

## The Architecture Generalizes

The finance-specific parts of this pattern — Canadian SIN formats, bank transit numbers, RRSP identifiers — are just configuration. The pattern itself works for any sensitive domain:

- **Medical records**: Replace SINs with health card numbers, add patterns for diagnosis codes and prescription IDs, keep the magnitude bucketing for lab values
- **Legal documents**: Add patterns for case numbers, court file references, and party names from the caption
- **HR data**: Employee IDs, salary figures (bucketed), performance rating scales

The core loop — multi-pass sanitization, pre-flight gate, cloud reasoning, local restoration — is domain-agnostic. The pattern config is the only thing that changes.

If you're building something similar, the three pieces worth stealing are: magnitude bucketing (preserves analytical utility while stripping precision), the pre-flight gate (verify safety rather than just attempting it), and the encrypted local mapping (so restoration is possible without persisting PII in plaintext).
