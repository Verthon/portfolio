# Header wayfinding — built 2026-10-24, not yet committed

The header has no home link and no site name. Top-left holds the theme select,
which is utility, not navigation. On 375px the header wraps to three rows
(~140px): theme select, then the three links, then the social icons, and the
select is first in tab order. Found 2026-10-09 in a dry-run UI review
(Playwright screenshots at 375/768/1280, both themes).

## Current shape

`src/layouts/Base.astro`:

```astro
<header class="site-header">
  <ThemeToggler />
  <Nav />
</header>
```

- `src/components/theme-toggler.astro` — a `<select>` with three options:
  system, dark, light.
- `src/components/nav/nav.astro` — blog, dev bites, observatory, then GitHub,
  LinkedIn and RSS icons. `flex-wrap: wrap` below 768px.
- `src/components/footer/footer.astro` — already has a `.socials` block, so the
  header icons are a duplicate.

## Proposed

```
 sordyl.dev                blog   dev bites   observatory   [theme]
```

- `sordyl.dev` top-left as a link to `/`. On the home page, mark it
  `aria-current="page"`.
- The three section links stay visible at every width. **No hamburger**: NN/g
  recommends showing navigation as visible links when there are 4 or fewer
  ([Hamburger Menus and Hidden Navigation](https://www.nngroup.com/articles/hamburger-menus/)).
  A hamburger also needs client JS, which would spend the site's zero-JS
  baseline (ADR 0006, `docs/speculationrules-task.md`).
- Social icons drop out of the header below 768px; the footer carries them.
- Theme control stays the native `<select>` (system, dark, light) and moves to
  the end of the row. Its behaviour and storage are unchanged.

Width estimate, not measured: `sordyl.dev` plus the three links at
`font-size-md` is roughly 330px against ~343px usable at 375px. Measure before
committing to one row.

Fallbacks if it does not fit, in order:

1. Two rows: `sordyl.dev` and the theme select, then the section links.
2. Shorter label for "observatory".

Revisit a hamburger only if top-level links pass ~5.

## Decisions — maintainer

1. ~~Theme control shape~~ — decided 2026-10-24: keep the native `<select>`.
   This supersedes the 2026-10-09 sun/moon toggle decision.
2. ~~Mobile theme control~~ — decided 2026-10-24: stays in the header. Below
   768px, row 1 is `sordyl.dev` with the select on the right, and row 2 is the
   section links.
3. ~~Wordmark text~~ — decided 2026-10-24: `sordyl.dev`. It's shorter at 375px and
   matches the brand people see in search results. The full name belongs on `/about`.
4. ~~Whether the missing home link was deliberate minimalism~~ — decided
   2026-10-24: not deliberate, build it. Peer check (`docs/research/peer-blogs.md`,
   45 reachable home pages): 43 link to `/` from the first header item. The
   exceptions are Hillel Wayne ("Blog" first) and Crawshaw (no header at all).

An `/about` page is planned but not yet written, so the header should leave room
for a fourth link. Four is still under the no-hamburger threshold, but it makes a
single row at 375px unlikely: plan for fallback 1 (two rows) and measure
with four links, not three. Add the link when the page ships, not before.

## Done when

- Every page has a link to `/` in the header.
- At 375px and 320px the header is at most two rows and the page has no
  horizontal overflow.
- Tab order: skip link, home link, section links, theme control.
- The existing theme select still works after the move: the theme e2e test passes.
- Both themes checked; `tests/a11y-per-page.spec.ts` still passes.
- The zero-JS check from `docs/speculationrules-task.md` still returns nothing.
- DESIGN.md gets a header entry: item order, per-breakpoint layout, and the
  "no hamburger under ~5 links" rule, so the next review does not have to ask.
