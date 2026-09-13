# llm/ — LLM Agent Instructions

LLM-agnostic agent definitions for sordyl.dev blog.

## Structure

```
llm/
├── agents/
│   ├── content-reviewer.md   # Content structure: consistency, MDX patterns, broken refs
│   └── tech-auditor.md       # Infra: RouterHead, sitemap, RSS, a11y, perf
├── context/
│   ├── blog-context.md       # Brand voice, niche, content types, anti-slop rules
│   └── seo-context.md        # Qwik/MDX SEO specifics for the /seo skill
└── README.md
```

## Usage

### Claude Code

```bash
# Full SEO audit (skill, not an agent)
claude "/seo audit all content, read .llm/context/seo-context.md first"

# Review a specific post
claude "Read .llm/agents/content-reviewer.md and review src/routes/blog/design-system-pitfalls/index.mdx"

# Review all content
claude "Read .llm/agents/content-reviewer.md and review all posts"

# Tech infrastructure audit
claude "Read .llm/agents/tech-auditor.md and run the audit"
```

### Other LLM CLIs
Point your tool at the same `llm/agents/*.md` files. The instructions are plain markdown — no vendor lock-in.

## Principles
- Agents audit and suggest — they don't auto-apply changes
- Context files are read first by every agent
- All findings include file paths and line numbers
- No AI-generated content rewrites without explicit approval