# Current Architecture Assessment

Snapshot of the Qwik City site as of 2026-07, and what it implies for the migration.

## Inventory

| Area | Current state |
| --- | --- |
| Framework | Qwik City 1.19.1, Vite 7, static adapter (`adapters/static/vite.config.ts`, origin `https://sordyl.dev`) |
| Content | 19 blog posts, 8 dev bites, 4 observatory notes — all `index.mdx` colocated under `src/routes/<section>/<slug>/` |
| Content pipeline | `import.meta.glob('/src/routes/blog/**/index.mdx', { eager: true })` → runtime type-guard on frontmatter → sort/filter/map to `ArticleItem` → permalink derived from file path |
| Styling | `global.css` (Josh Comeau reset + ~120 CSS custom properties, light/dark via `[data-theme]`) + one `*.module.css` per component (~30 files) |
| Theming | Inline `<script>` (`theme-script.tsx`) reading `localStorage` + `prefers-color-scheme` before paint; toggler component writes back |
| Fonts | Self-hosted variable Inter (`public/fonts/InterVar.woff2`), `font-display: swap` |
| SEO/meta | `DocumentHead` per route; blog layout maps `og_*` frontmatter to meta tags |
| Analytics | PostHog EU via Netlify redirect proxy (`/ph/*`) + `analytics-script` component |
| Perf extras | Speculation Rules prerender/prefetch in `root.tsx`, service worker registration, cache-control handlers per layout |
| Tests | Playwright e2e (a11y per page via axe, theme, featured articles), Vitest unit tests for services, knip for dead code; a legacy `cypress/` folder remains |
| CI | GitHub Actions: build + Playwright matrix (chromium, webkit) |
| Hosting | Netlify, `publish = "dist"`, `command = "npm run build"` |

## What's good (keep the ideas)

1. **Content colocation with route = slug.** Zero content abstraction between the file system and the URL. This is exactly Astro's mental model too — it ports cleanly.
2. **Frontmatter validation that fails the build.** `fetchMdxFiles` throws if any module lacks valid frontmatter. Crude but correct instinct; Astro content collections do the same job with Zod, with better errors and generated types.
3. **Design tokens as CSS custom properties** with `[data-theme]` switching. Framework-agnostic — survives the migration untouched if we want it to.
4. **Pre-paint theme script.** Already framework-free JS in a string; ports to an `is:inline` script in Astro with no changes.
5. **Test posture.** Playwright + axe per page is framework-agnostic and becomes the migration safety net.

## What's over-built for a solo static blog

1. **DDD-ish layering per feature** (`domain/`, `application/`, `infrastructure/`, hooks, services) for what is ultimately "glob files, read frontmatter, sort by date". ~15 TS files + specs where Astro needs ~30 lines of `content.config.ts` plus `getCollection()` calls. The layering triples maintenance cost across blog/dev-bites/observatory.
2. **Three near-identical feature stacks.** `blog`, `dev-bites`, `observatory` each duplicate wrapper/header/content/item/list/page-content components and the glob/sort/filter services with tiny differences (`article_type` vs `dev_bite_type`). A single parameterized set + three collection configs would do. The migration is the natural moment to collapse this — *without touching the MDX-facing component names/paths* (see constraint).
3. **Qwik itself.** The framework's core value — resumability of interactive apps — is unused: the only client-side behavior is the theme toggler and analytics. Meanwhile Qwik costs: qwik-specific ESLint plugin, `$`-suffixed APIs, serialization rules, `q-manifest.json`, service-worker glue, and a smaller ecosystem/agent-training footprint.
4. **Runtime frontmatter type-guard** (`isModuleWithFrontmatter`) checks only 4 of ~10 fields, silently drops `excerpt` from validation while reading it, and can only fail at request/build time with a generic message. A schema (Zod via collections) is strictly better.
5. **Service worker + speculation rules together.** Astro's built-in prefetch (or just speculation rules kept as-is) covers this; the Qwik service worker is framework plumbing that disappears.

## Risk register for the migration

| Risk | Severity | Mitigation |
| --- | --- | --- |
| MDX component imports (`~/...`, extensionless) break in Astro | High | Keep the 12 MDX-facing components as `.tsx` (Preact, statically rendered), same paths; `~` alias via tsconfig `paths` (Astro reads it natively). Extensionless imports resolve for `.tsx`, **not** for `.astro` — this drives the component-tech choice. |
| Code-block styling regresses (CSS targets Prism `.token` classes) | Medium | Configure MDX highlighting to Prism-compatible output, or switch to Shiki CSS-variables theme and map to existing custom properties. See styling doc. |
| URL changes (trailing slash, 404 handling) | Medium | Set `trailingSlash` explicitly; Playwright URL snapshot test before/after; keep `public/_headers`, `robots.txt`, redirects. |
| OG/meta parity per post | Medium | Blog layout logic ports to the collection page shell; diff rendered `<head>` for 3 sample posts. |
| Astro 7 whitespace compression alters prose around inline elements | Low | Visual diff on longest post; `compressHTML` escape hatch exists. |
| Sätteri pipeline surprises in MD (not MDX) | Low | We have no plain `.md` content; MDX keeps its own processor. |

## Verdict

The architecture is healthy content-wise and over-engineered code-wise. Astro 7 lets us delete roughly the entire `application/`/`infrastructure` layer and the Qwik runtime while preserving the content model unchanged. The genuinely portable assets — MDX files, design tokens, theme script, Playwright suite, Netlify config — are the majority of what matters.
