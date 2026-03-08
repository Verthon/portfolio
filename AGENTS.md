Personal blog. Qwik City + MDX. Solo author.
Content locations

Blog posts: src/routes/blog/**/index.mdx
Dev bites: src/routes/dev-bites/**/index.mdx
Observatory: src/routes/observatory/**/index.mdx

Agent instructions
All agent definitions live in .llm/agents/. Context files in .llm/context/.
Available agents (run individually):

SEO Auditor: Read .llm/agents/seo-auditor.md and run the audit
Content Reviewer: Read .llm/agents/content-reviewer.md and review [path-to-file]
Tech Auditor: Read .llm/agents/tech-auditor.md and run the audit

Rules

Never rewrite content without explicit approval
Propose changes as diffs, don't apply silently
When editing MDX: preserve all existing component imports and structure