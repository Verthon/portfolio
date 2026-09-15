# Speculation Rules — post-migration research

Whether sordyl.dev should ship a `<script type="speculationrules">` hint, and
with what rules. Deliberately **out of scope for the Astro 7 migration** — the
pre-migration hint was dropped rather than ported, as a decision, not an
oversight.

Owner driver: #2, Core Web Vitals stay high and I have the numbers.

## What was dropped

The Qwik site had this in `src/root.tsx` (see `git show HEAD:src/root.tsx` on
`feature/astro-migration`):

```
"prerender":[{ "source":"document", "eagerness":"moderate",
  "where":{ "href_matches": "/(?!dev-bites|blog|observatory).*" } }],
"prefetch":[{ "source":"document", "eagerness":"moderate",
  "where":{ "href_matches": "/(?!dev-bites|blog|observatory).*" } }]
```

It is not in `src/layouts/Base.astro` and was not reinstated.

## Why it was not restored verbatim

**The rule excludes every article.** The negative lookahead matches only hrefs
that do *not* start with `/blog`, `/dev-bites` or `/observatory` — so the three
content sections, which are the actual navigation targets on a blog, were the
only things never prefetched. What it did cover was the homepage and the section
index pages. That is close to backwards for this site, and porting it unchanged
would carry the misconfiguration forward.

**The conditions changed.** The hint shared a page with Qwik's service worker
prefetcher (`src/routes/service-worker.ts`, also dropped — it was Qwik's bundle
prefetch, not offline support). Astro ships no client JS, so there are no
bundles to warm; the win is now purely the HTML document fetch. That is a
different and smaller effect than it was under Qwik, and it should be measured
rather than assumed.

## Questions to answer

1. On a static, zero-JS, CDN-served site with small HTML documents, is there a
   measurable LCP win from prerendering at all? Get a number — driver #2 says
   measured on a real page, not a feeling about defaults.
2. If yes: `prerender` or `prefetch`? Prerender runs the page, which means
   PostHog fires on pages the reader never opens. Check what
   `src/components/analytics.astro` does under a prerender and whether it
   inflates pageviews. This may settle the question on its own.
3. Which `eagerness`? `moderate` is hover/pointerdown-triggered; `conservative`
   is pointerdown only. Wasted bandwidth on mobile is the cost.
4. Correct `where` clause — almost certainly the inverse of the old one, i.e.
   match the content sections, exclude nothing else. Worth confirming against
   real navigation paths rather than guessing.

## Notes for whoever picks this up

`dangerouslySetInnerHTML` does not exist in Astro. The script needs `is:inline`
with the JSON as its body, or Astro will attempt to bundle it and the hint will
not reach the document.

Safari does not implement the Speculation Rules API; this is a progressive
enhancement for Chromium only. Baseline status is worth re-checking at pickup
time — it may have moved.

Official docs first: the
[MDN Speculation Rules API](https://developer.mozilla.org/en-US/docs/Web/API/Speculation_Rules_API)
page, not blog posts about it.
