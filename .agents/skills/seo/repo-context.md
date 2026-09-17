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
Optional: `last_updated`, `og_title`, `og_description`. Observatory notes also
require `status`. There is no draft flag — anything on `master` is built,
listed and indexed.

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
- No `llms.txt`. A new feature, not a migration regression — it did not exist
  before. `docs/geo-basics-task.md` owns it.
- The `#person` `@id` dangles — nothing defines the node it points at.
- No Core Web Vitals automation (the *CWV measured* driver).

Done, do not re-report as gaps: the sitemap exists, covers all pages and
carries `lastmod` (`astro.config.mjs` regex-reads `last_updated ?? date` from
the raw MDX at config load). Canonicals are on every page and
`scripts/check-links.mjs` fails the build on a broken internal link, a bad
canonical, or a sitemap coverage mismatch.

RSS shipped 2026-09-17: `/rss.xml` over all three collections, `<link
rel="alternate">` in `Base.astro`, icon in the nav and footer, and
`scripts/check-feed.mjs` gating the build. The feed is intentionally absent from
the sitemap — it is not a page and has no canonical, so a `<loc>` would fail the
set-equality check. Do not report either as a gap.

## Rules for an SEO pass

Flag, don't rewrite. Titles, descriptions and body copy are the author's —
propose alternatives and let him decide. Cite `path:line`, never "some posts".
The *accessible to WCAG 2.1 AA* driver wins any conflict: no page gets
distorted for crawlers.
