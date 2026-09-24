---
name: observatory-check
description: Check whether one observatory note still tells the truth — status drift inside the note, and releases upstream shipped since it was last updated. Use when asked to verify, refresh, or re-check an observatory note.
---

# Observatory check

One note per run. It reports; it never edits.

**Always read `src/content/observatory/CONTEXT.md` first.** It holds the status
vocabulary, what the body `**Status:**` line is allowed to carry, the body shape,
and the two ways a note rots. Everything below assumes it.

An observatory note tracks an unsettled tool, so it rots by default. The failure
is silent: upstream ships, the note keeps asserting the old state, and the site is
confidently wrong.

## Target

Needs exactly one slug under `src/content/observatory/`. If the invocation didn't
name one, list the slugs with their `status` and `last_updated` and ask which.
Never sweep all of them, never pick for the user.

`Stable` notes are checked less often, not exempt — a settled tool can un-settle.

## Pass 1 — internal

No web calls.

**Stage word only.** Frontmatter `status` holds the stage; the body line adds the
version, date or where it ships. Compare the stage words and ignore the tail:
`status: 'Experimental'` against `**Status:** v0.3.x, published to crates.io` is
only a finding if the tail contradicts the stage, not because it says more.

Check for disagreement across: frontmatter `status`, the body `**Status:**` stage
word, `short_preview`, and any stage implied by `excerpt` or `description`.

Then, without the web:

- a dated claim `last_updated` has outrun — "most likely stable **this year**",
  "shipped last month", "since 2022"
- a `**Recommendation**` that contradicts the status
- a body still arguing for a stage the frontmatter has already moved past
- a missing section from the default body shape — report it, don't call it a
  failure; `CONTEXT.md` allows deviation

## Pass 2 — upstream

Only after pass 1 is reported. Take every link in the note — repo, issue,
changelog, docs — plus the tool's own release feed. Check what changed since
`last_updated`.

Official sources first: the project's own releases, changelog, or docs. A blog
post or forum thread is a lead, not evidence — chase it to the primary source
before flagging.

**Verify versions and dates against the registry, not a rendered page.**
`npm view <pkg> time --json` and `npm view <pkg> dist-tags` are authoritative and
cheap. A summarised GitHub releases page has produced the right day and month
with the wrong year — never report a release date sourced only that way.

What matters:
- a release that moves the stage, including deprecation
- a listed known issue now closed and shipped
- an adoption consideration whose premise expired
- the project going quiet long enough that `Superseded` is the honest status

Every finding names its source — link or doc name. No source, no finding.

## Output

Only what fails. Cite `path:line`. Skip a clean pass rather than printing a
checkmark for it.

```
## src/content/observatory/playwright-component-testing/index.mdx
last_updated: 2025-10-28 · status: Superseded

INTERNAL
  L8 / L26 — frontmatter stage `Superseded`, body stage `Experimental`.
  → `**Status:** Superseded — never left experimental, see Recommendation`

UPSTREAM
  Component testing shipped as <version> on <date> (microsoft/playwright
  releases, <link>). `Superseded` is now wrong on the facts, not just stale.
  → frontmatter `status: 'Beta'`, `last_updated: 2026-09-19`
  L34 — "Lack of a clear roadmap" cites issue #17409, closed <date> (<link>).
  Drop it or rewrite.
```

## Rules

Propose diffs, never apply them — `AGENTS.md`. Quote the replacement line so it
can be accepted or rejected.

Don't re-litigate the status vocabulary. Map what upstream did onto the
values in `CONTEXT.md`; if nothing fits, say so and stop.

Out of scope: prose quality (`/content-review`), metadata and JSON-LD (`/seo`),
heading `id`/`linkLabel` (`/seo`, a11y test).
