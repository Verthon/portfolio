# RSS feed — requirements and research

The site 404s on `/rss.xml`, `/feed.xml` and `/index.xml`. `@astrojs/rss` is
installed and unused — knip ignores it with a TODO pointing here.

Supersedes `docs/geo-basics-task.md` item 5 and `docs/seo-remediation.md` item 7,
both of which carried this as a one-line "~40 lines of local code" entry. It is
not blocked any more: those docs held RSS behind the Astro migration, which has
since landed. What is missing now is not a framework — it is a spec.

**Do not start coding from this doc.** It exists to produce the requirements,
not to satisfy them. Two things have to happen first: define what the feed is
for (below), and look at what comparable sites actually ship (below that).

## Current state (verified 2026-09-16)

| Surface | State |
| --- | --- |
| `/rss.xml`, `/feed.xml`, `/index.xml` | All 404. |
| `@astrojs/rss` | Installed (4.0.19), imported nowhere. In knip `ignoreDependencies`. |
| Content collections | `blog`, `devBites`, `observatory` — `src/content.config.ts`. |
| Per-item metadata available | `title`, `description`, `excerpt`, `date`, `tags`, `published`, `last_updated?`. |
| Sitemap | Healthy, generated, carries `lastmod` from `last_updated ?? date`. |
| `<link rel="alternate">` in head | None. Nothing advertises a feed. |

Note: `geo-basics-task.md` says the sitemap has no `lastmod`. That is stale —
`astro.config.mjs` builds a `lastmodByUrl` map and serialises it. The same doc's
"The Astro question" section is stale for the same reason.

## 1. Define the requirements

Open questions. Each changes the shape of the endpoint, so settle them before
writing code — not during.

1. **Scope.** One combined feed, or one per section, or blog only? The site has
   three content types that differ in length and cadence (`CONTEXT.md`). A
   reader who wants war stories may not want every dev bite. Per-section feeds
   are four endpoints to keep consistent; a combined feed needs `<category>` per
   item to stay filterable.
2. **Item body.** `excerpt` only, or full rendered content in
   `<content:encoded>`? `CONTENT.md` already requires `excerpt` to be standalone
   and under 200 chars — it is built for this. Full content means rendering MDX
   to HTML with its component wrappers (`ArticleWrapper`, `Heading`, …)
   sanitised out, which is the bulk of the work in this task. Decide whether
   readers should be able to read the post without visiting.
3. **Which posts.** `published: true` only, presumably — confirm. Sorted by
   `date`, and capped at N items or unbounded?
4. **`date` vs `last_updated`.** Which becomes `pubDate`? Re-dating an edited
   post resurfaces it in every reader as if new. Sitemap `lastmod` and feed
   `pubDate` answer different questions and should probably diverge here.
5. **Discovery.** `<link rel="alternate" type="application/rss+xml">` in the
   page head, and a visible link somewhere. A feed nothing points at is a feed
   nobody subscribes to.
6. **Atom vs RSS 2.0.** `@astrojs/rss` emits RSS 2.0. Atom is the stricter
   spec. Probably not worth relitigating, but state the choice rather than
   inheriting it.

Constraint from the *published URLs don't break* driver
(`docs/architecture/drivers.md`): the feed is
generated from the content collections at build time, like the sitemap. No
hand-maintained entries — a feed that needs editing per post goes stale on the
next one.

Constraint from the *docs stay short* driver: whatever this becomes, it does
not earn a 300-line doc. Record the decisions, not the deliberation.

## 2. Research what others ship

Before deciding any of the above, look at real feeds. The questions in section 1
have conventional answers and it is cheaper to borrow them than to reason from
first principles.

Worth pulling and reading the actual XML of:

- Personal technical blogs with mixed content types — the closest comparison.
  How do they handle multiple sections? One feed or several?
- Sites built on `@astrojs/rss`, to see the idiomatic shape and what the
  integration makes easy versus what needs hand-rolling.
- A few feeds you personally subscribe to. What makes them pleasant in a reader
  is more informative than any spec — particularly excerpt-vs-full-content,
  which is a reading-experience question, not a technical one.

Check the spec directly rather than a summary: the RSS 2.0 spec
(https://www.rssboard.org/rss-specification) and the `@astrojs/rss` docs
(https://docs.astro.build/en/recipes/rss/). Per repo convention, official docs
first.

Specific things to answer from the research:

- Do comparable sites put full content in the feed, and does it survive a real
  reader intact?
- Is `<category>` per item actually used by readers for filtering, or is it
  decoration?
- What does a feed reader do with a changed `pubDate` on an existing GUID? This
  determines the answer to question 4 and is a behaviour question, not a
  preference.
- Is there a convention for `/feed.xml` and `/index.xml` redirecting to
  `/rss.xml`, or do sites just pick one path?

## Success criteria

- [ ] Requirements from section 1 are answered and written down here.
- [ ] Feed regenerates on build; adding a post updates it with no hand-edits.
- [ ] Feed validates against the W3C Feed Validation Service.
- [ ] The feed is discoverable — `<link rel="alternate">` in the head, and a
      visible link on the site.
- [ ] `@astrojs/rss` comes out of `ignoreDependencies` in `knip.config.ts`.

## Decision

_(unresolved — fill in once section 1 is answered)_
