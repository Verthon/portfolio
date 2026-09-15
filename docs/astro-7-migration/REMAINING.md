# Astro 7 migration — remaining work

Open items only. What shipped is in [STATE.md](./STATE.md).

Last reviewed: 2026-09-15.

Scope: this file owns the *migration's* loose ends. Ongoing URL-integrity work
is owned by `docs/canonical-audit-task.md`, answer-engine legibility by
`docs/geo-basics-task.md`. Where they overlap (RSS, `og:image`), those docs own
the check and this one only records that the thing is missing.
Speculation Rules is owned by `docs/speculationrules-task.md` — dropped from the
migration on purpose, researched afterwards.

## Bugs

**`blog` schema is missing `last_updated`.** `src/content.config.ts` doesn't
declare it, so Astro strips it from `post.data`. All three `[slug].astro` files
compute `dateModified: iso(post.data.last_updated ?? post.data.date)`, which
silently falls back to `date`. One blog post sets `last_updated` today, so one
post ships a wrong `dateModified` — and because `astro.config.mjs` regex-reads
the raw file for sitemap `lastmod`, that same page's sitemap entry and its
JSON-LD disagree. Fix: add `last_updated: z.coerce.date().optional()` to the
blog schema.

**`observatory.recommendation` is optional and unused.** `CONTEXT.md`: "Each
note states a **Status** and a **Recommendation**." Zero content files set
`recommendation`; the schema was loosened to `.optional()` to get the build
green. Either make it required and backfill the notes, or drop the claim from
`CONTEXT.md`. Right now the documented invariant isn't enforced anywhere.

## Missing discovery surface

Sitemap and canonicals are done. `<link rel="sitemap">` shipped 2026-09-15
(`Base.astro`, all 35 pages). No remaining gap here — what follows is two new
features.

**Not migration work.** RSS and `llms.txt` never existed on the Qwik site —
verified against `url-baseline.txt` and the pre-migration tree, neither has a
feed route. Nothing was lost in the migration, so there is no parity gap and no
indexed URL at risk. They are new features, tracked here only so the migration
docs are not the reason they get forgotten:

- `src/pages/rss.xml.ts` + `<link rel="alternate">` in `Base.astro`.
- `src/pages/llms.txt.ts`.

If either ships, its URLs must join the canonical/sitemap equality assertion
already in `scripts/check-links.mjs` (`docs/canonical-audit-task.md` item 2
owns that check).

## Verification gaps

**`astro check` is not in CI and `.astro` files are not typechecked at all.**
`pnpm type.check` is bare `tsc --noEmit`, which ignores `.astro`.
`@astrojs/check` isn't a dependency. `.github/workflows/build-and-test.yml` runs
lint, build, tidy, unit and Playwright — no check step.

**Content-driven axe suite (old Phase 7).** `tests/a11y-per-page.spec.ts` is
still four hardcoded listing-page tests. It should enumerate collection entries
so new posts are covered without maintenance. These four were failing on
`region` landmark violations as of 2026-09-14; `Base.astro` has since grown
`<header>`/`<main>`/`<footer>`, so they may pass now — unverified either way.

**PostHog: decide.** There are no PostHog or analytics references left in
`src/` — `AnalyticsScripts.tsx` was deleted with no Astro replacement — while
`netlify.toml` still proxies `/ph/*` and `/ph/static/*` to PostHog EU. Either
analytics was dropped on purpose (then remove the redirects and say so) or it's
an unnoticed regression.

## Stale agent context

**`.agents/skills/seo/repo-context.md` is wrong on three counts.** It says
content lives in `src/routes/` (it is `src/content/`), describes Qwik City
`DocumentHead`/`RouterHead` and `q:head` grepping, and lists "no JSON-LD
anywhere" and "sitemap carries no lastmod" as open gaps — both now done. The
next `/seo` run will act on these. Fix before running it.

## Cleanup

Local rot, all gitignored except `tmp/`:

    rm -rf server tmp test-results playwright-report tsconfig.tsbuildinfo .DS_Store

`server/` is Qwik SSR output (`@qwik-city-*.js`, `entry.preview.js`, 1.6M) that
Astro never writes. `tmp/` holds one stale tsbuildinfo.

`.gitignore` still carries Qwik-era entries: a `# Cypress` block, `/lib`,
`/lib-types`, `/server`, and `.vscode/*` negations for files that are deleted.
`.prettierignore` predates the migration and is unreviewed.

`pnpm scan.deadcode` currently fails. Of its four unused devDependencies:

- `serve` and `astro-eslint-parser` are false positives — the first is a shell
  string in `playwright.config.ts`, the second is required by
  `eslint-plugin-astro`'s flat config. Add both to knip `ignoreDependencies`.
- `@types/eslint` is genuinely dead; ESLint 10 ships its own types. Remove.
- `@astrojs/rss` is unused only because RSS was never built. Keep if RSS ships.

It also reports `@valibot/valibot` as an unlisted dependency, imported from
`src/content/blog/deno-2-quick-overview/index.mdx`. That is content, not code —
needs a knip ignore or `scan.deadcode` fails permanently.

Deletable migration docs, once their content is confirmed folded into STATE.md:
the four `task-*.md` files, `EXECUTION_PLAN.md`, `PHASE_4B.md`.

**Do not delete `url-baseline.txt`** — `tests/smoke.spec.ts` reads it at runtime
to generate all 35 URL assertions. `meta-baseline.txt` is the only record of the
pre-migration `<head>`; keep until the twitter-card/JSON-LD parity check is done.

`HANDOFF.md` (gitignored) describes PostHog as live via a component that no
longer exists. Resolve the PostHog question above, then delete it.

## Docs

**`AGENTS.md` describes the old layout.** It says content lives in
`src/routes/{blog,dev-bites,observatory}/<slug>/index.mdx` — it lives in
`src/content/`. It also says "Section logic lives in the matching
`src/<section>/` module", which is now only components; the
`application/`/`domain/`/`infrastructure/` layers are gone, replaced by
`src/content.config.ts` and the collection APIs. `CONVENTIONS.md` was already
updated.

**Fold the durable decisions into `docs/architecture/`.** The sitemap `lastmod`
machinery and the `check-links.mjs` build gate are decisions about driver #3,
not migration trivia — they belong in an ADR that outlives this folder.

**Then delete the stale planning docs.** `EXECUTION_PLAN.md` (33 KB) and
`PHASE_4B.md` contain retracted code samples, a commit ledger that never
happened, and a "Deferred / blocked work" log that became the real changelog.
Both are superseded by STATE.md + this file. `01`–`05` are historical analysis
and can stay.

## Deduplication (optional)

The three `[slug].astro` files are byte-identical apart from the collection
name. If a fourth section ever appears, collapse them into
`src/pages/[section]/[slug].astro` or extract the JSON-LD into a shared
`.astro` component.
