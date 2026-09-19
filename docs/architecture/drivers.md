# Architectural drivers - sordyl.dev

Why this repo has the shape it has. Not a spec - just the things I'd otherwise
forget and re-litigate. Where it actually stands today: `state.md`.

Last reviewed: 2026-09-18.

## Goals

- I write the posts. Agents support the work around them: research triage,
  critique of the skeleton and the draft, language and readability passes,
  SEO/GEO review. They don't supply the expertise.
- The SEO/GEO and readability agents double as how I learn those topics. An
  agent that silently applies good SEO has failed, even if the SEO is good.
- Readers first: fast, pleasant to read. LLMs consuming it well should fall out
  of clean semantic structure - I won't distort a page for crawlers.

## Quality attributes

Ordered; higher wins a conflict. Cite by name, never by position.

### Accessibility

WCAG 2.1 AA - the EU baseline (EN 301 549) and the right outcome for readers
who need it.

| Metric                        | Limit | Target |
| ----------------------------- | ----- | ------ |
| axe violations, every page    | 0     | 0      |
| lint a11y rules bypassed      | 0     | 0      |
| manual keyboard/SR passes     | -     | 1      |

Gated, unlike Performance: a violation fails the suite. axe covers roughly half
of AA - keyboard order, focus visibility and screen-reader sanity are manual,
and that pass is not yet done.

### Performance

Fast pages for readers on mobile data; good CWV feeds SEO.

| Metric              | Limit | Target |
| ------------------- | ----- | ------ |
| p75 LCP             | 2.5s  | 2.5s   |
| p75 INP             | 200ms | 200ms  |
| p75 CLS             | 0.1   | 0.1    |
| per-page JS shipped | 1 KB  | 0 B    |

Debt metrics - lower always better. Not gated: ADR 0006.
Outranked by the cheap-publish-loop constraint, which is why.

### URL stability

The one irreversible output: once a URL is indexed, a 404 or a wrong canonical
is not fixed by redeploying. ADR 0002.

| Metric                          | Limit | Target |
| ------------------------------- | ----- | ------ |
| internal links not resolving    | 0     | 0      |
| canonical ↔ sitemap delta       | 0     | 0      |
| hand-maintained discovery URLs  | 0     | 0      |

Gated. Slugs are permanent; sitemap, RSS and canonicals are generated from the
content, never written by hand - a hand-maintained list rots on every new post.

### Machine discovery

Agents and crawlers should get the structure for free from clean semantic HTML.
Payload and structure are what help them - not CWV, which they never experience.

| Metric                       | Limit | Target |
| ---------------------------- | ----- | ------ |
| unresolved JSON-LD `@id`     | 0     | 0      |
| RSS items vs published posts | 0     | 0      |

Gated. This is where "good for LLMs" actually lives; a page is never distorted
for a crawler.

## Constraints

Not attributes - they resist quantification, and they still win conflicts.

| Constraint                | What it rules out                                      |
| ------------------------- | ------------------------------------------------------ |
| One committer, spare time | gates needing a second reviewer; tripwires that only fire when I already know I changed something |
| Publishing must stay cheap | any step that is a batch job returning a report rather than a conversation I can drop and resume |
| Agent context budget      | docs long enough that a model burns the task's tokens reading them |

Not drivers: availability and scaling (the host's problem), runtime security (no
auth, no input, no DB).
