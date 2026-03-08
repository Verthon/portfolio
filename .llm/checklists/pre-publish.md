# Pre-Publish Checklist

Run before publishing any new post. Use with:
```bash
claude "Read llm/checklists/pre-publish.md and check src/routes/blog/my-new-post/index.mdx"
```

## Frontmatter
- [ ] `title` under 60 chars
- [ ] `description` 120-160 chars, no slop
- [ ] `date` set to publish date
- [ ] `published` set to `true`
- [ ] `tags` present, relevant
- [ ] `excerpt` standalone, under 200 chars

## Structure
- [ ] Uses correct MDX components (ArticleWrapper, ArticleHeader, ArticleContent, Heading)
- [ ] Single H1 in ArticleHeader
- [ ] No skipped heading levels
- [ ] Heading `id` and `linkLabel` props on all Heading components
- [ ] First paragraph under each H2 gives direct value (not preamble)

## Links
- [ ] At least 2 internal links to other posts
- [ ] All internal links resolve to existing routes
- [ ] External links are properly formatted

## SEO
- [ ] JSON-LD `BlogPosting` schema in head export (or `TechArticle` for dev-bites)
- [ ] `og:title` and `og:description` set
- [ ] `og:image` set (or flag for later)

## Final
- [ ] Build passes (`npm run build` or equivalent)
- [ ] Preview the page locally — heading anchors work, components render