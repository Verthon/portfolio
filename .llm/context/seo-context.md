# SEO context — sordyl.dev

Repo-specific facts the generic `seo` skill can't know. Read alongside
`blog-context.md` when running an SEO pass.

## Where content lives

`src/routes/{blog,dev-bites,observatory}/<slug>/index.mdx`. The slug is the URL
and is permanent after publishing — never rename one.

## Frontmatter that carries SEO weight

Required: `title`, `description`, `date`, `excerpt`, `tags`.
Optional: `published`, `last_updated`, `og_title`, `og_description`.

- `title` — under 60 chars, concrete, no clickbait.
- `description` — 120-160 chars, primary keyword sits naturally.
- `excerpt` — must stand alone as a summary, not a teaser ("find out how…").
- `tags` — comma-separated string, not a list.
- `date` / `last_updated` — `YYYY-MM-DD`, feed `datePublished` / `dateModified`.

## Headings

One `<Heading tag='h1'>` per page. Every h2/h3 needs `id` and `linkLabel` —
raw markdown `#` breaks anchor links and fails `tests/a11y-per-page.spec.ts`.
No skipped levels. Avoid "Introduction" / "Conclusion" — they waste the slot.

## JSON-LD on Qwik City

The site has no structured data yet. `RouterHead` already renders
`head.scripts`, so a post only needs the `head` export:

```tsx
export const head: DocumentHead = {
  title: 'Post Title',
  meta: [],
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
          url: 'https://sordyl.dev',
        },
        publisher: {
          '@type': 'Person',
          name: 'Krzysztof Sordyl',
          url: 'https://sordyl.dev',
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': 'https://sordyl.dev/blog/post-slug',
        },
      }),
    },
  ],
};
```

Type per section: blog → `BlogPosting`, dev bites → `TechArticle`,
observatory → `Article`. `BreadcrumbList` on the home and section pages is a
secondary priority.

## Known gaps

A sitemap exists and covers all 30 content pages plus the 4 section/home pages,
but carries no `lastmod`. No RSS feed (`/rss.xml`, `/feed.xml`, `/index.xml` all
404). No JSON-LD anywhere. No `og:image` on any page. Per
`docs/architecture/drivers.md` #3 the discovery surface must be generated from
the content, not hand-maintained. No Core Web Vitals automation exists yet
(driver #2).

Qwik renders head tags with a `q:head` attribute — `<title q:head>`, not
`<title>`. Grep accordingly or you will get false negatives.

## Rules for an SEO pass

Flag, don't rewrite. Titles, descriptions and body copy are the author's —
propose alternatives and let him decide. Cite `path:line`, never "some posts".
Driver #1 wins any conflict: no page gets distorted for crawlers.
