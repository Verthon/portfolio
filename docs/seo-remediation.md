# SEO remediation — findings and queue

Audit run 2026-09-12 with the `/seo` skill (`.claude/skills/seo/`, from
addyosmani/web-quality-skills) plus `.agents/skills/seo/repo-context.md`.
Re-verified against the working tree 2026-09-13 — see "Changes since the audit".

Method: static MDX source inspection + live HTTP against https://sordyl.dev.
No Lighthouse and no Chrome DevTools MCP were available, so nothing here is a
rendered-page performance claim. Re-run those checks before acting on anything
CWV-related.

## Changes since the audit

Verified 2026-09-13. The audit ran before 73c188c landed.

- **JSON-LD now ships.** `createArticleJsonLd` in
  `src/common/infrastructure/services/document-head.ts`, wired into all three
  section layouts. Emits `BlogPosting` per article. The HIGH finding below is
  closed — but it introduced a new defect, tracked in `docs/geo-basics-task.md`
  item 2: `author`/`publisher` reference `@id: https://sordyl.dev/#person` and
  nothing defines that node.
- **Twitter card meta now ships.** `createArticleMeta` emits `twitter:card`,
  `twitter:title`, `twitter:description`, plus the `og:` set. `og:image` and
  `twitter:image` are still absent — that half of the finding stands.
- **`.llm/` is gone.** Agents are skills in `.agents/skills/`, symlinked into
  `.claude/skills/`. Any doc still pointing at `.llm/` is stale.

Everything else below was re-checked and is still open.

## Sequencing decision — read before starting

`docs/astro-7-migration/` plans a move off Qwik City. It is **planned, not
started** — the repo is still Qwik.

The remaining framework-coupled items are `og:image` wiring and the sitemap
`lastmod`. JSON-LD was decided by default — it shipped in Qwik on 2026-09-12
without this question being answered, which is the outcome to avoid repeating.

Either decide the migration is far enough out to justify the rework, or fold
these into the migration's own head/metadata work. **Decide this first — it
changes the order of everything below.** `docs/geo-basics-task.md` carries the
same decision with a recommendation and a fallback date; resolve it there once,
not twice. The frontmatter and content items
(descriptions, titles, `published`, headings) are framework-agnostic and safe
to do at any point, because the migration's hard constraint keeps frontmatter
byte-for-byte.

## Findings

| Priority | Finding | Scope | Framework-coupled |
| --- | --- | --- | --- |
| ~~HIGH~~ | ~~No JSON-LD on any page~~ — shipped 73c188c | 30/30 | yes |
| HIGH | No `og:image` / `twitter:image` (card meta itself now ships) | all pages | yes |
| MED | `published` missing from frontmatter | 5 files | no |
| MED | Description outside 120–160 chars | 25/30, 4 genuinely bad | no |
| LOW | Title over 60 chars | 4 files | no |
| LOW | Sitemap has no `lastmod` | site-wide | yes |
| LOW | Raw markdown `###` heading | 1 file | no |
| LOW | `<Heading tag="h3">` without `id`/`linkLabel` | 1 file, 3 occurrences | no |

## Queue

### 1. `og:image` — highest leverage

`twitter:card` / `twitter:title` / `twitter:description` and the `og:` set now
ship via `createArticleMeta`. **`og:image` and `twitter:image` do not** —
verified absent from the source on 2026-09-13. A card without an image renders
as a bare text link, so this is still the top item.

Needs a per-post frontmatter field plus a default fallback image. `RouterHead`
already renders `head.meta`, so the wiring goes in `document-head.ts`, not the
component.

`og_title` / `og_description` already exist as optional frontmatter and are used
by only 3 of 30 files.

### 2. JSON-LD — shipped, two gaps remain

Generated from frontmatter in `document-head.ts` (driver #3's answer to the
"generated vs hand-added" question). Remaining:

- All three sections emit `BlogPosting`. `.agents/skills/seo/repo-context.md`
  specifies `TechArticle` for dev bites and `Article` for observatory notes.
- The dangling `#person` `@id`. Tracked in `docs/geo-basics-task.md` item 2 —
  fix it there, it is the same edit as the `sameAs` work.

### 3. Descriptions — fix 4, leave the rest

Do not "fix" all 25. The dev-bites and observatory notes at 55–75 chars are
short because the format is short. The real outliers are truncated by Google at
~160:

- `blog/modern-webpack-part-1-setting-up-the-basics` — 251
- `blog/modern-webpack-part-2-integrating-babel-and-react` — 216
- `blog/modern-webpack-part-3-integrating-assets-and-testing` — 199
- `blog/prompt-as-string-production-liability` — 167

### 4. Missing `published` flag

Live and in the sitemap, so it defaults to published somewhere. Confirm that is
intentional rather than accidental before changing anything.

- `blog/headless-ui-libraries-the-key-to-flexible-and-accessible-user-interfaces`
- `blog/modern-webpack-part-1-setting-up-the-basics`
- `blog/modern-webpack-part-2-integrating-babel-and-react`
- `blog/modern-webpack-part-3-integrating-assets-and-testing`
- `blog/modern-webpack-part-4-rsbuild-migration`

Astro content collections would catch this at build time via Zod — a reason to
sequence behind the migration.

### 5. Convention breaks

- `blog/frontend-test-smells` — raw `### Material that helped me a lot preparing
  this article:`. Breaks anchor links. Probably invisible to
  `tests/a11y-per-page.spec.ts`, which checks axe rules rather than the heading
  convention.
- `blog/deno-2-quick-overview` — three `<Heading tag="h3">` without `id` /
  `linkLabel`, at lines 101, 115 and 146. The other four h3s in the file are
  correct.

### 6. Titles over 60 chars

Author's call, flag only. Longest is
`blog/webpack-to-rsbuild-migration` at 92.

### 7. RSS feed

`/rss.xml`, `/feed.xml` and `/index.xml` all 404. Driver #3 wants it generated
from content. Nothing on skills.sh fits; this is ~40 lines of local code.

## Not findings — corrections to earlier docs

- **The sitemap exists and is healthy.** The deleted `.llm/agents/seo-auditor.md`
  claimed it did not. `https://sordyl.dev/sitemap.xml` returns 200 and covers all 30
  content pages plus 4 section/home pages — no orphans, no dead entries. Only
  gap is missing `lastmod`.
- **Qwik emits `<title q:head>`, not `<title>`.** Grepping for `<title>` gives a
  false negative on every page. Same for other head tags.
