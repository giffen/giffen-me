---
title: "Automatic Pocket"
description: "A drummer timing trainer built in one evening with agentic Claude Code — from brief to fully functional app in a single session."
date: "2026-02-24"
status: "complete"
tags: ["mobile", "audio", "Expo", "TypeScript", "Claude Code", "agentic AI", "music-tech"]
image: "/images/lab/automatic-pocket.png"
featuredImage: "/images/lab/automatic-pocket-feature.png"
repoUrl: "https://github.com/giffen/automatic-pocket"
published: true
---

## The Problem

Drummers rely on the click track as a crutch. We play perfectly in time when we can hear it — but on stage, when the monitor mix drops out, the singer calls an audible, or a stick breaks mid-fill, our internal clock drifts and nobody tells us. Existing metronome apps either play a click (which everyone already has) or drop bars of silence without measuring what happens during the gap. None of them combine the drop-out metronome with real-time microphone listening and scoring. And none of them simulate the cognitive chaos of a live performance.

I wanted to build an app that trains the thing behind the click — the internal clock that keeps you locked in when everything else falls apart.

## The Experiment

The real experiment here wasn't the app itself. It was the process.

I wrote a detailed project brief — 375 lines covering the problem, competitive landscape, feature spec, audio engine architecture, scoring algorithm, data schema, design direction, monetization strategy, and six development phases. Then I handed it to Claude Code with one instruction:

> Read this brief. Build the whole thing autonomously, phase by phase. Don't ask me questions — make reasonable decisions and document your assumptions. Start now.

I wanted to see how far agentic AI could take a non-trivial project — one with real-time audio scheduling, microphone onset detection, band-pass filtering, scoring algorithms, and a multi-screen native app — without me writing a single line of code.

## What Got Built

The session ran through five development phases in a single evening:

**Phase 1: Core Metronome** — A full Expo (React Native) app with a tempo knob, time signature selector, subdivision control (quarter notes through 16ths), configurable bar breaks, and a Web Audio API engine with lookahead scheduling for sample-accurate click timing. Three screens: home, training, and results.

**Phase 2: Listening + Scoring** — Microphone onset detection using Web Audio API's `AnalyserNode` with band-pass filtering for kick (60–130 Hz) and snare (301–750 Hz) frequency bands. An 8-beat calibration flow, RMS energy threshold detection, and a three-component scoring algorithm: drift (50%), variance (30%), and hit rate (20%).

**Phase 3: Data Persistence** — AsyncStorage session storage, settings persistence, session history screen, and real trend charts from stored data.

**Phase 4: Pressure Mode** — Five levels of cognitive distraction overlays during silent bars. Level 1 flashes random numbers on screen. Level 2 shows a number to memorize before it fades. Level 3 throws math problems at you. Level 4 fires arrangement cues — "CRASH", "FILL!", "HALF TIME" — that you'd need to execute on a real gig. Level 5 is everything at once. A pressure resilience score rewards maintaining your pocket under load.

**Phase 5: Polish + Monetization** — Tap tempo (tap the knob center), four click sound presets (Classic, Wood, Digital, Deep), a paywall screen with pricing, and a pro/free feature gating system.

Final build: 770 modules, 8 routes, zero TypeScript errors.

## How Agentic Claude Code Actually Works

The interesting part isn't that it wrote code. It's *how* it managed a complex project.

**It made architectural decisions.** The brief said "don't use setInterval for beat timing" — Claude chose a dual-engine approach: Web Audio API with lookahead scheduling on web (the gold standard for browser audio), and `requestAnimationFrame` with absolute timestamps on native. It documented the tradeoffs and limitations in a decisions log without being asked.

**It parallelized work.** When building Phase 2, it spawned two agents simultaneously — one building the beat detector and scoring engine, the other updating the screens and hooks. Both completed and integrated cleanly.

**It tested and fixed its own bugs.** After each phase, it ran `expo export --platform web` to verify compilation. When TypeScript typed routes didn't include a new screen, it diagnosed the issue and regenerated the route types. When a strict null check failed on the AudioContext, it applied a non-null assertion and explained why.

**It knew when to mock.** In Phase 1, scoring didn't exist yet, so it generated plausible mock data for the drift bar and score history — then replaced every mock with real data in Phase 2 when the scoring engine was built.

**It documented as it went.** After each phase, it updated `PROGRESS.md` with what was built, what worked, and known issues — and `DECISIONS.md` with architectural rationale. These weren't summaries — they were engineering docs I could hand to another developer.

## The Audio Engine

The most technically interesting piece is the audio scheduling. Browsers can't reliably time events with `setTimeout` — the event loop introduces jitter that's perceptible at musical tempos. The solution is the "lookahead" pattern: a scheduling loop runs every 25ms and queues clicks up to 100ms into the future using `AudioContext.currentTime`. The Web Audio API handles the actual timing at the hardware level.

```typescript
// Schedule all sub-beats that fall within the lookahead window
while (this.nextSubBeatTime < engine.currentTime + this.LOOKAHEAD_WEB) {
  this.scheduleSubBeat(this.nextSubBeatTime);
  this.advanceSubBeat();
  this.nextSubBeatTime += this.subBeatInterval;
}
```

This gives sample-accurate timing with zero drift. The click sounds themselves are synthesized oscillators — 1200 Hz sine for accents, 800 Hz for normal beats, 1400 Hz for subdivisions — with exponential gain ramps for crisp transients.

For onset detection, the microphone signal is split through two band-pass filters (kick and snare bands), run through `AnalyserNode` for RMS energy calculation, and matched against an expected beat grid. The BeatDetector shares the same `AudioContext` as the metronome engine so both systems are on the exact same time reference.

## What I Learned

**A good brief is the highest-leverage input.** The session worked because the brief was thorough — it covered not just *what* to build but *why*, with technical constraints, competitive context, and explicit non-goals. Claude didn't have to guess at the product vision.

**Agentic AI is a force multiplier, not a replacement.** I didn't write code, but I wrote the brief, reviewed the architecture, and made the call to push to GitHub. The AI handled the implementation — which is exactly the part that would have taken me weeks of evenings to do myself.

**The quality bar is real.** This isn't a demo or a toy. The audio engine uses the same scheduling pattern as professional DAWs. The onset detection pipeline is legitimate signal processing. The scoring algorithm is based on real synchronization-continuation task research. Claude didn't cut corners because the brief didn't give it permission to.

**Pressure mode is backed by real neuroscience.** Dual-task interference studies show that cognitive load doesn't change *what* tempo you play — it makes you *less consistent*. That's the exact gap pressure mode trains against. The 2025 study with 103 participants confirmed that dual-tasking selectively hinders temporal stability in sub-second motor timing — but crucially, this decline is reduced following longitudinal training. It's trainable.

## Tech Stack

- **Framework**: Expo (SDK 54) with TypeScript, Expo Router
- **Audio**: Web Audio API (AudioContext, OscillatorNode, AnalyserNode, BiquadFilterNode)
- **UI**: React Native, react-native-svg, Animated API
- **Storage**: AsyncStorage (sessions, settings, pro state)
- **Detection**: Band-pass filtering + RMS energy onset detection via microphone
- **Scoring**: Three-component weighted algorithm (drift, variance, hit rate)
- **Design**: Dark theme (#0A0A0F), green/amber/red color system, SpaceMono font

## Status

Live on the App Store for iOS. The entire app — from reading the brief to the final commit — was built in one evening with Claude Code acting as the sole developer. The full source is on [GitHub](https://github.com/giffen/automatic-pocket).

---

## Privacy Policy

**Last updated: February 27, 2026**

Automatic Pocket is developed by Giffen Good LLC. This privacy policy explains how the app handles your data.

### Data We Collect

**Microphone audio** — The app accesses your device microphone during training sessions to detect drum hits and score your timing accuracy. Audio is processed entirely on-device in real time. No audio is recorded, stored, or transmitted.

**Session data** — Training session results (tempo, scores, timestamps) are stored locally on your device using AsyncStorage. This data never leaves your device.

**Settings** — Your preferences (tempo, time signature, subdivision, pressure level) are stored locally on your device.

### Data We Do Not Collect

- No personal information (name, email, phone number)
- No location data
- No analytics or tracking
- No advertising identifiers
- No data shared with third parties
- No server-side data collection of any kind

### Third-Party Services

Automatic Pocket does not use any third-party analytics, advertising, or tracking services. The app functions entirely offline after installation.

### Data Retention

All data is stored locally on your device. Uninstalling the app removes all stored data. There is no account system and no server-side data to delete.

### Children's Privacy

Automatic Pocket does not knowingly collect any personal information from children. The app contains no user accounts, no social features, and no data collection.

### Changes to This Policy

If this policy changes, the updated version will be posted here with a new "last updated" date.

### Contact

Questions about this privacy policy can be directed to: **hello@giffen.me**
