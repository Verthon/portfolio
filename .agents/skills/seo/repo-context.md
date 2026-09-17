# SEO context — sordyl.dev

Repo-specific facts the generic `seo` skill can't know. Read `CONTEXT.md`
alongside it when running an SEO pass.

## Where content lives

`src/content/{blog,dev-bites,observatory}/<slug>/index.mdx`, validated by
`src/content.config.ts`. The slug is the folder name and the URL, and is
permanent after publishing — never rename one. URLs carry a trailing slash
(`trailingSlash: 'always'`).

## Frontmatter that carries SEO weight

Required: `title`, `description`, `date`, `excerpt`, `tags`.
Optional: `published`, `last_updated`, `og_title`, `og_description`.

- `title` — under 60 chars, concrete, no clickbait.
- `description` — 120-160 chars, primary keyword sits naturally.
- `excerpt` — must stand alone as a summary, not a teaser ("find out how…").
- `tags` — comma-separated string, not a list.
- `date` / `last_updated` — `YYYY-MM-DD`, feed `datePublished` / `dateModified`
  and the sitemap's `lastmod`.

## Headings

One `<Heading tag='h1'>` per page. Every h2/h3 needs `id` and `linkLabel` —
raw markdown `#` breaks anchor links and fails `tests/a11y-per-page.spec.ts`.
No skipped levels. Avoid "Introduction" / "Conclusion" — they waste the slot.

## Head and structured data

`src/layouts/Base.astro` owns the shared head: canonical, `og:*`,
`twitter:*`, `meta[name=author]`, `og:site_name`, `<link rel="sitemap">`.
A component's `slot="head"` does not reach past its immediate parent, so each
`src/pages/<section>/[slug].astro` passes its own `<Fragment slot="head">` to
`Base.astro` — that is where `article:published_time` and the JSON-LD script
are emitted, not inside `Article.astro`.

JSON-LD ships on all three sections. The three `[slug].astro` files are
byte-identical apart from the collection name, and all three currently emit
`@type: 'BlogPosting'` with a shared `#person` node for author and publisher.

Open question, do not "fix" silently: dev bites and observatory notes arguably
want `TechArticle` and `Article`. Flag it, don't change it.

## Known gaps

- No `og:image` on any page.
- No RSS feed and no `llms.txt`. Both are new features, not migration
  regressions — neither existed before. `docs/geo-basics-task.md` and
  `docs/rss-feed-task.md` own them.
- The `#person` `@id` dangles — nothing defines the node it points at.
- No Core Web Vitals automation (the *CWV measured* driver).

Done, do not re-report as gaps: the sitemap exists, covers all pages and
carries `lastmod` (`astro.config.mjs` regex-reads `last_updated ?? date` from
the raw MDX at config load). Canonicals are on every page and
`scripts/check-links.mjs` fails the build on a broken internal link, a bad
canonical, or a sitemap coverage mismatch.

## Rules for an SEO pass

Flag, don't rewrite. Titles, descriptions and body copy are the author's —
propose alternatives and let him decide. Cite `path:line`, never "some posts".
The *accessible to WCAG 2.1 AA* driver wins any conflict: no page gets
distorted for crawlers.
