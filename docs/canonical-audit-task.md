# Canonical & link integrity — task queue

Keeping published URLs from breaking, and keeping every signal that points at
them saying the same thing.

Trigger: two internal links in
`src/content/dev-bites/vitest-doctor-faster-test-config/index.mdx` were missing
trailing slashes under `trailingSlash: 'always'`, so each click cost a 301 hop.
Fixed 2026-09-15, plus a build-time checker so it cannot recur. That fix exposed
a wider question — what else asserts a URL, and does anything verify those
assertions agree?

Related: `docs/seo-remediation.md` (traditional SEO queue),
`docs/geo-basics-task.md` (answer-engine legibility; item 2 there and item 3
here are the same `#person` defect — **that doc owns it**, this one only
consumes it).

Driver: `docs/architecture/drivers.md` — _"Published URLs don't break. The
one irreversible output."_ Everything below is that driver, nothing else.

## What this task does not claim

Google does **not** mandate a trailing-slash convention. The
[canonicalization docs](https://developers.google.com/search/docs/crawling-indexing/canonicalization)
never address `/about` vs `/about/`, www vs non-www, or protocol variants as
things you must standardise. `/about` and `/about/` are simply _different URLs_
that may serve duplicate content.

So `trailingSlash: 'always'` is a **house convention**, not compliance. No
external tool will ever tell you it was violated — which is exactly why the
enforcement has to be local, and why a generic crawler is the wrong instrument:
it follows the 301, gets `200 OK`, and reports success. Both original bugs would
have passed.

Likewise, `rel=canonical` is a **hint, not a directive**. Google clusters
near-duplicate pages and picks "the most complete and useful" using protocol,
redirects, sitemap presence, and the annotation as _signals_. The value of the
work below is not the tag; it is that every signal agrees, leaving nothing to
override.

## Current state (verified 2026-09-17)

| Surface                            | State                                                                                                                                                                               |
| ---------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `rel=canonical`                    | **Healthy.** Single source, `src/layouts/Base.astro:23`. Absolute, self-referencing, one per page, in `<head>`, no JS rewrite. All 35 pages.                                        |
| Canonical vs sitemap               | **Asserted at build time.** Set-equality both directions in `scripts/check-links.mjs`; `/404/` is the one exemption. 35 canonicals, 34 `<loc>`.                                      |
| Internal links (`/…`)              | **Enforced.** `scripts/check-links.mjs` runs in `build`, fails on a missing trailing slash or a target with no built page.                                                          |
| Absolute self-links                | **Enforced.** `scripts/check-links.mjs` rejects any `href` starting with `SITE` and still applies both rules to it. No content file contains one.                                   |
| JSON-LD `url` / `mainEntityOfPage` | Reuse the same `canonical` expression per section page. Consistent.                                                                                                                 |
| `#person` `@id`                    | **Dangles.** All three section pages reference `https://sordyl.dev/#person`; nothing defines it. Migration carried the defect from Qwik. Owned by `docs/geo-basics-task.md` item 2. |
| Search Console                     | Not set up. No visibility into Google-_selected_ canonicals.                                                                                                                        |
| `og:image`                         | None on any page.                                                                                                                                                                   |

## Queue

### ~~1. Close the absolute-self-link hole in the checker~~ — done 2026-09-17

`scripts/check-links.mjs` imports `SITE` from `astro.config.mjs`, strips the
origin, and applies the trailing-slash and target-exists rules to self-links.
It also **rejects** the absolute form outright — the recommendation was taken.
No content file contains `https://sordyl.dev` in a link target.

### ~~2. Extend the checker to the generated discovery surface~~ — done 2026-09-17

The same script asserts set-equality between `<link rel=canonical>` across
`dist/**/*.html` and `<loc>` in `sitemap-0.xml`, in both directions, with
`/404/` as the single exemption. A missing sitemap also fails the build.

The RSS extension is still owed: when a feed ships, its URLs join this
assertion in the same change. That obligation now lives with
`docs/rss-feed-task.md`.

### 3. Consume the `#person` fix — do not duplicate it

**Why:** listed only so the dependency is explicit. `mainEntityOfPage` and
`author.@id` are both URL assertions, so an audit of "what claims a URL" touches
it. But the defect and its fix belong to `docs/geo-basics-task.md` item 2.

**Do:** nothing here. When that item lands, add `@id` resolution to item 2's
checks — every referenced `@id` resolves to exactly one defined node.

**Cost:** zero. Cross-reference only.

### 4. Search Console — the half no local check can see

**Why:** every item above proves _internal consistency_. None can observe
whether Google **accepted** the canonical. The
[URL Inspection API](https://developers.google.com/search/blog/2022/01/url-inspection-api)
exists precisely to compare user-declared against Google-selected canonicals.

Deliberately ranked last, because it is monitoring and not a gate: it only
works on verified, already-indexed production URLs, so it cannot see a branch or
a pre-deploy build; it is quota-limited (2000/day); and it reports what Google
decided weeks ago. Useful, but it will never catch a regression before deploy.
The build checker is the gate; this is the feedback loop.

**Do:** verify the property, submit the sitemap, then check the
`googleCanonical` vs `userCanonical` fields on a sample. Only worth automating
if a divergence actually shows up.

**Cost:** setup is ~30 min and needs production DNS/hosting access. Automation
deferred until there is a reason.

### 5. `og:image` — a URL assertion with no verifier

**Why:** `Base.astro` emits `og:title`, `og:description`, `og:url`, `og:type` —
no `og:image`. When one is added it becomes another absolute URL that can rot,
in a surface nothing currently validates. Flagged now so it ships _with_ a check
rather than acquiring one later.

Also carried by `docs/seo-remediation.md` and `state.md` as an open gap.

**Do:** when adding it, assert the referenced asset exists in `dist` — same
script, same pattern as item 1.

**Cost:** folds into whatever ships `og:image`.

## Dependency note

Items 1 and 2 are done. Item 3 is blocked on `geo-basics-task.md` item 2. Item
4 needs production access. Item 5 is latent until `og:image` exists.

Everything still open here is either off-repo (item 4) or waiting on another
doc's decision (items 3 and 5). Nothing in this queue is blocked on local code.

`.agents/skills/seo/repo-context.md` was rewritten for Astro and is no longer
stale — it describes `src/content/`, `Base.astro` head ownership and the
per-section `slot="head"`, and lists the checker under "do not re-report as
gaps". The doc-hygiene item that used to sit here is closed.

## Success criteria

Deterministic only. No "Google picked my canonical" criterion — that moves on
Google's schedule, not on changes made here.

- [x] `pnpm build` fails on an internal link missing a trailing slash, on one
      whose target has no built page, and on an absolute self-link violating
      either rule.
- [x] Canonical set and sitemap `<loc>` set are asserted equal at build time,
      not by hand.
- [x] No content file contains `https://sordyl.dev` in a link target.
- [ ] Reintroducing any of the above fails the build in CI, verified by actually
      reintroducing one. **Not yet done** — the rules exist, but none has been
      proven to fail by breaking one on purpose.
- [ ] When RSS ships, its URLs join the same equality assertion in the same
      change.
