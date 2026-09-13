# CONTENT

How to write and structure a post. What a blog post / dev bite / observatory note _is_ lives in `CONTEXT.md`; code rules live in `CONVENTIONS.md`.

## Slugs

Content lives in `src/routes/{blog,dev-bites,observatory}/<slug>/index.mdx`. The slug becomes the URL. Do not rename a slug after publishing.

## Frontmatter

Required: `title`, `description`, `date`, `excerpt`, `tags`.
Optional: `published`, `last_updated`, `og_title`, `og_description`.
Blog posts also take `article_type: featured | regular`; dev bites take `dev_bite_type: featured | regular`. Only `featured` reaches the home page.

Dates are `YYYY-MM-DD`. `tags` is a comma-separated string, not a list.

Limits: `title` under 60 chars, `description` 120-160, `excerpt` under 200 and
standalone — it is often the only thing a reader sees. Set `published: true`
and make `date` the publish date.

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
