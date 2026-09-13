# Alternatives Considered

Frameworks evaluated against the Astro 7 recommendation, and why they lost. Recorded so the same ground isn't re-covered in six months.

Evaluated 2026-09-12.

## The bar any candidate has to clear

Drawn from the hard constraint in the README and the verdict in doc 01 — not general framework preference:

1. **MDX files stay byte-for-byte unchanged**, including 12 extensionless `~/...` component imports.
2. **Zero client JS on a post page.** Doc 01's reason for leaving Qwik is that resumability is unused. Swapping it for an equally unused hydration runtime banks nothing.
3. **Deletes the `domain`/`application`/`infrastructure` layering** rather than relocating it — ~15 TS files down to ~30 lines of `content.config.ts`.
4. **Build-time frontmatter validation** replacing the hand-rolled `isModuleWithFrontmatter` type-guard.
5. **Content-generated discovery surface** — sitemap, RSS, canonicals (driver #3).

## TanStack Start — rejected

Stable and technically capable; aimed at a different problem. Verified against official docs 2026-09-12.

| Claim              | Finding                                                                                                                                                                                                                                         |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Stable             | ✅ Yes. v1 RC announced 2025-09-22; `@tanstack/react-start@1.168.52`, `@tanstack/react-router@1.170.35` as of 2026-09-10.                                                                                                                       |
| SSG / prerendering | ✅ Real and well-documented. `enabled`, `crawlLinks`, `autoStaticPathsDiscovery`, `autoSubfolderIndex` (the `/page/index.html` vs `/page.html` control URL parity would need), `concurrency`, `filter`, `failOnError`. No experimental caveats. |
| MDX                | ❌ **Not built in.** No first-party integration; the docs don't mention MDX or markdown. Every path is userland: `content-collections`, Fumadocs, or hand-rolled `import.meta.glob` + unified.                                                  |
| Sitemap            | ✅ Built in, via prerender link-crawling.                                                                                                                                                                                                       |
| RSS                | ❌ **Not built in.** The SEO guide covers sitemap and robots.txt only. RSS is a hand-rolled server route (`src/routes/rss[.]xml.ts`).                                                                                                           |
| Build speed        | ➖ Supports "Vite and Rsbuild"; no version pinned in the overview docs. Has no equivalent to Astro 7's Rust compiler — being Vite-based is not the same claim.                                                                                  |

### Why it fails the bar

**Bar 2 is the disqualifier.** Start is a full-stack React framework whose model is hydrating a React app. The 12 MDX-facing components port to React about as mechanically as to Preact, but a post page would ship a React runtime to render content whose only interactivity is an inline theme script. That inverts doc 01's core verdict.

**Bar 3 fails too.** With no first-party content layer, the glob/parse/validate/sort/permalink pipeline gets rebuilt by hand or via `content-collections` — the exact layer the migration exists to delete, restored as userland.

Bars 1 and 4 are reachable (`content-collections` does Zod-ish validation), and bar 5 is half-met — sitemap yes, RSS hand-rolled.

### When this should be revisited

If the site stops being a content site: reader-facing search, filtering, auth, a dashboard, anything needing server functions. Start's type-safe routing and server functions are genuinely strong there and Astro would be the wrong tool. Nothing in `CONTEXT.md` or the drivers points that way, and driver #4 (the idea-to-published loop stays cheap) points away from it.

### Worth stealing regardless

Sitemap-by-link-crawling is a good pattern and matches driver #3's "generated from the content, never hand-maintained". The Astro equivalent is `getCollection()` feeding `@astrojs/sitemap` and `@astrojs/rss` — see Phase 4b in `02-migration-plan.md`.

## Astro 7 — confirmed in production

[chudy.me](https://chudy.me/) runs **Astro v7.1.6** — the exact version this plan targets. Checked 2026-09-12 via `<meta name="generator">` plus 133 `astro-cid-*` scoped-style hashes.

Relevant because it's a live instance of the architecture this plan describes, not just an assertion:

- **Zero hydration islands.** `grep -c astro-island` → 0. Every script is an `.astro_astro_type_script` bundle — inline `<script>` in `.astro` components, compiled and hoisted, no framework runtime. `CurrentFlag`, `TalksAccordion`, `ScrollToTop` are all interactive-ish and all plain scripts. This is Phase 3's "static HTML, zero client JS" target, shipped.
- **Both discovery surfaces present**: `<link rel="sitemap" href="/sitemap-index.xml">` (the `@astrojs/sitemap` index + `sitemap-0.xml` signature) and `<link rel="alternate" type="application/rss+xml" href="/feed.xml">`.
- **`ClientRouter`** — Astro 7's view-transitions router (`astro-view-transitions-enabled` in the markup). Overlaps with the Speculation Rules prefetch this repo keeps; see the open question in Phase 3.

Caveat: it's Vercel-hosted, not Netlify, and its CSP admits Bluesky's API and YouTube frames — it does more than this blog does. Evidence that v7 is production-viable for this shape of site, not a config to transplant.

## Staying on Qwik City — rejected

The null option. Doc 01's assessment stands: the framework's core value is unused while it costs a Qwik-specific ESLint plugin, `$`-suffixed APIs, serialization rules, `q-manifest.json`, service-worker glue, and (doc 04, weakness 2) a low-training-data footprint that makes every agent interaction worse. No new information here changes that.
