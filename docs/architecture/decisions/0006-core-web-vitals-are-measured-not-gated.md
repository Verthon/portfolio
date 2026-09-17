# 0006 — Core Web Vitals are measured, not gated

Decided 2026-09-17.

## Decision

Two instruments, neither of which can fail a build:

**Field** — PostHog web vitals autocapture, enabled in project settings
(Autocapture → Web vitals autocapture, all four of CLS/FCP/LCP/INP). PostHog
wraps Google's `web-vitals` library and emits `$web_vitals` events; it is off by
default and is a server-side project toggle, not a change to
`src/components/analytics.astro`. Read at Web Analytics → Web Vitals.

**Lab, on demand** — `pnpm analyze.bundle` (`ANALYZE=true astro build`) runs
[Sonda](https://sonda.dev) over the build and writes `.sonda/sonda_server.{html,json}`,
gitignored. The JSON carries exact uncompressed/gzip/brotli bytes per asset.

Baseline on the day this was decided — the whole site's client JavaScript:

| File | Raw | Gzip | Brotli |
| --- | --- | --- | --- |
| `preact.module.js` | 10,521 | 4,458 | 4,072 |
| `signals.module.js` | 9,463 | 3,633 | 3,336 |
| `client.js` | 2,746 | 1,422 | 1,253 |
| **Total** | **22,730** | **9,513** | **8,661** |

Nothing asserts against these numbers. That is the decision, not an omission.

## Sonda needs `server: true` or it silently does nothing

A static build fires `astro:build:setup` once with `target: 'server'`, never
`'client'`, and Sonda's Astro integration returns early on that target unless
`server: true`. With its documented default config: no report, no warning, empty
`.sonda/`, exit 0.

So the report is nominally the *server* bundle. The three client assets above
are in it, among ~100 `dist/.prerender/` chunks that are deleted after the build
and shipped to nobody — filter on `dist/_astro/` when reading the JSON.

## Why not gate it

A budget that fails the build was the obvious move and is wrong here:

- **Per-page JS is flat as content grows.** Astro ships zero JS per page; the
  three files above do not change when a post is added. A total-`dist/` budget
  would fail on the next post for reasons unrelated to performance.
- **One committer who runs the build.** A tripwire only fires when you already
  know you changed something.
- **A threshold that goes red on a legitimate Astro minor gets bumped without
  being read**, which is worse than no gate — it trains the gate away.

The *cheap publish loop* driver outranks the hypothetical regression this would
catch.

## Why field data cannot answer "did this commit break it"

PostHog reports p75, days after deploy, mixed across commits. On a personal
blog's traffic a single visitor on a bad connection *is* the p75 — this is why
CrUX has a minimum-traffic threshold before it reports a URL at all. Field RUM
here is structurally incapable of single-commit attribution.

It answers the other half of the *Core Web Vitals stay high, and I have the
numbers* driver: whether the site is actually fast for real people. That half
was previously unserved.

## What else was considered

**Lighthouse CI on `dist/`** (`@lhci/cli` + `treosh/lighthouse-ci-action`) — the
industry-standard lab answer, and the one that produces real LCP/CLS rather than
byte counts. Declined for now: it needs multiple runs plus median comparison to
beat its own noise, and on a zero-JS static site it is green essentially always.
Revisit if a real regression ever gets shipped, which would be the evidence this
currently lacks.

**`casoon/astro-webvitals`** — a second copy of `web-vitals` alongside the one
PostHog already bundles, plus a collection endpoint that already exists.
Rejected outright.

**A hand-written byte-budget script** in the `scripts/check-*.mjs` family.
Sonda does the expensive half better: it reads the final source maps, so its
numbers are post-tree-shaking and post-minification with real brotli, and it
attributes bytes to the dependency that introduced them.

**A performance skill.** "What is the bundle size" has one answer from one
command. Wrapping that in a skill is context bloat against the *docs stay short*
driver. The part that would earn one is LCP phase attribution — splitting LCP
into TTFB / load delay / load time / render delay and taking the largest share
as the bottleneck, per
[cwv-superpowers](https://github.com/corewebvitals/cwv-superpowers) — but
PostHog's `$web_vitals` events carry metric values without attribution, so there
is nothing to write it against yet.
