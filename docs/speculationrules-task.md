# Speculation Rules — ready to implement

Whether sordyl.dev should ship a `<script type="speculationrules">` hint, and
with what rules. Researched and decided 2026-09-18; **not yet implemented.**

Owner driver: *Core Web Vitals stay high, and I have the numbers.*

## What's left

Add a prefetch speculation-rules block to `src/layouts/Base.astro`:

```astro
<script
  type="speculationrules"
  is:inline
  set:html={JSON.stringify({
    prefetch: [
      {
        source: 'document',
        where: { href_matches: '/*' },
        eagerness: 'moderate',
      },
    ],
  })}
/>
```

Two things this shape is load-bearing about, both verified by building it:

- **`set:html`, not an expression in the script body.** Astro does not evaluate
  `{...}` inside a raw `<script>`; writing
  `<script type="speculationrules">{JSON.stringify(...)}</script>` emits the
  literal source text, which is invalid JSON and silently discarded by the
  browser. `set:html` on a self-closing tag emits minified JSON.
- **`is:inline`** — without it Astro treats the script as an asset to process.
  (`dangerouslySetInnerHTML` does not exist in Astro.)

Verified working: with this block in `Base.astro`, `dist/` contains
`{"prefetch":[{"source":"document","where":{"href_matches":"/*"},"eagerness":"moderate"}]}`,
and hovering a nav link in Chromium issues a request carrying
`Sec-Purpose: prefetch`. Reverted afterwards — this doc is the deliverable, the
edit is not applied.

After implementing, re-check that
`grep -rho 'src="/_astro/[^"]*\.js"' dist --include="*.html" | sort -u` still
returns nothing. The zero-JS property is the whole reason for this shape, so it
is the thing worth re-asserting (see ADR 0006).

No test is needed. This is a progressive-enhancement hint: it cannot break a
page, and `tests/a11y-per-page.spec.ts` already covers every page rendering.

Worth an ADR only if the decision below gets revisited — the reasoning is here,
and this is a single reversible tag.

---

## The decision

**A hand-written `is:inline` prefetch block. Not `prerender`, and not Astro's
`prefetch` config.**

Three findings drove it.

### Prefetch saves one round trip — ~45-49% of LCP

Measured with a throwaway Playwright + CDP probe against `serve dist`, 7 runs
per cell, median. Cold navigation vs. one warmed by a prefetch rule.

| Profile | Target | Cold LCP | Prefetched | Delta |
| --- | --- | --- | --- | --- |
| Fast 4G (85ms RTT) | article, 133 KB | 192ms | 104ms | −88ms (46%) |
| Fast 4G | article, 43 KB | 188ms | 104ms | −84ms (45%) |
| Fast 4G | blog index | 188ms | 104ms | −84ms (45%) |
| Slow 4G (300ms RTT) | article, 133 KB | 640ms | 328ms | −312ms (49%) |
| Slow 4G | article, 43 KB | 640ms | 328ms | −312ms (49%) |
| Slow 4G | blog index | 636ms | 332ms | −304ms (48%) |

**The win is flat in document size.** The 133 KB and 43 KB articles show an
identical delta to the millisecond; the saving tracks RTT, not payload. The
original premise — that small HTML documents make the win doubtful — had the
wrong variable. Reader latency is the whole effect, so it pays most for readers
on the worst connections.

Caveat: localhost with synthetic CDP throttling, no TLS handshake, no CDN edge.
Production cold navigation includes connection setup a prefetch also warms, so
the real delta is plausibly larger. Directionally sound, not a production
number. The probe was deliberately not committed — one-off, not a runner, so
ADR 0006's decision against a standing lab runner is untouched.

### Astro's `prefetch` config costs 956 bytes of JS against a baseline of zero

Built twice — once as committed, once with
`prefetch: { prefetchAll: true, defaultStrategy: 'hover' }` — and diffed.

| | raw | gzip | brotli |
| --- | --- | --- | --- |
| Baseline `dist/_astro/*.js` (emitted) | 22,583 | 9,389 | 8,558 |
| With `prefetch` | 25,070 | 10,507 | 9,514 |
| **Added (`page.js`, on all 35 pages)** | **2,487** | **1,118** | **956** |

The site currently ships **zero** bytes of JavaScript to readers — the Preact
bundles are emitted but referenced by no page. (This corrected ADR 0006, whose
table overstated shipped JS by its entire amount; fixed there 2026-09-18.)

So enabling the config is not +11% on an existing budget. It is the first and
only JavaScript the site would ship, on every page, to buy one round trip.

### Prerender would corrupt the analytics, and Safari wouldn't take it anyway

`src/components/analytics.astro` calls `posthog.init()` at parse time with no
`document.prerendering` check and no `prerenderingchange` listener. MDN lists
analytics firing during prerender as an
[unsafe-prerender condition](https://developer.mozilla.org/en-US/docs/Web/API/Speculation_Rules_API#unsafe_prerendering) —
it would inflate pageviews on pages nobody opened and contaminate the field
vitals ADR 0006 adopted.

Not verified by measurement: prerendering does not run in headless Chromium, so
the probe's "zero requests" reads as safe but means never happened. **Documented
risk, not a measured one** — don't treat it as settled either way without a
headed-Chrome run. It doesn't change the decision; prefetch fetches the document
without executing it, so it has none of this exposure.

WebKit independently reached the same split: its implementation is prefetch
only. Guarding analytics for prerender is a prerequisite if prerender is ever
wanted, not a follow-up.

## Rules, settled

- **`prefetch`**, not `prerender` — above.
- **`source: 'document'` with `eagerness: 'moderate'`** — hover/pointerdown
  triggered. `conservative` (pointerdown only) gives up most of the head start;
  `eager`/`immediate` would fetch every article card on an index page, which is
  the mobile-bandwidth cost worth avoiding. Note `eagerness` applies to
  `document` sources; a `source: 'list'` rule does not take it.
- **`href_matches: '/*'`, excluding nothing.** The old Qwik rule was backwards —
  its negative lookahead excluded `/blog`, `/dev-bites` and `/observatory`, i.e.
  every article, prefetching only the homepage and index pages. Real navigation
  is home → section index → article. There are no logout, cart, or
  state-changing URLs here, so the usual unsafe-prefetch exclusion list is empty.
  Same-origin only is the API default.

## Browser support

| Browser | Speculation Rules |
| --- | --- |
| Chrome / Edge | 109+ full; 105–108 partial |
| Opera | 95+ |
| Samsung Internet | 21+ |
| Firefox | **none**, through 159 |
| Safari / iOS | implemented, **off by default** |

[caniuse](https://caniuse.com/mdn-html_elements_script_type_speculationrules):
**76.95% global**, Safari listed unsupported, "disabled by default in 26.2+".

Safari has shipped code but keeps it off: WebKit merged
[PR #48322](https://github.com/WebKit/WebKit/pull/48322) on 2025-10-01 —
same-origin **prefetch** only, `immediate` and `conservative` eagerness, no
prerender, no subresources.
[STP 238](https://webkit.org/blog/17848/release-notes-for-safari-technology-preview-238/)
(Feb 2026) fixed a follow-up bug. But the
[WebKit standards position](https://github.com/WebKit/standards-positions/issues/54)
is still "Needs position" (open since 2022) and the feature is absent from the
[Safari 26.4 list](https://webkit.org/blog/17862/webkit-features-for-safari-26-4/).
[MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/script/type/speculationrules)
marks it Experimental, not Baseline.

Treat as Chromium-only today. Safari flipping the flag is the most likely thing
to change at a re-check — and it would need no change here, since prefetch is
exactly the subset WebKit implemented.

## The one argument for the Astro config, and why it loses

Astro's `prefetch` degrades to `<link rel="prefetch">` where Speculation Rules
are unavailable, so Firefox and Safari readers would get something. That
fallback needs cache headers to work ([Astro browser support](https://docs.astro.build/en/guides/prefetch/#browser-support):
Firefox errors `NS_BINDING_ABORTED` without them).

Checked, and it would work — production sends an `ETag` on HTML:

```
$ curl -sI https://sordyl.dev/blog/frontend-test-smells/
cache-control: public,max-age=0,must-revalidate
etag: "1295d6a2ef42e631c3b4cf8f0e720869-ssl"
```

So this is a genuine trade-off, not a dismissal: **956 bytes of JavaScript on
every page, for every reader, to extend the benefit to the ~23% on non-Chromium
browsers.** Declined because the zero-JS property is the more valuable and more
fragile thing — it is the site's baseline, it holds today by accident of having
no `client:*` directive, and spending it here buys a latency saving that is
already nice-to-have rather than load-bearing.

Revisit if Safari enables the flag (the inline route then covers most of the gap
for free) or if a real need for client JS appears and the zero is spent anyway.

## Background: what was dropped

The Qwik site had this in `src/root.tsx` (`git show HEAD:src/root.tsx` on
`feature/astro-migration`):

```
"prerender":[{ "source":"document", "eagerness":"moderate",
  "where":{ "href_matches": "/(?!dev-bites|blog|observatory).*" } }],
"prefetch":[{ "source":"document", "eagerness":"moderate",
  "where":{ "href_matches": "/(?!dev-bites|blog|observatory).*" } }]
```

Dropped rather than ported during the Astro 7 migration, as a decision: the rule
was misconfigured (above), and it shared a page with Qwik's service-worker
bundle prefetcher (`src/routes/service-worker.ts`, also dropped — bundle
prefetch, not offline support). With no client bundles to warm, the remaining
effect is the HTML document fetch alone, which is what was measured.
