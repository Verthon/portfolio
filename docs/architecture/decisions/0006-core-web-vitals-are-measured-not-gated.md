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

Baseline on the day this was decided — what the Preact integration emits into
`dist/_astro/`:

| File | Raw | Gzip | Brotli |
| --- | --- | --- | --- |
| `preact.module.js` | 10,470 | 4,412 | 4,037 |
| `signals.module.js` | 9,411 | 3,592 | 3,297 |
| `client.js` | 2,702 | 1,385 | 1,224 |
| **Total emitted** | **22,583** | **9,389** | **8,558** |
| **Total shipped to readers** | **0** | **0** | **0** |

**These files are emitted but never referenced.** No built HTML page links any
of them, and no `client:*` directive exists anywhere in `src/` — every Preact
component is a build-time template that never hydrates (ADR 0004). Per-page
JavaScript is zero bytes, not 8.6 KB.

Verify with:

```
grep -rho 'src="/_astro/[^"]*\.js"' dist --include="*.html" | sort -u
```

Empty output means the zero still holds. Re-run it after adding any `client:*`
directive, or any config that injects a client script — Astro's `prefetch`
option is the one most likely to be reached for, and it adds ~956 bytes brotli
to all pages.

Nothing asserts against these numbers. That is the decision, not an omission.

The report is nominally the *server* bundle — the three client assets above are
in it among ~100 `dist/.prerender/` chunks that are deleted after the build and
shipped to nobody. Filter on `dist/_astro/` when reading the JSON.

## Why not gate it

A budget that fails the build was the obvious move and is wrong here:

- **Per-page JS is flat as content grows.** It is zero, and stays zero when a
  post is added. A total-`dist/` budget would fail on the next post for reasons
  unrelated to performance — it would be measuring images and HTML, not JS.
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

## Correction, 2026-09-18

The byte table above originally ran under the heading "the whole site's client
JavaScript" and gave a total of 8,661 bytes brotli, with no shipped-to-readers
row. That framing was wrong: it counted files the Preact integration emits into
`dist/_astro/` but that no HTML page references, so it overstated the JavaScript
actually delivered to a reader by the entire amount. The true figure is zero.

Corrected in place rather than superseded — the decision (measure, don't gate)
is unchanged and the "why not gate it" reasoning holds. Only a factual baseline
was wrong. The raw numbers also shifted slightly against a current build; they
are re-measured above.

Found while costing Astro's `prefetch` option for
[`docs/speculationrules-task.md`](../../speculationrules-task.md), where the
difference decided the outcome: adding ~956 bytes brotli to an 8.6 KB budget is
a rounding error, but adding it to zero means shipping a site's first
JavaScript.
