# 0004 — `.astro` by default, Preact only where MDX imports it

Decided during the Astro 7 migration, 2026-09. This one exists because every
part of it looks like an inconsistency worth cleaning up, and is not.

## Decision

Components are `.astro`. The exception is the components imported from inside
MDX files — those are Preact `.tsx` with `compat: true`, and they keep their
exact extensionless `~/...` paths.

## Why the exception is load-bearing

MDX content imports components extensionlessly:

    import { ArticleWrapper } from '~/blog/components/article-wrapper/article-wrapper'

Extensionless imports resolve for `.tsx`. They **do not** resolve for `.astro`.
Converting one of these to `.astro` breaks every MDX file that imports it, and
the hard constraint on the migration was that MDX files stay unchanged.

> **Superseded in part by [0005](./0005-images-through-astro-assets.md)**
> (2026-09-16) for image components. MDX *can* import an `.astro` component
> when the extension is spelled out; `ArticleImage` now does. The default in
> this record is otherwise unchanged.

These components render statically and ship no JS — no `client:` directive is
used anywhere. Preact is a compile-time dependency here, not a runtime one.

## The other things that look wrong and aren't

**OG tags are emitted at the call site, not inside `Article.astro`.** A
component's own `slot="head"` does not reach past its immediate parent
([named slots](https://docs.astro.build/en/basics/astro-components/#named-slots)),
so each `[slug].astro` passes a `<Fragment slot="head">` to `Base.astro`.
`Article.astro` is a bare `<article><slot /></article>` with no props as a
direct result.

**The three `[slug].astro` files are byte-identical apart from the collection
name.** Deliberate for now. Collapse them into `src/pages/[section]/[slug].astro`
only if a fourth section appears.

**Playwright serves `dist/` via `serve`, not `astro preview`.** `astro preview`
7.3.2 detaches into the background by default, contradicting the published CLI
docs. `webServer.command` is `pnpm exec serve dist -l 4173`, and `test.e2e` is
`astro build && playwright test` so `dist/` is fresh. `serve` is in
`knip.config.ts`'s ignore list because it is only named as a string.

**`unicorn/no-array-sort` is off.** `toSorted` is ES2023; tsconfig `lib` is
es2022, so `astro check` rejects the fix the rule asks for. Revisit with `lib`.

**No unit test runner.** A `vitest.config.ts` existed mid-migration and was
dropped rather than configured around. `src/content.config.ts` does the
frontmatter validation that used to need one. Per `CONVENTIONS.md`.

## What it costs

Two component idioms in one repo, and a rule — "extensionless import means the
target must be `.tsx`" — that is invisible at the import site. `CONVENTIONS.md`
states it; this record explains why reversing it is not cheap.
