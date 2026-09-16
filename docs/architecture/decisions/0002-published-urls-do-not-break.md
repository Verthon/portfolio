# 0002 — URL integrity is enforced at build time

Decided during the Astro 7 migration, 2026-09. Serves the *published URLs don't
break* driver.

## Decision

Three coupled mechanisms, all in the build rather than in review:

**`trailingSlash: 'always'`** (`astro.config.mjs`). Pages build to
`.../index.html`. `'never'` was tried and emitted a canonical without the
trailing slash — a real regression against already-indexed URLs.

**`scripts/check-links.mjs` runs as part of `pnpm build`.** It validates
internal hrefs, rejects absolute self-links, and asserts set equality between
canonicals and sitemap `<loc>` entries (`/404/` exempt). A broken link fails the
build.

**The sitemap carries `lastmod`.** `astro.config.mjs` walks
`src/content/*/*/index.mdx` at config load and regex-reads `last_updated ?? date`
into a URL→ISO map consumed by `sitemap()`'s `serialize`.

## Why

That driver names the one irreversible output: once a URL is indexed, a 404 or a
bad canonical isn't fixed by redeploying. It also says the discovery surface
should be generated from the content, never hand-maintained — hence reading
dates from the content files rather than maintaining a list.

## What it costs

The `lastmod` walk **deliberately bypasses the collection schema** and reads raw
file text with a regex. It runs at config load, before `astro:content` exists.
A frontmatter format change that Zod still accepts — a quoted date, say — can
silently drop a `lastmod` without failing the build.

`check-links.mjs` validates the site against *itself*. It cannot catch a URL
that silently stopped being generated, because a page that vanishes takes its
canonical and its `<loc>` with it and the equality check still passes.

## Known gap

`tests/smoke.spec.ts` and `url-baseline.txt` asserted all 35 published URLs
returned 200 with exactly one `h1`. Both were deleted during the migration and
nothing replaced them, so the failure mode above is currently unguarded. Tracked
in `docs/architecture/state.md`.

## Alternatives

Sitemap-by-link-crawling (TanStack Start's approach, see
[0001](./0001-astro-over-qwik-and-alternatives.md)) is a good pattern and was
worth stealing; `getCollection()` feeding `@astrojs/sitemap` is the Astro
equivalent and is what shipped.
