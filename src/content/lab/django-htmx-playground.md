---
title: "Django + HTMX Playground"
description: "Learning notes and a working demo to understand htmx patterns for building interactive web applications without heavy JavaScript frameworks."
date: "2026-01-05"
status: "in-progress"
tags: ["Django", "HTMX", "Python"]
pattern: 1
repoUrl: "https://github.com/agiffen/lab-django-htmx"
liveUrl: "https://django-htmx.giffen.me"
published: false
---

## The Problem I Was Trying to Solve

Modern web development often feels like you need to choose between two extremes: either build a full single-page application with React/Vue/Angular, or accept clunky page reloads for every interaction. I wanted to find a middle ground—something that gives me interactivity without the complexity of maintaining two separate applications (frontend and backend).

## What I Learned

HTMX lets you add dynamic behavior to your pages by returning HTML fragments from the server instead of JSON. This keeps all your logic in one place (the backend) while still delivering a snappy user experience.

### Key Patterns

**Infinite Scroll**: Instead of pagination links, use `hx-trigger="revealed"` to load more content as the user scrolls.

```html
<div hx-get="/items?page=2" 
     hx-trigger="revealed" 
     hx-swap="afterend">
  Loading...
</div>
```

**Inline Editing**: Click to edit, submit without page reload.

```html
<div hx-get="/item/1/edit" hx-trigger="click" hx-swap="outerHTML">
  Click to edit this text
</div>
```

**Live Search**: Filter results as you type with debouncing.

```html
<input type="search" 
       name="q"
       hx-get="/search" 
       hx-trigger="keyup changed delay:300ms"
       hx-target="#results">
```

## The Tech Stack

- **Django 5.0** — The web framework
- **HTMX 1.9** — For dynamic interactions
- **Alpine.js** — For small client-side state when needed
- **TailwindCSS** — For styling (though I'm reconsidering this)

## What I'd Do Differently

1. **Start with django-htmx package earlier** — It handles the `HX-Request` header detection and provides useful middleware.

2. **Think in partials from day one** — Structure your templates to be composable from the start.

3. **Don't fight the pattern** — Some things genuinely need client-side state. Alpine.js fills that gap nicely.

## Outcome

I now have a reusable template for building interactive Django apps without the SPA complexity. The mental model is simpler: every interaction is just a request that returns HTML.

> "The best code is the code you don't have to write." — This approach means less JavaScript to maintain, fewer build tools, and a smaller bundle size.
