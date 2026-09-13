---
version: alpha
name: Portfolio
description: Dual-theme personal blog and portfolio. Warm butter-yellow accent over near-neutral warm greys, Inter variable throughout, minimal chrome.
colors:
  primary: 'hsl(50.3, 100%, 78.2%)'
  primary-50: 'hsl(50.3, 100%, 96.2%)'
  primary-100: 'hsl(50.3, 100%, 90.2%)'
  primary-800: 'hsl(50.3, 100%, 16.2%)'
  secondary-100: 'hsl(10, 94%, 90.2%)'
  secondary-900: 'hsl(10, 94%, 8.2%)'
  info-100: 'hsl(203, 99%, 90.2%)'
  info-700: 'hsl(203, 99%, 24.2%)'
  danger-100: 'hsl(35, 100%, 90.2%)'
  danger-700: 'hsl(35, 100%, 24.2%)'
  white: 'hsl(0, 0%, 100%)'
  grey-100: 'hsl(206.7, 52.9%, 96.7%)'
  grey-200: 'hsl(206.7, 52.9%, 92.7%)'
  grey-400: 'hsl(206.7, 11.7%, 85.1%)'
  dark-300: 'hsl(60, 1.7%, 35.1%)'
  dark-400: 'hsl(60, 1.9%, 30.4%)'
  dark-600: 'hsl(60, 2.9%, 20.6%)'
  dark-800: 'hsl(60, 8%, 9.8%)'
  text-color: '{colors.dark-400}'
  heading-color: '{colors.dark-600}'
  text-strong: '{colors.dark-600}'
  text-meta: '{colors.dark-300}'
  surface: '{colors.white}'
  border-subtle: '{colors.grey-200}'
  link-wash: '{colors.primary-50}'
  link-underline: '{colors.primary}'
  code-background: 'hsl(206.7, 52.9%, 98.3%)'
  code-text: 'hsl(240, 27%, 38%)'
  code-comment: 'hsl(60, 2%, 32%)'
  code-keyword: 'hsl(0, 65%, 39%)'
  code-function: 'hsl(240, 60%, 52%)'
  code-expression-background: 'hsl(50.3, 20%, 95.4%)'
typography:
  hero-name:
    fontFamily: Inter
    fontSize: 2.25rem
    fontWeight: 300
    lineHeight: 1.5
  article-title:
    fontFamily: Inter
    fontSize: 2.25rem
    fontWeight: 400
    lineHeight: 3rem
    letterSpacing: -0.025em
  h1:
    fontFamily: Inter
    fontSize: 1.75rem
    fontWeight: 400
    lineHeight: 1.5
  h2:
    fontFamily: Inter
    fontSize: 1.5rem
    fontWeight: 400
    lineHeight: 1.75rem
  h3:
    fontFamily: Inter
    fontSize: 1.25rem
    fontWeight: 400
    lineHeight: 1.5
  body-lg:
    fontFamily: Inter
    fontSize: 1.1rem
    fontWeight: 300
    lineHeight: 1.5
  body-md:
    fontFamily: Inter
    fontSize: 1rem
    fontWeight: 400
    lineHeight: 1.75
  body-sm:
    fontFamily: Inter
    fontSize: 0.875rem
    fontWeight: 400
    lineHeight: 1.5rem
  label-emphasis:
    fontFamily: Inter
    fontSize: 0.875rem
    fontWeight: 600
    lineHeight: 1.5
  meta:
    fontFamily: Inter
    fontSize: 0.75rem
    fontWeight: 400
    lineHeight: 1rem
  badge:
    fontFamily: Inter
    fontSize: 0.75rem
    fontWeight: 500
    lineHeight: 1
  code:
    fontFamily: Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace
    fontSize: 1rem
    fontWeight: 400
    lineHeight: 1.5
rounded:
  xs: 2px
  sm: 4px
  md: 8px
spacing:
  xs: 0.25rem
  sm: 0.5rem
  md: 1rem
  lg: 2rem
  xl: 3rem
  2xl: 4rem
  3xl: 5rem
  4xl: 6rem
  5xl: 8rem
components:
  page-container:
    backgroundColor: '{colors.surface}'
    textColor: '{colors.text-color}'
    typography: '{typography.body-md}'
    width: 80rem
    padding: 16px
  heading-1:
    textColor: '{colors.heading-color}'
    typography: '{typography.h1}'
  heading-2:
    textColor: '{colors.heading-color}'
    typography: '{typography.h2}'
  article-title:
    textColor: '{colors.heading-color}'
    typography: '{typography.article-title}'
  article-card:
    backgroundColor: '{colors.surface}'
    textColor: '{colors.text-color}'
    typography: '{typography.body-sm}'
    rounded: '{rounded.md}'
    width: 37rem
  article-card-meta:
    textColor: '{colors.dark-300}'
    typography: '{typography.meta}'
  article-card-title:
    textColor: '{colors.heading-color}'
    typography: '{typography.body-lg}'
  inline-link:
    backgroundColor: '{colors.primary-50}'
    textColor: '{colors.text-color}'
    typography: '{typography.body-md}'
  inline-link-underline:
    backgroundColor: '{colors.primary}'
    height: 2px
  badge-primary:
    backgroundColor: '{colors.primary-100}'
    textColor: '{colors.primary-800}'
    typography: '{typography.badge}'
    rounded: '{rounded.sm}'
    padding: 4px
  badge-secondary:
    backgroundColor: '{colors.secondary-100}'
    textColor: '{colors.secondary-900}'
    typography: '{typography.badge}'
    rounded: '{rounded.sm}'
    padding: 4px
  alert-info:
    backgroundColor: '{colors.info-100}'
    textColor: '{colors.info-700}'
    typography: '{typography.body-md}'
    rounded: '{rounded.sm}'
    padding: 16px
  alert-danger:
    backgroundColor: '{colors.danger-100}'
    textColor: '{colors.danger-700}'
    typography: '{typography.body-md}'
    rounded: '{rounded.sm}'
    padding: 16px
  code-block:
    backgroundColor: '{colors.code-background}'
    textColor: '{colors.code-text}'
    typography: '{typography.code}'
    rounded: '{rounded.sm}'
    padding: 16px
  code-inline:
    backgroundColor: '{colors.code-expression-background}'
    textColor: '{colors.text-color}'
    rounded: '{rounded.xs}'
    padding: 4px
  nav-item:
    textColor: '{colors.text-color}'
    typography: '{typography.body-md}'
    padding: 8px
  theme-toggler:
    textColor: '{colors.text-color}'
    typography: '{typography.body-md}'
  footer:
    textColor: '{colors.text-color}'
    typography: '{typography.body-md}'
    padding: 32px
  footer-border:
    backgroundColor: '{colors.grey-200}'
    height: 1px
  hero-name:
    textColor: '{colors.heading-color}'
    typography: '{typography.hero-name}'
  hero-description:
    textColor: '{colors.text-color}'
    typography: '{typography.body-lg}'
---

## Overview

A reading surface first, a portfolio second. The site is a personal blog with
three content streams — long-form articles, short "dev bites", and observatory
notes — so every design decision serves sustained reading of technical prose
with code in it.

The character is **quiet warmth**. Neutrals are not pure greys: the dark ramp is
built on a yellow-leaning hue (60°) and the light greys on a blue-leaning one
(206.7°), so text feels slightly warm against a slightly cool background. The
only loud element is a butter-yellow accent, used sparingly and never as a large
fill.

There is no chrome to speak of. No cards with borders, no shadows in the
content flow, no gradients. Structure comes from whitespace, type scale, and a
single hairline rule above the footer.

## Colors

The palette is a warm-dark neutral ramp, a cool-light grey ramp, and one accent.

- **Primary — butter yellow `hsl(50.3, 100%, 78.2%)`:** The site's signature. It
  appears almost exclusively as a 2px underline beneath inline links and as the
  `primary-50` highlight wash behind them. Never use it as a page or block
  background; at 78% lightness nothing readable sits on top of it except
  `primary-800`.
- **Secondary — coral `hsl(10, 94%, 60%)`:** A counterweight to the yellow,
  reserved for secondary badges. Deliberately rare — two accents competing on a
  page is a bug, not a style.
- **Info — sky `hsl(203, 99%, 66%)` / Danger — amber `hsl(35, 100%, 78%)`:**
  Callout families only, always as a tinted `-100` background with the matching
  `-700` foreground. Note that "danger" here is amber, not red — these are
  editorial callouts in prose, not error states in an app.
- **Text `hsl(60, 1.9%, 30.4%)` and Heading `hsl(60, 2.9%, 20.6%)`:** Body text
  never goes to pure black. The heading is one step darker than body, which is
  the entire hierarchy signal at the color level — the rest is size and weight.
- **Surface `hsl(0, 0%, 100%)`:** Pure white page background in light theme.
  The dark theme replaces it with `dark-800`. Reference `surface`, not `white`.

### Semantic vs. palette tokens

The semantic tier is the only tier component CSS may reference. Each of these
remaps between themes, so a component that uses them needs no `[data-theme]`
block of its own:

| Token                          | Light                    | Dark                     | Use                             |
| :----------------------------- | :----------------------- | :----------------------- | :------------------------------ |
| `text-color`                   | `dark-400`               | `grey-400`               | body copy                       |
| `heading-color`                | `dark-600`               | `grey-100`               | headings                        |
| `text-strong`                  | `dark-600`               | `grey-100`               | hero name, nav and footer icons |
| `text-meta`                    | `dark-300`               | `grey-200`               | article and dev-bite date lines |
| `surface`                      | `white`                  | `dark-800`               | page and hero background        |
| `border-subtle`                | `grey-200`               | `dark-400`               | footer hairline, table rules    |
| `link-wash` / `link-underline` | `primary-50` / `primary` | inverted with the family | inline link treatment           |
| `code-*`                       | see table below          |                          | code blocks                     |

Reaching past this tier to a raw ramp step (`dark-300`, `grey-200`) in component
CSS is a **bug, not a fallback** — it is what forced seven components to
hand-patch their own dark theme. If no semantic token fits, add one here rather
than referencing the ramp.

The one sanctioned exception is the tinted `-100`/`-800` component pairs
described below, which are palette references by design because they invert as a
family.

### Dark theme

The site ships a `[data-theme]` attribute switch with a user-facing toggler. The
token values in the front matter are the **light theme**; dark theme remaps a
small set:

| Token             | Light                | Dark                       |
| :---------------- | :------------------- | :------------------------- |
| `surface`         | `white`              | `dark-800`                 |
| `text-color`      | `dark-400`           | `grey-400`                 |
| `heading-color`   | `dark-600`           | `grey-100`                 |
| `code-background` | light grey           | `hsl(206.7, 11.7%, 20.6%)` |
| `code-text`       | `hsl(240, 27%, 38%)` | `hsl(353, 100%, 85%)`      |
| `code-keyword`    | dark red             | mint `hsl(147, 61%, 69%)`  |
| `code-function`   | indigo               | `primary`                  |

The tinted families invert rather than shift: in dark theme `primary-50`
becomes near-black and `primary-800` becomes near-white, so `badge-primary`
and the alerts keep their light/dark polarity without changing which token
they reference. **Any new tinted component must follow this pattern** — pair a
`-100` background with a `-700`/`-800`/`-900` foreground from the same family
and both themes resolve correctly for free.

Images are dimmed in dark theme (`brightness(0.7) contrast(1.2)`) so screenshots
don't glare against the dark page.

## Typography

**Inter** is the only UI typeface, loaded as a self-hosted variable font
(`InterVar.woff2`, weights 300–800, `font-display: swap`) with a system
sans-serif fallback stack. Code uses the platform monospace stack — Consolas,
Monaco, Andale Mono, Ubuntu Mono — with no webfont, because code blocks are
frequent and a second font download is not worth it.

Weight does most of the work that a second family would do elsewhere:

- **300 (light)** — hero name and hero description. Only the marketing surface.
- **400 (regular)** — all body copy and all headings. Headings are _not_ bold;
  they separate by size and by the darker `heading` color.
- **500/600** — badges and "read more" affordances. The only emphatic weights in
  the content area.
- **700** — a single highlighted span inside the hero name. Nothing else.

The `--font-size-*` scale (`xs`–`5xl`, values in `src/global.css`) is
deliberately compressed, and every `font-size` in the codebase references one of
its steps — there are no literal values left.

Article titles reach `font-size-5xl` at ≥520px and carry `-0.025em` tracking —
the only place negative letter-spacing appears, because it is the only type
large enough to need it.

Line height is `1.5` globally, `1.75` inside article body copy. Long-form prose
gets the looser measure; UI does not.

## Layout

A single centered container: `max-width: 80rem`, horizontal padding that steps
`1rem → 2rem → 3rem` at the 768px and 1024px breakpoints. There is no grid
system. Content columns are constrained independently — article cards cap at
`37rem`, hero description at `500px` — because a 80rem measure is unreadable for
prose.

The page is a flex column with `min-height: 100vh` and the footer pushed down by
`margin-top: auto`, so short pages still anchor the footer at the bottom.

Breakpoints are **not** custom properties — CSS custom properties don't resolve
inside a media query, so a `--bp-*` token there silently never matches. The
tokens were removed for that reason, and the DESIGN.md schema has no breakpoint
group either. Write the literal value in the query. The codebase uses `520px`,
`768px`, `1024px` and `1366px`.

Spacing is tokenized on the `--space-*` scale (`xs`–`5xl`, values in
`src/global.css`), and every `padding`, `margin` and `gap` references a step — as
with type, no literal `rem` values remain.

The steps above `space-lg` are page-level layout — section rhythm and list
gutters — not component padding. Use `xs`–`lg` inside a component.

Vertical rhythm is `rem`-based and local to each component. Headings claim
`3rem` of top margin at h2/h3 and `1em` bottom — generous gaps between sections
are the primary structural cue in long articles.

## Elevation & Depth

Effectively flat. Two shadow tokens exist and are barely used; the content
surface has none. Depth is communicated by:

1. **Whitespace** — the dominant separator.
2. **A single hairline** — `1px solid grey-200` above the footer, switching to
   `dark-400` in dark theme.
3. **The link highlight wash** — `inset 0 0 0 20em primary-50` box-shadow used
   as a background fill on inline links.

If a new component seems to need a shadow, it probably needs more margin
instead.

## Shapes

Radii are small to the point of being nearly square:

- `2px` — inline code spans.
- `4px` — badges, alerts, code blocks.
- `8px` — article card wrappers, the largest radius in the system.

Radii are written literally; there is no radius token, and there are no button
padding tokens either. Nothing is pill-shaped, nothing is a circle, and the site
has almost no buttons — the theme toggler is a bare transparent element with no
border at all.

## Components

**Inline link** is the most characteristic component and worth stating precisely:
no `text-decoration`, `color: text` (it does _not_ recolor), a `primary-50`
background wash implemented as a large inset box-shadow, and a `2px solid
primary` bottom border. This gives a highlighter-pen effect that survives both
themes. Reproduce it exactly; do not substitute a conventional underlined blue
link.

**Article card** has no border, no background, no shadow — it is a max-width
block with a metadata row (`0.75rem`, `dark-300`), a `1.125rem` title in the
heading color, a `0.875rem` excerpt, and a `600`-weight "read more". Separation
between cards is margin only.

**Alerts** come in `info` and `danger` only. Icon on the left with
`margin-inline-end: 0.5rem` and `flex-shrink: 0`, content flexing to fill. Icon
fill and paragraph color both inherit the family's `-700` token. Bottom margin
is chosen at the call site from three fixed steps (`1rem`, `2rem`, `3rem`)
rather than being intrinsic.

**Code blocks** are syntax-highlighted with Prism token classes wired to the
`code-*` tokens. Only five token types are themed — comment, keyword, function,
function-variable, builtin — everything else falls back to `code-text`. Blocks
scroll horizontally (`overflow-x: auto`); they never wrap.

**Heading anchors** are hidden buttons positioned `translateX(-150%)` at
`opacity: 0`, fading in on heading hover. Never visible by default.

## Do's and Don'ts

**Do**

- Use `text` and `heading` semantic tokens rather than raw ramp steps.
- Pair tinted backgrounds and foregrounds from the same color family so both
  themes resolve automatically.
- Constrain prose to a readable measure even inside the 80rem container.
- Reach for margin before reaching for a border or shadow.
- Verify every new surface in both themes — the `[data-theme]` toggle is
  user-facing and both states ship.

**Don't**

- Don't use `primary` as a fill behind text. It is a 78%-lightness yellow;
  only `primary-800` is legible on it.
- Don't introduce a second typeface. Inter plus the monospace stack is the
  whole system.
- Don't bold headings. Size and the `heading` color carry the hierarchy.
- Don't add shadows to content. The two shadow tokens are legacy, not a scale.
- Don't reference breakpoint custom properties inside `@media` queries — they
  do not evaluate. Write the literal pixel value.
- Don't hardcode a hex or hsl value in a component. Every color in use has a
  token; if one doesn't, add it to `:root` and to this file.
