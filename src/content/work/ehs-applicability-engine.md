---
title: "EHS Applicability Engine"
description: "A production AI system that replaces a manual auditor process. Takes a facility profile, runs 500+ screening questions in batch, returns structured applicability decisions with reasoning auditors can act on."
date: "2025-09-10"
status: "ongoing"
tags: ["AI", "Compliance", "Production"]
pattern: 6
image: "/images/work/ehs-applicability-engine-feature.webp"
featuredImage: "/images/work/ehs-applicability-engine-feature.webp"
published: true
---

## The result

Regulatory applicability used to be a manual auditor process. Read the regulation. Read the facility profile. Decide which requirements apply. It was slow, expensive, and inconsistent at scale.

This system does it automatically and gives the auditor structured AI reasoning to review and act on, instead of starting from raw text. Auditor time is the binding constraint on the entire compliance product; this is the lever that frees senior auditors to spend it on the parts of the work where their judgment actually matters.

## How it works

A production AI system that takes a facility profile, runs 500+ screening questions in batch, and returns structured applicability decisions with reasoning. The auditor's job shifts from "read the regulation and decide" to "review the AI's structured reasoning and act."

Human-in-the-loop by design. The AI does the slow first pass; the auditor brings judgment to the second.

## Why it matters for the business

Auditor capacity is the supply-side constraint in compliance SaaS. Anything that lets the same auditor cover more facilities - without sacrificing accuracy - is a direct lever on margin and capacity. Applicability determination is one of the highest-leverage stages of an audit. Automating it well doesn't just save time; it frees senior auditors to spend their time on the parts of the work where their judgment actually matters.

## What I learned building it

Production AI in regulated industries lives or dies by traceability. The model can be right, but if an auditor can't explain *why* it was right to a customer in a regulatory inquiry, the customer doesn't trust it.

So the system was designed reasoning-first: the answer is incidental; the rationale is the actual product.
