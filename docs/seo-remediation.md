# SEO remediation — findings and queue

Audit run 2026-09-12 with the `/seo` skill (`.claude/skills/seo/`, from
addyosmani/web-quality-skills) plus `.llm/context/seo-context.md`.

Method: static MDX source inspection + live HTTP against https://sordyl.dev.
No Lighthouse and no Chrome DevTools MCP were available, so nothing here is a
rendered-page performance claim. Re-run those checks before acting on anything
CWV-related.

## Sequencing decision — read before starting

`docs/astro-7-migration/` plans a move off Qwik City. It is **planned, not
started** — the repo is still Qwik.

Two of the items below are framework-coupled. Doing them now in Qwik's
`DocumentHead` means redoing them in Astro later:

- JSON-LD via `head.scripts`
- `og:image` wiring in `RouterHead`

Either decide the migration is far enough out to justify the rework, or fold
these into the migration's own head/metadata work. **Decide this first — it
changes the order of everything below.** The frontmatter and content items
(descriptions, titles, `published`, headings) are framework-agnostic and safe
to do at any point, because the migration's hard constraint keeps frontmatter
byte-for-byte.

## Findings

| Priority | Finding | Scope | Framework-coupled |
| --- | --- | --- | --- |
| HIGH | No JSON-LD on any page | 30/30 | yes |
| HIGH | No `og:image`, no Twitter card | all pages | yes |
| MED | `published` missing from frontmatter | 5 files | no |
| MED | Description outside 120–160 chars | 25/30, 4 genuinely bad | no |
| LOW | Title over 60 chars | 4 files | no |
| LOW | Sitemap has no `lastmod` | site-wide | yes |
| LOW | Raw markdown `###` heading | 1 file | no |
| LOW | `<Heading tag="h3">` without `id`/`linkLabel` | 1 file, 3 occurrences | no |

## Queue

### 1. `og:image` + Twitter card — highest leverage

Confirmed absent on the served HTML of `/`, `/blog/`, a dev bite and an
observatory note. One change in `src/common/components/router-head/router-head.tsx`
plus a per-post frontmatter field. Affects every share of every post.

`og_title` / `og_description` already exist as optional frontmatter and are used
by only 3 of 30 files.

### 2. JSON-LD structured data

Snippet and per-section types (`BlogPosting` / `TechArticle` / `Article`) are in
`.llm/context/seo-context.md`. `RouterHead` already renders `head.scripts`, so
no component change is needed on Qwik.

Open decision: generated per-section from content, or hand-added per post.
Driver #3 argues for generated.

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
  `linkLabel`.

### 6. Titles over 60 chars

Author's call, flag only. Longest is
`blog/webpack-to-rsbuild-migration` at 92.

### 7. RSS feed

`/rss.xml`, `/feed.xml` and `/index.xml` all 404. Driver #3 wants it generated
from content. Nothing on skills.sh fits; this is ~40 lines of local code.

## Not findings — corrections to earlier docs

- **The sitemap exists and is healthy.** The deleted `seo-auditor.md` claimed it
  did not. `https://sordyl.dev/sitemap.xml` returns 200 and covers all 30
  content pages plus 4 section/home pages — no orphans, no dead entries. Only
  gap is missing `lastmod`.
- **Qwik emits `<title q:head>`, not `<title>`.** Grepping for `<title>` gives a
  false negative on every page. Same for other head tags.
