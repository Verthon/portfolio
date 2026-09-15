# Task: Fix pnpm lint — eslint-plugin-astro is ESM-only, incompatible with .eslintrc.cjs

**Status:** Blocked — `pnpm lint` fails immediately
**Found during:** Phase 6 readiness audit, 2026-09-14

## Problem

`pnpm lint` fails on startup:

```
Error [ERR_PACKAGE_PATH_NOT_EXPORTED]: Failed to load plugin 'astro' declared in '.eslintrc.cjs':
No "exports" main defined in node_modules/eslint-plugin-astro/package.json
```

`eslint-plugin-astro@3.1.0`'s `package.json` only exposes an ESM entry
point (`exports.import`, no CJS `main`/`require` path). `.eslintrc.cjs`
uses ESLint 8.57's legacy CommonJS-based `RuleTester`/config resolution,
which calls `require.resolve()` on plugin names — that can't resolve an
ESM-only package.

## Fix

Two options, pick one:

1. **Downgrade `eslint-plugin-astro`** to a version with CJS/dual exports
   compatible with ESLint 8's legacy config format.
2. **Migrate to ESLint 9 flat config** (`eslint.config.mjs`), which loads
   plugins via native ESM import and has no issue with ESM-only plugins.
   This is likely the more future-proof fix since flat config is the
   direction ESLint and its ecosystem (including `eslint-plugin-astro`) are
   moving; check `eslint-plugin-astro`'s docs for its flat-config export.

## Acceptance

- `pnpm lint` runs and reports real lint results (not a crash) against
  `src/**/*.{ts,tsx,astro}`
