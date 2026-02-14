---
title: "Building Brown Note: From Django Monolith to Mobile App in 3 Weeks with AI"
description: "How I built an anonymous peer support app for people with IBS and Crohn's — from concept to App Store submission — using Claude as my primary engineer, for under $350 total."
date: "2026-02-13"
tag: "Case Study"
excerpt: "I have Crohn's Disease and have spent more time on the toilet than I'd like to admit. So I built an app about it. Brown Note went from idea to App Store submission in 3 weeks, with ~90% of the code written by AI. Here's the full breakdown — architecture, costs, and what it's actually like to PM an AI engineer."
---

## The Pitch: Peer Support from the Throne

I have Crohn's Disease. If you don't know what that means, here's the short version: my immune system occasionally decides my digestive tract is the enemy, and I spend a lot of time in the bathroom as a result. It's isolating. It's frustrating. And weirdly, it's something most people won't talk about.

Brown Note is a note-passing app for people with IBS, Crohn's, and other digestive conditions. The idea is dead simple: you're stuck on the toilet and feeling alone, so you write an anonymous message. That message gets delivered to someone in the community who writes back with encouragement. No usernames, no profiles, no medical records — just one person saying "hey, I get it" to another.

The twist is gamification. You earn Nuggets (points) for helping others — posting messages, replying to people, daily check-ins. You spend Nuggets on collectible stickers. There are achievement stickers for milestones. The whole thing is wrapped in a warm, slightly silly aesthetic that leans into the poop humor, because sometimes the best way to cope with a serious disease is to not take yourself too seriously.

## The Architecture Decision: Two Repos, One API

Brown Note started as a Django web app — server-side rendered templates, PostgreSQL, deployed on Railway. The classic monolith. It worked fine for the web version, but mobile was always the real destination. Nobody opens a browser when they're in the bathroom. They reach for their phone.

The question was how to add mobile without breaking what already worked.

### Why Not a Monorepo

The Django app auto-deploys to Railway on every push to `main`. If I put React Native code in the same repo, every mobile commit would trigger a backend deploy — shipping node_modules, Expo configs, and package.json to a Python server. Bad idea.

The toolchains have zero overlap. Python/pip/gunicorn on one side. Node/TypeScript/Expo on the other. A monorepo would need Turborepo or Nx to manage both, adding complexity for no benefit when the only connection between the two is a REST API.

### The Two-Repo Setup

```
brown-note/              → Django backend (Railway, auto-deploy)
brown-note-mobile/       → React Native / Expo (EAS Build → App Stores)
```

The mobile app knows exactly one thing about the backend: `https://brownnote.app/api/v1/`. That's it. No shared code, no shared files, no imports between them. If I deleted the entire mobile repo, the web app wouldn't notice.

The API layer was built as a new Django app (`api/`) that sits alongside the existing `core/` app. It imports from `core.models` and `core.moderation`, but `core/` imports nothing from `api/`. If I deleted the entire `api/` folder, the web app would work exactly as it did before.

This additive-only approach is the key architectural decision. Zero risk to the working product at every step.

## The Timeline: 3 Weeks, 3 Phases

### Phase 1: REST API (Jan 21 – Feb 7)

The Django web app had all the business logic already — trust scores, nugget economy, moderation, sticker system, Stripe donations. But it was all tied to Django views and templates. Phase 1 was extracting that into a proper API.

**What got built:**
- 26 REST endpoints using Django REST Framework
- JWT authentication (15-min access tokens, 30-day rotating refresh tokens)
- Rate limiting (100 req/min authenticated, 5/min for login attempts)
- Auto-generated API docs via drf-spectacular (Swagger + ReDoc)
- 95 automated tests (64 API + 31 core)

The hardest part was email verification. Django-allauth handles this beautifully on the web with redirect flows, but mobile apps can't redirect to a Django template. The solution: allauth's confirmation key gets emailed to the user, they paste it into the app, and the app hits `POST /auth/verify-email/` with the key. Same allauth internals, different entry point.

**Time:** ~2.5 weeks (evenings and weekends — I have a baby)

### Phase 2: Mobile App (Feb 7 – Feb 11)

This is where things got interesting. The entire React Native app — 13 screens, 4 Zustand stores, a full API client with token refresh, animations, haptics — was built in about 4 days.

**The stack:**
- Expo 54 with managed workflow (no ejecting)
- Expo Router for file-based routing
- TypeScript
- Zustand for state management
- expo-secure-store for encrypted token storage
- react-native-reanimated + lottie-react-native for animations

**The screens:**

| Screen | Purpose |
|--------|---------|
| Sign In / Sign Up | Email + password, social login (Google + Apple) |
| Email Verification | Paste allauth key from email |
| Password Reset | Request + confirm flow |
| Dashboard | Welcome banner, streak, stats, "Post" and "Help Others" CTAs |
| Compose | Write a message (500 chars), attach a sticker |
| Help Others | Random message from someone who needs encouragement, write a reply |
| Inbox | Your messages with reply counts, paginated |
| Message Detail | Full message with replies, heart buttons, report buttons |
| Store | Sticker catalog, buy with Nuggets |
| Collection | Your stickers + achievement progress |
| Settings | Notification preferences, logout, support link |
| Support | Stripe checkout via in-app browser |

The design system uses warm cream (`#FAF9F6`), a rich brown (`#8B5A2B`), and purple accents (`#7C3AED`). Georgia serif for content, system sans-serif for UI. Paper textures on compose screens. Nugget burst animations when you earn points. A sticker celebration with rays and bounce when you unlock an achievement. Haptic feedback on hearts and sends. It's meant to feel like passing a handwritten note — tactile and warm.

**Time:** ~4 days of focused sessions

### Phase 3: Launch Prep (Feb 11 – Feb 13)

The final stretch: everything between "the app works" and "the app is in the App Store."

- **Social sign-in:** Google OAuth (3 client IDs for web, iOS, Android) + Apple Sign-In. Apple validates via JWKS public keys — no private key setup needed on the Apple Developer Portal.
- **Push notifications:** Device registration, Expo Push API integration on the backend, 3 notification triggers (new reply, heart received, achievement unlocked), deep linking on tap.
- **Privacy policy:** Written and deployed to `brownnote.app/privacy/`.
- **App Store prep:** Icon, screenshots, metadata, production builds via EAS.

**Time:** ~3 days

## The AI Engineering Experiment

Here's the part that might raise eyebrows: roughly 90% of the code in both repos was written by Claude.

I don't mean "Claude suggested some autocomplete and I tweaked it." I mean I described what I wanted — in plain English, with context about the architecture and constraints — and Claude wrote the implementation. Full files. Complete API views with serializers, permissions, throttling, and tests. Entire React Native screens with state management, error handling, and animations.

My role was closer to a PM/tech lead than a traditional developer:

1. **Architecture decisions** — I chose the two-repo approach, the tech stack, the API shape. Claude didn't make strategic calls.
2. **Quality review** — I read every line of code before committing. Claude writes clean code, but it occasionally makes assumptions that don't match the existing codebase.
3. **Testing on device** — I ran every flow on a physical iPhone. Claude can't tap a screen.
4. **Course correction** — When something didn't work (emoji clipping on iOS, case-sensitive sticker type comparisons, expo-notifications API changes in SDK 54), I described the problem and Claude fixed it.
5. **Domain knowledge** — I know what it feels like to be stuck in the bathroom with Crohn's. Claude doesn't. The product decisions — the tone, the gamification philosophy, the moderation approach — those came from lived experience.

### What Claude Is Good At

- **Boilerplate with context.** Django REST Framework serializers, Expo Router layouts, Zustand store patterns — Claude writes these faster and more consistently than I would.
- **Cross-referencing docs.** "Use `shouldShowBanner` not `shouldShowAlert` in expo-notifications SDK 54" — Claude knows API surfaces better than I can keep in my head.
- **Maintaining consistency.** Once a pattern is established (error handling, API client structure, component conventions), Claude replicates it perfectly across files.
- **Writing tests.** Claude wrote all 95 backend tests. They're thorough, covering edge cases I might have skipped.

### What Claude Is Not Good At

- **Knowing when to stop.** Claude will add error handling, type annotations, and abstractions to code that doesn't need them unless you tell it not to.
- **Novel architecture.** The two-repo strategy, the additive-only API approach, the allauth key-based verification for mobile — those were my calls. Claude executes decisions well but doesn't make them.
- **Physical device debugging.** When emoji were getting clipped on iOS, I had to see it on the phone, describe the visual issue, and let Claude propose the fix (`lineHeight` adjustments across 14 styles in 11 files).
- **Taste.** Product decisions about what's fun, what's annoying, what feels warm vs. clinical — that's human judgment.

## The Budget

Here's what Brown Note cost to build, from first commit to App Store submission:

| Item | Cost | Type |
|------|------|------|
| Claude Max subscription (2 months) | $200 | Monthly ($100/mo) |
| Apple Developer Program | $99 | Annual |
| Google Play Developer | $25 | One-time |
| Railway hosting | ~$15 | Monthly (~$7.50/mo) |
| SendGrid email | $0 | Free tier |
| Stripe | $0 | No fees until transactions |
| Expo EAS Build | $0 | Free tier (30 builds/mo) |
| Expo Push Notifications | $0 | Free |
| Domain (brownnote.app) | ~$15 | Annual |
| **Total** | **~$354** | |

That's a full-stack web app, a REST API with 26 endpoints and 95 tests, a cross-platform mobile app with 13 screens and push notifications, deployed to production with app store submission in progress. For the price of a nice dinner for two.

The Claude subscription is the biggest line item, and it's also the one that replaced what would traditionally be months of engineering time. The math on AI-assisted development isn't subtle anymore.

## What I'd Do Differently

**Start with the API, not the web app.** I built the Django templates first because that's what I knew. But the web app's server-side rendering is now the "legacy" path — the API is what both mobile and any future web SPA would use. If I started today, I'd build API-first and render the web frontend with React or even just mobile-only.

**Skip the web app entirely.** For a product like Brown Note — used in a specific physical context (the bathroom), on a specific device (phone) — a web app adds maintenance burden without adding much value. The mobile app is the product. The web app is a nice-to-have.

**Set up the OpenAI Moderation API from day one.** Pattern-based content moderation works for development, but App Store reviewers will test with abusive content. I'm upgrading to OpenAI's moderation before submission, and I wish I'd done it from the start. It's free-tier and takes an hour to integrate.

## The Unsexy Truth About Shipping

The flashy part of this story is the AI angle — "90% of the code written by Claude" — and I get it, that's the headline. But the actual hard parts were decidedly unglamorous:

- Figuring out that `railway.json`'s `startCommand` overrides the `Procfile`, so my migrations weren't running
- Learning that Django's custom admin site requires `site=admin_site` in every `@admin.register()` call
- Discovering that `expo-dev-client` must be installed *before* creating dev builds
- Enabling Developer Mode on my iPhone (buried in Settings > Privacy & Security)
- Realizing I can't run `manage.py` locally against Railway's internal database URL

None of this is in any tutorial. None of it is intellectually hard. All of it will stop you cold if you don't figure it out. The difference between "I have a working app" and "I have an idea for an app" is almost entirely made up of these kinds of problems.

Claude helped with many of them. But I still had to encounter them first.

## What's Next

Brown Note is currently in the App Store review process. The web app is live at [brownnote.app](https://brownnote.app). The mobile app supports iOS and Android, with push notifications, social sign-in, and the full sticker economy.

If you have IBS, Crohn's, or any digestive condition — or if you just want to help someone who does — I'd love for you to try it. Because nobody should have to feel alone on the throne.
