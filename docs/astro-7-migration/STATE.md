# Astro 7 migration — state

Where the migration actually stands. Supersedes `EXECUTION_PLAN.md` and
`PHASE_4B.md`, both of which drifted from the tree. What is still open lives in
[REMAINING.md](./REMAINING.md).

Last reviewed: 2026-09-15.

## Shape

Qwik City 1.19 → Astro 7.3.2. Content in collections under `src/content/`,
Zod-validated by `src/content.config.ts`. MDX-facing components are Preact
(`compat: true`), shells are `.astro`. `output: 'static'`,
`trailingSlash: 'always'`. All work sits on `feature/astro-migration` as one
uncommitted tree — not the per-phase commits to `master` the old plan assumed.

URLs are unchanged: `/blog/<slug>/`, `/dev-bites/<slug>/`, `/observatory/<slug>/`.
`docs/astro-7-migration/url-baseline.txt` (35 entries) is the pre-migration
inventory; `tests/smoke.spec.ts` asserts every one still returns 200 and that
each post page has exactly one `h1`.

## Divergences from the original plan

Each of these was decided mid-migration and never made it back into the plan.

**`trailingSlash: 'always'`, not `'never'`.** Pages build to `.../index.html`;
`'never'` emitted a canonical without the trailing slash, a real regression
against already-indexed URLs.

**Shiki, not Prism.** Dual-theme (`github-light` / `github-dark`) with
`defaultColor: false`, so theme switching is CSS-only and ships no JS.

**Sitemap carries `lastmod`.** `astro.config.mjs` walks `src/content/*/*/index.mdx`
at config load and regex-reads `last_updated ?? date` into a URL→ISO map
consumed by `sitemap()`'s `serialize`. This deliberately bypasses the collection
schema — it reads the raw file. `404/` is filtered out.

**`scripts/check-links.mjs` runs as part of `pnpm build`.** Validates internal
hrefs, canonicals, and sitemap coverage against `dist/`. A broken link fails the
build, which is the point — driver #3 (published URLs don't break) is otherwise
only enforced by eyeballing.

**ESLint 10 flat config.** `eslint.config.mjs`; `.eslintrc.cjs` is gone.
`@typescript-eslint/{parser,eslint-plugin}` are on 8.70.0 because
`eslint-plugin-astro@3.1.0` needs `parser >=8.61.0` — the 7.18.0 pin surfaced as
`TypeError: scopeManager.addGlobals is not a function`, not as a plugin
resolution error. The config lints `.ts`/`.tsx` as well as `.astro`.

**Playwright serves `dist/` via `serve`, not `astro preview`.** `astro preview`
7.3.2 detaches into the background by default, contradicting the published CLI
docs. `webServer.command` is `pnpm exec serve dist -l 4173`; `test.e2e` runs
`astro build && playwright test` so `dist/` is fresh.

**`vitest.config.ts` scopes `include` to `src/**/*.spec.ts`** with
`passWithNoTests: true` — Vitest 4 treats zero matches as a hard failure, and
the Playwright specs under `tests/` must stay out of the unit run.

**`vite.ssr.external: ['preact/jsx-runtime']`** and ports pinned to 4173 in both
`server` and `preview`.

**OG tags are emitted at the call site, not inside `Article.astro`.** A
component's own `slot="head"` does not reach past its immediate parent
([named slots](https://docs.astro.build/en/basics/astro-components/#named-slots)),
so each `[slug].astro` passes a `<Fragment slot="head">` to `Base.astro`.
`Article.astro` is now a bare `<article><slot /></article>` with no props.

**JSON-LD `BlogPosting` shipped on all three sections**, ahead of the `/seo`
pass it was originally deferred to. The three `[slug].astro` files are identical
apart from the collection name.

**`public/manifest.json` is intentionally absent** (`fbd725e`, PWA manifests
removed). The old plan's Phase 4d asked for it.

## Schema drift

`src/content.config.ts` no longer matches what the plan specified, in ways that
matter:

- `observatory.status` is a 5-value enum (`Experimental`, `Beta`, `Superseded`,
  `Technical Preview`, `Stable`) and optional. Four of the five values are in
  use.
- `observatory.recommendation` was loosened to `.optional()`. No content file
  sets it. `CONTEXT.md` says every observatory note states a Recommendation —
  schema and docs currently contradict each other. See REMAINING.md.
- `observatory` gained `short_preview` and `last_updated`.
- `blog` has no `last_updated`, but one post sets it and all three
  `[slug].astro` read it. See REMAINING.md.

## Head parity vs. the Qwik site

Audited 2026-09-15: `git show HEAD:src/root.tsx` and
`.../router-head.tsx` against `Base.astro` and the built `dist/`, with
`meta-baseline.txt` as the rendered pre-migration reference. The Phase 5 bulk
deletion dropped framework-agnostic things that happened to live in Qwik-shaped
files — PostHog was the first found, these are the rest.

**Dropped on purpose, no action:**

- Qwik's `ServiceWorkerRegister` and `src/routes/service-worker.ts`. That was
  Qwik's bundle prefetcher, not offline support. Astro ships no JS to prefetch.
  Nothing serves `/service-worker.js` now; previously-registered workers on
  returning visitors fail to update and unregister themselves.
- The `dark-mode` class the old theme script toggled on `<html>`. Zero
  references left in `src/` — `global.css` drives everything off `data-theme`.
- `<link rel="icon" type="image/x-icon">`, superseded by the `sizes="any"` form.
- PWA manifests, already removed deliberately in `fbd725e`.

**Speculation Rules: dropped, researched later.** The old prerender/prefetch
hint is not in `Base.astro` and was not restored. Its `href_matches` regex
excluded all three content sections, so it never prefetched an article — porting
it verbatim would carry that forward. Owned by
[`docs/speculationrules-task.md`](../speculationrules-task.md).

**Theme storage key changed, accepted.** Old key `user-theme-variant`
(`src/common/constants/theme-storage-key.ts`), new key `theme`
(`Base.astro`, `theme-toggler.astro`). Internally consistent, so tests pass, but
returning visitors with a stored non-system theme revert to system once. Taken
as a clean break rather than shipping a migration shim.

**Fixed in this pass:** `twitter:description` was wired to `description` while
`og:description` used `ogDescription`, so any post setting `og_description` got
a split preview between X and everything else. Now both read `ogDescription`,
matching the old `createArticleMeta`. `<link rel="sitemap">` added.

**Gains over the Qwik head:** `og:site_name`, `meta[name=author]` sitewide (was
homepage-only), `article:published_time`, and the `InterVar.woff2` preload.

`twitter:card` and JSON-LD are both present on all 35 pages — REMAINING.md
previously listed them as missing, which was wrong on both counts.

## Resolved along the way

Shell components (Nav, Footer, ThemeToggler) are wired into `Base.astro`;
ThemeToggler is a native `<select>`. Homepage and section indexes render
featured posts through a shared `ArticleCard` carrying the `data-featured-*`
attributes `tests/featured-articles.spec.ts` expects. The 15 `children?: any`
errors from the Preact port were fixed with Preact's `ComponentChildren`.
