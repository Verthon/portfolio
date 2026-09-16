# Architectural drivers - sordyl.dev

Why this repo has the shape it has. Not a spec - just the things I'd otherwise
forget and re-litigate. Where it actually stands today: `state.md`.

Last reviewed: 2026-09-11.

## Goals

- I write the posts. Agents support the work around them: research triage before
  I commit to a topic (go / no-go, with evidence of what already exists),
  critique of the skeleton and the draft, language and readability passes, and
  SEO/GEO review. They don't supply the expertise.
- The SEO/GEO and readability agents double as how I learn those topics. They
  explain their reasoning - an agent that silently applies good SEO has failed,
  even if the SEO is good.
- The site serves readers first: fast, and pleasant to read. LLMs consuming it
  well should fall out of clean semantic structure - I won't distort a page for
  crawlers.

## Quality attributes

Ordered. Higher wins a conflict. The order is expected to change, so cite a
driver by name, never by position — "the *published URLs don't break* driver",
not "driver #3".

1. **Accessible to WCAG 2.1 AA, at minimum.** The EU baseline (EN 301 549) and
   the right outcome for readers with disabilities. `tests/a11y-per-page.spec.ts`
   runs axe on every page, which catches maybe half of it — keyboard order,
   focus visibility and screen-reader sanity are still on me.
2. **Core Web Vitals stay high, and I have the numbers.** Not a feeling about
   framework defaults — measured, on a real page, by something an agent or I can
   run on demand. This feeds SEO, so it's not vanity.
3. **Published URLs don't break.** The one irreversible output: once a URL is
   indexed, a 404 or a bad canonical isn't fixed by redeploying. Slugs are
   permanent, and the discovery surface — sitemap, RSS, canonicals — should be
   generated from the content, never hand-maintained.
4. **The idea-to-published loop stays cheap.** Idea, research, go/no-go,
   skeleton, ping-pong on the draft, language and SEO help, publish. Every stage
   is a conversation I can pick up and drop, not a batch job that returns a
   report. Friction here is what stops posts from existing.
5. **Docs stay short enough that I'd actually read them.** Which is the same
   thing that makes them cheap for an LLM: a process doc is the bare minimum an
   agent needs to do the task, not an exhaustive description of it. Models
   generate 500-line markdown by default and it becomes chaos for me and context
   bloat for them. I've let this slip before, so I guard it.

Not drivers: availability and scaling (the host's problem), runtime security (no
auth, no input, no DB).
