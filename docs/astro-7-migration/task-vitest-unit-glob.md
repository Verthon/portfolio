# Task: Fix Vitest picking up Playwright specs

**Status:** Blocked — `pnpm test.unit.ci` fails immediately
**Found during:** Phase 0/3 type-check cleanup, 2026-09-14

## Problem

No `vitest.config.ts` exists, so Vitest uses its default test glob
(`**/*.{test,spec}.ts`), which also matches the Playwright specs under
`tests/` (`smoke.spec.ts`, `page-theme.spec.ts`, `a11y-per-page.spec.ts`,
`featured-articles.spec.ts`). Loading them under Vitest fails immediately:

```
Error: Playwright Test did not expect test() to be called here.
```

Separately: all Qwik-era unit spec files under `src/` (`article.spec.ts`,
`mdx-file.spec.ts`, `nav.spec.ts`) were already deleted in earlier phases.
There are currently **zero** unit spec files anywhere under `src/` — so even
once the glob collision is fixed, `pnpm test.unit.ci` has nothing to run
until new unit tests exist (e.g. for `src/content.config.ts` schema
validation, or any Astro/Preact component logic that gains real behavior).

## Fix

Add `vitest.config.ts` scoping `include` to `src/**/*.spec.ts` (excluding
`tests/`), so Vitest and Playwright stop fighting over the same files.

## Acceptance

- `pnpm test.unit.ci` runs cleanly (passes with 0 tests, or passes once
  unit tests are added) and does not attempt to load `tests/*.spec.ts`
- `pnpm test.e2e` is unaffected
