# CONVENTIONS

Code rules not already enforced automatically. Prettier runs on every agent edit to a `.ts`/`.tsx` file (`.claude/settings.json`); the git pre-commit hook re-checks format, lint, and types on staged `.ts`/`.tsx`/`.astro` files. **Never runs on `.mdx`, by design — see `CONTENT.md`.**

Writing and MDX rules live in `CONTENT.md`.

## Files and naming

kebab-case for files and folders. A component is a folder with `<name>.astro`, or `<name>.tsx` plus an optional `<name>.module.css` for the Preact ones. E2e specs live in `tests/` as `<name>.spec.ts`.

## Module layout

`src/pages/` holds routes, `src/content/` holds the MDX and `src/content.config.ts` its schema. Each section (`src/blog/`, `src/dev-bites/`, `src/observatory/`) holds only `components/`, and `src/layouts/` the page shells.

Anything not owned by one section lands in one of two buckets, by what it is rather than by how many places use it:

- `src/common/components/` — leaf primitives. `heading`, `alert`, `visually-hidden`, the icons. No layout opinion, no site knowledge. MDX imports come from here (today `heading` and `alert`), never from chrome.
- `src/components/` — site chrome. `nav`, `footer`, `theme-toggler`, `analytics`, `article-card`. Composites that know about the site, used by `src/layouts/` and the index pages, never from MDX.

Don't collapse these two. A primitive moving into chrome, or chrome moving into `common/`, makes "common" mean both *shared* and *site-wide* at once, which is what the split exists to avoid.

Import across modules with the `~/` alias, never a relative path that leaves the current folder.

## TypeScript

Use `type`, not `interface`. Prefer arrow functions assigned to a `const`.

Components are `.astro` by default. Reach for a `.tsx` Preact component only when it has to be importable from MDX; export those as `export default function Name(...)`.

MDX can import an `.astro` component, but only with the extension spelled out
(`~/blog/components/article-image/article-image.astro`). Extensionless resolves
for `.tsx` only. An `.astro` component is the right call in MDX when it needs
something the Preact ones can't reach — `astro:assets` being the case that
forced it. See ADR 0005.

## Styling

Scoped `<style>` blocks in the `.astro` component. This is Astro's documented default and keeps styles next to the markup they style. Scoped styles do not reach into child components — use `:global()` or pass a `class` prop when that is actually needed.

Token values live in `src/styles/global.css`; `DESIGN.md` explains which token to reach for and why. Never hardcode a color. Breakpoints are literal pixel values, not tokens — custom properties do not resolve inside a media query.

## Testing

Playwright for e2e (`pnpm test.e2e`), covering only what needs a browser: a11y, the theme toggle, featured-article navigation. `tests/a11y-per-page.spec.ts` runs axe on every page, so a new page must pass it. `pnpm build` runs `scripts/check-links.ts` and `scripts/check-feed.ts` over `dist/`, which is where build-output checks belong rather than in a browser test.

Vitest for pure functions (`pnpm test.unit`), co-located as `<name>.test.ts` — `tests/` stays e2e. Frontmatter needs no test: `src/content.config.ts` validates it at build time.

The build-output rules live in `src/build-checks/` as pure functions over an
in-memory `Map<path, contents>` of `dist/`, so every rule — including the
cross-file ones like canonical/sitemap parity — is testable from a hand-written
map. `scripts/*.ts` are thin runners: glob `dist`, call the rule, print timings,
exit. Keep I/O and timing in the runner and the rules pure. They run under Node's
native type stripping, which is why their imports spell out the `.ts` extension
(`allowImportingTsExtensions` in `tsconfig.json`).

## Commits

The human authors the commits. Agents stage nothing and commit nothing unless asked.

Subject line is `type: lowercase summary` — `feat` for a new capability or content, `chore` for everything else.
