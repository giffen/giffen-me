---
title: "Audit Quest: Global Compliance"
description: "A retro RPG that teaches EHS compliance - one auditor, eight facilities, global regulations"
date: "2026-02-23"
status: "in-progress"
tags: ["game", "education", "pixel-art", "ai-generated-art", "react", "canvas", "ehs", "compliance"]
image: "/images/lab/compliance-quest-poster.png"
featuredImage: "/images/lab/compliance-quest-feature.png"
repoUrl: "https://github.com/giffen/compliance-quest"
liveUrl: "https://www.giffen.me/lab/audit-quest"
published: true
---

## The Problem

Onboarding new EHS (Environment, Health & Safety) auditors is dry. Regulation databases are dense, training manuals are thick, and by the time someone sits through a week of compliance briefings, their eyes have glazed over three times. The information is critical—workplace safety, chemical management, fire codes, machine guarding—but the delivery doesn't stick.

I wanted to build something that made learning Enhesa's regulatory topic headings genuinely fun. Something a new auditor could play through in an afternoon and walk away with an intuitive feel for what non-compliance looks like across different jurisdictions. A game—specifically, a retro RPG.

## The Concept

Audit Quest: Global Compliance is a Dragon Quest-meets-Street Fighter 2 mashup. You pick your auditor from a TMNT arcade-style character select screen, hop on a plane to one of eight facilities around the world, and explore top-down pixel art offices, labs, and factories. When you stumble onto a compliance issue, an encounter triggers: is this a violation? What Enhesa category does it fall under? Get it right and your credibility climbs. Get it wrong enough and your audit license gets revoked. Game over.

The eight facilities span London, Brussels, Toronto, Frankfurt, Sao Paulo, California, Osaka, and Shanghai—each with jurisdiction-specific regulations and escalating difficulty. The MVP ships with the London Office fully playable and the other seven marked "Coming Soon."

## The Art Style Saga

This was the hardest part of the entire project, and it had nothing to do with code.

I started by purchasing pixel art tileset packs. Nice ones—furniture sets, office tilesets, character sprites. The problem was consistency. Every pack had a slightly different pixel density, color palette, and perspective angle. A desk from one pack next to a chair from another looked like two different games stitched together. I spent days trying to normalize them—recoloring, resizing, cropping—and the result was always off. It looked like a ransom note made from magazine clippings.

So I threw it all out and went programmatic.

Every room in the game is drawn with `<canvas>` `fillRect` calls. Chunky 4-pixel blocks. No PNGs, no spritesheets, no tile catalogs. A desk is a few colored rectangles. A filing cabinet is a stack of them. The player character is a 5x10 game-pixel figure with a round head, directional eyes, and a 2-frame walk animation. It sounds primitive, but the constraint forced a cohesive art style that nothing else could achieve. Everything looks like it belongs together because it's all built from the same atomic unit: a 4px colored square.

For assets that needed more fidelity—the title screen, character portraits, encounter scene illustrations—I used AI image generation through Replicate's FLUX 1.1 Pro Ultra model and Stability AI. The character select portraits went through multiple rounds: first full-body standing poses that felt lifeless, then close-up bust shots with dynamic action poses and dramatic lighting that actually captured personality. Getting six diverse characters to look like they came from the same game took iteration, but the MCP integration made it fast to experiment.

## What We Built

**11 game screens** forming a complete game loop:
- Title screen with AI-generated pixel art background and the Enhesa corporate logo
- Story Mode and Practice Mode selection
- TMNT arcade-style character creation with 6 diverse auditor profiles—each with unique PPE, skin tones, hair styles, and accessories that carry through to the in-game sprite
- Street Fighter 2-style world map with 8 facility markers
- Flight animation with jurisdiction briefing
- Top-down facility exploration with real-time movement and room transitions
- Two-phase encounter battle system (spot the violation, then classify it)
- Facility summary, game over, and end-game screens

**A complete programmatic rendering engine:**
- `PixelRoomRenderer` canvas component draws walls, floors, objects, doors, encounters, and the player character
- 21 drawable object types (desks, server racks, fire extinguishers, coffee machines, whiteboards, and more)
- 5 floor styles (checkerboard, parquet, concrete, tile, carpet)
- Player sprites with diverse appearances: skin tone, 5 hair styles, hard hats, safety glasses—all rendered from the character profile you pick

**An IP-safe encounter system:**
- Encounters are JSON templates with `PLACEHOLDER` stubs
- Enhesa subject matter experts fill in proprietary content manually—regulations, scenario descriptions, teaching explanations
- No Enhesa IP ever touches an LLM
- Two-phase design tests both violation identification and Enhesa category classification
- 8 EHS categories cover the full Enhesa taxonomy: Fire Safety, Chemical Management, PPE, Electrical Safety, Ergonomics, Waste Management, Machine Guarding, and Permits/Signage

**A built-in map editor** so Enhesa's compliance experts can craft scenarios without touching code:
- Accessible at `/?editor` in development (disabled in production builds)
- 6 tools with keyboard shortcuts: walkable tiles, walls, doors, encounter triggers, typed objects, and eraser
- Visual room builder with floor style picker, wall color selector, and a full object palette
- Ctrl+S saves room JSON that the game loads at runtime—no rebuild required
- This was critical: the people who know compliance best aren't developers, so the editor lets them place encounter triggers exactly where they make narrative sense

**A credibility and ranking system** with 8 auditor tiers from "Clipboard Carrier" to "Legendary Auditor," tracked in real-time on the HUD.

## How Long It Took

A long weekend. Started Friday evening, finished Monday—working part-time around everything else. From blank directory to a playable MVP with a full game loop, 11 screens, a programmatic rendering engine, AI-generated art, and a built-in map editor.

Claude Code handled roughly 90% of the implementation. I drove architecture decisions, art direction, and all the iteration on visual style. The AI image generation pipeline (Replicate MCP + Stability AI MCP) was invaluable for assets that needed more than colored rectangles—but the irony is that the most distinctive part of the game's look came from deliberately choosing *less* fidelity, not more.

## Tech Stack

- **Frontend**: Vite + React + TypeScript, fully client-side
- **Rendering**: HTML5 Canvas with programmatic `fillRect` pixel art (no image assets for rooms)
- **State Management**: React Context + useReducer (no external libraries)
- **AI Art Pipeline**: Replicate MCP (FLUX 1.1 Pro Ultra) + Stability AI MCP for portraits, title screen, encounter scenes
- **Data**: Static JSON in `public/data/` for rooms, encounters, facilities, and jurisdictions
- **Editor**: Custom map editor with visual tile painting and typed object placement

## Key Challenges

1. **Art style consistency**: The single hardest problem. Purchased pixel art packs don't mix. Different artists mean different perspectives, palettes, and pixel densities. Going fully programmatic with a strict 4px grid was the only path to visual coherence.

2. **Diverse character rendering at tiny scale**: Representing 6 distinct characters—different skin tones, hair styles, PPE equipment—in a 5x10 game-pixel sprite is a constraint puzzle. Every pixel matters. A hard hat is 2 rows. Braids are 3 pixels hanging off each side. Safety glasses are a single tinted line at eye level.

3. **Protecting proprietary content**: Enhesa's regulatory database is their product. The encounter system had to be designed so that all the scaffolding (game mechanics, UI, scoring, categories) could be built without ever seeing real content, and experts could inject it later through plain JSON editing.

4. **Making compliance fun**: The whole point collapses if it feels like a quiz with pixel art wallpaper. The RPG framing—credibility as HP, encounters as battles, ranks as levels—gives the learning loop stakes and progression that a flashcard deck can't.

## Status

MVP v0.1 is playable with the London Office facility complete (5 rooms, encounter system, full game loop). Seven more facilities are architecturally ready with tilesets designed and encounter templates stubbed. The editor is functional for Enhesa experts to build out scenario content. Next up: filling in the remaining facilities and expanding the encounter database from proof-of-concept to full training tool.
