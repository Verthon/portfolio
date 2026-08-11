# Migration Plan: Qwik City → Astro 7

Phased plan. Each phase ends in a working, verifiable state. MDX files are **moved but never edited**.

## Target shape

```
astro.config.mjs              # mdx() + preact() integrations, site: https://sordyl.dev
src/
  content.config.ts           # blog / devBites / observatory collections (Zod schemas)
  content/
    blog/<slug>/index.mdx     # moved verbatim from src/routes/blog/<slug>/index.mdx
    dev-bites/<slug>/index.mdx
    observatory/<slug>/index.mdx
  blog/components/…           # MDX-facing components stay at the SAME import paths (.tsx, Preact)
  dev-bites/components/…
  observatory/components/…
  common/components/…         # Heading, Alert stay .tsx; nav/footer/layout become .astro
  layouts/
    Base.astro                # html shell, head, theme script, fonts, analytics
    Article.astro             # wraps rendered MDX; maps og_* frontmatter → meta
  pages/
    index.astro
    blog/index.astro
    blog/[slug].astro         # getStaticPaths from blog collection
    dev-bites/index.astro
    dev-bites/[slug].astro
    observatory/index.astro
    observatory/[slug].astro
    404.astro
  styles/                     # see 03-styling-refresh.md
```

## The two decisions everything hangs on

### 1. Content collections, not MDX-as-pages

MDX files could be dropped into `src/pages/` directly, but that would require adding a `layout:` frontmatter field to every file — which violates the "don't touch MDX" constraint. Instead:

- Collections with the `glob()` loader point at `src/content/<section>/`; files move with `git mv`, contents untouched.
- A `[slug].astro` page per section calls `getStaticPaths()` + `render(entry)` and wraps `<Content />` in `Article.astro`. The layout lives **outside** the MDX, exactly like Qwik City's `layout.tsx` does today.
- `generateId` (or an `id` transform) strips the trailing `/index` so `blog/api-surface-challenges/index.mdx` → slug `api-surface-challenges`, preserving every URL.

### 2. MDX-facing components stay `.tsx` (Preact, statically rendered)

The 12 components imported inside MDX use **extensionless** paths (`~/blog/components/article-wrapper/article-wrapper`). Extensionless resolution works for `.tsx` but not `.astro`, so rewriting them as `.astro` would force editing every MDX import — forbidden.

Therefore: port these 12 (Qwik → Preact is nearly mechanical: `component$`→ function, `<Slot />`→ `{children}`, `class` stays `class` in Preact) and render them **without** any `client:` directive → static HTML, zero client JS:

- `~/common/components/heading/heading` (29 uses), `~/common/components/alert/alert` (15)
- `~/blog/components/article-wrapper|article-header|article-content` (18 each), `article-image` (5)
- `~/dev-bites/components/dev-bite-wrapper|dev-bite-header|dev-bite-content` (7 each)
- `~/observatory/components/wrapper|header|content` (4 each)

The `~` alias moves to `tsconfig.json` `compilerOptions.paths` — Astro resolves tsconfig paths natively, no plugin needed.

Everything *not* imported by MDX (layout, nav, footer, lists, page-content, icons) becomes idiomatic `.astro`.

## Phases

### Phase 0 — Baseline (on current master)
1. Record the URL inventory: `find dist -name '*.html'` after a build, save as `docs/astro-7-migration/url-baseline.txt`.
2. Ensure Playwright suite is green; add a smoke test asserting every baseline URL returns 200 and contains the post `<h1>`.
3. Capture rendered `<head>` of 3 representative posts (one per section) for meta-parity diffing.

### Phase 1 — Scaffold (new branch `astro-7`)
1. `pnpm create astro@latest` in a scratch dir (minimal template), Astro 7.x; copy scaffolding into the repo on the branch. Node is already v24 ✅.
2. `pnpm astro add mdx preact netlify` — note: for a fully static site the Netlify *adapter* is optional; keep `output: 'static'` and plain `netlify.toml` (`command = "astro build"`, `publish = "dist"`; Astro's default outDir is `dist` — matches).
3. `astro.config.mjs`: `site: 'https://sordyl.dev'`, `trailingSlash: 'never'` (verify against baseline URLs), `integrations: [mdx(), preact()]`.
4. Set `~/*` path alias in tsconfig.

### Phase 2 — Content collections (MDX moves, unedited)
1. `git mv src/routes/blog/<slug> src/content/blog/<slug>` for all posts (same for dev-bites, observatory). `git mv` preserves history; contents untouched.
2. `src/content.config.ts` — schemas mirror the *actual* frontmatter in the repo:
   ```ts
   const blog = defineCollection({
     loader: glob({ base: './src/content/blog', pattern: '**/index.mdx',
       generateId: ({ entry }) => entry.replace('/index.mdx', '') }),
     schema: z.object({
       title: z.string(),
       published: z.boolean(),
       description: z.string(),
       tags: z.string(),                    // comma-separated, as today
       date: z.coerce.date(),
       excerpt: z.string(),
       article_type: z.enum(['featured', 'regular']).default('regular'),
       value_proposition: z.string().optional(),
       og_title: z.string().optional(),
       og_description: z.string().optional(),
     }),
   })
   ```
   Dev bites swap `article_type` for `dev_bite_type` + `last_updated`; observatory gets its own. This **replaces** `mdx-file.ts` / `article.ts` and their specs — build fails loudly on bad frontmatter now.
3. Parity note: today's pipeline does **not** filter `published: false` (listing shows everything; file-routing publishes everything). Preserve that behavior first, then decide deliberately whether to start honoring `published` as a separate follow-up.

### Phase 3 — Components
1. Port the 12 MDX-facing components to Preact at identical paths, keeping their `*.module.css` files as-is (Vite CSS modules work unchanged in Astro).
2. Rebuild shell components as `.astro`: `Base.astro` (charset, manifest, fonts preload, theme `is:inline` script, speculation-rules script, PostHog snippet), nav/footer/theme-toggler (toggler = small inline script, no framework), 404.
3. `Article.astro` reproduces `src/routes/blog/layout.tsx` head logic: `og_title`/`og_description`/`og:type=article` from `entry.data`.
4. Remember Astro 7's Rust compiler is strict: close every tag in new `.astro` files; check whitespace around inline elements (JSX-style compression).

### Phase 4 — Pages
1. `[slug].astro` per section: `getStaticPaths` → `render(entry)` → `<Article frontmatter={entry.data}><Content /></Article>`.
2. Listing pages + homepage: `getCollection('blog')`, sort by `date` desc, `article_type === 'featured'` for featured rails — direct replacements for `getAllArticles` / `getAllFeaturedArticles` / the `use*Resource` hooks.
3. Per-page titles/meta copied from the current `DocumentHead` objects.
4. Add `@astrojs/sitemap` if the Qwik static adapter was emitting `sitemap.xml` (check `dist/` baseline); keep `public/robots.txt`, `public/_headers`, `public/manifest.json`, `public/blogImages`, fonts as-is.

### Phase 5 — Cleanup & tooling
1. Delete: Qwik deps, `entry.*.tsx`, `root.tsx`, `service-worker.ts`, `adapters/`, `server/`, `src/*/application`, `src/*/infrastructure`, `src/*/domain`, qwik eslint plugin, `.vscode/qwik*` snippets, stale `cypress/`.
2. ESLint: swap `eslint-plugin-qwik` for `eslint-plugin-astro` (or move to the flat config while at it). Keep knip, prettier (add `prettier-plugin-astro`).
3. Scripts: `dev`/`build`/`preview` → `astro dev/build/preview`; keep `test.*` as-is.

### Phase 6 — Verification & cutover
1. Playwright suite (a11y-per-page, page-theme, featured-articles) must pass unmodified except for selectors that referenced Qwik internals.
2. Diff `dist/` HTML file list against `url-baseline.txt` — must be a superset containing every baseline URL.
3. Meta-parity diff on the 3 captured posts' `<head>`.
4. Netlify deploy preview from the branch; Lighthouse + verify PostHog events arrive via the `/ph/*` proxy.
5. Merge. **Rollback** = revert merge commit; Netlify redeploys previous build. No data migration exists, so rollback is free.

## Effort estimate

| Phase | Size |
| --- | --- |
| 0 Baseline | ~1h |
| 1 Scaffold | ~1h |
| 2 Collections | ~2h |
| 3 Components | ~1–2 days (the real work: 12 Preact ports + shell rebuild) |
| 4 Pages | ~half day |
| 5 Cleanup | ~2h |
| 6 Verification | ~half day |

Styling refresh (doc 03) is deliberately a **separate pass after** the migration is verified — never change framework and design in the same diff, or the visual diffs stop being a migration safety net.
