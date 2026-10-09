# SEO context — sordyl.dev

Repo-specific facts the generic `seo` skill can't know. Things are named by
identifier, directory or script, not by file path — find them with grep.
Facts that have an owner are linked, not restated.

## Already owned elsewhere

- Frontmatter fields and length limits: `CONTENT.md`.
- Declined items (og:image, llms.txt, markdown alternates, MDX→MD): the
  declined list in `docs/architecture/state.md`. Do not re-report any of them.
- CWV: measured, never gated (ADR 0006). Do not propose a perf budget,
  Lighthouse CI, or "CWV automation" as a gap.
- AI crawlers: ADR 0007.
- URL permanence: ADR 0002.

## What the build already guarantees

`pnpm build` runs the build-output checks in `src/build-checks/` and fails on:
a broken internal link, a bad canonical, canonical ↔ sitemap mismatch, an RSS
feed out of step with the posts, and a JSON-LD `@id` that does not resolve to
exactly one definition. Do not audit these by hand — if one is suspected,
run the build.

Also generated, not hand-written: the sitemap (with `lastmod` from
`last_updated ?? date`), canonicals, RSS. The sitemap is `/sitemap-index.xml`;
`/sitemap.xml` returning 404 is expected. RSS is intentionally absent from the
sitemap. www and http variants 301 to `https://sordyl.dev/` (Netlify) and sit
under "Page with redirect" in Search Console permanently — that is correct.

## Head and structured data

`articleMeta` / `pageMeta` / `homeMeta` (in `src/seo/`) build every page's
meta, including the JSON-LD graph. The shared layout renders the head. The
section `[slug]` pages emit `article:published_time` and the JSON-LD script
through a `head` slot, because a named slot does not reach past its immediate
parent.

Article pages carry a `BlogPosting` plus a `BreadcrumbList`, author is the
shared `#person` node. No `publisher`, no `description`: Google's Article docs
recommend neither.

Settled, do not re-report: all three sections stay `BlogPosting`. Google
treats `Article`, `NewsArticle` and `BlogPosting` as interchangeable for the
Article rich result, and `TechArticle` is not in that set.

## Rules for an SEO pass

Flag, don't rewrite. Titles, descriptions and body copy are the author's —
propose alternatives and let the author decide. Cite `path:line`, never "some
posts". Accessibility outranks everything SEO touches (`drivers.md`): no page
gets distorted for crawlers.

Avoid "Introduction" / "Conclusion" as heading names — they waste the slot.
