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

## Current state (verified 2026-09-15)

| Surface                            | State                                                                                                                                                                               |
| ---------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `rel=canonical`                    | **Healthy.** Single source, `src/layouts/Base.astro:23`. Absolute, self-referencing, one per page, in `<head>`, no JS rewrite. All 35 pages.                                        |
| Canonical vs sitemap               | **Agree exactly.** Same 34 URLs; `/404/` correctly has a canonical but no sitemap entry.                                                                                            |
| Internal links (`/…`)              | **Enforced.** `scripts/check-links.mjs` runs in `build`, fails on a missing trailing slash or a target with no built page.                                                          |
| Absolute self-links                | **Unenforced.** One in content (`observatory/playwright-component-testing/index.mdx:51`); the checker treats `https://sordyl.dev/…` as external and skips it.                       |
| JSON-LD `url` / `mainEntityOfPage` | Reuse the same `canonical` expression per section page. Consistent.                                                                                                                 |
| `#person` `@id`                    | **Dangles.** All three section pages reference `https://sordyl.dev/#person`; nothing defines it. Migration carried the defect from Qwik. Owned by `docs/geo-basics-task.md` item 2. |
| Search Console                     | Not set up. No visibility into Google-_selected_ canonicals.                                                                                                                        |
| `og:image`                         | None on any page.                                                                                                                                                                   |

## Queue

### 1. Close the absolute-self-link hole in the checker

**Why:** `scripts/check-links.mjs` skips anything starting `https://`, so a
self-link written as `https://sordyl.dev/blog/typo/` bypasses both rules — no
trailing-slash check, no target-exists check. It is a silent 404 waiting to
happen, and it is the one gap in an otherwise closed loop. Google's _"when
linking within your site, link to the canonical URL rather than a duplicate
URL"_ covers these links; the checker currently does not.

**Do:**

- Strip a leading site origin before the internal test, so self-links get the
  same two rules. Import `SITE` from `astro.config.mjs` rather than hardcoding.
- Rewrite the one content instance to root-relative:
  `observatory/playwright-component-testing/index.mdx:51` →
  `[Storybook Component Testing](/blog/storybook-testing-overview/)`. Not an SEO
  defect — the absolute URL _is_ the canonical — but root-relative works in
  `astro dev` and preview without bouncing to production, and matches every
  other internal link in the content.
- Decide whether the checker should **reject** the absolute form outright. House
  convention, not correctness. Recommend yes.

**Cost:** ~2 lines in the checker, 1 line of content.

### 2. Extend the checker to the generated discovery surface

**Why:** the checker validates `dist/**/*.html`. It does not look at
`sitemap-0.xml`, so the "don't contradict yourself across methods" rule —
Google's sharpest canonical instruction — is verified **by hand**. I verified it
on 2026-09-15; nothing keeps it true. A serialize bug in `astro.config.mjs`, or
an RSS feed emitting a different URL shape, would go unnoticed.

That driver says the discovery surface is _generated from content, never
hand-maintained_. A hand-verified invariant over generated files is the same
failure mode one level up.

**Do:** assert set-equality between `<link rel=canonical>` across `dist` and
`<loc>` in the sitemap, modulo the known `/404/` exclusion. Extend to RSS when
it ships (`docs/geo-basics-task.md` item 5) — same shape, same sitting.

**Cost:** ~20 lines in the existing script. No new dependency.

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

Items 1 and 2 are unblocked today and are pure local code. Item 3 is blocked on
`geo-basics-task.md` item 2. Item 4 needs production access. Item 5 is latent
until `og:image` exists.

No decision is pending here — unlike `geo-basics-task.md`, which is blocked on
"The Astro question", this queue has no fork in it. The migration already
happened; these are all Astro-native.

**One doc-hygiene item, out of scope but adjacent:**
`.agents/skills/seo/repo-context.md` is substantially stale — it says content
lives in `src/routes/` (it is `src/content/`), describes Qwik City
`DocumentHead`/`RouterHead` and `q:head` grepping, and lists "no JSON-LD
anywhere" and "sitemap carries no lastmod" as gaps, all three of which are now
done. The next `/seo` run will act on wrong facts. Fix before running it.

## Success criteria

Deterministic only. No "Google picked my canonical" criterion — that moves on
Google's schedule, not on changes made here.

- [ ] `pnpm build` fails on an internal link missing a trailing slash, on one
      whose target has no built page, and on an absolute self-link violating
      either rule.
- [ ] Canonical set and sitemap `<loc>` set are asserted equal at build time,
      not by hand.
- [ ] No content file contains `https://sordyl.dev` in a link target.
- [ ] Reintroducing any of the above fails the build in CI, verified by actually
      reintroducing one.
- [ ] When RSS ships, its URLs join the same equality assertion in the same
      change.
