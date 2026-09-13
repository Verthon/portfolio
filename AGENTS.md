Personal blog.

Read first
@CONTEXT.md — what this repo is, and what blog post / dev bite / observatory mean
@CONVENTIONS.md — code, styling, testing, and commit conventions
@CONTENT.md — frontmatter, MDX structure, and writing rules
@docs/architecture/drivers.md — why the system has this shape; read before proposing a structural change
`docs/architecture/state.md` — where it actually stands against those drivers
`docs/architecture/decisions/` — the ADR log. Decisions are immutable; supersede, never edit.

Content lives in `src/routes/{blog,dev-bites,observatory}/<slug>/index.mdx`. Section logic lives in the matching `src/<section>/` module.

Agents are defined in `.llm/agents/`, their context in `.llm/context/`. Run one by reading its file and following it: `content-reviewer.md`, `tech-auditor.md`.

SEO is a skill, not an agent: `/seo`. It lives in `.agents/skills/seo/` (tool-agnostic) and is symlinked to `.claude/skills/seo`. Vendored verbatim from addyosmani/web-quality-skills — see its `UPSTREAM.md` before changing it. Repo-specific rules go in `.llm/context/seo-context.md`, not in the skill.

Rules
Never rewrite content without explicit approval — propose a diff, do not apply it silently.
When editing MDX, preserve all existing component imports and structure.
