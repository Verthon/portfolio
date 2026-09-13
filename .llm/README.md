# .llm/ — LLM agent instructions

Tool-agnostic. Plain markdown, no vendor lock-in — point any LLM CLI at these files.

```
.llm/
├── agents/tech-auditor.md      # Infra: RouterHead, sitemap, RSS, a11y, perf
└── context/seo-context.md      # Qwik/MDX SEO specifics for the /seo skill
```

Content review and SEO are skills, not agents: `/content-review` and `/seo`.
They live in `.agents/skills/`, symlinked into `.claude/skills/`.

## Usage

```bash
claude "/content-review src/routes/blog/design-system-pitfalls/index.mdx"
claude "/seo audit all content, read .llm/context/seo-context.md first"
claude "Read .llm/agents/tech-auditor.md and run the audit"
```

## Principles

- Agents and skills audit and suggest — they don't auto-apply changes
- `CONTEXT.md` is read first, always
- All findings cite `path:line`
- No content rewrites without explicit approval
