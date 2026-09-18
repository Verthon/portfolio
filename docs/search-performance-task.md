# Search performance — findings, not yet acted on

What Google Search Console says sordyl.dev is doing, and what's worth changing.
Scanned 2026-09-18 from the GSC export in
`sordyl.dev-Performance-on-Search-2026-09-18/`; **nothing implemented.**

Owner driver: *Published URLs don't break* is the one this sits next to, but
none of the findings below are about URLs breaking. Search visibility isn't
itself a driver — treat this as input to *the idea-to-published loop stays
cheap*, i.e. which topics are worth the next post.

Window: 2026-08-19 → 2026-09-15, web search, 28 days.

## The headline number

**12 clicks / 6,098 impressions / 0.20% CTR / average position 9.5.**

Page-one rank with near-zero click-through. That's roughly an order of magnitude
below typical CTR for position 9-10, which points at how results present in the
SERP rather than at ranking.

Position improved inside the window — ~12 average through late August, ~7.7 from
2026-09-01 onward — and **clicks did not follow.** Ranking gains aren't
converting.

**Caveat that applies to everything below: 12 clicks is a tiny sample.** The
aggregate (6,098 impressions at 0.20%) is solid. Per-page and per-query CTR is
noise. Don't over-read a single page's 0.06%.

## Where the impressions are

| Page | Impr | Clicks | Pos |
| --- | --- | --- | --- |
| `blog/react-19-support-for-web-components` | 1570 | 1 | 7.5 |
| `blog/storybook-testing-overview` | 1309 | 1 | 8.5 |
| `blog/measure-package-sizes-effectively` | 1170 | 2 | 9.1 |
| `blog/rsdoctor-next-gen-bundle-analyzer` | 361 | 2 | 8.1 |
| `dev-bites/vitest-timing-breakdown` | 314 | 2 | 21.7 |
| `dev-bites/how-to-measure-eslint-execution-time` | 148 | 3 | 8.8 |

Three pages hold 66% of all impressions and produced 4 clicks between them.

Devices: desktop 5,717 impressions / 12 clicks; **mobile 381 / 0.** Expected for
the niche — not a problem to fix, but it means every finding here is a desktop
finding.

Countries: US is 4,470 impressions / 2 clicks (0.04%). Germany is 71 / 3
(4.23%). Poland is 36 / 0 at position 6.6. The US volume is broad informational
ranking that doesn't convert; the engaged traffic is elsewhere and much smaller.

## Finding 1 — metadata doesn't echo the query vocabulary

The two highest-impression pages rank on words that appear nowhere in their
title or description. Verified against the frontmatter as committed.

### `react-19-support-for-web-components` — 1570 impr, pos 7.5, 1 click

```
title:       React 19 support for web components
description: React 19 introduces full support for the web-components and treats them
             as first-class citizen. The article discusses the previous version pain
             points by example.
```

Ranking queries are **custom elements** queries:

| Query | Impr | Pos |
| --- | --- | --- |
| react 19 custom elements support improvements | 18 | 6.17 |
| react 19 web components | 15 | 6.4 |
| react 19 custom elements improved support | 9 | 7.67 |
| react 19 custom elements improvements | 8 | 5.0 |
| react 19 custom elements | 5 | 9.6 |

"Custom elements" is in neither field. The page ranks on it by semantic
association, so the snippet never matches the searcher's words and nothing
bolds. Those listed queries sum to ~60 of 1570 impressions — the rest is
long-tail below the export cutoff, so the exact phrasing mix is unknown.

Second issue: "The article discusses the previous version pain points by
example" is meta-commentary about the article rather than the payoff, and sits
right where Google truncates.

### `storybook-testing-overview` — 1309 impr, pos 8.5, 1 click

```
title:       Storybook Testing Overview
description: Overview of Storybook testing, the alternative to the traditional
             JSDOM approach for testing the components
```

- **Description is 97 chars — below the 120-160 band in `CONTENT.md`.** Short
  descriptions give Google latitude to write its own snippet.
- Title is the only Title Case title among the three checked; the rest of the
  site is sentence case.
- "Overview" promises a survey. At position 8 that loses to results promising a
  decision or an answer.
- Ranking queries `storybook test runner` (10 impr, pos 14.7) and `storybook
  testnew` (12 impr, pos 18.08) — neither "test runner" nor the Storybook 8/9
  test-module naming is in the metadata.

**The shared pattern:** both describe what the article *is* rather than what the
reader gets, and neither uses the query's words.

## Finding 2 — `measure-package-sizes-effectively` is two different queries

1170 impressions, 2 clicks, position 9.1. Its queries split cleanly:

**Navigational — can't win, discount them:** `bundlephobia` (71 impr, pos 8.8),
`packagephobia` (3), `package phobia` (9), `bundle phobia` (5). These searchers
want the tool's own site.

**Intent-matched — winnable, and already ranking well:** `bundlephobia
alternative` (39 impr, **pos 5.62**), `npm bundle size` (7, pos 25.14), `satori
install size packagephobia` (13, pos 8.38), `sharp bundlephobia size` (3).

`bundlephobia alternative` at position 5.62 is a query whose entire intent is
"something other than bundlephobia" — exactly what the post is. Zero clicks on
39 impressions there is not a ranking problem.

**Unverified, from the author's own observation (2026-09-18):** sordyl.dev also
appears in a Google AI Overview on at least one of these queries, and sits
around position 7 on the first page for `bundlephobia alternative`. GSC does not
break out AI Overview appearances and `Wygląd w wyszukiwarce.csv` exported
empty, so **this is not confirmed by the data in this export.** If it holds, the
zero clicks have a different cause than a weak snippet: the answer is being
consumed in the SERP. Confirm which queries and which page before acting on it —
it changes the target from click-through to being the cited source.

Frontmatter as committed, for reference:

```
title:       Measure package sizes effectively
description: Better alternatives for Bundlephobia, to discover real npm package weight
og_title:    Measure npm package sizes effectively
```

## Finding 3 — two pages rank for their own topic but sit off page one

| Page | Query | Impr | Pos |
| --- | --- | --- | --- |
| `blog/api-surface-challenges` | `api surface` | 59 | 26.14 |
| `observatory/playwright-component-testing` | `playwright component testing` | 29 | 34.83 |

Exact topical match, page three. Different problem from Finding 1 — these aren't
failing to convert a good position, they're failing to reach one.

## Finding 4 — error-string queries land on a post that buries them

Two error strings draw steady impressions at good positions:

| Query | Impr | Pos |
| --- | --- | --- |
| `"sending sigterm to other processes.." concurrently source` (both variants) | 48 | ~9.7 |
| `err_pnpm_recursive_exec_first_fail command "playwright" not found` | 13 | 4.23 |
| `err_pnpm_recursive_exec_first_fail command "tsx" not found` | 5 | 4.2 |

I first read these as queries with no matching page. Wrong — `grep` puts both
strings in `blog/storybook-testing-overview/index.mdx`. They're inside a long
overview post, which is why they rank at position 4-10 without converting: the
searcher has one specific error and lands on a survey article.

This is the shape `CONTEXT.md` describes as a dev bite — one problem, one
solution. Worth considering as its own post, with the caveat that splitting
content out of a ranking page is not free.

## Finding 5 — nine pages had no impressions in the window

```
blog/code-coverage-more-than-just-a-number
blog/headless-ui-libraries-the-key-to-flexible-and-accessible-user-interfaces
blog/pnpm-basics
blog/prompt-as-string-production-liability
blog/webpack-to-rsbuild-migration
dev-bites/import-developer-experience-json
dev-bites/storybook-chunk-blocked-on-production
dev-bites/vitest-doctor-faster-test-config
observatory/base-ui-headless
```

**Treat as a lead, not a fact.** `Strony.csv` exports only 24 rows, so a page
absent from it may have had few impressions rather than none. Confirm in the GSC
UI before concluding anything — and note `webpack-to-rsbuild-migration` is
absent while all four `modern-webpack-part-*` posts rank, which is worth a look
on its own.

## What's left

Nothing here is decided. In rough order of impressions at stake:

1. **Resolve the AI Overview question first** (Finding 2). It determines whether
   the rewrites below aim at click-through or at citation. Needs the author to
   confirm queries and page.
2. **Rewrite title/description for the two pages in Finding 1** — ~2,900
   impressions. Per `AGENTS.md`, propose a diff; don't apply silently. Keep
   `title` under the enforced 70 (`src/content.config.ts`) and `description`
   inside 120-160.
3. **Decide on Finding 4** — carve the error-string content into dev bites, or
   leave it.
4. **Finding 3** — whether `api-surface-challenges` and
   `playwright-component-testing` are worth working on at all.
5. **Verify Finding 5** in the GSC UI.

`/seo` is the skill for step 2 and covers metadata and structured data; it
explains its reasoning, which is the point per the drivers doc.

## Re-checking this

The export is a 28-day window and goes stale. Re-pull before trusting any number
here. The finding most likely to change is the position trend — it moved ~4
places inside this one window.
