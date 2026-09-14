Personal blog.

Read first
@CONTEXT.md — what this repo is, and what blog post / dev bite / observatory mean
@CONVENTIONS.md — code, styling, testing, and commit conventions
@CONTENT.md — frontmatter, MDX structure, and writing rules
@docs/architecture/drivers.md — why the system has this shape; read before proposing a structural change
`docs/architecture/state.md` — where it actually stands against those drivers
`docs/architecture/decisions/` — the ADR log. Decisions are immutable; supersede, never edit.

Content lives in `src/routes/{blog,dev-bites,observatory}/<slug>/index.mdx`. Section logic lives in the matching `src/<section>/` module.

Everything an agent runs is a skill: `/content-review`, `/seo`, `/tech-audit`. They live in `.agents/skills/` (tool-agnostic) and are symlinked into `.claude/skills/`.

`/seo` is vendored verbatim from addyosmani/web-quality-skills — read its `UPSTREAM.md` before changing it. Repo-specific SEO rules go in `.agents/skills/seo/repo-context.md`, never in `SKILL.md`.

Rules
Never rewrite content without explicit approval — propose a diff, do not apply it silently.
When editing MDX, preserve all existing component imports and structure.
