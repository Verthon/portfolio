# GEO — visible publish dates

Render the publish/updated date visibly on every article page. Opened 2026-09-26
from the GEO audit of the live site.

Google's Article structured-data guidance says structured data should match
what's visible. Today the date lives only in JSON-LD and
`article:published_time`. Blog and observatory pages show none. Dev bites show a
hand-typed `**Last updated**: DD.MM.YYYY` line that drifts from frontmatter.
Observatory `last_updated` is the note's expiry date
(`src/content/observatory/CONTEXT.md`), and readers can't see it.

## First step — brainstorm with `/seo`

Before touching anything below, run `/seo` on the idea itself: is a visible
date the right fix, what should it show (published, updated, or both), and
where should it sit. Everything under "Decided" and "Done" is open to change
if the brainstorm disagrees.

## Decided

The date reaches the header through MDX, not the layout. The header components
are used inside the MDX, so only the MDX can hand them frontmatter.
`frontmatter.date` inside an MDX body is an ISO string (verified by build probe
2026-09-26), so the component takes `string | Date`.

## Done (uncommitted)

- `src/common/components/post-dates/` renders
  `Published <time>YYYY-MM-DD</time> · Updated <time>…</time>` with
  `--text-meta`, the same format as the article cards. "Updated" only shows
  when it differs from `date`.
- `ArticleHeader`, `DevBiteHeader` and the observatory `Header` take optional
  `date` / `lastUpdated` props and render `PostDates` after the h1. Nothing
  renders until the MDX passes them.

## Open — needs author decisions

1. **Apply the MDX patch.** All 30 `index.mdx` files (18 blog, 8 dev bites,
   4 observatory):

   ```diff
   -<DevBiteHeader>
   +<DevBiteHeader date={frontmatter.date} lastUpdated={frontmatter.last_updated}>
   ```

   The 7 dev bites with a date line also lose it (and its blank line). A
   trial build of the patch in a scratch copy passed on 2026-09-26: all 30
   pages render the byline, and check-links and check-feed pass. Regenerate it
   with:

   ```python
   import glob, re
   for p in glob.glob('src/content/*/*/index.mdx'):
       s = open(p).read()
       s = re.sub(r'^<(ArticleHeader|DevBiteHeader|Header)>$',
                  r'<\1 date={frontmatter.date} lastUpdated={frontmatter.last_updated}>',
                  s, count=1, flags=re.M)
       s = re.sub(r'^\n?\*\*Last updated(:\*\*|\*\*:) [0-9.]+\n\n', '', s, flags=re.M)
       open(p, 'w').write(s)
   ```

2. **Two drifted dates.** Resolve these before deleting the body lines, because
   the body line is the only other record. Both bites have `date: 2024-03-09`,
   which looks like a migration artifact:
   - `dev-bites/async-error-handling-with-mocha-tests`: the body says 25.02.2024.
   - `dev-bites/storybook-chunk-blocked-on-production`: the body says 06.03.2023.

   Neither body date can be `last_updated`, because both are earlier than
   `date`.

3. **Stray `@`** at `dev-bites/fully-removing-windsurf-on-macos/index.mdx:23`,
   which renders as a lone paragraph.

## Verify after applying

`pnpm build` (which runs check-links and check-feed), `pnpm test.e2e`, and a
visual check of the byline in both themes.

## Rest of the GEO audit (not started)

2. Dev bites have no h2s. Context/Problem/Solution are bold text, and only 3 of
   8 bites use those labels. MDX change: propose, don't apply.
3. The `BlogPosting` JSON-LD (`src/seo/article-json-ld.ts`) has no
   `description` and no `publisher`. `.agents/skills/seo/repo-context.md` claims
   a publisher, which is doc drift. Keep `src/build-checks/json-ld.ts` passing.
4. The site name is split between "sordyl.dev" (`<title>` suffix) and
   "Krzysztof Sordyl" (`og:site_name`, WebSite.name). The job title is split
   between "Frontend Engineer" (`src/seo/site-json-ld.ts`) and "platform
   engineer" (the design-system-pitfalls post). Author decides.
5. The Vitest docs link in `detect-handing-async-operations-in-vitest` points
   to main.vitest.dev and should point to vitest.dev/config/detectasyncleaks.
   `icon-wrapper.tsx` defaults `ariaHidden` to false, so audit its callers
   before changing the default.
