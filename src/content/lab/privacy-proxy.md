---
title: "Privacy Proxy"
description: "A local LLM pipeline that strips PII from financial documents before sending them to Claude for analysis — so my SIN never touches the cloud"
date: "2026-03-15"
status: "in-progress"
tags: ["privacy", "llm", "home-server", "python", "ollama", "claude-api", "personal-finance", "security"]
image: "/images/lab/privacy-proxy.png"
featuredImage: "/images/lab/privacy-proxy-feature.png"
published: true
---

## The Problem

I have a pile of financial documents — bank statements, RRSP contribution summaries, tax forms — and I want Claude to help me analyze them. Spending patterns, anomaly detection, tax optimization suggestions. Claude is genuinely good at this kind of reasoning.

But I'm not sending my Social Insurance Number, bank account numbers, and exact financial figures to an API endpoint. That's not paranoia — it's just basic hygiene. A leaked SIN is catastrophic. And while Anthropic's privacy practices are solid, the principle matters: sensitive PII shouldn't leave my network if it doesn't have to.

So I built a pipeline that lets me get Claude's analytical power without ever exposing my personal data to the cloud.

## Architecture

The system runs on my home Ubuntu 24.04 server (CPU-only, no GPU) and has five stages:

**1. File Drop via SSHFS**

My Fedora laptop mounts a directory on the server via SSHFS with systemd automount. I drop a PDF from my bank into `~/server_inputs/` on my laptop and it lands on the server instantly. No manual transfer, no cloud storage intermediary.

Getting this working was harder than building the actual pipeline — systemd runs as root (can't access user SSH keys), mDNS hostname resolution isn't available in systemd's environment (had to use IP), and `default_permissions` conflicts with FUSE ownership semantics. Worth a post on its own.

**2. Three-Pass PII Sanitization**

This is the core of the system and it's overkill by design. Any single pass would catch 95% of PII. But with financial documents, 95% isn't good enough.

- **Pass 1 — Regex**: A `patterns.yaml` config catches Canadian-specific PII patterns — SINs (XXX-XXX-XXX), bank account/transit/institution numbers, RRSP/TFSA identifiers, addresses with Canadian postal codes, phone numbers, emails. Dollar amounts over $500 get magnitude-bucketed (e.g., `$[AMOUNT_5K_RANGE]`) so Claude can still reason about financial scale without seeing exact figures.

- **Pass 2 — spaCy NER**: `en_core_web_sm` as a fallback catches names and entities the regex missed, especially around contextual cues like "Account holder:" lines.

- **Pass 3 — Local LLM Verification**: The "sanitized" text goes to Ollama running Mistral 7B locally, which is asked to flag any remaining PII. Anything it catches gets replaced too. Belt, suspenders, and duct tape.

**3. Cloud Reasoning**

The fully sanitized text plus the user's query goes to Claude Sonnet via the Anthropic API for actual financial analysis — spending categorization, anomaly detection, tax optimization. Claude never sees a real name, a real account number, or an exact dollar figure.

**4. De-anonymization**

Claude's response comes back with placeholders (`[NAME_1]`, `[ADDR_1]`), which get swapped back to real values on the server. The mapping dictionary is encrypted at rest using Fernet — the key comes from a `PRIVACY_PROXY_KEY` environment variable, or is generated ephemerally per session if unset.

**5. NanoClaw Integration (Next)**

A tool wrapper (`nanoclaw_tool.py`) is stubbed out for integration with NanoClaw, my personal agent built on the Claude Agent SDK. Once wired up, the full pipeline becomes triggerable from WhatsApp — drop a document, ask a question, get an answer.

```
Laptop (SSHFS) → Server receives PDF
                     |
                     v
              Regex scanner (patterns.yaml)
                     |
                     v
              spaCy NER fallback
                     |
                     v
              Ollama/Mistral verification
                     |
                     v
              Sanitized text → Claude Sonnet API
                     |
                     v
              Response de-anonymized on server
                     |
                     v
              Answer with real values restored
```

## The Interesting Bits

**Magnitude bucketing** is the design decision I'm most pleased with. Stripping dollar amounts entirely would make financial analysis useless — Claude can't find spending anomalies if it can't see the numbers. But sending exact figures defeats the purpose. The compromise: amounts get bucketed into ranges. Claude sees `$[AMOUNT_5K_RANGE]` instead of `$4,832.17`. Enough to reason about patterns, not enough to reconstruct the actual figures. This tradeoff between privacy and analytical utility is the kind of thing you only discover by actually trying to use the system.

**The trust boundary** is clean and generalizable. PII never crosses the network boundary to the cloud API. The local LLM does the dirty work of scrubbing, and Claude only ever sees sanitized text. This pattern isn't specific to finance — any sensitive-domain analysis (medical records, legal documents, HR data) could use the same architecture. The `patterns.yaml` is the only Canada-specific piece; swap it for another country's PII patterns and the rest works unchanged.

**CPU-only is viable for this use case.** Mistral 7B on CPU takes 15-30 seconds per page for the PII verification pass. That's fine — I'm processing personal bank statements, not thousands of enterprise documents. The regex and spaCy passes are near-instant. Total pipeline time for a two-page bank statement is about 30-45 seconds.

## Stack

- **Server**: Ubuntu 24.04, CPU-only home server
- **Local LLM**: Ollama (Mistral 7B + Llama 3.2 3B), bound to 127.0.0.1 only
- **LLM UI**: Open WebUI on port 3080 (LAN-only)
- **PII Detection**: Python — regex pre-pass (`patterns.yaml`) + spaCy `en_core_web_sm` NER + Ollama verification
- **Cloud Reasoning**: Claude Sonnet via Anthropic API
- **File Transport**: SSHFS with systemd automount
- **Security**: Fernet encryption for session mapping files, UFW firewall
- **Testing**: 17 pytest tests passing
- **Python**: 3.12+, venv

## What's Next

- Wire up NanoClaw for WhatsApp-triggerable document analysis
- Add a watchdog file watcher so dropping a file auto-triggers processing
- Build a reporting layer that tracks spending trends across months
- Potentially open-source `patterns.yaml` as a standalone Canadian PII detection config

## Context

This is part of a broader personal AI infrastructure I'm building at home — NanoClaw (WhatsApp agent on the Claude Agent SDK), the home server with Ollama, and various automation pipelines. The privacy proxy is the piece that lets me use cloud AI on sensitive data without compromise.
