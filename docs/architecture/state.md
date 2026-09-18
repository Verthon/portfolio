# As-is state - sordyl.dev

Where the repo stands against `drivers.md`. Volatile by design — drivers say why,
this says what's missing today. One line per gap, no prose.

Last checked: 2026-09-18.

| Driver                  | Status                                     | Gap                                       |
| ----------------------- | ------------------------------------------ | ----------------------------------------- |
| Accessible (WCAG AA)    | axe runs per sitemap URL, both themes      | manual keyboard/SR pass is unautomated; oxlint a11y covers 7 rules ([0003](./decisions/0003-oxlint-over-eslint.md)) |
| CWV measured            | responsive images via `astro:assets` ([0005](./decisions/0005-images-through-astro-assets.md)); `/_astro/*` + `/fonts/*` immutable-cached; `pnpm analyze.bundle` + PostHog field vitals ([0006](./decisions/0006-core-web-vitals-are-measured-not-gated.md)) | no lab LCP/CLS runner; field p75 needs traffic to mean anything. Gating declined, not missing ([0006](./decisions/0006-core-web-vitals-are-measured-not-gated.md)) |
| URLs don't break        | `trailingSlash`, `lastmod`, `check-links` gate the build ([0002](./decisions/0002-published-urls-do-not-break.md)); canonical↔sitemap set-equality and absolute self-links now asserted too | accepted: nothing catches a deliberate delete/rename (below); no Search Console, so Google-*selected* canonicals are unobserved (needs prod DNS) |
| Machine discovery       | JSON-LD ships on all 3 sections; RSS at `/rss.xml`, discoverable and build-checked | `#person` `@id` dangles; no `llms.txt`. `og:image` declined, not missing (below) |
| Cheap publish loop      | skills in `.agents/skills/`                | no corpus index for content triage        |
| Docs stay short         | migration folder folded into ADRs 2026-09-16 | —                                       |

The *URLs don't break* gap is accepted, not open. `src/build-checks/links.ts`
validates `dist/` against itself, so a page that stops generating vanishes from
both sides of the diff and the build stays green. A content-derived assertion
(every `index.mdx` has a built page and a `<loc>`) was considered on 2026-09-16
and rejected: it would catch only accidental drops, is blind to deliberate
deletion by construction, and the repo has one committer who runs the build. The
version that would cover deletion is a committed snapshot of shipped URLs —
worth revisiting only if a post is ever retired or a slug renamed. Do not
reintroduce the deleted hardcoded URL list; it rotted on every new post.

The three link rules were verified on 2026-09-18 by reintroducing each defect
into a copy of `dist/` and confirming the runner exits 1: a missing trailing
slash, an absolute self-link, and a sitemap `<loc>` diverging from the canonical
set (which fires in both directions). `trailingSlash: 'always'` is a house
convention, not a Google requirement — no external tool will ever report a
violation, which is why the gate is local. `rel=canonical` is likewise a hint,
not a directive; the value is that every signal agrees, leaving nothing to
override.

## Open items

**`observatory` `[slug].astro` emits `@type: 'BlogPosting'`** for what
`CONTEXT.md` defines as a tracking note, not an article. Changing structured
data on indexed pages is not a silent edit — decide deliberately.

**`og:image` declined 2026-09-17 — a decision, not a gap.** No page emits
`og:image` or `twitter:image`, and none will until there is a reason. It is not
an SEO signal: Google's
[Google Images docs](https://developers.google.com/search/docs/appearance/google-images)
list `og:image` only as a way to influence *which* image is selected, and image
selection is "completely automated" — it appears nowhere as a ranking input.
`docs/seo-remediation.md` ranked it HIGH, which miscategorised a social-sharing
feature as an SEO one.

What it actually buys is a picture on a shared-link card. `og:title`,
`og:description`, `og:url` and `twitter:card` already ship from `Base.astro`, so
a shared link renders as a titled card either way — the image is the only part
missing. The author does not currently share posts, and jvns.ca and
simonwillison.net both ship no `og:image` at all (verified from their HTML,
2026-09-17), so it is not a baseline expectation for a technical blog.

Not the reason to skip it: page weight. `og:image` is a `<meta>` tag no browser
ever fetches — only a platform crawler does, on a share. It has zero cost to
readers and no CWV impact. If that argument resurfaces as a reason to keep
declining, it is wrong; the reasons above are the real ones.

Revisit if posts start being shared regularly. The cheap form is one static
1200x630 PNG referenced from `Base.astro` — what sarasoueidan.com does — not
per-post generation, which needs satori + resvg and cuts against the *cheap
publish loop* driver. Whatever ships must assert the asset exists in `dist` —
same pattern as the link rules in `src/build-checks/links.ts`, since an
`og:image` is one more absolute URL that can rot in a surface nothing currently
validates.

**`llms.txt` is a new feature, not migration debt.** It did not exist on the Qwik
site, so nothing was lost and no indexed URL is at risk. Owned by
`docs/geo-basics-task.md`.

**RSS shipped 2026-09-17.** `/rss.xml`, one combined feed over all three
collections, `<link rel="alternate">` in `Base.astro` plus an icon in the nav and
footer. Validated clean against the W3C Feed Validation Service on 2026-09-17,
live. `pubDate` is `date` and never `last_updated`, so an edited post does not
resurface as unread; the sitemap's `lastmod` answers the opposite question and
keeps `last_updated ?? date`. `guid isPermaLink="true"` is hardcoded by
`@astrojs/rss` and not configurable — harmless while the *published URLs don't
break* driver holds, since the guid only changes if a URL does.

The feed is deliberately *not* in the canonical/sitemap equality assertion. A feed
is not a page and emits no canonical, so a `<loc>` for it would fail the
set-equality check in `src/build-checks/links.ts`. The 30 URLs inside the feed are
covered instead by `src/build-checks/feed.ts`, which also asserts item count against
`src/content/*/*/index.mdx`, RFC-822 `pubDate`s, sort order, and that the head
`rel="alternate"` resolves.

**Schema drift worth knowing:** `observatory.status` is a 5-value enum, four
values in use; `observatory` gained `short_preview` and `last_updated`.
