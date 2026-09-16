# 0001 — Astro 7 over Qwik City, TanStack Start, and staying put

Decided 2026-09-12. Landed on `feature/astro-improvements`, Astro 7.3.2.

## Decision

Migrate sordyl.dev from Qwik City 1.19 to Astro 7, keeping the MDX content files
and their component imports unchanged.

## Why

Qwik's core value is resumability of interactive apps. This site's only
client-side behaviour is a theme toggler and analytics, so that value was never
collected — while the costs were paid in full: `$`-suffixed APIs, serialization
rules, `q-manifest.json`, service-worker glue, a Qwik-specific ESLint plugin,
and a low-training-data footprint that degrades every agent interaction.

Astro is MDX-native, ships ~0 KB JS by default, and its content collections
replace a hand-rolled `isModuleWithFrontmatter` type-guard — which validated 4
of ~10 fields — with Zod schemas enforced at build time.

The migration also deleted a `domain`/`application`/`infrastructure` layering
replicated across three near-identical section stacks: ~15 TS files plus specs,
for what is ultimately "glob files, read frontmatter, sort by date". That is now
`src/content.config.ts` plus `getCollection()` calls.

## The bar candidates had to clear

1. MDX files stay byte-for-byte unchanged, including 12 extensionless `~/...`
   component imports.
2. Zero client JS on a post page. Swapping an unused resumability runtime for an
   unused hydration runtime banks nothing.
3. Deletes the layering rather than relocating it.
4. Build-time frontmatter validation.
5. Content-generated discovery surface — sitemap, RSS, canonicals (the
   *published URLs don't break* driver).

## Rejected: TanStack Start

Stable and capable, aimed at a different problem. Verified against official docs
2026-09-12. SSG and sitemap-by-link-crawling are real and well documented; MDX
and RSS are not built in and land in userland (`content-collections`, Fumadocs,
or hand-rolled `import.meta.glob` + unified).

Bar 2 disqualifies it: Start's model is hydrating a React app, so a post page
would ship a React runtime to render content with no interactivity. Bar 3 fails
with it — the glob/parse/validate/sort pipeline gets rebuilt as userland, which
is the exact layer this migration exists to delete.

**Revisit if the site stops being a content site** — reader-facing search,
filtering, auth, a dashboard, anything needing server functions. Start's
type-safe routing and server functions are genuinely strong there and Astro
would be the wrong tool. Nothing in `CONTEXT.md` points that way, and the
*cheap publish loop* driver points away from it.

## Rejected: staying on Qwik

The framework's core value is unused while its costs are not.
No new information changed that.

## Cost

A one-time rewrite of every non-MDX file, and the divergences recorded in
[0002](./0002-published-urls-do-not-break.md) and
[0003](./0003-oxlint-over-eslint.md). The theme storage key changed from
`user-theme-variant` to `theme`, so returning visitors with a stored non-system
theme revert to system once — taken as a clean break rather than shipping a
migration shim.

Qwik's `ServiceWorkerRegister` is gone and nothing serves `/service-worker.js`;
previously-registered workers fail to update and unregister themselves. That was
Qwik's bundle prefetcher, not offline support.
