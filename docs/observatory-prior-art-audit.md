# Observatory — prior art audit

Research pass on how others run tracking-note content. Companion to
`observatory-skill-design.md`; that document holds the proposal, this one holds
the evidence it should be checked against.

Researched 2026-09-17. Every claim below names its source.

## Direct answer

The observatory has independently reinvented a **technology radar**, and the
established version of it answers three questions the repo currently leaves
open: what the statuses mean, what cadence keeps them honest, and what happens
to an entry when the tool stops being interesting. The single largest gap is
that Thoughtworks' model is built around **movement between rings**, while the
observatory's `status` is a static label — and a note whose status has never
moved carries no information about whether it was re-checked or merely ignored.
On the SEO side, Google's documented position is narrower than the SEO-vendor
consensus, and it happens to favour how the observatory already works.

## 1. Established models

### Thoughtworks Technology Radar

Four rings, published **twice yearly** ([Thoughtworks Radar
FAQ](https://www.thoughtworks.com/radar/faq)):

| Ring | Meaning |
|---|---|
| **Adopt** | Proven and mature; seriously consider using |
| **Trial** | Ready for use, not as completely proven; worth production testing |
| **Assess** | Look at closely, not necessarily trial yet |
| **Hold** | "Don't start anything new with this technology" — no harm on existing projects |

Two mechanics matter more than the ring names:

**Blips are in motion.** "The default rule is that blips only appear on the
Radar for one edition unless they move rings" (FAQ). The unit of publication is
a *change in position*, not an entry. An entry that hasn't moved isn't
re-published.

**Fading is explicit and is not a verdict.** Items that haven't moved recently
fade "to make room for new items… not a reflection on their value but rather on
their limited Radar real estate" (FAQ). Items can be "re-blipped" if discussion
resumes ([Build your own Technology
Radar](https://www.thoughtworks.com/insights/blog/build-your-own-technology-radar)).

**Hold ≠ Superseded.** Hold means don't start anything *new*; existing use is
fine. The observatory's `Superseded` on Playwright CT is close to this, and its
recommendation line ("just use Vitest Browser") is exactly what Hold implies.

### Personal radars

The build-your-own guide explicitly endorses individual radars: treat your
technology portfolio like a financial one, "diversify strategically, balancing
'cool factor' with career marketability and job demand." Recommended cadence for
a self-built radar is **annually at minimum, twice yearly preferred**.

It also offers a bluntness test worth stealing — *Mason's Razor*: "for any
technologies in the adopt ring, I will make fun of you at the pub if you aren't
using them." A ring you can't defend that strongly is the wrong ring.

### Digital gardens

A parallel tradition with a different axis. Maggie Appleton's
[evergreens](https://maggieappleton.com/evergreens) and Andy Matuschak's public
notes use **seedling → budding → evergreen** to signal *the note's own maturity*,
not the subject's.

This is the distinction the observatory currently collapses. `status` describes
the **tool**. Nothing describes the **note** — how confident it is, how recently
it was verified. Those are independent: a confident, freshly-checked note about
an experimental tool is a different object from a two-year-old guess about the
same tool, and today they render identically.

### Gartner hype cycle

Found no evidence of individual developers adapting it for tracking notes, and
it fits poorly: it describes *collective market sentiment* over time, not a
personal adopt/reject judgment. Not recommended. (Assessed from the radar
literature above; no primary Gartner source consulted, as it isn't a live
candidate.)

## 2. Keeping notes current

**Cadence, from the radar practice:** twice yearly for a team radar, annually as
the floor for a personal one. Four notes is well inside manual territory.

**The maintenance mechanism worth copying is the decision trail.** Both the
Thoughtworks process and the community `tech-radar` skill (below) record *every
ring movement with a date and a rationale*. The observatory has no equivalent:
`last_updated` moved on two notes and Playwright CT reached `Superseded`, but
what was re-checked, against what version, and why, is unrecoverable. A
`status` field with no history cannot distinguish "verified, still
Experimental" from "never looked at again."

**On stabilisation:** the radar fades a blip that stops moving. The observatory
cannot, and shouldn't — its URLs are indexed and the *published URLs don't
break* driver forbids removal. The equivalent is a terminal status plus a
recommendation, which is what the Playwright CT note already does. The gap is
that this is one note's improvisation rather than a documented rule.

## 3. Existing agent skills

One relevant public skill: **`tech-radar`** by mohitagw15856, listed on [Claude
Skills Hub](https://claudeskills.info/skills/mohitagw15856/pm-claude-skills/tech-radar/).
It generates a radar document across the four quadrants and rings, and — the
relevant part — explicitly encodes maintenance: a bi-annual review cadence, a
continuous nomination channel, a decision trail tracking every ring movement
with dates and rationales, evidence thresholds for ring changes, and governance
for approving them.

It is team/enterprise-shaped (architecture review groups, nomination queues) and
generates *one radar document*, not per-tool pages. Not adoptable as-is. But it
independently arrives at the same decomposition as
`observatory-skill-design.md`'s: nomination ≈ `observatory-triage`, ring-change
criteria ≈ `observatory-recheck`, decision trail ≈ the missing history.

Found no public skill for maintaining *periodically-revised individual pages*,
which is the observatory's actual shape. The `observatory-*` split appears to be
new work.

## 4. SEO of dated, frequently-updated pages

Google's documented position ([Publication
dates](https://developers.google.com/search/docs/appearance/publication-dates)):

- Show a **prominent, user-visible date**, clearly labelled — "Posted Feb 4,
  2019" or "Last updated: Feb 14, 2018."
- Use `datePublished` and/or `dateModified` in structured data.
- **Visible and structured dates must match.**
- **Minimise other dates on the page** that could confuse which is the real one.
- Don't use future dates or the date of events described in the content.

On freshening, Google's guidance is that a substantially changed article can
reasonably take a fresh date, but not to "artificially freshen a story without
adding significant information or some other compelling reason," and not to add
or remove content primarily to seem fresh ([Help Google Search know the best
date for your web page](https://developers.google.com/search/blog/2019/03/help-google-search-know-best-date-for),
via Search Central).

**Three consequences for the observatory, and one is a live bug risk:**

The notes render `**Status:** Experimental (since 2022)` and
`Technical Preview (since October 2025)` in the body. Those are dates in the
content, and Google's own guidance is to minimise page dates that could be
confused with the publication date. With `date`, `last_updated`, and a prose
date all on one page, the visible-date signal is ambiguous. Worth checking what
`[slug].astro` actually renders before adding more.

Second: the *published URLs don't break* driver and Google's guidance agree that
a superseded note is rewritten in place, never deleted-and-redirected — Google
specifically warns against creating a slightly-updated story, deleting the old
one and redirecting.

Third: an `observatory-recheck` that bumps `last_updated` after verifying
nothing changed is exactly the "artificial freshening" Google names. The skill
needs a genuine no-op path — verified, nothing moved, date untouched. This
cuts against the SEO-vendor advice below.

**Where secondary sources disagree with Google.** SEO vendors push a much more
aggressive freshness model — [Ahrefs](https://ahrefs.com/blog/evergreen-content/),
[MarTech](https://martech.org/why-evergreen-content-expires-faster-in-an-ai-search-world-and-what-to-do-about-it/)
and [Authority Tech](https://authoritytech.io/blog/content-freshness-seo-ai-2026)
argue evergreen content decays faster under AI search, recommending assumed
90-day shelf lives and scheduled audits, while also conceding that cosmetic
`dateModified` bumps get discounted. These are vendor blogs with an interest in
content-refresh services, and Google documents no such decay timer. Treating the
90-day figure as a rule would be following marketing advice over the primary
source. The one point where both agree, and which is worth keeping: a refresh
should change something a reader would actually notice.

## 5. Signalling "this is now wrong"

The radar's answer is that a stale entry is *unpublished by omission* — fading
costs nothing because the current radar is a snapshot. The observatory can't do
this; every note is a permanent indexed URL, so staleness is visible rather than
silently dropped. That makes an explicit freshness signal load-bearing here in a
way it isn't for a radar.

Thoughtworks handles its own archive with a blanket disclaimer: archived
editions stay available but "we're not updating them," and advice may be
outdated (FAQ). A per-note equivalent — a visible "last verified" distinct from
"last edited" — is the digital-garden move applied to the observatory's problem,
and is the concrete thing worth taking from section 1's note-maturity axis.

## Tasks this generates

Each is a change to `observatory-skill-design.md` or the schema, not an
implementation.

1. **Decide whether `status` should move.** Radar blips carry meaning by
   changing rings; the observatory's statuses have moved exactly once. If
   movement is the signal, `observatory-recheck` should record a ring change or
   an explicit no-change, and the note should show that history.
2. **Separate note-confidence from tool-status.** Today `status` describes the
   tool and nothing describes the note. Decide whether a "last verified" is
   worth a field, and resolve this against the open question on `status_since`.
3. **Audit rendered dates before adding fields.** Check what
   `src/pages/observatory/[slug].astro` emits visibly and in JSON-LD against
   `date`, `last_updated`, and the prose "since" in the Status line. Google's
   guidance is to minimise competing dates; the observatory currently has three.
4. **Give `observatory-recheck` a no-op path.** Verified-unchanged must leave
   `last_updated` alone. Bumping it is the freshening Google names.
5. **Document the terminal-status rule.** Playwright CT's recommendation line is
   an undocumented convention that matches Hold's semantics. Promote it to a
   rule in `observatory-supersede`, including rewrite-in-place, never delete.
6. **Decide against the hype cycle explicitly**, so it isn't re-proposed.
