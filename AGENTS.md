Personal blog.

Read first
@CONTEXT.md — what this repo is, and what blog post / dev bite / observatory mean
@CONVENTIONS.md — code, styling, testing, and commit conventions
@CONTENT.md — frontmatter, MDX structure, and writing rules
@docs/architecture/drivers.md — why the system has this shape; read before proposing a structural change
`docs/architecture/state.md` — where it actually stands against those drivers
`docs/architecture/decisions/` — the ADR log. Decisions are immutable; supersede, never edit.

Content lives in `src/content/{blog,dev-bites,observatory}/<slug>/index.mdx`. Routes live in `src/pages/`, and each section's components in the matching `src/<section>/components/` module.

Everything an agent runs is a skill in `.agents/skills/` (tool-agnostic), symlinked into `.claude/skills/`.

Vendored skills carry their upstream source in `skills-lock.json` or, for `/seo`, its `UPSTREAM.md`. Their `SKILL.md` stays verbatim; repo-specific rules go in a sibling `repo-context.md` (see `seo/`).

Rules
Never rewrite content without explicit approval — propose a diff, do not apply it silently.
When editing MDX, preserve all existing component imports and structure.
