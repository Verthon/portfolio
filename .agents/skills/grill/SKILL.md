---
name: grill
description: Interview the user decision by decision before building anything — a process, a skill, a page, a post skeleton. Use when the ask is underspecified, or when the output would otherwise land as a wall of text the user has to accept on faith.
---

# Grill

Interview the user relentlessly until you reach a shared understanding. Map this as a design tree: every decision branches into the decisions that hang off it.

Read `CONTEXT.md` first — niche, voice, and what blog post / dev bite / observatory mean. Most questions here are about content, and asking one that `CONTEXT.md` already answers wastes a round.

## Rounds

The frontier is every decision whose prerequisites are already settled: the questions you can ask now without guessing at answers you haven't heard yet.

Size each round by weight, not by frontier size. A question is **load-bearing** if the answer changes what you'd ask next — ask it alone. A question is **fill-in-the-blank** if it only fills a slot in a decision already made — batch up to three. Never more than three, and never mix a load-bearing question into a batch.

A question whose answer depends on another question still open in this round belongs to a later round.

Format a round like so:

❓ **Q1** - **<question title>**: <question body, might be multiple paragraphs, including multiple choices>

➡️ <your recommended answer>

---

❓ **Q2** - **<question title>**: <question body, might be multiple paragraphs, including multiple choices>

➡️ <your recommended answer>

Then wait. Each round the user answers reshapes the tree: settled decisions push the frontier outward. Recompute and ask the next round.

## Grill, don't transcribe

Recording the answer is not the job. Push back when:

- The answer contradicts something the user said earlier in the session. Name both, ask which holds.
- The answer conflicts with a driver in `docs/architecture/drivers.md`. Name the driver. The user may override it — that's their call — but not silently.
- The answer is best-practice talk rather than a want: "scalable", "clean", "modern", "the standard approach". Ask: *if you didn't have to justify this to anyone, what would you actually want?*

This is a solo blog. Nobody else tells the user an idea is thin, so an interview that only collects answers inherits that blind spot.

## Don't bury the user

The output is built incrementally, not delivered at the end. When a decision settles, show the lines it produces — the actual text, not a promise to write it later. The user should have read the whole artifact by the time it exists, because they watched each piece appear.

**Never emit more than you have been asked a question about.** A section with no answered question behind it is an assumption, which means a question you skipped. Go ask it.

If a question needs a term the user would have to nod along with, that's your failure. Re-ask in plain language. The user saying "I don't understand the question" is a valid answer and never a reason to move on.

## Facts

Finding facts is your job, never the user's. When a frontier question needs a fact from the environment (filesystem, tools, existing content), go find it; don't ask for anything you could look up. Don't block on it: a running exploration is an unsettled prerequisite, so only the questions downstream of it wait. Ask the rest of the frontier now.

## Done

The frontier is empty: every branch visited, nothing silently assumed. Close with a restate:

- **Outcome** — what gets built
- **Why now** — what prompted it
- **Success** — how we know it worked
- **Constraint** — the binding limit
- **Out of scope** — what this explicitly does not do

The **Out of scope** line is not optional; silent disagreement about non-goals is half of misalignment.

The decisions are the user's. Do not act on the restate until they confirm it.
