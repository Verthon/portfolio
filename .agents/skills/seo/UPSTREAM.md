# Upstream

Vendored from [addyosmani/web-quality-skills](https://github.com/addyosmani/web-quality-skills),
path `skills/seo/`, MIT.

- Commit: `afa8da942115f2961fdbfa80807ea0b232ff6c00` (2026-08-24)
- Skill version: 2.0

`SKILL.md` and `references/` are upstream verbatim except the fenced
`local-addition` block at the end of `SKILL.md`. Keep it that way: repo-specific
rules belong in `.llm/context/seo-context.md`.

To check for upstream changes:

```bash
git clone --depth 1 https://github.com/addyosmani/web-quality-skills /tmp/wqs
diff -r /tmp/wqs/skills/seo .agents/skills/seo
```

Linked into Claude Code as `.claude/skills/seo -> ../../.agents/skills/seo`.
The `.agents/` location is the tool-agnostic one (Gemini, Codex and others read it).
