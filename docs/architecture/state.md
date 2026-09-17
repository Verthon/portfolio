# As-is state - sordyl.dev

Where the repo stands against `drivers.md`. Volatile by design — drivers say why,
this says what's missing today. One line per gap, no prose.

Last checked: 2026-09-17.

| Driver                  | Status                                     | Gap                                       |
| ----------------------- | ------------------------------------------ | ----------------------------------------- |
| Accessible (WCAG AA)    | axe runs per sitemap URL, both themes      | manual keyboard/SR pass is unautomated; oxlint a11y covers 7 rules ([0003](./decisions/0003-oxlint-over-eslint.md)) |
| CWV measured            | responsive images via `astro:assets` ([0005](./decisions/0005-images-through-astro-assets.md)); `/_astro/*` + `/fonts/*` immutable-cached | no on-demand runner — numbers above are build-time byte counts, not field CWV |
| URLs don't break        | `trailingSlash`, `lastmod`, `check-links` gate the build ([0002](./decisions/0002-published-urls-do-not-break.md)); canonical↔sitemap set-equality and absolute self-links now asserted too | accepted: nothing catches a deliberate delete/rename (below) |
| Machine discovery       | JSON-LD ships on all 3 sections; RSS at `/rss.xml`, discoverable and build-checked | `#person` `@id` dangles; no `llms.txt`, no `og:image` |
| Cheap publish loop      | skills in `.agents/skills/`                | no corpus index for content triage        |
| Docs stay short         | migration folder folded into ADRs 2026-09-16 | —                                       |

The *URLs don't break* gap is accepted, not open. `scripts/check-links.mjs`
validates `dist/` against itself, so a page that stops generating vanishes from
both sides of the diff and the build stays green. A content-derived assertion
(every `index.mdx` has a built page and a `<loc>`) was considered on 2026-09-16
and rejected: it would catch only accidental drops, is blind to deliberate
deletion by construction, and the repo has one committer who runs the build. The
version that would cover deletion is a committed snapshot of shipped URLs —
worth revisiting only if a post is ever retired or a slug renamed. Do not
reintroduce the deleted hardcoded URL list; it rotted on every new post.

## Open items

**`observatory` `[slug].astro` emits `@type: 'BlogPosting'`** for what
`CONTEXT.md` defines as a tracking note, not an article. Changing structured
data on indexed pages is not a silent edit — decide deliberately.

**`llms.txt` is a new feature, not migration debt.** It did not exist on the Qwik
site, so nothing was lost and no indexed URL is at risk. Owned by
`docs/geo-basics-task.md`.

**RSS shipped 2026-09-17.** `/rss.xml`, one combined feed over all three
collections, `<link rel="alternate">` in `Base.astro` plus an icon in the nav and
footer. Rationale and the comparison against other feeds: `docs/rss-feed-task.md`,
which stays open until the feed is validated against the W3C service — that needs
a public URL, so it is blocked on deploy.

The feed is deliberately *not* in the canonical/sitemap equality assertion. A feed
is not a page and emits no canonical, so a `<loc>` for it would fail the
set-equality check in `scripts/check-links.mjs`. The 30 URLs inside the feed are
covered instead by `scripts/check-feed.mjs`, which also asserts item count against
`src/content/*/*/index.mdx`, RFC-822 `pubDate`s, sort order, and that the head
`rel="alternate"` resolves.

**Schema drift worth knowing:** `observatory.status` is a 5-value enum, four
values in use; `observatory` gained `short_preview` and `last_updated`.
