# As-is state - sordyl.dev

Where the repo stands against `drivers.md`. Volatile by design — drivers say why,
this says what's missing today. One line per gap, no prose.

Last checked: 2026-09-13.

| Driver                  | Status                                 | Gap                                    |
| ----------------------- | -------------------------------------- | -------------------------------------- |
| 1. Accessible (WCAG AA) | axe runs per page in e2e               | manual keyboard/SR pass is unautomated |
| 2. CWV measured         | none                                   | no on-demand runner                    |
| 3. URLs don't break     | sitemap verified healthy, 34 URLs      | no RSS; no `lastmod`; no `og:image`    |
| 3b. Machine discovery   | JSON-LD ships on all 3 sections        | `#person` `@id` dangles; no `llms.txt` |
| 4. Cheap publish loop   | skills in `.agents/skills/`            | no corpus index for content triage     |
| 5. Docs stay short      | `DESIGN.md` trimmed, lints clean       | `HANDOFF.md` over budget               |
