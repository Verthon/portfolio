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

JSON-LD ships on all three sections, built by `src/seo/article-json-ld.ts` and
called from each `[slug].astro`. All three emit `@type: 'BlogPosting'` with a
shared `#person` node for author and publisher.

Settled 2026-09-17, do not re-report: all three sections stay `BlogPosting`.
Google treats `Article`, `NewsArticle` and `BlogPosting` as interchangeable for
the Article rich result, and `TechArticle` is not in that documented set, so
per-section types would buy nothing.

## Known gaps

- No `og:image` on any page — **declined by decision** 2026-09-17, not a gap.
  It is not an SEO signal, and `og:title`/`og:description` already ship. See
  `docs/architecture/state.md`. Do not re-report it as a finding.
- No `llms.txt` — **declined by decision** 2026-09-18, not a gap. Google
  documents it as unnecessary for AI features and no provider has committed to
  consuming it. See `docs/entity-consistency-task.md`. Do not re-report it.
- The `#person` `@id` resolves as of 2026-09-18 — `src/seo/site-json-ld.ts`
  defines the node, `src/build-checks/json-ld.ts` fails the build if any
  referenced `@id` does not resolve to exactly one definition. Not a gap.
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
