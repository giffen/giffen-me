---
title: "Your First 10 Minutes With Claude Code"
description: "The setup most people skip that makes every Claude Code session faster, cheaper, and less likely to go sideways."
date: "2026-03-13"
tag: "Guide"
excerpt: "Most people open Claude Code and start prompting. That works — until your sessions get expensive, your agent makes the same mistakes twice, and you're spending more time correcting than building. Here's the step-by-step setup that fixes it."
---

Most people open Claude Code and start prompting. That works — until your sessions get expensive, your agent drifts from your conventions, and you're spending more time correcting than building.

The fix is 10 minutes of setup. But before I walk through it, it's worth understanding why this isn't automatic — and why it probably shouldn't be.

## Why Doesn't Claude Code Just Do This?

Claude Code is a general-purpose coding agent. It works on Python backends, React frontends, Rust CLI tools, Ruby on Rails monoliths — any codebase, any language, any architecture. It can't ship with opinions about how your project should be structured because it doesn't know your project.

That's the tradeoff. A tool that works on everything out of the box can't be pre-configured for anything specific. It's like buying a new IDE — VS Code is powerful immediately, but it gets dramatically better once you configure your linter, set up your keybindings, and install extensions for your stack. Nobody complains that VS Code doesn't ship pre-configured for Django. You set it up for your workflow.

Claude Code is the same. The out-of-the-box experience is solid. The configured experience is significantly better — faster, cheaper, more consistent, and less likely to make mistakes you've already told it about.

The difference is that most IDE configuration is well-documented and widely understood. Claude Code's configuration system is powerful but still new enough that most people don't know it exists. That's what this guide is for.

## What You Get From This Setup

Before the step-by-step, here's what changes:

**Without setup:** Claude reads your code cold every session. It infers your conventions from whatever files it happens to look at. It might use 4-space indentation in one file and 2-space in another because it saw both patterns. It doesn't know your API design rules, your testing conventions, or that you never want it to modify migration files. You correct it, it apologizes, and next session it makes the same mistake because the correction wasn't persisted anywhere.

**With setup:** Claude starts every session with your project brief already loaded. It knows the stack, the conventions, the constraints. When it edits a file, a linting hook immediately tells it if something's wrong — and it fixes it without you saying a word. Rules that only apply to your API code only load when Claude is working on API files. Your parallel agents each get a lean, relevant context instead of ingesting everything.

The practical difference: fewer corrections, lower token costs, more consistent code, and sessions that feel like working with someone who's read the docs rather than someone who's winging it.

## Step 1: Create Your Root CLAUDE.md

This is the single highest-leverage thing you can do. Create a file called `CLAUDE.md` in your project root.

Claude Code reads this file at the start of every session. It's a brief — not documentation, not a README. Think of it as the 30-second context you'd give a contractor before they start working on your codebase.

**Create the file with these sections:**

```markdown
# Project Name

One sentence about what this project does.

## Stack

- Language/framework (e.g. Node.js + Express, Python + Django)
- Database (e.g. PostgreSQL)
- Frontend (e.g. React with Vite)

## Commands

- Build: `npm run build`
- Dev: `npm run dev`
- Test: `npm test`
- Lint: `npx eslint src/`

## Constraints

- Never modify migration files directly
- Always create new git branches from main
- Don't add dependencies without asking first
```

**Why this matters:** Without this, Claude spends the first few interactions discovering things it could've known upfront. With it, your first prompt gets a relevant response immediately. The commands section is especially important — Claude can run your build and test commands without guessing.

**Keep it under 100 lines.** Everything in this file gets loaded into every session and every subagent. If you're running 5 parallel agents, this file is read 5 times. Keep it lean. If you're tempted to add more, that's what the next step is for.

## Step 2: Move Domain-Specific Rules Into .claude/rules/

Your root CLAUDE.md should only contain things that apply everywhere. Anything specific to a part of your codebase goes into `.claude/rules/`.

**Create the directory:**

```
mkdir -p .claude/rules
```

**Create rules files for each concern.** For example:

`.claude/rules/code-style.md`:
```markdown
# Code Style

- Use 2-space indentation
- Prefer named exports over default exports
- Use async/await, never raw Promises
- Error messages should be user-readable, not stack traces
```

`.claude/rules/testing.md`:
```markdown
# Testing Conventions

- Every new function needs a test
- Use describe/it blocks, not test()
- Mock external services, never hit real APIs in tests
- Test file lives next to source file: foo.js → foo.test.js
```

**For rules that only apply to certain files**, add path-scoped frontmatter:

`.claude/rules/api-design.md`:
```markdown
---
paths: ["src/api/**/*.ts", "src/routes/**/*.ts"]
---
# API Design

- All endpoints return { data, error } shape
- Use Zod for request validation
- Never expose internal database IDs in responses
- Always include pagination for list endpoints
```

**What's happening here:** Claude Code loads rules files from `.claude/rules/` automatically. When a file has `paths` frontmatter, it only loads when Claude is working with files matching those patterns. An agent refactoring your frontend components will never see your API design rules — it only gets what's relevant.

**Why this matters:** This is where cost savings come from. Every token of context costs money. With parallel agents, irrelevant context multiplies across every agent. Scoped rules keep each agent's context lean and relevant, which means better adherence to the rules it does see and lower cost per session.

## Step 3: Link Reference Material With @imports

Some context is too detailed for rules files but too important to lose — architecture decisions, data models, API contracts. Instead of inlining them into CLAUDE.md (where they'll get stale), link to the source of truth.

**Add imports to your root CLAUDE.md:**

```markdown
## Reference

- Architecture: @docs/architecture.md
- Data model: @docs/data-model.md
- API contract: @docs/api-contract.md
```

**You can also use imports inside rules files:**

```markdown
---
paths: ["src/api/**"]
---
# API Design

See @docs/api-contract.md for the full endpoint specification.

- All new endpoints must follow the patterns documented there
- Breaking changes require a version bump
```

**What's happening here:** The `@` syntax tells Claude Code to load the referenced file when it needs that context. Paths resolve relative to the file containing the import, and they support up to 5 levels of nesting. The first time you use imports, Claude Code asks for a one-time approval.

**Why this matters:** Your architecture docs probably already exist somewhere. This connects them to Claude without duplicating them. When the docs update, Claude automatically sees the latest version — no need to sync CLAUDE.md manually.

## Step 4: Set Up Linting Hooks

This is the step that changes Claude's behavior the most.

Claude Code has a hooks system — commands that fire at specific points in the session lifecycle. The most powerful hook for code quality is `PostToolUse`, which fires every time Claude edits or creates a file.

**Create or edit `.claude/settings.json`:**

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

**What's happening here:** Every time Claude uses the Edit or Write tool, this hook runs. It reads the file path from the tool input, runs ESLint with auto-fix, and feeds the output back into Claude's context. If there's a violation, Claude sees it immediately and corrects it — without you saying anything.

**Adapt the command for your stack:**

| Stack | Command |
|-------|---------|
| JavaScript/TypeScript | `jq -r '.tool_input.file_path' \| xargs npx eslint --fix` |
| Python | `jq -r '.tool_input.file_path' \| xargs ruff check --fix` |
| Go | `jq -r '.tool_input.file_path' \| xargs gofmt -w` |
| Rust | `jq -r '.tool_input.file_path' \| xargs rustfmt` |

**Why this matters:** There's a fundamental difference between telling Claude a rule in natural language and enforcing it with a linter. Natural language instructions work most of the time. Linter feedback works every time. Claude responds better to deterministic error messages than to prose — it's the difference between "please use consistent formatting" and a machine-readable error saying exactly what's wrong and where.

This is the key insight: the more rigid you make the feedback loop, the higher the performance. Not because you're being "strict" with the AI, but because you're giving it unambiguous signals it can act on immediately.

**Optional: Add a Stop hook for full-project linting.**

This runs the linter across your whole project every time Claude finishes a response:

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
    ],
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

**Optional: Add a pre-commit hook.**

This is standard git tooling — add it to `.husky/pre-commit` or `.git/hooks/pre-commit`. When Claude tries to commit and the linter fails, it sees the output and fixes the issues automatically before retrying.

## Step 5: Validate Your Setup

Run through this checklist:

- [ ] Root `CLAUDE.md` exists and is under 100 lines
- [ ] Root only contains universal rules (stack, commands, constraints)
- [ ] Domain-specific rules are in `.claude/rules/` with appropriate path scoping
- [ ] Reference docs are linked with `@imports`, not inlined
- [ ] Linting hooks are in `.claude/settings.json`
- [ ] Run your linter manually on the full codebase — fix violations before hooks surface them mid-session

That last point is important. If your project has never had linting enforced, the first run will surface dozens of violations. Fix those in a dedicated cleanup commit, not mid-feature. You want the hooks to catch new drift, not drown you in historical debt.

## What If You're Mid-Project?

Don't run all five steps at once while you're building a feature. Tooling changes and application changes don't mix well — you'll be debugging your setup instead of shipping your feature.

**Do this right now (5 minutes, always safe):**

1. Create a root `CLAUDE.md` with your stack, commands, and constraints (Step 1)
2. Commit it separately

That single file improves every session from this point forward. It's zero risk and immediate payoff.

**Do this at your next natural pause:**

3. Move domain-specific content into `.claude/rules/` (Step 2)
4. Add `@imports` for existing docs (Step 3)
5. Wire up linting hooks (Step 4)
6. Run the linter, fix violations in a cleanup commit (Step 5)

The goal is to never mix tooling changes with application changes. They're different kinds of work and they muddy each other's diffs.

## The Prompt

Once you're at a stable point, you can run this prompt in a standalone Claude Code session to have Claude do the setup for you:

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
   - Create a Stop hook that runs the linter on the full project
   - Add a pre-commit hook that runs the full linter before commits

4. Validate
   - Root CLAUDE.md is under 100 lines
   - Each rules file is scoped to its domain
   - Hooks run end-to-end without errors on current codebase
   - Run the linter on the full project and fix any violations

Do not change any application logic. This is a tooling and
context optimization task only.
```

Run this on stable projects any time. For active projects, wait for a natural pause.

## Does This Scale?

For a side project with 10 files — honestly, Step 1 alone gets you 80% of the value. Write a CLAUDE.md, move on.

For anything with multiple directories, multiple concerns, or parallel agents, the full setup compounds:

- **Fewer corrections.** Claude follows linter-enforced rules every time, not most of the time. You stop repeating yourself across sessions.
- **Lower cost.** Scoped rules mean less context per agent. With 5 parallel agents, a 300-line root CLAUDE.md costs 1,500 lines of context. A 60-line root with scoped rules costs a fraction of that.
- **More consistent code.** The PostToolUse hook catches drift on every file edit. By the time you review, the code already conforms to your standards.
- **Faster onboarding.** Your CLAUDE.md and rules files become living documentation. When a new collaborator — human or AI — joins the project, the conventions are already written down and enforced.

The setup takes 10 minutes. The payoff is every session after that.
