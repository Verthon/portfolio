# SEO Auditor

Read `llm/context/blog-context.md` first.

## What you audit

Scan all MDX files in:
- `src/routes/blog/**/index.mdx`
- `src/routes/dev-bites/**/index.mdx`
- `src/routes/observatory/**/index.mdx`

## Checks per file

### Frontmatter
- `title`: exists, under 60 chars, no AI-slop words
- `description`: exists, 120-160 chars, contains primary keyword naturally
- `published`: must be `true` for live posts
- `date`: exists, valid format
- `excerpt`: exists, works as standalone summary (not a teaser like "find out how...")

Report: file path, field, issue, current value.

### Heading structure
- Exactly one H1 (the article title)
- H2s follow H1, H3s follow H2 — no skipped levels
- Headings are descriptive (not "Introduction", "Conclusion" — these waste SEO value)
- Headings match likely search queries where natural

Report: file path, heading text, level, issue.

### Internal linking
- Count internal links per post (links to other sordyl.dev pages)
- Flag posts with 0 internal links (orphans)
- Flag opportunities: if post mentions a topic covered by another post, suggest a link
- Check for broken internal links (path must resolve to an existing route)

Report: file path, link count, suggested links, broken links.

### AI extractability
- First paragraph under H2 should be a direct answer/definition (not a preamble)
- Key claims should be self-contained (make sense without surrounding text)
- Stats/numbers should have sources cited
- Comparison content should use tables, not just prose

Report: file path, section, issue, suggestion.

### Open Graph
- Check if frontmatter or head export includes `og:title`, `og:description`
- Flag missing `og:image` (critical for social sharing)

Report: file path, missing tags.

## Checks — site-wide

### JSON-LD schema (missing entirely — flag as top priority)
The site has no structured data. Flag this with implementation guidance:

Each blog post should export JSON-LD via Qwik City's `head` export using the `scripts` field:

```tsx
export const head: DocumentHead = {
  title: 'Post Title',
  meta: [ /* existing meta */ ],
  scripts: [
    {
      props: { type: 'application/ld+json' },
      script: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: 'Post Title',
        description: 'Post description',
        datePublished: '2025-08-23',
        dateModified: '2025-08-23',
        author: {
          '@type': 'Person',
          name: 'Krzysztof Sordyl',
          url: 'https://sordyl.dev'
        },
        publisher: {
          '@type': 'Person',
          name: 'Krzysztof Sordyl',
          url: 'https://sordyl.dev'
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': 'https://sordyl.dev/blog/post-slug'
        }
      })
    }
  ]
};
```

For dev-bites use `@type: 'TechArticle'`. For observatory use `@type: 'Article'`.

The `RouterHead` component already renders `head.scripts` — no changes needed there.

### Sitemap
- Fetch and parse `https://sordyl.dev/sitemap.xml`
- Compare against actual MDX files in routes
- Flag pages missing from sitemap
- Flag sitemap entries pointing to non-existent pages

### robots.txt
- Verify AI bots are not blocked (GPTBot, PerplexityBot, ClaudeBot, Google-Extended)
- Current robots.txt allows all — good, just confirm it hasn't changed

### BreadcrumbList schema
Flag as secondary priority. Homepage and section pages (blog, dev-bites, observatory) should have `BreadcrumbList` JSON-LD.

## Output format

Print a summary table:

```
| Priority | Issue | Files affected | Action |
|----------|-------|---------------|--------|
| HIGH     | No JSON-LD on any page | all 30+ files | Add BlogPosting schema via head export |
| HIGH     | Missing og:image | 15 files | Add og:image to frontmatter/head |
| MED      | No internal links | 5 files | Add cross-links (suggestions below) |
| LOW      | Description too short | 3 files | Expand to 120-160 chars |
```

Then detailed findings per check category.

## Rules
- Do NOT rewrite titles or descriptions. Flag issues, suggest alternatives, let author decide.
- Do NOT change content. Only flag structural SEO issues.
- Be specific: "line 5 in src/routes/blog/design-system-pitfalls/index.mdx" not "some posts have issues."