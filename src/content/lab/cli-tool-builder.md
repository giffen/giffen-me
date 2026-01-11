---
title: "CLI Tool Builder"
description: "Learning to build command line tools with Python using Click and Rich."
date: "2025-08-20"
status: "complete"
tags: ["Python", "Click", "Rich"]
pattern: 6
repoUrl: "https://github.com/agiffen/cli-tools"
published: false
---

## The Problem I Was Trying to Solve

I kept writing one-off Python scripts for repetitive tasks—renaming files, processing CSVs, hitting APIs. They worked, but using them was awkward: "What were the arguments again? What order? Did I need quotes?"

I wanted to level up these scripts into proper CLI tools with help text, validation, and nice output formatting.

## What I Learned

### Click Makes CLIs Declarative

Instead of manually parsing `sys.argv`, Click uses decorators:

```python
import click

@click.command()
@click.option('--name', '-n', required=True, help='Your name')
@click.option('--count', '-c', default=1, help='Number of greetings')
def greet(name: str, count: int):
    """Simple program that greets NAME."""
    for _ in range(count):
        click.echo(f'Hello, {name}!')

if __name__ == '__main__':
    greet()
```

Running `greet --help` automatically generates documentation.

### Rich Makes Output Beautiful

Rich handles colors, tables, progress bars, and markdown rendering in the terminal:

```python
from rich.console import Console
from rich.table import Table

console = Console()

table = Table(title="Results")
table.add_column("Name", style="cyan")
table.add_column("Status", style="green")

table.add_row("Task 1", "✓ Complete")
table.add_row("Task 2", "⧗ Running")

console.print(table)
```

### Packaging for Distribution

Used `pyproject.toml` with `[project.scripts]` to make the tool installable:

```toml
[project.scripts]
mytool = "mytool.cli:main"
```

After `pip install .`, the command is available system-wide.

## The Tech Stack

- **Python 3.11+** — Main language
- **Click** — CLI framework
- **Rich** — Terminal formatting
- **Typer** — Alternative (Click + type hints)
- **pytest** — Testing CLI commands

## What I'd Do Differently

1. **Start with Typer** — It's Click but with type hints for validation. Less boilerplate.

2. **Add shell completion early** — Click/Typer support tab completion. Users love it.

3. **Config files** — For tools with many options, a config file beats a wall of flags.

## Outcome

Built three tools I use daily:
- **csvtool** — Filter, transform, and preview CSV files
- **apicall** — Saved API requests with variable substitution
- **renamer** — Bulk rename with regex and preview

The pattern is now second nature. New tool idea → working CLI in under an hour.
