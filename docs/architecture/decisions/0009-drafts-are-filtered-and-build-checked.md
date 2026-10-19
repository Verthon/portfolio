# 0009 — Drafts are a frontmatter flag, filtered in one place and build-checked

Decided 2026-10-19. Serves the *URL stability* driver and the *publishing must
stay cheap* constraint.

## Decision

`draft: true` in frontmatter keeps an entry out of the production build. The
field is optional on all three collections, so published content carries
nothing.

**One query.** Every page reads content through `getPublishedCollection`
(`src/publishing/collection.ts`), never `getCollection` directly. It applies the
filter from the
[Astro content collections docs](https://docs.astro.build/en/guides/content-collections/#filtering-collection-queries):
drafts appear under `astro dev`, and a production build skips them. No route,
listing, feed item, or sitemap entry.

**One build check.** `scripts/check-drafts.ts` runs in `pnpm build` and fails if
any draft's page was built, or if any HTML, the feed, or the sitemap links to
it. `check-feed` counts only non-draft entries.

Publishing a draft means deleting `draft: true` and setting `date` to that day.

## Why

A series is written ahead of time and published on demand. Keeping each part on
its own branch means no links between the unpublished parts, plus a rebase every
time `master` moves.

A `published` field existed before this and nothing read it, so five posts
marked unpublished were live and indexed. That was not a missing flag. It was a
flag with no enforcement, and the build check is the enforcement.

## What it costs

A new page that calls `getCollection` directly skips the filter. The build check
catches that after the fact (verified: `check-links` passed on such a build, and
`check-drafts` failed it), but nothing stops the call from being written.

The runners detect drafts by regex over the raw frontmatter, the same way
`astro.config.mjs` reads `lastmod` ([0002](./0002-published-urls-do-not-break.md)).
If the regex and Zod disagree, the build fails rather than leaks, because the
feed count stops matching.

The repo is public. A pushed draft can be read on GitHub before it is
published.

Previews are local only. There is no URL to send a reviewer.

## Alternatives

- **Branch per post.** No code to maintain, and an unpushed draft stays private.
  Rejected because a series needs its parts to link to each other while they
  are written.
- **Unlisted page with `noindex`.** The URL exists before publication and can
  leak, `noindex` is only a request, and the canonical ↔ sitemap parity check
  would need an exemption.
- **Scheduled by `date`.** Needs a cron rebuild on the host, and publishing on
  demand still means editing the date.
