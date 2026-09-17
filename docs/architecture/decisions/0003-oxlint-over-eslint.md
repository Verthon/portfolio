# 0003 — oxlint over ESLint, and two dependencies that must survive

Decided during the Astro 7 migration, 2026-09.

## Decision

`pnpm lint` is `oxlint --config ./oxlint.config.ts`, with the target passed by
the caller: `pnpm lint src` in CI, staged paths from `.githooks/pre-commit`,
cwd when given none. The config flag is stated once rather than copied into the
hook. ESLint is gone — adopted mid-migration with a flat `eslint.config.mjs`,
then dropped entirely.

Astro a11y rules live in `tools/oxlint/astro-a11y.ts`, loaded via oxlint's
`jsPlugins`.

## Do not remove these dependencies

Two devDependencies have `eslint` in the name and are **not** dead. A dependency
sweep — human or agent — will read the names and be wrong:

- **`astro-eslint-parser`** is a live runtime import in
  `tools/oxlint/astro-a11y.ts`. oxlint has no custom-parser hook, so each a11y
  rule re-parses the `.astro` file itself.
- **`@typescript-eslint/parser`** is named there as a string in the parser
  options, which is why `knip.config.ts` ignores it explicitly.

Both go away if [oxc#24262](https://github.com/oxc-project/oxc/pull/24262)
lands. Until then, deleting either breaks `pnpm lint` with an error that does
not obviously point back at the dependency.

## Why

Speed, and one fewer config dialect. The Qwik-specific ESLint plugin was going
away with Qwik regardless, which made the ESLint config a near-rewrite either
way.

## What it costs

The a11y plugin is hand-maintained repo code rather than an off-the-shelf
`eslint-plugin-jsx-a11y` run. It covers seven rules (`alt-text`,
`anchor-is-valid`, `anchor-has-content`, `heading-has-content`,
`iframe-has-title`, `no-positive-tabindex`, `no-autofocus`) — a subset of what
the ESLint plugin would give, and the double-parse is wasted work on every lint.

The *accessible to WCAG 2.1 AA* driver outranks everything else, so this subset
is a real compromise. It is partly offset by `tests/a11y-per-page.spec.ts`,
which runs axe over every sitemap URL in both themes.
