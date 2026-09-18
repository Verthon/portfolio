# 0007 — AI crawlers may cite, not train

Decided 2026-09-18.

## Decision

`public/robots.txt` states one policy, three ways:

```
User-agent: *
Content-Signal: search=yes, ai-input=yes, ai-train=no
Allow: /
```

plus a per-agent `Disallow: /` for the documented training crawlers (`GPTBot`,
`ClaudeBot`, `Google-Extended`, `CCBot`, `Bytespider`, `Applebot-Extended`,
`meta-externalagent`, `cohere-ai`), a per-agent `Allow: /` for the search and
user-initiated fetchers (`OAI-SearchBot`, `ChatGPT-User`, `Claude-SearchBot`,
`Claude-User`, `PerplexityBot`, `Perplexity-User`), and Cloudflare's
Content Signals preamble carrying the Article 4 reservation of rights.

In one sentence: **answer engines may fetch and cite these posts; model
trainers may not ingest them.**

The wildcard `Allow: /` stays. Nothing here restricts ordinary search — `Googlebot`
is untouched and inherits it.

## Why this shape

Previously the file was `User-agent: * / Allow: /` and a sitemap line. That
permitted training by default — not as a decision, but because nobody had made
one. Everything else in `docs/geo-basics-task.md` is wasted if a later
"tighten robots.txt" reflex silently reverses an unstated position.

Three axes, and they are independent:

- **Training** is the one thing given away for free and never recovered. The
  posts are war stories with numbers in them; that is the whole value, and
  donating it to a training corpus returns nothing.
- **Citation** is the opposite: being quoted in a ChatGPT or Claude answer with
  a link is the distribution this site wants. That is what `ai-input=yes` says.
- **Search** is untouched. `Google-Extended` is documented to be independent of
  it: *"Google-Extended does not impact a site's inclusion in Google Search nor
  is it used as a ranking signal in Google Search."*
  ([Google common crawlers](https://developers.google.com/search/docs/crawling-indexing/google-common-crawlers))
  Conflating the two is the common mistake and the reason this ADR exists.

## What it does not do

**`Disallow` is not enforcement.** Two of the three major user-initiated
fetchers are documented as ignoring it:

| Agent | Purpose | Honours robots.txt |
| --- | --- | --- |
| `GPTBot` | OpenAI training | yes |
| `OAI-SearchBot` | ChatGPT search index | yes |
| `ChatGPT-User` | live user-initiated fetch | **no** — *"Because these actions are initiated by a user, robots.txt rules may not apply"* |
| `ClaudeBot` | Anthropic training | yes |
| `Claude-SearchBot` | Claude search | yes |
| `Claude-User` | live user-initiated fetch | yes |
| `PerplexityBot` | Perplexity search index | recommends allowing; not explicitly stated |
| `Perplexity-User` | live user-initiated fetch | **no** — *"generally ignores robots.txt rules"* |
| `Google-Extended` | Gemini/Vertex training + grounding | yes |

Sources: [OpenAI bots](https://developers.openai.com/api/docs/bots),
[Anthropic crawler support](https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler),
[Perplexity bots](https://docs.perplexity.ai/guides/bots).

Those two are `Allow`ed here anyway, so the gap is moot — but it would not be
under a restrictive policy, and a future reader reversing this decision should
know the reversal is partly unenforceable.

**`Content-Signal` is not honoured by anyone in particular.** No model provider
has committed to reading it. It is a stated preference that Cloudflare frames as
an express reservation of rights under EU Directive 2019/790 Art. 4 — a
copyright posture, not a technical control. Kept because the legal framing is
the part that might matter, and because it says in one line what the per-agent
rules say in thirty.

**Unlisted agents are not covered.** New crawlers appear faster than this file
will be updated; they inherit the wildcard `Allow: /` with `ai-train=no`
attached. That is the intended failure mode — the signal covers what the
enumeration misses.

## What else was considered

**Everything open, explicitly.** What `docs/geo-basics-task.md` originally
proposed: name the agents, allow them all, record it as deliberate. Rejected
once the peer scan came back — of 40 blogs in `docs/research/peer-blogs.md`,
~11 have a deliberate AI policy and **every one of them restricts training**.
Nobody in this niche opted into training on purpose.

**`ai-input=no`** (Kent C. Dodds' position): search indexing only, no AI
answers. Coherent, and the maximally protective option. Rejected because it
contradicts the premise of the GEO work — opting out of the answer engines the
task exists to reach.

**Path-scoped training blocks** (Harry Roberts' `Disallow: /20*`, copied by
Manuel Matuzović): blocks training on dated post URLs while leaving the rest
open. Clever, and his own comment calls it *"a little brittle… TODO: Update when
I'm 109."* Rejected — this site's slugs are not date-prefixed, so the trick has
nothing to bite on, and `Content-Signal` expresses the same intent without the
hack.

**Copying `developerway.com` verbatim** — the closest peer to this site, and
where the `Content-Signal` shape came from. Not copied byte-for-byte: that file
sets `ai-train=no` on `GPTBot` *and* `Disallow: /` for it, which makes the
signal moot for the one agent it is aimed at. Shape taken, inconsistency not.

**`llms.txt`.** Declined, separately from this decision. Google documents that
*"You don't need to create new machine readable files, AI text files, or markup
to appear in these features"*
([AI features](https://developers.google.com/search/docs/appearance/ai-features)),
and peer adoption is 7 of 40 — skewed toward SEO-plugin defaults and
consultancies. See `docs/geo-basics-task.md`.

## What supersedes this

The IETF **AIPREF** working group is standardising exactly this: a usage-
preference vocabulary attachable via robots.txt and an HTTP `Content-Usage`
response header. As of 2026-09-18 both drafts — `draft-ietf-aipref-vocab-08`
and `draft-ietf-aipref-attach-05` — are Internet-Drafts at Proposed Standard,
**neither is an RFC**
([IETF datatracker](https://datatracker.ietf.org/wg/aipref/documents/)).
`Content-Signal` is Cloudflare's shipped approximation of it, and
contentsignals.org now describes itself as a guide to the AIPREF proposal.

When AIPREF lands, supersede this record rather than editing it. The likely
change is mechanical — `Content-Signal` becomes `Content-Usage`, the same
policy in the standardised spelling.
