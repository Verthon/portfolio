# CONTENT

How to write and structure a post. What a blog post / dev bite / observatory note _is_ lives in `CONTEXT.md`; code rules live in `CONVENTIONS.md`.

## Slugs

Content lives in `src/content/{blog,dev-bites,observatory}/<slug>/index.mdx`. The slug becomes the URL. Do not rename a slug after publishing — nothing checks this, and a rename silently breaks every indexed and external link. If you must move one, map the old path to the new one with Astro's `redirects` config option in `astro.config.mjs` (no such block exists yet — add it).

## Frontmatter

Required: `title`, `description`, `date`, `excerpt`, `tags`.
Optional: `last_updated`, `og_title`, `og_description`.
Observatory notes also require `status`.
Blog posts also take `article_type: featured | regular`; dev bites take `dev_bite_type: featured | regular`. Only `featured` reaches the home page.

`value_proposition` (blog, optional) is a drafting gate, not a rendered field:
one line on why the article should exist, written before drafting as a go/no-go.
Nothing renders it and nothing enforces it.

Dates are `YYYY-MM-DD`. `tags` is a comma-separated string, not a list.

Limits: `title` under 60 chars, `description` 120-160, `excerpt` under 200 and
standalone — it is often the only thing a reader sees. Make `date` the publish
date.

There is no draft flag. Anything merged to `master` is built, listed, and in the
sitemap — git is the draft mechanism. A `published` field used to exist but was
read by nothing, so five posts marked unpublished were live and indexed.

Only one limit is enforced: `title` at 70 chars (`max(70)` in
`src/content.config.ts`). Past 70 Google discards the title and writes its own, so
the field stops working — 60 is still what you aim for, but a 62-char title has no
consequence and nothing blocks it. Every other number here is advisory. `description`
has no enforced cap because Google documents no length at which it breaks.

## MDX structure

Order in every `index.mdx`: frontmatter, then component imports, then body.

Each section imports its own wrapper, header, and content components: blog uses `ArticleWrapper` / `ArticleHeader` / `ArticleContent`, dev bites use the `DevBite*` equivalents, observatory uses `Wrapper` / `Header` / `Content` from `~/observatory/components/`.

Write the `h1` as `<Heading tag='h1'>`. Every `h2` and `h3` needs `id` and `linkLabel`:

```mdx
<Heading tag="h2" id="my-section" linkLabel="Link to heading: My section">
  My section
</Heading>
```

Never use a raw markdown `#` heading — it breaks anchor links and the a11y test.

Never run Prettier on an `.mdx` file. Its markdown parser re-indents closing JSX tags after lists and emits invalid MDX, which breaks the build. `.prettierignore` excludes `**/*.mdx` and `pnpm fmt` does not glob it — leave both that way.

## Don't restate documentation

Link to the docs instead of summarising them. Restated docs go out of sync within a release or two, and the post silently becomes wrong.

Write what the docs can't: your own numbers, the trade-off you hit, the thing that bit you. Show real output rather than narrating what a tool does.

| Don't                                                 | Do                                     |
| ----------------------------------------------------- | -------------------------------------- |
| A bullet list of a command's flags and behaviour      | Paste its actual output                |
| "It runs 3 times per candidate across 4-5 candidates" | "Our 293s baseline took ~40 minutes"   |
| Explaining why a bug happens in the tool's source     | Link the issue, say whether it's fixed |
| Repeating a config reference table                    | Show the config you shipped            |

Version-specific facts (requirements, defaults) belong in **Context**, where the version is stated and the reader can see what they apply to.

## Before publishing

Run `/content-review` for the editorial pass and `/seo` for metadata and
structured data. Preview locally — check heading anchors and that components
render.
