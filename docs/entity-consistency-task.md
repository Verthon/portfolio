# Entity consistency — task queue

Successor to `docs/geo-basics-task.md`, which closed 2026-09-18. That queue's
code items all shipped; this doc owns what is left, which is off-site and
manual.

What shipped, and where the reasoning now lives:

| Item | Outcome |
| --- | --- |
| AI-crawler policy in `robots.txt` | `docs/architecture/decisions/0007-ai-crawler-policy.md` |
| Dangling `#person` `@id` | Fixed. `src/seo/site-json-ld.ts` defines the node; `src/build-checks/json-ld.ts` asserts every reference resolves |
| `llms.txt` | Declined — see below |
| RSS | Shipped 2026-09-17 |

## Queue

### 1. Entity consistency pass (off-site)

The only open item, and the only one that was never code.

`sameAs` asserts that three profiles are one person; the profiles have to
corroborate it. Two already do, verified 2026-09-18:

| Profile | Backlink to sordyl.dev | Name matches |
| --- | --- | --- |
| [github.com/Verthon](https://github.com/Verthon) | yes (`blog` field) | yes |
| [bsky.app/profile/krzysztof-sordyl.bsky.social](https://bsky.app/profile/krzysztof-sordyl.bsky.social) | yes (in bio) | yes |
| [linkedin.com/in/krzysztof-sordyl](https://www.linkedin.com/in/krzysztof-sordyl/) | **unverified** — behind auth | unverified |

**Do:** align name, one-line bio, and topic phrasing across all three. Confirm
LinkedIn links back to sordyl.dev at all. Use the strings already in the repo
rather than inventing per-platform variants — the home page title gives
**"Architecture & DX at Scale"**, and `docs/content-strategy.md` gives the four
pillars.

The shipped `Person` node is the reference text to match:

```
jobTitle:    Frontend Engineer
description: Frontend engineer building internal tooling for dev teams. Writes
             about frontend architecture, developer experience, and technical
             decisions with business impact.
knowsAbout:  Frontend architecture · Developer experience · Web performance ·
             Build tooling
```

**Cost:** ~30 minutes, no repo change.

### 2. Rich Results Test on the deployed site

The Schema Markup Validator passes on the local build — 0 errors on the home
page and on one article, checked 2026-09-18 by POSTing `dist/` HTML to
`validator.schema.org`. That is the build, not production.

**Do:** once the `#person` work is deployed, run Google's Rich Results Test
against the live home page and one URL per section. Until then the live site
reports `numObjects: 0`, because none of this has shipped.

## `llms.txt` — declined 2026-09-18

Not deferred. Declined, with the reasoning kept here because the temptation to
re-propose it will recur.

- Google documents it as unnecessary: *"You don't need to create new machine
  readable files, AI text files, or markup to appear in these features"*, and
  eligibility for AI Overviews / AI Mode is ordinary indexing —
  [AI features](https://developers.google.com/search/docs/appearance/ai-features).
- No major provider has committed to consuming it for retrieval or ranking.
- Peer adoption is 7 of the 40 blogs in `docs/research/peer-blogs.md`, skewed
  toward SEO-plugin defaults (Kilian Valkhof's is emitted by All in One SEO) and
  consultancies. Absent from Osmani, Willison, Comeau, Evans, Fowler, Frost.
- Two sites return HTTP 200 with an HTML soft-404 at `/llms.txt`, so a naive
  adoption count overstates it.

The real traction is llms.txt as a docs-consumption convention for coding agents
(Anthropic's agent-writing guidance, OpenAI's Agents SDK) — a different use case
from discovery of a personal blog.

Reopen only if a provider documents consuming it. Adoption counts are not that
evidence.

## What this task does not claim

Inherited from the closed queue, because it is the reasoning that keeps this
work honest rather than a task that completed.

The original trigger was Cassidy Williams, ["A fun trick for getting discovered
by LLMs and AI tools"](https://cassidoo.co/post/llm-discoverability/)
(2026-01-19). Her proof is "I asked ChatGPT, it didn't mention me; I added
`llms.txt`; two weeks later it mentioned me, quoting my `llms.txt`."

That is not evidence of training-data or retrieval-index inclusion. A chat model
quoting your file in-session almost certainly *fetched the page live* during
that turn — ordinary search-grounded retrieval, i.e. regular SEO. Incognito and
a different machine control for personalisation, not for the model having a web
tool. n is a handful of self-chosen queries with no control group.

Separately, the "trick" of asking a model "why didn't you recommend X" and
receiving a paragraph of praise is sycophancy, not signal.

Everything that shipped was justified on **mechanism**, not on that result — and
in the case of `#person`, on it being a defect in shipped markup regardless of
whether anything rewards fixing it. Structured data's GEO payoff is weaker than
the original queue claimed: Google documents no Knowledge-Graph benefit for
`sameAs`, types it as *recommended* on
[ProfilePage](https://developers.google.com/search/docs/appearance/structured-data/profile-page)
for a forum feature this site does not use, and explicitly disclaims special
structured data for AI features.

## Success criteria

- [ ] Every `sameAs` target links back, and its bio matches the site's.
- [ ] Rich Results Test passes on the deployed home page and one URL per
      section.

Do **not** add "ChatGPT mentions me when asked X" as a criterion. It is
unfalsifiable, unattributable to any change made here, and moves on model
release schedules you do not control.
