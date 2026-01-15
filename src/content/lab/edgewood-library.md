---
title: "Edgewood Library"
description: "A community tool-sharing app for neighbors - because that circular saw shouldn't gather dust for another 5 years"
date: "2025-01-15"
status: "in-progress"
tags: ["community", "sharing-economy", "nextjs", "authentication", "social", "local-first"]
image: "/images/lab/edgewood-library.png"
liveUrl: "https://www.edgewoodgreen.ca"
published: true
---

## The Origin Story

Five years ago, I bought a circular saw at Home Depot for a single project. It's been sitting in my garage ever since, taking up space and silently judging me. Meanwhile, my neighbor probably went out and bought their own circular saw for their one-off project too.

This is ridiculous.

**Edgewood Library** is my answer to this absurdity - a lightweight lending app for our townhouse complex where neighbors can share tools, ladders, and other one-off items that we all own but rarely use.

## The Problem

Classic tragedy of the commons, but in reverse: we're all hoarding individual resources instead of pooling them. The result? Garages full of expensive equipment used once a year, and trips to Home Depot to rent or buy things our neighbors already own.

Our complex has a group chat where people occasionally ask "anyone have a ladder I can borrow?" But that's reactive, not proactive. What if you could see what's available *before* you go buy something? What if lending was as easy as checking a directory?

## Project Goals

### Primary Objective
Build a **dead-simple, ultra-lightweight tool-sharing directory** that respects the social dynamics of a tight-knit community. This isn't Amazon. It's not even Craigslist. It's a digital bulletin board with just enough structure to make lending frictionless.

### Learning Goals
- Experiment with **vibe-coded development** - building fast and iteratively
- Practice **community-first design** - solving real social dynamics, not just technical ones
- Create a **history page** honoring Edgewood Green's legacy (it's been around since the '80s!)

## Core Features

**For Lenders:**
- Post items in 30 seconds (photo + name + "OK to borrow")
- Approve/decline borrow requests
- Set simple availability status

**For Borrowers:**
- Browse what's available before buying
- Request items with built-in approval flow
- Get due-date reminders

**Community Features:**
- "Thanks" rating system (appreciation, not punishment)
- Wishlist for high-demand items
- Optional leaderboard for community MVP lenders

## The Challenges (And How I'm Thinking About Them)

### 1. The Ghost Town Problem
Cold start is real. Nobody posts unless there's inventory, nobody browses unless there are posts.

**Mitigation:** Seed with 30-50 items myself, create a "Featured This Week" spotlight.

### 2. The "Group Chat is Good Enough" Problem  
Why build an app when people already ask in the chat?

**Mitigation:** Position this for *discovery*, not requests. "See what exists before you buy."

### 3. Trust & Reliability
Items come back late, dirty, or broken. One bad experience kills participation.

**Mitigation:** Simple norms - borrow windows, return conditions, lightweight reputation system. Keep it neighborly, not punitive.

### 4. Social Friction
Nobody wants to chase neighbors for returns or refuse careless borrowers.

**Mitigation:** Structured rules take the personal edge off - auto reminders, owner approval flows.

### 5. Privacy & Security  
People might not want neighbors knowing exactly what they own or where they live.

**Mitigation:** Private, members-only access. Approval required. "DM for pickup" instead of exact addresses.

## Technical Approach

Keeping this **lightweight and fast**:
- Secure but simple authentication (community members only, no public signups)
- Mobile-first design (because nobody's opening a laptop to borrow a drill)
- Minimal friction - every extra tap is an adoption barrier

## Why This Matters

This isn't just about circular saws. It's about:
- **Reducing consumption** - fewer redundant purchases
- **Building community bonds** - small interactions compound
- **Reclaiming space** - less stuff gathering dust
- **Being neighborly** - in a way that actually scales

Plus, it's a chance to honor the history of Edgewood Green and the people who've made it home.

## Status

Currently in planning. Figuring out the MVP, sketching flows, and thinking through the social dynamics before writing a single line of code.

Stay tuned for updates as this transforms from "wouldn't it be nice" to "here's the link."

---

*Got ideas or want to help? This is very much a work in progress.*
