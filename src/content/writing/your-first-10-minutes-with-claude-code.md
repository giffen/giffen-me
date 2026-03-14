---
title: "Your First 10 Minutes With Claude Code"
description: "The setup most people skip that makes every Claude Code session faster, cheaper, and less likely to go sideways."
date: "2026-03-13"
tag: "Guide"
excerpt: "Most people open Claude Code and start prompting. That works — until your sessions get expensive, your agent makes the same mistakes twice, and you're spending more time correcting than building. Here's the setup that fixes it, whether you're starting fresh or mid-project."
---

Most people open Claude Code and start prompting. That works — until your sessions get expensive, your agent makes the same mistakes twice, and you're spending more time correcting than building.

The fix is spending 10 minutes on setup before you start working. This isn't theory — it's the actual configuration that Claude Code reads, and understanding how it works changes everything about your experience.

## What Claude Code Actually Reads

When you start a session, Claude Code looks for a file called `CLAUDE.md` in your project root. Think of it as a brief for a contractor — it tells Claude what this project is, how the code is structured, and what rules to follow. Without it, Claude is guessing.

But here's the part most people miss: Claude Code doesn't just read one file. It walks up the directory tree and discovers `CLAUDE.md` files in subdirectories too. A `CLAUDE.md` in `src/api/` only loads when Claude is working in that directory. This means you can keep your root instructions lean and push domain-specific details closer to the code they apply to.

There's also a `@import` syntax. Inside any `CLAUDE.md`, you can reference other files:

```markdown
See @docs/architecture.md for system design decisions.
Follow the conventions in @docs/api-design.md for all endpoints.
```

These resolve relative to the file containing the import, support up to 5 levels deep, and only require a one-time approval the first time you use them. This is how you keep your root `CLAUDE.md` short without losing information — you're linking to it, not inlining it.

Finally, there's `.claude/rules/` — a directory where you can drop modular markdown files for specific topics. These can even be scoped to file paths using YAML frontmatter:

```markdown
---
paths: ["src/api/**/*.ts"]
---
# API Design Rules
- All endpoints return `{ data, error }` shape
- Use Zod for request validation
- Never expose internal IDs in responses
```

That rule only loads when Claude touches files matching `src/api/**/*.ts`. This is scoped context — Claude gets the right instructions for the right files without you bloating the root.

## The Setup Prompt

Here's a prompt you can drop into any project. Run it as a standalone session — don't mix it with feature work.

```
Audit and optimize this project's CLAUDE.md and developer tooling:

1. Audit the current CLAUDE.md (or create one if it doesn't exist)
   - Identify content that only applies to specific directories
   - Flag redundant or low-signal instructions
   - Note any project conventions not currently documented

2. Restructure for scoped loading
   - Root CLAUDE.md: only universal rules (stack, critical constraints,
     build/test/lint commands)
   - .claude/rules/: modular files for specific concerns (code style,
     testing conventions, API design)
   - Use path-scoped frontmatter where rules only apply to certain files
   - @import links to docs/ for reference material (architecture, data
     models) rather than inlining

3. Set up linting hooks
   - Add or tighten linting config for this stack
   - Create a PostToolUse hook that runs the linter on every Edit/Write
   - Add a pre-commit hook that runs the full linter before commits

4. Validate
   - Root CLAUDE.md is under 100 lines
   - Each rules file is scoped to its domain
   - Hooks run end-to-end without errors on current codebase

Do not change any application logic. This is a tooling and
context optimization task only.
```

Let me break down what each step is actually doing and why.

## Step 1: The Audit

The audit is the most important step because it forces you to look at what Claude is actually reading at the start of every session.

If you don't have a `CLAUDE.md`, Claude starts every session cold — no knowledge of your stack, your conventions, or your project structure. It figures things out by reading files as it goes, which means your first few interactions are always slower and more error-prone than they need to be.

If you do have one, it's probably grown organically. You added a note about your database naming conventions, then your API auth pattern, then a reminder about that one edge case in the billing module. Now it's 400 lines and Claude is ingesting all of it at the start of every session, even when you're working on something completely unrelated.

The audit identifies what should stay at the root (things Claude always needs to know) versus what should move closer to the code it applies to.

**What belongs in the root CLAUDE.md:**
- Project name and what it does (one sentence)
- Tech stack
- How to build, test, and lint (`npm run dev`, `pytest`, etc.)
- Critical constraints ("never modify migration files directly")
- Git workflow ("always create new branches from main")

**What doesn't belong in the root:**
- API endpoint conventions (move to `.claude/rules/api-design.md`)
- Component patterns (move to `src/components/CLAUDE.md`)
- Database schema details (move to `@docs/data-model.md`)
- Testing conventions (move to `.claude/rules/testing.md`)

## Step 2: Scoped Loading

This is where the cost savings come from — especially if you're running parallel agents.

Every token in your root `CLAUDE.md` gets loaded into every session and every subagent. If you have 300 lines of instructions and you spin up 5 parallel agents, that's 1,500 lines of context consumed before any of them do anything. Most of those lines are irrelevant to what each agent is actually doing.

When you move API rules into `.claude/rules/api-design.md` with a `paths: ["src/api/**"]` scope, an agent working on your frontend components never sees them. It gets a lean root context and only the rules relevant to the files it's touching.

The `@import` syntax is for reference material that's too detailed for rules but too important to lose. Architecture decisions, data models, API contracts — things you've already written down somewhere. Instead of copying them into CLAUDE.md (where they'll go stale), you link to the source of truth:

```markdown
# Project Context
@docs/architecture.md
@docs/data-model.md
```

Claude loads these on demand when it needs context, not upfront on every session.

## Step 3: Linting Hooks

This is the step that changes Claude's behavior the most, and it's the one people underestimate.

Claude Code has a hooks system — shell commands that fire at specific points in the session lifecycle. The one that matters most for code quality is `PostToolUse`: it fires after Claude edits or creates a file.

Here's what the actual configuration looks like. This lives in your project's `.claude/settings.json`:

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [
          {
            "type": "command",
            "command": "jq -r '.tool_input.file_path' | xargs npx eslint --fix"
          }
        ]
      }
    ]
  }
}
```

**What's happening here:** Every time Claude uses the Edit or Write tool, this hook fires. It reads the file path from the tool's input (via `jq`), runs ESLint with auto-fix on that file, and feeds the output back to Claude.

The key insight is that Claude responds to deterministic error messages better than natural language instructions. You can write "use 2-space indentation" in your CLAUDE.md and Claude will follow it most of the time. But if you have an ESLint rule that enforces 2-space indentation and the hook feeds violations back immediately, Claude will follow it every time — and auto-correct without you saying anything.

This is why the advice to "enforce coding rules rigidly" actually works. It's not about being strict with Claude in your prompts. It's about giving Claude a machine-readable feedback loop that catches drift the moment it happens, not three files later when you notice it during review.

You can also add a `Stop` hook that runs the linter across the whole project when Claude finishes responding:

```json
{
  "hooks": {
    "Stop": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "npx eslint src/ --format compact 2>&1 | head -20"
          }
        ]
      }
    ]
  }
}
```

And a pre-commit hook is just standard git — add it to `.husky/pre-commit` or `.git/hooks/pre-commit`. Claude will see the output when a commit fails and fix the issues automatically.

## Step 4: Validate

The validation step is a sanity check. After restructuring, you want to confirm:

- **Root CLAUDE.md is under 100 lines.** If it's longer, something domain-specific snuck in. The official recommendation is under 200 lines, but shorter is better — especially with parallel agents.
- **Each rules file is scoped.** If `.claude/rules/testing.md` contains API conventions, it's in the wrong place.
- **Hooks run without errors.** Run your linter manually on the current codebase before wiring it to hooks. Production codebases that haven't had linting enforced will surface a wall of violations the first time — you want to fix those in a dedicated cleanup, not discover them mid-feature.

## What If You're Mid-Project?

If you're in the middle of building something, don't run this prompt. Here's why: introducing new lint rules and restructuring CLAUDE.md while you're mid-feature creates noise. New lint violations surface on existing code. Claude's behavior shifts because its instructions changed. You're debugging your tooling instead of shipping your feature.

Instead, do it in two stages:

**Right now (5 minutes, safe to do anytime):**
- Create a root `CLAUDE.md` if you don't have one, with just the basics — stack, build commands, critical constraints
- Or if you have one, skim it and move anything obviously domain-specific into a `.claude/rules/` file
- Commit this separately so you can diff what changed

**At your next natural pause (end of feature, before a new sprint):**
- Run the full prompt as a standalone session
- Fix any lint violations that surface as a separate commit
- Wire up the hooks

The goal is to never mix tooling changes with application changes. They're different kinds of work and they muddy each other's diffs.

## Does This Actually Matter?

For a solo side project with 10 files — honestly, not much. A CLAUDE.md with your stack and a few conventions is plenty.

For anything with multiple directories, multiple concerns, or parallel agents — yes. The ROI compounds:

- **Fewer corrections.** Claude follows rules it can verify against lint output. You stop repeating yourself.
- **Lower cost.** Less context per session means fewer tokens. With parallel agents, this multiplies.
- **Better decisions.** When Claude only sees the rules relevant to what it's working on, it follows them more reliably than when it's parsing 400 lines of mixed instructions.
- **Faster onboarding.** Your CLAUDE.md becomes documentation. New collaborators (human or AI) get up to speed by reading it.

The setup takes 10 minutes. The payoff is every session after that.
