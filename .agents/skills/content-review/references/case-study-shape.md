# Case study shape

Reference for check 7. Adapted from a UX-design comparison of junior vs. senior
case studies — the axis transfers to engineering war stories unchanged, because
both are the same artifact: a claim that you can be trusted with a decision.

The failure is not bad writing. It is a post that documents *what was built*
where the reader needed *why it was built that way and what it cost*.

## The five axes

| Axis | Weak | Strong |
|---|---|---|
| **Opening** | Starts with the solution. The finished architecture, the final config, the screenshot. | Starts with context. The problem, the constraints in force, the outcome — before any implementation. |
| **Explanation** | What was made. Flows, structure, the shape of the thing. | Why it was made. Priorities, what was investigated, the alternatives, the trade-offs taken. |
| **Ownership** | Lists activities. "We did X, then Y." Contribution is unattributable. | States the author's own call, and where it ends. What they decided vs. inherited vs. lost the argument on. |
| **Impact** | Describes the work. Ends when the thing ships. | Connects the work to what changed. Numbers, or a named consequence. |
| **What it proves** | Execution. Polish, completeness, that it was delivered. | Judgment. That the decisions were thoughtful, collaborative, revisable. |

## Applying it

The axes are not all equally cheap to fix, and they are not equally often
wrong. In practice:

**Alternatives is the most common miss.** A post that presents one solution
reads as the only solution. The reader learns nothing about the decision,
because a decision requires a rejected option. If the post names no path not
taken, the trade-off section is missing even when a "Trade-offs" heading exists.

**Impact is the most common fake.** "This improved developer experience" is not
impact; it is the author's opinion of their own work. Impact is a number, a
behaviour that changed, or a problem that stopped happening. `CONTENT.md`
already demands the author's real numbers — this is the same rule applied to
the outcome rather than the method.

**Ownership is the axis the author resists.** Writing "I argued for this and
was overruled" or "this was already decided when I joined" feels like
diminishing the work. It does the opposite: an unattributed "we" makes every
claim in the post unverifiable. Scope-honesty is what makes the rest credible.

## Not a template

Do not flag a post for lacking a section named "Constraints" or "Alternatives".
The axes are things the reader must come away knowing, not headings. A war
story that carries all five inside a narrative is stronger than one that
answers them as a checklist — and the checklist version is itself a failure
mode, since it reads as a form filled in rather than a decision recounted.

The order in the table is also not a required running order. Starting with
context means the reader knows the stakes before the solution, not that
paragraph one is titled "Context".

## Under NDA

Most of this work happens under an agreement that forbids naming the employer,
the product, the client, or the internal systems. The axes survive that intact —
what the NDA removes is the *identifying* content, not the *quantitative* content.
Those get confused, and the result is a post that retreats into "significantly
improved" because the author assumes every number is off-limits.

**Blocked:** employer and product names, client identities, headcount, revenue,
internal service and repo names, anything that identifies the org or lets a
reader triangulate it.

**Not blocked:** ratios, magnitudes, order-of-magnitude counts, before/after
deltas on your own work, the shape of a decision, who overruled whom stated as
a role.

So the de-identified form is the target, not an exemption from it:

| Instead of | Write |
|---|---|
| "47 exports at v1, 210 at v5" | "the surface roughly quadrupled over five iterations" |
| "deployed to Acme's 34 storefronts" | "thirty-plus applications, none of which we owned" |
| "it improved developer experience" | *(still a flag — this is vague, not redacted)* |

The failure mode this creates: an author reaches for vagueness when they meant
to redact. "Significantly larger" is not an NDA-safe version of a number. It is
the absence of one. Flag it the same as any other asserted impact — the
suggested fix is the de-identified magnitude, not the absolute.

Two things NDA genuinely does remove, and the substitutes that work:

**Absolute outcome numbers you never owned.** You may not know or may not be
allowed to state the business result. Substitute the irreversible technical
consequence, which is yours to report: what is now impossible, what is still
running years later, what a later project got blocked on.

**Attribution by name.** Use roles. "The architecture group", "the domain team",
"a stronger organizational position" — all carry the ownership axis without
identifying anyone.
