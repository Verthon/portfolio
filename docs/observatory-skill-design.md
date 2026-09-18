# Observatory — how I'd shape the skills around it

Proposal, not a decision. Nothing here is implemented.

Prior art this should be checked against: `observatory-prior-art-audit.md` —
how Thoughtworks' Technology Radar, digital gardens, and Google's date guidance
handle the same problems. It generates tasks against this document, tracked
below.

## Why this document exists

Asked whether Sonda deserved an observatory note, I checked its release cadence,
found the author had only used it for one commit, and recommended waiting for
"real data — a regression it caught, a reading that was wrong."

That is the wrong answer, and it came from reading `CONTENT.md` correctly.
Its rule — *write what the docs can't: your own numbers, the trade-off you hit* —
is a rule for posts that teach. An observatory note doesn't teach. It records a
judgment about a tool **before** adoption, so that "no production data yet" is
the normal condition of a note, not a reason to delay one.

Nothing in the repo says that. `CONTEXT.md` gives the observatory three
sentences; `content-review` claims to cover notes and then applies post-shaped
checks to them. An agent following the docs lands where I landed.

## What the repo already encodes, unwritten

Four notes exist. They agree more than anything documents.

**The shape is fixed.** Every note uses the same four h2s, in the same order:

| Section | Present in | Job |
|---|---|---|
| `overview` | 4/4 | What it is, in bullets. Not a tutorial. |
| `known-issues-and-tradeoffs` | 4/4 | What bites. The reason the note exists. |
| `adoption-considerations` | 4/4 | New projects vs existing projects, split. |
| `resources` | 4/4 | Issues and discussions, not just the docs homepage. |
| `performance` | 1/4 | Optional. Appears only where a number existed. |

That is as rigid as the dev bite's Context/Problem/Solution — which *is*
documented. The observatory's shape is not.

**The body `**Status:**` line is not the frontmatter enum.** It is the enum plus
the evidence:

- `Experimental (since 2022)` — frontmatter says only `Experimental`
- `v0.3.x, published to crates.io and npm`
- `Technical Preview (since October 2025)`

The "since" is the signal. `Experimental` is a label; *experimental for four
years* is a finding. The enum cannot hold it and the schema does not ask for it.

**A recommendation line appears once**, on the `Superseded` note:
`**Recommendation** Just use the stable Vitest Browser`. That reads like a rule
that emerged in practice and was never generalised — a note that says don't
adopt owes the reader what to use instead.

**Revisions happen and leave no method behind.** `last_updated` moved on two
notes (Base UI 2025-02-06 → 2026-08-15, Playwright CT 2025-01-06 → 2025-10-28)
and Playwright CT reached `Superseded`. Git history was flattened by the
migration, so what was re-checked, and against what, is gone.

## The mental model

**A note is a position with an expiry date, not an article.**

A blog post is finished when published. A note is a claim about a moving target
that is wrong by default over time — the tool ships 1.0, or stalls, or gets
replaced. The note's value is that it was written down early enough to be
checked against later.

Three consequences:

1. **No adoption required.** Tracking a tool you rejected is as valid as tracking
   one you shipped. The judgment is the artifact.
2. **Staleness is the failure mode**, not thinness. A four-bullet note that is
   current beats a detailed one describing a version nobody runs. This inverts
   the post rules, where thin is the problem.
3. **Being wrong later is success.** A note that said "wait" about a tool that
   went stable did its job. Updating it is the point, not an embarrassment.

Against the drivers: notes serve *the idea-to-published loop stays cheap* — they
are the cheapest thing on the site to produce and the most expensive to let rot.
The *published URLs don't break* driver applies in full: a note's slug is as
permanent as a post's, and `Superseded` is a status change, never a deletion.

## What earns a note

The bar is **a decision a reader would otherwise make blind**. Two parts, both
required:

- **Unsettled.** Pre-1.0, technical preview, experimental, or stable-but-stalled.
  A tool everyone already uses has nothing to track.
- **You formed a position.** Evaluated, adopted, or rejected — with a reason.
  Repeating a README is not a position.

Explicitly *not* required: production data, a benchmark, a war story. Those
belong to posts. Demanding them here is the error this document exists to fix.

**Sonda against the bar:** 0.14.0, pre-1.0, ~2 years old, 641 of ~720 commits
from one maintainer, but pushed six days ago and 0.11 → 0.14 in seven months.
Unsettled, yes. Position: it is in `astro.config.mjs`. The note writes itself
from what is already known — single-maintainer bus factor, pre-1.0 API, the
config actually shipped. Nothing is missing except a `performance` section that
was always optional.

(The framing that prompted the question — "no release in 2 months, no 1.0 in
2 years" — is mostly not supported by the repo. Active minor releases with no 1.0
is a different signal from four years of silence, which is what `Superseded`
meant for Playwright CT.)

## Skills as actions

The correction that shapes the rest: a skill is **a thing a human does**, with
steps and rules, fireable when needed. Not a topic folder. So the shared
understanding above is *reference material the actions read* — it is not itself
a skill.

Proposed, `observatory-*` prefix:

| Skill | The human action | Fires when |
|---|---|---|
| `observatory-triage` | "Is this worth tracking?" | A tool crosses your path |
| `observatory-draft` | "Write the note." | Triage said yes |
| `observatory-recheck` | "Is this still true?" | Periodically, or on release news |
| `observatory-supersede` | "This is over." | Tool stabilised, died, or lost |

`observatory-recheck` is the one you named, and the one with no current home.
Its steps are mechanical enough to be worth encoding: pull current version and
last release date, diff against the note's claims, re-verify each
`known-issues-and-tradeoffs` bullet (fixed issues are the usual rot), decide
whether `status` still holds, then update `last_updated` — and only
`last_updated`, never `date`, which is the publish date and feeds the sitemap.

`observatory-supersede` is separate from `recheck` on purpose: it is the
irreversible one. It touches an indexed URL, and per the *published URLs don't
break* driver the note is rewritten in place and never removed. It also owes the
reader the recommendation line — the rule the Playwright CT note discovered.

Shared reference, read by all four rather than duplicated:
`.agents/skills/observatory-*/` pointing at one
`references/observatory-model.md` — the mental model, the bar, the four-section
shape, and the Status-line convention.

## What content-review must stop doing

Its "Not in scope" table needs an observatory row, because three of its seven
checks are actively wrong on a note:

- **Check 1, restated documentation** — "could this have been written without
  doing the work?" For a note, often yes, legitimately.
- **Check 4, thin sections** — `overview` is bullets by design.
- **Check 6, missing code** — a note frequently has none and should not.

Checks 2 (excerpt stands alone), 3 (no preamble) and 5 (walls of text) still
apply. Either scope the skill to posts and defer notes to `observatory-*`, or
branch it on `src/content/observatory/`. Deferring is cleaner: two content
models in one skill is what produced the bad Sonda call.

## Open questions

- Does `date` mean first published or first evaluated? They differ for a tool
  tracked before writing.
- Should `status` carry the "since" the body line already encodes — a
  `status_since` field — or does the enum plus prose stay sufficient?
  **Resolve together with task 2 and 3 below** — the audit found three competing
  dates already rendering, so this is not an isolated schema choice.
- Is `observatory-recheck` manual, or worth a scheduled run across all notes?
  Four notes is manual territory; twenty is not. Radar practice puts the floor
  at annually, twice-yearly preferred (see audit §2).
- Do `blog-*` and `dev-bite-*` follow the same action decomposition, or is the
  observatory the only section whose content needs periodic maintenance?

## Tasks from the prior-art audit

From `observatory-prior-art-audit.md`. Open — none actioned.

1. **Decide whether `status` should move.** Radar blips carry meaning by
   changing rings; the observatory's statuses have moved once in four notes.
   If movement is the signal, `observatory-recheck` records a change or an
   explicit no-change. (audit §1, §2)
2. **Separate note-confidence from tool-status.** `status` describes the tool;
   nothing describes the note's own freshness. The digital-garden maturity axis
   applied here. (audit §1, §5)
3. **Audit rendered dates before adding fields.** `date`, `last_updated` and the
   prose "since" in the Status line are three competing date signals on one
   page; Google documents minimising these. Check `[slug].astro` and the
   JSON-LD. (audit §4)
4. **Give `observatory-recheck` a no-op path.** Verified-unchanged must leave
   `last_updated` alone — bumping it is the artificial freshening Google names.
   This contradicts the standard SEO-vendor advice, deliberately. (audit §4)
5. **Document the terminal-status rule.** Playwright CT's recommendation line
   is an undocumented convention matching the radar's Hold semantics. Promote it
   into `observatory-supersede`: rewrite in place, never delete, always name the
   alternative. (audit §2, §5)
6. **Reject the Gartner hype cycle explicitly** so it isn't re-proposed — it
   models market sentiment, not a personal adopt/reject call. (audit §1)
