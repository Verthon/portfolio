# Observatory

Rules for observatory notes. The root `CONTEXT.md` defines the three content
types; this is the one place the observatory's own rules live.

## What a note is

A tracking note about a web tool that is **not yet settled** — the API, the
roadmap, or the maintenance story is still moving. It records status, trade-offs
and adoption risk.

Not a tutorial. A reader arrives asking "can I use this yet, and what will it
cost me", not "how do I use this".

## Status

`status` is required frontmatter, and the vocabulary is closed —
`src/content.config.ts` enforces it:

`Experimental` · `Alpha` · `Beta` · `Technical Preview` · `Stable` · `Superseded`

`Stable` is an end state, not an exit. A note that reaches it keeps its slug and
stays published: the arc from experimental to stable is the value, and the URL is
the one output that can't be taken back (`docs/architecture/drivers.md`, URL
stability). Stable notes are checked less often, never archived — a settled tool
can un-settle.

`Superseded` means the tool lost, stalled, or was replaced. Say by what.

The body repeats the status on its own line, and carries **more** than the
frontmatter does:

```mdx
**Status:** Technical Preview (since October 2025)
**Status:** v0.3.x, published to crates.io and npm
```

Frontmatter holds the stage word for filtering and rendering. The body line adds
the version, the date it entered that stage, or where it ships. The stage word
must agree across both; the extra detail is the point of the body line, not drift.

A `**Recommendation**` line may follow the status when there is a better option
today — name it and link it (see `playwright-component-testing`).

## Frontmatter

Everything in the root `CONTENT.md`, plus:

- `status` — required, from the list above
- `short_preview` — optional, one line for the index. States the stage and the
  verdict: `"Stalled for ~4 years, no roadmap. Prefer Cypress CT or Vitest Browser"`
- `last_updated` — carries real weight here. It is the note's expiry date, and
  every claim in the body is read as true *as of* that date. Move it whenever
  you touch a fact.

## Body shape

The usual shape, and the default to reach for:

1. `**Status:**` line (+ optional `**Recommendation**`)
2. **Overview** — what it is and where it stands
3. **Known Issues & Tradeoffs** — what bites you today
4. **Adoption Considerations** — usually split **New Projects** / **Existing Projects**

Deviate when the tool warrants it. A section that has nothing real in it is worse
than a missing one.

Bullets over prose. A note is scanned by someone deciding whether to spend a week
on something.

## Claims rot

Every note is wrong eventually — that is the cost of tracking unsettled things.
Two ways it happens:

- **Dated claims.** "Most likely stable this year", "since 2022", "shipped last
  month" all expire silently. Prefer an absolute date, or accept that the claim
  needs revisiting.
- **Silent releases.** Upstream ships and nothing here notices. Link the issue or
  release you're relying on so the claim can be re-checked against its source.

`/observatory-check` verifies one note against both.
