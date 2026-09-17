# RSS feed

The endpoint is built (`src/pages/rss.xml.ts`). Discovery and tests are not.

## Decision

Researched 2026-09-17 by fetching the raw XML of addyosmani.com, joshwcomeau.com,
overreacted.io, danluu.com, macwright.com, jvns.ca, tonsky.me and
simonwillison.net, against the [RSS 2.0
spec](https://www.rssboard.org/rss-specification) and the [`@astrojs/rss`
recipe](https://docs.astro.build/en/recipes/rss/).

| Question | Decision | Why |
| --- | --- | --- |
| Scope | One combined feed at `/rss.xml`. | Nobody splits per section. Comeau ships eight content sections in one feed. Per-section feeds can be added later without breaking the combined one. |
| Item body | `excerpt` → `<description>`. No `content:encoded`. | Addy and Comeau — the closest comparables — both ship excerpt-only. Comeau *has* `content:encoded` but fills it with a teaser plus a "Keep reading" link (median 539 chars). Full text is blocked anyway, see below. |
| `pubDate` | `date`. Never `last_updated`. | Reader behaviour on a changed `pubDate` with a stable `guid` is not specified and readers disagree — Thunderbird needs the change to notice an edit, FreshRSS resurfaces items as unread. Conservative rule wins: an edited post must not reappear as new. Sitemap `lastmod` keeps `last_updated ?? date`; the two answer different questions. |
| `<category>` | None. | Zero categories across all seven RSS feeds sampled. Only simonwillison.net emits them, in Atom, and duplicates the tags into the summary text anyway. Decoration. |
| Format | RSS 2.0. | What `@astrojs/rss` emits, and the majority choice. Only overreacted.io ships both RSS and Atom. |
| Paths | `/rss.xml` only. No `/feed.xml` or `/index.xml`. | No convention exists. addyosmani.com serves `/rss.xml` and `/feed.xml` as byte-identical duplicates, so the feed misstates its own `rel="self"` at one of them. If aliases are ever wanted, use real redirects. |
| Which posts | All entries in all three collections. | The `published` flag no longer exists — git is the draft mechanism (`CONTENT.md`). Unbounded; 30 items today. |

Full content is blocked, not merely declined: every post is MDX with mandatory
`Heading` / `ArticleWrapper` components, and Astro's `content` field "will not
process components or JSX expressions in MDX files". The only route is the
experimental Container API. Not worth it for a feature Addy and Comeau both
skipped.

`trailingSlash: true` in the `rss()` call is load-bearing — without it the
`guid`s drift from the canonical URLs and `scripts/check-links.mjs` fails.

`<atom:link rel="self">` and `<lastBuildDate>` are emitted via `xmlns` +
`customData`. The self-link is not required by RSS 2.0, but the W3C validator
warns without it and it is the fix for the addyosmani.com mismatch noted above.

`lastBuildDate` is the newest item's `pubDate`, not build time. Build time is
what joshwcomeau.com emits, but it changes on every deploy even when no content
changed, so the feed is never byte-identical twice and the conditional-fetch
caching the field exists for stops working. Newest `pubDate` only moves when
content moves. Verified: two consecutive builds produce an identical `rss.xml`.

Compared against joshwcomeau.com's raw feed on 2026-09-17. Same shape — RSS 2.0,
atom self-link, unbounded, newest-first, `guid` equal to `link`, excerpt in
`<description>`. He adds `content:encoded` (median 451 chars, all 88 items, a
teaser ending in a "Keep reading" link — never the full post, and never identical
to `<description>`), plus `dc:creator` and `generator`. Skipped: the first is the
blocked-by-MDX decision above, the last two are noise on a single-author blog.

`guid isPermaLink="true"` is hardcoded in `@astrojs/rss`
(`dist/index.js`, guid derived from `link`) and not configurable. Josh's library
emits `false`. Only matters if a URL changes, which the *published URLs don't
break* driver forbids — left at the library default.

## Still to do

1. Validate once against the W3C Feed Validation Service, by hand, **after
   deploy** — the service fetches a public URL and `sordyl.dev/rss.xml` is not
   live yet. Not in the build; no network calls there. Checked locally in the
   meantime: parses, `version="2.0"`, all three required `channel` children
   present, every item has a title and description, every `pubDate` parses as
   RFC-822, every `guid` is `isPermaLink="true"` and equal to its `<link>`.

## Resolved: footer link is an icon

Heroicons outline RSS glyph, inlined in `footer.astro` like the other two —
`role="img"` plus an `aria-label`, matching the row. Not a component: the `.tsx`
icons in `src/common/components/` exist for MDX, and `IconWrapper` takes a single
`svgPath` while the RSS glyph is two paths (arc + dot).

The glyph is `fill="none"` / `stroke="currentColor"`, the inverse of the filled
GitHub and LinkedIn paths, so `.icon-link svg { fill: currentColor }` would render
it as a blob. `.rss-link svg { fill: none }` overrides it.

## Testing

A feed is a build artifact, so it is checked against `dist/` like the sitemap,
not in a browser. The existing `check-links.mjs` only reads `.html`, so the 30
URLs inside `rss.xml` are currently unverified.

`scripts/check-feed.mjs` — separate from `check-links.mjs`, which already does
two jobs — asserts:

- `dist/rss.xml` exists and parses as XML
- item count equals the number of `src/content/*/*/index.mdx` entries (catches a
  collection silently dropped from `SECTIONS`)
- every `<link>` and `<guid>` resolves to a built `index.html`. The `check()`
  helper in `check-links.mjs` turned out not to be reusable — it pushes into that
  module's own `violations` array — so `check-feed.mjs` has its own `resolves()`.
  Not worth refactoring a working script to share nine lines.
- every `pubDate` parses as a valid RFC-822 date
- items are sorted descending by `pubDate`
- the head `<link rel="alternate">` href resolves to a file in `dist/`

Playwright needs no new spec. `tests/a11y-per-page.spec.ts` runs axe on every
page and will catch an unlabelled footer link on its own.

## Success criteria

- [x] Requirements answered and written down.
- [x] Feed regenerates on build; adding a post updates it with no hand-edits.
- [x] `@astrojs/rss` out of `ignoreDependencies` in `knip.config.ts`.
- [ ] Feed validates against the W3C Feed Validation Service. Blocked on deploy;
      passes the equivalent local structural checks.
- [x] Discoverable — `<link rel="alternate">` in the head, visible link on the site.
- [x] `scripts/check-feed.mjs` runs on build.
