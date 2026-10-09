---
name: draft-article
description: Write a blog post with the author, section by section, from a compass task to shipped. Use when the user starts or resumes drafting a blog post ("/draft-article <compass task path>" or "/draft-article <slug>"). Not for dev bites or observatory notes, and not for deciding what the post argues — compass owns that.
---

# Draft article

The author writes the post. You propose plain first versions, write them to the file, and fix them from the author's corrections. Read `CONTEXT.md` and `CONTENT.md` first.

The idea, angle and value proposition are settled in compass before this starts. If the compass task leaves the post's argument open, stop and say so. Don't brainstorm it here.

## Arguments

- **Compass task path** — first run. Read only that file, through the `repo-router` rules: nothing marked PRIVATE gets copied into the post.
- **Slug** — resume. Read `src/content/blog/<slug>/index.mdx`. The note under the `h1` points back to the compass task.

## State lives in the MDX

There is no task doc. The draft is the whole state:

- Under the `h1`, a visible note: the compass task path and the post-wide rules ("say organization, never client").
- Under each unwritten heading, 1-2 visible sentences on why the section exists, plus anything still open.
- A section with body text is written. Resume at the first heading that still has only its note.

Write straight into the MDX. The author reads it on the dev server, not in chat. Notes, questions and open facts go in chat.

## Steps

Each step that needs a decision from the author runs as a `/grill` round: one load-bearing question at a time, your recommendation under it.

1. **Overlap.** Grep `src/content/` for the post's key concepts. An existing post that covers one gets linked, not retold.
2. **Title, then description, then excerpt**, one at a time. Limits are in `CONTENT.md`. Check the title against the site's existing titles for consistency ("30+ apps" is a series signature). Run `/no-ai-slop` on the candidates.
3. **Featured?** If `article_type: featured`, the home page lists every featured post. Keep it to three: ask which one leaves.
4. **Skeleton.** Create the MDX with frontmatter, imports, the `h1` note, and every `h2` with its why-note. No body yet.
5. **Sections, in order.** For each:
   - Propose something simple to iterate on, and write it to the file.
   - The author corrects it in plain words. If they don't understand a sentence, the sentence is wrong.
   - Run `/no-ai-slop` on that section only.
   - End the turn with: `Next: <section>. Resume with /draft-article <slug>.`
6. **Ship.** `/content-review`, then `/seo`. Add cross-links from related posts and set their `last_updated`. Set `date` to the publish day. Run `pnpm build`.

## Writing rules from past drafts

- Numbers from memory are magnitudes: "roughly 4-6 a year", not "every 2-3 months".
- State how our setup behaves, not how the tool works. Config defaults and internals change within a release or two, and the post goes wrong silently. Link the docs.
- Fit prior-art links into the sentence that uses them. No reference list.
- NDA work: roles and magnitudes, never names. `.agents/skills/content-review/references/case-study-shape.md` § Under NDA.

## Checking technical claims

Check every technical claim before it goes in. Official docs first, and cite them. When the docs leave the behaviour open, build a throwaway repro in the scratchpad that matches the author's setup as they describe it. Report what ran, the real output, and what the repro does not cover. Ask the author how their setup differs before calling a claim confirmed.
