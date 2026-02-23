---
title: "Giffen.me Tools"
description: "A content workflow system that captures ideas via Telegram, publishes to LinkedIn through a custom MCP server, and tracks engagement — all from inside Claude Code."
date: "2026-02-22"
status: "ongoing"
tags: ["TypeScript", "MCP", "LinkedIn API", "Telegram", "Claude Code"]
image: "/images/lab/lab-giffen-me-tools.png"
featuredImage: "/images/lab/giffen-me-tools-feature.png"
repoUrl: "https://github.com/agiffen/giffen-me-tools"
published: true
---

## The Problem I Was Trying to Solve

I had a writing habit forming but no system behind it. Ideas showed up at random — in Claude Chat on my phone, walking the dog, reading someone else's post — and then disappeared. When I did finish an article, publishing meant tabbing between my site repo, LinkedIn's composer, and a spreadsheet where I half-heartedly tracked what performed. The friction killed momentum.

What I actually wanted was a single loop: capture an idea, develop it with Claude Code, publish the article and a LinkedIn post in one session, then use engagement data to figure out what to write next. No context switching, no copy-paste publishing, no manual analytics spreadsheets.

The problem was that Claude Code can't talk to LinkedIn out of the box, and there was no fast way to capture ideas from my phone without losing them. So I built two things: an MCP server that gives Claude Code direct access to the LinkedIn API, and a Telegram bot that turns a text message into a GitHub Issue in seconds.

## What I Learned

### MCP Servers Are Just Tool Definitions

The Model Context Protocol sounds heavier than it is. An MCP server is a Node process that declares a set of tools — name, description, input schema — and handles calls to them. Claude Code discovers the tools at startup and can invoke them mid-conversation like any other tool.

```typescript
server.tool(
  "linkedin_create_post",
  "Create a new LinkedIn post (text or link)",
  { text: z.string(), articleUrl: z.string().optional() },
  async ({ text, articleUrl }) => {
    const result = await client.createPost(text, articleUrl);
    return { content: [{ type: "text", text: JSON.stringify(result) }] };
  }
);
```

Eight tools total: create posts, comment, react, fetch profile info, and four tracking tools for logging and reviewing engagement stats locally.

### LinkedIn's API Is Fine — If You Accept the Constraints

The official LinkedIn API gives individuals write-only access through the `w_member_social` scope. You can post, comment, and react. You cannot read comments, pull analytics, or fetch your feed — that requires the Community Management API, which is gated behind LLC registration.

Rather than use unofficial APIs and risk account suspension, I accepted the constraint and built a workaround: I manually copy stats from the LinkedIn UI into Claude Code, which logs them locally in a JSON file. It's not elegant, but it's accurate and it keeps everything in one conversation.

### The Real Value Is the Closed Loop

The technical pieces — OAuth, API calls, MCP protocol — are straightforward. The real value is what happens when they're connected. A session looks like this:

1. **Capture** — Text an idea to the Telegram bot, or review existing GitHub Issues labeled `idea` using `gh issue list`
2. **Refine** — Pick one, outline it, write the full article as markdown
3. **Publish** — Commit the article to `giffen-me`, then call `linkedin_create_post` to post it
4. **Track** — Log the post with `log_post`, check back later and record stats with `log_stats`
5. **Ideate** — Review what performed with `list_posts`, discuss why, file new ideas as issues

The entire cycle happens inside Claude Code. No tab switching, no copy-pasting between apps. The AI isn't just generating text — it's operating the publishing infrastructure.

### A Telegram Bot Closes the Capture Gap

The biggest leak in the system was idea capture. I'd have a thought on a walk and either forget it or text myself something vague. Now I text a Telegram bot — a single Vercel serverless function — and it creates a GitHub Issue on `giffen-me` with the label `idea`. First line becomes the title, full message becomes the body. The entire handler is one file.

### GitHub Issues as a Content Pipeline

I considered Notion, Trello, and dedicated content calendars. GitHub Issues won because Claude Code already has native access via `gh`, it's free, it works from my phone via GitHub Mobile, and labels (`idea` → `outline` → `drafting` → `posted`) give lightweight status tracking without any new tooling. The Telegram bot feeds directly into this pipeline — ideas go from my phone to a GitHub Issue in seconds, ready for the next Claude Code session.

## The Tech Stack

- **TypeScript** — MCP server, LinkedIn client, and Telegram bot
- **@modelcontextprotocol/sdk** — MCP protocol implementation
- **LinkedIn REST API** — Official API with OAuth 2.0
- **Telegram Bot API** — Idea capture via webhook
- **Vercel Serverless Functions** — Telegram bot hosting
- **Zod** — Schema validation for tool inputs
- **JSON file storage** — Local post tracking (no database needed)
- **GitHub Issues** — Content pipeline and idea management

## What I'd Do Differently

1. **Structure the stats tracker for trends** — Right now `log_stats` stores snapshots, but there's no built-in way to compare performance across posts or visualize trends over time.

2. **Automate the stats workaround** — The manual copy-paste of LinkedIn stats works, but it's the one step that breaks the flow. If I register an LLC, the Community Management API would close that loop entirely.

## Outcome

The first article published through the system — "Beyond Agile: What Comes Next" — hit 212 likes, 19 comments, and 9 reposts. More importantly, it went from idea to published article and LinkedIn post in a single Claude Code session.

The system doesn't make the writing better. It makes the *not-writing* parts disappear — the publishing, the tracking, the context switching — so the only thing left to do is think and write.
