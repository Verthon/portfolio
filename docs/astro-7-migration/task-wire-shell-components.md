# Task: Wire nav/footer/theme-toggler into Base.astro; finish Phase 4 page markup

**Status:** Blocked — Phase 3b/3c and Phase 4 are incomplete, not just untested
**Found during:** Phase 6 readiness audit, 2026-09-14

## Problem

Phase 3b/3c shell components exist on disk but are orphaned:

- `src/components/nav/nav.astro`
- `src/components/footer/footer.astro`
- `src/components/theme-toggler.astro`

None are imported by `src/layouts/Base.astro` or anywhere else — `knip`
correctly flags all three as unused files. Every live page currently ships
with **zero navigation, no footer, no theme toggle**.

Separately, Phase 4 pages (`src/pages/index.astro`,
`src/pages/{blog,dev-bites,observatory}/index.astro`) only render a bare
`<a href>{title}</a>` list per post — not the markup the plan and the
pre-existing Playwright specs expect:

- `tests/featured-articles.spec.ts` expects
  `article[data-featured-article="true"]` / `article[data-featured-dev-bite="true"]`
  markup, and "Read article" / "Read more" link text.
- `tests/page-theme.spec.ts` expects a theme `<select>` (`getByLabel(/select
  theme/i)`) defaulting to `"system"` — doesn't exist since the toggler
  isn't wired in and is a button, not a select, as currently stubbed.

## Fix

1. Import `Nav`, `Footer`, `ThemeToggler` into `Base.astro` (or a shared
   shell wrapper) so every page gets them.
2. Rebuild homepage / section index page markup so featured posts render as
   `<article data-featured-article="true">` / `data-featured-dev-bite`
   with visible "Read article" / "Read more" CTAs, per
   `tests/featured-articles.spec.ts`.
3. Decide whether `page-theme.spec.ts`'s `<select>`-based theme switcher is
   still the intended UX, or whether that spec should be rewritten for the
   button-based toggler in `theme-toggler.astro`. These are two different
   designs — pick one and make the component and the test agree.

## Acceptance

- `knip` no longer flags `nav.astro` / `footer.astro` / `theme-toggler.astro`
  as unused
- Every page has visible nav, footer, and working theme toggle
- `tests/featured-articles.spec.ts` and `tests/page-theme.spec.ts` pass
  (once [task-playwright-e2e-webserver.md](./task-playwright-e2e-webserver.md)
  is also fixed so `pnpm test.e2e` can run at all)
