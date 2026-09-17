---
name: content-review
description: Editorial review of a post that rules can't enforce — restated documentation, teaser excerpts, preamble paragraphs, thin sections, walls of text, missing code. Use when asked to review, critique, or edit a draft before publishing.
---

# Content review

Editorial pass over a blog post, dev bite, or observatory note. Seven checks, all judgment calls.

Read `CONTEXT.md` (niche, voice, content types) and `CONTENT.md` (writing rules) before the first file.

## Not in scope

| Concern | Owner |
|---|---|
| Frontmatter fields, lengths, date format | `CONTENT.md` |
| JSON-LD, `og:*`, title/description keywords, generic heading names | `/seo` + `.agents/skills/seo/repo-context.md` |
| `id`/`linkLabel` on headings, raw markdown `#`, skipped levels | `/seo`, `tests/a11y-per-page.spec.ts` |
| Build, types, lint, format | pre-commit hook, CI |

Do not re-check these. If something here is obviously broken, name it in one line and move on — don't audit it.

## Usage

```bash
claude "/content-review src/routes/blog/my-new-post/index.mdx"
claude "/content-review all blog posts"
```

## Checks

### 1. Restated documentation

The rule that matters most and the one nothing else catches. `CONTENT.md` holds the Don't/Do table — apply it.

Flag a passage that summarises what a tool does when a link would do. Specifically:
- A bullet list of a command's flags or behaviour → should be the command's actual output
- Vague relative claims ("it runs a few times per candidate") → should be the author's real numbers
- Explaining why a bug happens inside a tool's source → should link the issue and say whether it's fixed
- A reproduced config reference table → should be the config actually shipped

Version-specific facts are fine **in Context**, where the version is stated. Flag them elsewhere.

Ask of every paragraph: could this have been written without having done the work? If yes, flag it.

### 2. Excerpt stands alone

It must read as a summary, not a teaser. "In this article we will…", "Find out how…", "Here's what I learned…" all fail. It should carry the takeaway, so it works as the only thing a reader sees in a list or a feed.

### 3. First paragraph under each h2

Direct value, not throat-clearing. Restating the heading as a sentence, announcing what the section will cover, or a general observation about the industry — all preamble. The reader should get something in the first sentence.

### 4. Thin sections

A heading with under ~2 sentences beneath it. Either it needs content or it shouldn't be a section. Say which.

### 5. Walls of text

~200+ words with no subheading, list, or code block. Judge whether it actually reads as a slab — a tight argument that runs long is fine, a meandering one isn't. Don't flag on word count alone.

### 6. Missing code

This blog is frontend architecture and DX. A post with no code example is unusual and usually means a claim is being asserted rather than shown. Flag it unless the piece is genuinely non-technical — a career or process post doesn't need code.

### 7. Case study shape

Only for a post that narrates work the author actually did — a migration, a rollout, a decision that went wrong, years spent maintaining something. Skip it for reference and overview posts; they never claimed to be case studies.

Read `references/case-study-shape.md` before applying this one. The short version — the post must leave the reader knowing:

- the constraints in force before the solution appears
- why this approach, and what was rejected
- which calls were the author's own, and which weren't
- what actually changed, in numbers or a named consequence

Flag the axis that's missing, not the heading. A narrative that carries all four is stronger than a checklist that answers them.

The two that fail most often: **no rejected alternative** (one solution presented as the only one — there was no decision to learn from), and **asserted impact** ("this improved DX" is an opinion of your own work, not an outcome).

Most of this work is under NDA. That blocks the employer, product, client and internal system names — it does not block ratios, magnitudes, or before/after deltas. Ask for the de-identified number ("the surface roughly quadrupled over five iterations"), never the absolute. An irreversible consequence — what is now impossible, what is still running years later — counts as impact on its own where no number was ever the author's to publish. Vagueness is still a flag: "significantly larger" is the absence of a number, not a redacted one.

## Output

Per file, only what fails. Cite `path:line`. Skip a check that passes rather than printing a checkmark for it — a clean review is a short review.

```
## src/routes/blog/design-system-pitfalls/index.mdx

RESTATED DOCS
  L42-58 — bullet list of Storybook CLI flags. Link the docs; show the config you shipped instead.
  L91 — "builds get noticeably slower at scale". Your numbers or cut it.

EXCERPT
  Teaser, not a summary: "Find out what went wrong with our design system."
  → "Three years in, our design system had 40 unused components and a 12-minute build. Here's what caused it."

FIRST PARAGRAPH
  L67 — restates the h2 before saying anything. Cut the first sentence; start at "The token layer was the problem."

CODE
  No code examples in a post about component API design.

CASE STUDY SHAPE
  No rejected alternative anywhere. The token layer is presented as the only
  option — say what you considered instead and why it lost.
  L112 — "this made the system much healthier" asserts impact. 40 unused
  components down to what? Build time from 12 minutes to what?
```

## Rules

Propose diffs, never apply them. `AGENTS.md`: never rewrite content without explicit approval. Quote the replacement so it can be accepted or rejected — a flag without a suggested fix is half a review.

Be specific. `path:line`, never "some sections".

The author's voice wins. `CONTEXT.md` calls it direct, experience-backed, no filler. Don't sand that into neutral technical prose — if a sentence is blunt on purpose, leave it.

Two suggestions maximum per flag. More is noise.
