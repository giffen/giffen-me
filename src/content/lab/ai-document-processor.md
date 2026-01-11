---
title: "AI Document Processor"
description: "Automated document analysis and extraction using LLMs and structured outputs."
date: "2025-12-15"
status: "complete"
tags: ["Python", "OpenAI", "Pydantic"]
pattern: 2
repoUrl: "https://github.com/agiffen/doc-processor"
published: false
---

## The Problem I Was Trying to Solve

At work, we were spending hours manually extracting data from vendor contracts—pulling out key terms, renewal dates, pricing structures, and compliance clauses. This was tedious, error-prone, and didn't scale.

I wanted to build something that could read a contract PDF and return structured data I could actually use programmatically.

## What I Learned

The key insight was using **Pydantic models to define the output schema** and letting the LLM fill in the structure. This gives you type safety and validation on the AI's output.

### The Core Pattern

```python
from pydantic import BaseModel
from openai import OpenAI

class ContractTerms(BaseModel):
    vendor_name: str
    effective_date: str
    renewal_date: str | None
    auto_renewal: bool
    termination_notice_days: int
    key_obligations: list[str]

client = OpenAI()

def extract_terms(document_text: str) -> ContractTerms:
    response = client.beta.chat.completions.parse(
        model="gpt-4o",
        messages=[
            {"role": "system", "content": "Extract contract terms."},
            {"role": "user", "content": document_text}
        ],
        response_format=ContractTerms,
    )
    return response.choices[0].message.parsed
```

### Handling Edge Cases

- **Confidence scores**: Added optional confidence fields to flag uncertain extractions
- **Source references**: Ask the model to cite which section each data point came from
- **Fallback logic**: If a field can't be found, return `None` rather than hallucinating

## The Tech Stack

- **Python 3.12** — Main language
- **OpenAI API** — GPT-4o with structured outputs
- **Pydantic v2** — Schema definition and validation
- **PyMuPDF** — PDF text extraction
- **FastAPI** — Simple API wrapper for the service

## What I'd Do Differently

1. **Chunk large documents** — Long contracts exceed context limits. I now split by section headers first.

2. **Add human-in-the-loop for low confidence** — Flag extractions below 80% confidence for review.

3. **Cache embeddings** — For repeated queries on the same document, semantic caching saves API costs.

## Outcome

Processing time went from ~45 minutes per contract to under 2 minutes. More importantly, the structured output integrates directly into our contract management system via API.

The tool has processed over 200 contracts with a ~94% accuracy rate on key fields. The remaining 6% are edge cases that get flagged for human review.
