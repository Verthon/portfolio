Personal blog.

Read first
@CONTEXT.md — what this repo is, and what blog post / dev bite / observatory mean
@CONVENTIONS.md — code, MDX, and commit conventions

Content lives in `src/routes/{blog,dev-bites,observatory}/<slug>/index.mdx`. Section logic lives in the matching `src/<section>/` module.

Agents are defined in `.llm/agents/`, their context in `.llm/context/`. Run one by reading its file and following it: `seo-auditor.md`, `content-reviewer.md`, `tech-auditor.md`.

Rules
Never rewrite content without explicit approval — propose a diff, do not apply it silently.
When editing MDX, preserve all existing component imports and structure.
