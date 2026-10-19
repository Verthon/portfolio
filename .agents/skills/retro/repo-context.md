# retro — repo context

`CONVENTIONS.md` is this repo's `CODING_STANDARDS.md`. It is loaded at implementation time through `AGENTS.md`, not at review: there is no reviewer agent, and the human reviews every diff. Do not propose creating `CODING_STANDARDS.md` or a review stage; place judgement-call rules in `CONVENTIONS.md` (code) or `CONTENT.md` (writing).

Mechanical rules already run as guardrails: Prettier on agent edits (`.claude/settings.json`), the pre-commit hook (`.githooks/pre-commit`) for format, oxlint, types, and stylelint, and the `check.*` scripts over `dist/` on `pnpm build`. Read those before proposing a new check.
