# CONVENTIONS

Rules not already enforced automatically. Prettier runs on every agent edit (`.claude/settings.json`); the git pre-commit hook re-checks format, lint, and types on staged files.

## Files and naming

kebab-case for files and folders. A component is a folder with `<name>.tsx` plus an optional `<name>.module.css`. A test sits next to its source as `<name>.spec.ts`.

Content slugs become the URL. Do not rename a slug after publishing.

## Module layout

`domain/models/` holds types only and imports from no other layer. `application/services/` holds logic, `application/hooks/` holds Qwik resources. `infrastructure/` holds MDX loading, permalinks, storage, browser APIs. `components/` holds the section's Qwik components.

Import across modules with the `~/` alias, never a relative path that leaves the current folder.

## TypeScript

Use `type`, not `interface`. Prefer arrow functions assigned to a `const`. Export components as `export default component$(...)`.

## Styling

CSS Modules only. Import the named class, not the module as a namespace object. Use the tokens in `DESIGN.md` — never hardcode a color.

## MDX content

Order in every `index.mdx`: frontmatter, then component imports, then body.

Required frontmatter: `title`, `description`, `date`, `excerpt`, `tags`. Optional: `published`, `last_updated`, `og_title`, `og_description`. Blog posts also take `article_type: featured | regular`; dev bites take `dev_bite_type: featured | regular`.

Dates are `YYYY-MM-DD`. `tags` is a comma-separated string, not a list.

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

## Testing

Vitest for units (`pnpm test.unit.ci`), Playwright for e2e (`pnpm test.e2e`). `tests/a11y-per-page.spec.ts` runs axe on every page, so a new page must pass it.

## Commits

Human authors the commits
