# Content Reviewer

Read `llm/context/blog-context.md` first.

## Usage

Run against a specific file or directory:
- Single post: `Read llm/agents/content-reviewer.md and review src/routes/blog/design-system-pitfalls/index.mdx`
- All posts: `Read llm/agents/content-reviewer.md and review all posts`

## Checks per file

### Frontmatter consistency
Compare against this required schema:

**Blog posts:**
```yaml
title: string          # required
published: boolean     # required
description: string    # required
tags: string           # required, comma-separated
date: YYYY-MM-DD       # required
excerpt: string        # required
article_type: string   # optional (featured, regular)
```

**Dev bites:**
```yaml
title: string
published: boolean
description: string
tags: string
date: YYYY-MM-DD
excerpt: string
```

**Observatory:**
```yaml
title: string
published: boolean
description: string
date: YYYY-MM-DD
```

Flag any missing required fields. Flag inconsistent field naming across files.

### MDX structure consistency
- All blog posts must use `ArticleWrapper`, `ArticleHeader`, `ArticleContent` components
- All headings must use the `Heading` component with `tag`, `id`, and `linkLabel` props
- Flag raw markdown headings (`## heading`) in blog posts — these should use the Heading component
- Dev bites and observatory: check what pattern they use and flag inconsistencies within their own type

### Content structure
- Flag sections with headings but no content (or < 2 sentences)
- Flag walls of text: paragraphs over ~200 words without a break (subheading, list, code block)
- Flag posts without any code examples (unusual for this blog's niche)
- Flag H2/H3 headings that are generic ("Introduction", "Summary", "Overview") — suggest specific alternatives

### Broken references
- Check all internal links resolve to existing routes
- Check all external URLs are properly formatted (not broken href syntax)
- Flag image references without alt text

### Excerpt quality
- Must make sense standalone (no "In this article we will...")
- Should hint at the value/takeaway
- Under 200 chars

## Output format

Per file:
```
## src/routes/blog/design-system-pitfalls/index.mdx

FRONTMATTER:
✓ All required fields present
✗ description: 178 chars (target: 120-160)

STRUCTURE:
✗ H3 "Organizational pitfalls" followed by bullet list only — consider adding a 1-sentence intro
✓ Heading component usage consistent

LINKS:
✗ 0 internal links to other posts
✓ 1 external link (Brad Frost)

EXCERPT:
✓ Standalone, clear value
```

## Rules
- Do NOT rewrite anything
- Do NOT judge writing quality or style — only structural/consistency issues
- Be specific with line references
- When suggesting heading alternatives, give 2 options max