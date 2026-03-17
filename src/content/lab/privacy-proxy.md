---
title: "Privacy Proxy"
description: "A local pipeline that strips PII from financial documents before sending them to Claude for analysis — so my SIN never touches the cloud"
date: "2026-03-15"
status: "in-progress"
tags: ["privacy", "llm", "home-server", "python", "ollama", "claude-api", "personal-finance", "security", "nanoclaw"]
image: "/images/lab/privacy-proxy.png"
featuredImage: "/images/lab/privacy-proxy-feature.png"
published: true
---

## The Problem

I have a pile of Canadian financial documents — bank statements, RRSP contribution summaries, tax forms — and I want Claude to help me analyze them. Spending categorization, anomaly detection, tax optimization. Claude is genuinely good at this kind of reasoning.

But I'm not sending my Social Insurance Number, bank account numbers, and exact financial figures to an API endpoint. That's not paranoia — it's basic hygiene. A leaked SIN is catastrophic. And while Anthropic's privacy practices are solid, the principle matters: sensitive PII shouldn't leave my network if it doesn't have to.

So I built a pipeline where I can run a command on a bank statement PDF and get back a full financial analysis from Claude — with my real values restored — without any personal data ever touching the cloud.

## How It Works

The pipeline runs on my home Ubuntu 24.04 server (CPU-only, no GPU). Currently it's a CLI tool: I copy a PDF to the server and run the pipeline manually. The flow is: strip PII locally, send sanitized text to Claude Sonnet for analysis via NanoClaw, de-anonymize the response on the server.

### 1. File Transfer

Currently I copy files to the server manually via SCP. SSHFS automount with systemd is on the roadmap — I've done the research and know the gotchas (systemd runs as root and can't access user SSH keys, mDNS doesn't resolve in systemd's environment, `default_permissions` conflicts with FUSE), but it's not wired up yet.

### 2. Two-Pass PII Sanitization (With Optional Third)

This is the core of the system.

- **Pass 1 — Regex**: `regex_scanner.py` loads `patterns.yaml`, a Canadian-specific PII config covering SINs (XXX-XXX-XXX), bank account/transit/institution numbers, RRSP/TFSA identifiers, addresses with Canadian postal codes, phone numbers, emails, and contextual name detection near cues like "Account holder:". Dollar amounts over $500 get magnitude-bucketed — more on that below.

- **Pass 2 — spaCy NER**: `en_core_web_sm` as a fallback catches names and entities the regex missed through contextual understanding.

- **Pass 3 (optional, `--thorough` flag) — Local LLM Verification**: The sanitized text goes to Ollama running Mistral 7B locally for a fuzzy PII sweep. Disabled by default because Mistral on CPU takes 15-30 seconds per page and the first two passes catch virtually everything. Available when paranoia is warranted — tax documents with unusual formatting, new statement layouts you haven't tested the patterns against.

The lesson here: deterministic pattern matching beats LLMs at structured PII detection. The LLM's value is catching what you didn't think to write a pattern for.

### 3. Pre-Flight Safety Gate

Before anything leaves the server, the sanitized text is scanned one final time against every regex pattern from `patterns.yaml`. If anything matches, the pipeline aborts with an error rather than risk a PII leak.

This matters more than the sanitization itself. Three cleaning passes are great, but the real safety guarantee is the hard stop before the API call. Don't just try to make things safe — verify that they are safe before proceeding. Defense in depth borrowed from security engineering.

### 4. Cloud Reasoning via NanoClaw

The sanitized text plus the user's query goes to Claude Sonnet through NanoClaw — my personal AI agent built on the Claude Agent SDK, reachable via WhatsApp. The `analyze_financial_doc` tool wraps the full pipeline. The system prompt explicitly instructs Sonnet to use placeholders as-is, never guess or reconstruct real values, and decline any request to reveal information behind placeholders.

Claude does the heavy lifting: spending categorization, anomaly detection, tax optimization suggestions. It just does it on data that looks like `[NAME_1] spent $[AMOUNT_5K_RANGE] at [MERCHANT_3]` instead of my actual figures.

### 5. De-anonymization

Claude's response comes back with placeholders (`[NAME_1]`, `[ADDR_1]`, `[ACCT_1]`), which get swapped back to real values on the server. The mapping is encrypted at rest via Fernet — the key comes from a `PRIVACY_PROXY_KEY` environment variable, or is generated ephemerally per session if unset. Mapping data never leaves the server.

### 6. Reporting

`reporting.py` generates a markdown summary of each analysis. Currently single-document reports — trend analysis across months is on the roadmap.

```
Server: ~/privacy-proxy/
    |
    | manual file copy (SCP)
    v
privacy_proxy.py (CLI)
    |
    v
Regex scanner (patterns.yaml)
    |
    v
spaCy NER fallback
    |
    v                                    ┌─────────────────┐
[optional: Ollama/Mistral verification]  │  TRUST BOUNDARY  │
    |                                    │                  │
    v                                    │  Everything left │
Pre-flight PII gate ─── ABORT if match  │  of this line    │
    |                                    │  stays local     │
    | only if clean                      └─────────────────┘
    v
Claude Sonnet (via NanoClaw / WhatsApp)
    |
    v
De-anonymize on server
    |
    v
Markdown report output
```

## The Interesting Bits

### Magnitude Bucketing

This is the design decision I'm most pleased with. Stripping dollar amounts entirely would make financial analysis useless — Claude can't flag unusual spending if it can't see the numbers. But sending exact figures defeats the purpose.

The compromise: amounts get bucketed into ranges. Claude sees `$[AMOUNT_5K_RANGE]` instead of `$4,832.17`. Enough to reason about patterns ("your dining spending jumped significantly this month"), not enough to reconstruct actual figures. This privacy/utility tradeoff is probably the most reusable idea in the project — anyone building privacy-sensitive LLM pipelines could adapt it.

### The Trust Boundary

PII never crosses the network boundary to Anthropic's API. Deterministic local tools (regex + NER) do the stripping. A pre-flight gate does a final scan before anything leaves. Claude only ever sees placeholders.

This pattern isn't specific to finance. Any sensitive-domain analysis — medical records, legal documents, HR data — could use the same architecture. The `patterns.yaml` is the only Canada-specific piece; swap it for another country's PII patterns and the rest works unchanged.

### CPU-Only Is Fine

With the LLM pass disabled (default), the full pipeline runs in under 5 seconds for a two-page bank statement. Even with `--thorough`, it's 30-45 seconds. No GPU needed. Total hardware cost: whatever server you already have.

## Stack

- **Server**: Ubuntu 24.04, CPU-only home server
- **Local LLM**: Ollama (Mistral 7B + Llama 3.2 3B), bound to 127.0.0.1 only
- **PII Detection**: Python — regex (`patterns.yaml`) + spaCy `en_core_web_sm` NER, optional Ollama verification
- **Agent**: NanoClaw (Claude Agent SDK) with `analyze_financial_doc` tool
- **Reasoning**: Claude Sonnet via Anthropic API through NanoClaw
- **Security**: Fernet-encrypted session mappings, pre-flight PII gate, Ollama firewalled to localhost
- **Reporting**: Markdown summaries via `reporting.py`
- **Python**: 3.12+, full pytest suite

## What's Next

- **SSHFS automount** — systemd mount from Fedora laptop so file drop is seamless (research done, config not yet wired up)
- **Watchdog auto-processing** — file watcher daemon (`watcher.py`) that monitors the inputs directory and auto-runs the pipeline when new documents land, running as a systemd user service
- **Spending report NanoClaw tool** — `spending_report` tool so I can ask from WhatsApp: "Show me my spending trend January through March"
- **Structured JSON reports** — monthly summaries, multi-month trend comparisons, and annual rollups stored as PII-free JSON
- **Open-source Canadian PII patterns** — extract `patterns.yaml` into a standalone `canadian-pii-patterns` package under MIT with a `validate.py` script
- OCR support for image-based statements (Tesseract before the pipeline runs)
- Monthly email digest that auto-sends the spending summary
- Expand `patterns.yaml` for T4/T5/NOA tax slips
- Explore quantized Phi-3 or Gemma 2B for the PII verification pass — smaller models may be fast enough on CPU to re-enable by default

## Context

This is part of a broader personal AI infrastructure I'm building at home — [NanoClaw](/lab/nanoclaw) as a WhatsApp-accessible personal agent, a home Linux server running Ollama as the local compute hub, and a philosophy of keeping sensitive data local while leveraging cloud models for reasoning. The privacy proxy is the piece that closes the gap between "I want Claude to analyze my finances" and "I'm not comfortable sending my SIN to an API."

Built end-to-end with Claude Code for implementation, Claude Sonnet as the reasoning engine, and the Claude Agent SDK via NanoClaw for WhatsApp integration.
