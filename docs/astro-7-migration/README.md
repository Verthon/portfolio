# Astro 7 Migration — Planning Docs

Planning package for migrating sordyl.dev from **Qwik City 1.19** to **Astro 7**, with a styling refresh, while keeping the MDX content files and the content-generation model untouched.

## Hard constraint

> The current shape of MDX and content generation stays as-is.

Concretely, this means the migration must preserve, byte-for-byte if possible:

- Frontmatter schemas (`title`, `published`, `description`, `tags`, `date`, `excerpt`, `article_type` / `dev_bite_type`, `og_*`, …)
- The self-wrapping MDX pattern (`<ArticleWrapper><ArticleHeader>…` inside each file)
- The 12 component import paths used inside MDX (`~/blog/components/article-wrapper/article-wrapper` etc., extensionless)
- One folder per post with `index.mdx`, slug = folder name
- URLs: `/blog/<slug>`, `/dev-bites/<slug>`, `/observatory/<slug>`

## Documents

`01`–`05` are the original planning analysis, kept as history. `STATE.md` and
`REMAINING.md` describe the migration as it actually is.

| Doc                                                                    | Contents                                                                                                 |
| ---------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| [01-architecture-assessment.md](./01-architecture-assessment.md)       | Current architecture: what works, what's over-built, what Qwik costs us                                  |
| [02-migration-plan.md](./02-migration-plan.md)                         | Step-by-step Qwik City → Astro 7 plan, phased, with rollback                                             |
| [03-styling-refresh.md](./03-styling-refresh.md)                       | Styling change: options compared, recommended token/theme modernization                                  |
| [04-ai-friendliness-and-agents.md](./04-ai-friendliness-and-agents.md) | AI-readiness audit of the repo, agent/skill inventory needed before, during and after migration          |
| [05-alternatives-considered.md](./05-alternatives-considered.md)       | Frameworks evaluated and rejected (TanStack Start, staying on Qwik), and Astro 7 confirmed in production |
| [STATE.md](./STATE.md)                                                 | **Current.** What shipped, and every divergence from the original plan                                   |
| [REMAINING.md](./REMAINING.md)                                         | **Current.** Open bugs, missing discovery surface, verification gaps, doc debt                           |

## Why Astro 7 is a good fit (summary)

- The site is fully static (`staticAdapter`, Netlify, no server logic). Qwik's resumability buys nothing here; Astro ships ~0 KB JS by default. The only interactive element is the theme toggler, which is already a framework-free inline script pattern.
- Astro is MDX-native: `@astrojs/mdx` supports frontmatter, component imports and colocated content — the existing MDX files can be moved without editing their contents.
- Content collections give a Zod-validated frontmatter schema, replacing the hand-rolled runtime type guard in `src/blog/infrastructure/services/mdx-file.ts` with build-time validation.
- Astro 7 (released 2026-06-22) brings a Rust compiler, Vite 8 + Rolldown, and 15–61% faster builds; Netlify supports it out of the box. Node requirement is ≥ 22.12 — the repo is already on Node 24 (`.nvmrc`).

## Key Astro 7 gotchas relevant to this repo

1. **Markdown pipeline change**: Astro 7 defaults to _Sätteri_, a Rust markdown processor, replacing remark/rehype. **MDX files are not affected the same way** — `@astrojs/mdx` keeps its own processor and supports remark/rehype plugins — but any config we copy from Astro 5/6 tutorials may assume the unified pipeline. Verify syntax-highlighting config against v7 docs.
2. **Stricter Rust compiler**: unclosed tags in `.astro` files are errors, invalid HTML is no longer auto-corrected. Only affects new `.astro` files we write, not MDX.
3. **JSX-style whitespace compression**: spaces between adjacent inline elements can be dropped; check rendered prose around inline `<code>`/links.
4. **`src/fetch.ts` is reserved** for advanced routing — don't name anything that.

## Sources

- [Astro 7.0 announcement](https://astro.build/blog/astro-7/)
- [Upgrade to Astro v7 guide](https://docs.astro.build/en/guides/upgrade-to/v7/)
- [@astrojs/mdx integration](https://docs.astro.build/en/guides/integrations-guide/mdx/)
- [Content collections](https://docs.astro.build/en/guides/content-collections/)
- [Netlify: "Astro 7 just works on Netlify"](https://www.netlify.com/changelog/2026-06-22-astro-7/)
