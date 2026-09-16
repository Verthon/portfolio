# Decisions

One file per decision, only for decisions I'd regret not being able to explain
in a year. Costly to reverse, or expensive to reconstruct the reasoning for.
Not a log of everything.

Records are immutable — to change a decision, add a new file that supersedes the
old one and link both ways.

Format: what was decided, why, what it costs, what else was considered.

| Record | Decision |
| --- | --- |
| [0001](./0001-astro-over-qwik-and-alternatives.md) | Astro 7 over Qwik City, TanStack Start, and staying put |
| [0002](./0002-published-urls-do-not-break.md) | URL integrity is enforced at build time |
| [0003](./0003-oxlint-over-eslint.md) | oxlint over ESLint, and two dependencies that must survive |
| [0004](./0004-component-tech-split.md) | `.astro` by default, Preact only where MDX imports it |
| [0005](./0005-images-through-astro-assets.md) | Images go through `astro:assets` |
