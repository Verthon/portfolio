# GSC revisit — did the vitest update recover the ranking

Revisit on or after 2026-11-17 (six weeks after the change).

## What changed

2026-10-06: `dev-bites/vitest-timing-breakdown` — fixed the `collect` and
`prepare` definitions, noted the Vitest 4 renames, set `last_updated`.

## Baseline (Apr 1–Sep 27 2026 vs Oct 1 2025–Mar 31 2026)

| Page                                    | Clicks  | Position   |
| --------------------------------------- | ------- | ---------- |
| `vitest-timing-breakdown`               | 63 → 16 | 8.9 → 16.3 |
| `how-to-measure-eslint-execution-time`  | 36 → 20 | 6.6 → 8.4  |

Compare the vitest page's position from 2026-10-06 onward against 16.3. Clicks
alone mislead: sitewide, impressions rose 57% while CTR fell 0.6% → 0.2%,
which matches AI Overviews citing pages at a stable position
([Google: impressions and position](https://support.google.com/webmasters/answer/7042828?hl=en)).
That part needs no action.

`how-to-measure-eslint-execution-time` checked 2026-10-06 against ESLint
v10.12 docs: `TIMING=1` and its output are unchanged, so it is not stale.
Added a pointer to `@eslint/config-inspector` the same day and set
`last_updated` — measure its position from 2026-10-06 too.
