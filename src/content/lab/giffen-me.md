---
title: "Giffen.me"
description: "Building a personal site with Astro, content collections, and a literary paperback aesthetic."
date: "2025-11-20"
status: "ongoing"
tags: ["Astro", "TypeScript"]
pattern: 3
repoUrl: "https://github.com/agiffen/giffen-me"
liveUrl: "https://giffen.me"
---

## The Problem I Was Trying to Solve

I needed a home base on the internet—somewhere to showcase my work, share what I'm learning, and make it easy for people to get in touch. Most portfolio templates felt either too corporate or too minimal. I wanted something with personality.

## What I Learned

### Astro's Content Collections Are Great

The content collection system lets you define schemas for your markdown content with full TypeScript support. No more hoping your frontmatter is correct.

```typescript
const lab = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.string(),
    tags: z.array(z.string()),
  }),
});
```

### Design Decisions

**The Paperback Aesthetic**: I wanted the site to feel like a well-loved book. This meant:
- Cream backgrounds instead of pure white
- Serif fonts for headlines (Playfair Display)
- A readable body font (Lora)
- Subtle paper grain texture
- Book-spine shadows on the lab cards

**Navigation**: Inspired by Jose Ocando's site—a floating glass-style pill that stands out from the content without being heavy.

### Performance Wins

Astro's islands architecture means JavaScript only loads where needed. The result:
- ~50KB total page weight
- 100 Lighthouse performance score
- Works without JavaScript (progressively enhanced)

## The Tech Stack

- **Astro 5** — Static site generator with islands
- **TypeScript** — Type safety for components
- **CSS Custom Properties** — Design tokens without a framework
- **Markdown** — Content authoring

## What I'd Do Differently

1. **Set up a design system earlier** — I retrofitted CSS variables halfway through. Should've started there.

2. **Component library from day one** — Extracted reusable components late in the process.

## Outcome

A site that feels personal, loads fast, and is easy to update. The content collection system makes adding new lab projects or writing pieces as simple as creating a new markdown file.

More importantly, I actually *like* visiting my own site now—which means I'll actually keep it updated.
