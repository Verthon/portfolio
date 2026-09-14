# GEO basics — task queue

Making the site legible to answer engines (ChatGPT, Claude, Perplexity, Google
AI Overviews) as well as to search crawlers.

Trigger: Cassidy Williams, ["A fun trick for getting discovered by LLMs and AI
tools"](https://cassidoo.co/post/llm-discoverability/) (2026-01-19). Her
*mechanisms* are mostly right; her *evidence* is not — see "What this task does
not claim" before treating any of it as proven.

Related: `docs/seo-remediation.md` (traditional SEO queue; some overlap, noted
per item). `docs/astro-7-migration/04-ai-friendliness-and-agents.md` proposed
`llms.txt` and RSS as post-migration work — **this doc supersedes the sequencing
for those two**, and that doc has been updated to say so.

## What this task does not claim

The source post's proof is "I asked ChatGPT, it didn't mention me; I added
`llms.txt`; two weeks later it mentioned me, quoting my `llms.txt`."

That is not evidence of training-data or retrieval-index inclusion. A chat model
quoting your file in-session almost certainly *fetched the page live* during that
turn — which means the result is ordinary search-grounded retrieval, i.e. regular
SEO. Incognito and a different machine control for personalisation, not for the
model having a web tool. n is a handful of self-chosen queries with no control
group.

Separately, the "trick" section — asking a model "why didn't you recommend X"
and receiving a paragraph of praise — is sycophancy, not signal. Ignore it.

So: everything below is justified on **mechanism**, not on her result. Items are
ranked by how well-established the mechanism is. Item 4 is explicitly
speculative and is only on the list because it costs almost nothing.

## Current state (verified 2026-09-13)

| Surface | State |
| --- | --- |
| `public/robots.txt` | `User-agent: * / Allow: /` + sitemap. No AI-crawler rules either way. |
| JSON-LD | **Exists.** `createArticleJsonLd` in `src/common/infrastructure/services/document-head.ts`, wired into all three section layouts. Emits `BlogPosting` + a `Person` with `@id: https://sordyl.dev/#person`. |
| `Person.sameAs` | Absent. The `@id` is declared but never resolved to an entity with external links. |
| Home page JSON-LD | None. `src/routes/index.tsx` sets meta only. |
| Per-section `@type` | All three sections emit `BlogPosting`. |
| RSS | None. `/rss.xml`, `/feed.xml`, `/index.xml` all 404. |
| `llms.txt` | None. |
| Sitemap | Healthy, 34 URLs, no `lastmod`. |

`docs/seo-remediation.md` and
`docs/astro-7-migration/04-ai-friendliness-and-agents.md` were corrected on
2026-09-13 to match the table above; both now defer to this doc for the
`#person` fix, `llms.txt` and RSS.

## Queue

### 1. Decide the AI-crawler policy in `robots.txt`

**Why:** it gates everything else. `GPTBot`, `ClaudeBot`, `PerplexityBot`,
`Google-Extended` and friends respect `robots.txt`. Today the wildcard `Allow: /`
lets all of them in by default — which is probably what you want, but right now
it is an accident rather than a decision. Every other item here is wasted effort
if a future "tighten robots.txt" reflex silently reverses it.

Also worth separating: `Google-Extended` controls Gemini/AI-Overviews training
use *without* affecting normal Google Search ranking. They are independent
levers and conflating them is the common mistake.

**Do:** write the decision down (an ADR in `docs/architecture/decisions/`, since
it is a policy that a later reader will otherwise re-litigate), then make
`robots.txt` state it explicitly — named user-agents, even if every rule is
`Allow`. Explicit beats inherited.

**Cost:** one file, one ADR.

### 2. Resolve the `Person` entity — `sameAs` + home-page JSON-LD

**Why:** this is the single highest-mechanism-confidence item on the list.
Structured data is how a machine attributes a claim to *a specific person*
rather than paraphrasing an anonymous page. `sameAs` is the documented
Schema.org mechanism for identity reconciliation across sources — it is what
turns "Krzysztof Sordyl on sordyl.dev", "Verthon on GitHub" and the LinkedIn
profile into one entity instead of three weak ones.

Right now the article JSON-LD declares `'@id': 'https://sordyl.dev/#person'` and
nothing ever defines that node. The `@id` is a dangling reference — it promises
a canonical entity and never delivers one. That is the actual bug.

**Do:**
- Emit a `Person` node on the home page with the full shape: `name`, `url`,
  `@id` matching the existing one, `jobTitle`, `description`, and `sameAs`
  listing GitHub, LinkedIn, and any other profile you actually maintain.
- Keep the article-level `author`/`publisher` as the `@id` reference only. Do
  not duplicate the full `Person` on every page — one canonical definition,
  referenced everywhere, is the point of `@id`.
- Consider `WebSite` on the home page too, for the site-level entity.

**Cost:** extend `document-head.ts`, add a head to `src/routes/index.tsx`.
Framework-coupled — see "The Astro question".

### 3. Entity consistency pass (off-site)

**Why:** same mechanism as item 2, but the half that lives outside the repo.
`sameAs` asserts the link; the linked profiles have to corroborate it. If the
bio, the tagline and the topic list differ across sordyl.dev / GitHub /
LinkedIn, the reconciliation is weaker. Consistent phrasing is what lets a model
join evidence across sources — the one piece of the source post's advice that is
uncontroversial.

The home page title already gives a usable tagline: **"Architecture & DX at
Scale"**. `docs/content-strategy.md` gives the four pillars. Use those strings
verbatim rather than inventing new ones per platform.

**Do:** align name, one-line bio, and topic phrasing across profiles. No code.

**Cost:** ~30 minutes, no repo change. Do it regardless of everything else.

### 4. Generated `llms.txt` — speculative, cheap

**Why it is on the list:** it costs ~40 lines and has no downside.

**Why it is ranked last:** `llms.txt` is a *proposal*
([llmstxt.org](https://llmstxt.org/), Jeremy Howard, Sep 2024). It has real
adoption among documentation sites, but **no major model provider has publicly
committed to consuming it** as a retrieval or ranking signal. Treat it as a
lottery ticket, not a mechanism. Do not let it displace items 1–3.

**Constraint from driver #3** (`docs/architecture/drivers.md` — the discovery
surface is generated from content, never hand-maintained): if it exists, it is
generated from the content index at build time, exactly like the sitemap. A
hand-written `llms.txt` goes stale on the next post and is worse than nothing.

**Explicitly not doing: `/for-llms`.** The source post recommends a separate
LLM-oriented page. That is a second content surface, human-hostile by design,
and it conflicts with driver: *"I won't distort a page for crawlers."* A
generated `llms.txt` is a machine-readable index of pages that already exist —
that is fine. A parallel prose page written for bots is not.

### 5. RSS feed

**Why:** not strictly GEO, but it is the same data feeding one more consumer
surface, it is the standard mechanism for content syndication, and the site
currently 404s on all three conventional paths. Driver #3 wants it generated
from content. `docs/seo-remediation.md` item 7 already carries this.

Listed here because items 4 and 5 are the same build-time-endpoint shape and
should be done in one sitting.

**Cost:** ~40 lines. Framework-coupled.

## The Astro question

**This is the point that matters most.** Items 2, 4 and 5 are all
framework-coupled head/endpoint work, and the repo is still Qwik City while
`docs/astro-7-migration/` sits planned-but-not-started.

`docs/seo-remediation.md` flagged this sequencing decision and it was never
resolved — which is why that queue has been sitting. It is now blocking a second
queue. **Not deciding is itself a decision, and it is costing more than either
option would.**

The honest framing:

- **Doing them in Qwik now** means writing a `routeLoader$`-or-endpoint for
  `llms.txt` and RSS, plus head extensions, and redoing all of it in Astro
  later. In Astro these are near-trivial (`src/pages/llms.txt.ts` +
  `getCollection()`, `@astrojs/rss`); in Qwik they are hand-rolled. The rework
  is real but small — call it a day, twice.
- **Waiting for the migration** means the migration has to actually happen.
  `04-ai-friendliness-and-agents.md` already parked `llms.txt` and RSS behind
  it once. If it slips another six months, these ship never.

Two things push toward **not waiting**:

1. Item 1 (robots.txt) and item 3 (entity consistency) are framework-agnostic
   and unblocked *today*. Do them this week regardless of how this resolves.
2. Item 2 is a **dangling `@id` in already-shipped JSON-LD**. That is a defect in
   live output, not a new feature. It is worth fixing in Qwik even knowing it
   gets rewritten.

Recommendation: **do 1, 2 and 3 now in Qwik; hold 4 and 5 for the migration**,
with a hard condition — if the migration has not started by **2026-12-13**, build
them in Qwik and eat the rework. Write that date down or it will not hold.

Decide this before starting any code item, and record it here.

**Decision:** _(unresolved — fill in)_

## Success criteria

There is no clean way to measure GEO, and pretending otherwise is how the source
post went wrong. What *can* be checked deterministically:

- [ ] `robots.txt` names AI crawlers explicitly; an ADR records why.
- [ ] Google Rich Results Test / Schema Markup Validator passes on the home page
      and one page per section.
- [ ] `https://sordyl.dev/#person` resolves to exactly one `Person` node with
      `sameAs`; no page defines it twice.
- [ ] Every `sameAs` target links back, and its bio matches the site's.
- [ ] If shipped: `llms.txt` and the RSS feed regenerate on build with no
      hand-edited entries; adding a post updates both without touching either.

Do **not** add "ChatGPT mentions me when asked X" as a criterion. It is
unfalsifiable, unattributable to any change made here, and moves on model
release schedules you do not control.
