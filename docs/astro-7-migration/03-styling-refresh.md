# Styling Refresh

You want to change the styling as part of this move. This doc separates *architecture* (how styles are organized) from *design* (how the site looks), compares options, and recommends a path. Rule from the migration plan applies: **migrate pixel-identical first, restyle second** — the restyle is Phase 7.

## Current state

- `src/global.css` (~225 lines): Josh Comeau reset, `@font-face` for variable Inter, ~120 design tokens (`--primary-color-*`, `--grey-color-*`, `--font-size-*`, code-token colors), `[data-theme='dark']` overrides, including a blanket `img { filter: brightness(0.7) contrast(1.2) }` in dark mode.
- ~30 `*.module.css` files, one per component, consumed as named exports in Qwik components.
- Code blocks styled via Prism-convention `.token.*` selectors mapped to custom properties (`article-content.module.css`).
- Theme = pre-paint inline script setting `data-theme` + `dark-mode` class from `localStorage`/`prefers-color-scheme`.
- Leftovers worth deleting regardless: `#___gatsby`, `#__next`, `#root` selectors (two frameworks ago), duplicated `--grey-color`/`--grey-color-600`.

## Option comparison (style architecture)

| Option | Effort | Fit |
| --- | --- | --- |
| **A. Keep CSS modules as-is** | none | Works in Astro unchanged (Vite). But `.module.css` + class-name imports is unidiomatic in `.astro` files and keeps 30 extra files. |
| **B. Astro scoped `<style>` per component** (recommended) | medium | Idiomatic: styles live inside each `.astro` component, scoped automatically. The 12 MDX-facing `.tsx` components keep their CSS-module files (Preact has no scoped-style equivalent) — a small, contained exception. |
| **C. Tailwind 4 (`@tailwindcss/vite`)** | high | Full rewrite of every component's styling + retokenization. Only worth it if you *want* utility-first authoring; nothing in the current design demands it. |
| **D. Vanilla-extract / CSS-in-TS** | high | Wrong direction for a mostly-static site; adds build complexity Astro just removed. |

**Recommendation: B**, with the token layer modernized as below. C is defensible if you've been wanting Tailwind anyway, but it maximizes visual-regression risk and review surface.

## Recommended design-system modernization

Keep the token *architecture* (custom properties + `data-theme`) — it's the right pattern — but rebuild the token *values* in modern CSS:

1. **`light-dark()` + `color-scheme`** instead of duplicating every token under `[data-theme='dark']`:
   ```css
   :root { color-scheme: light dark; }
   [data-theme='light'] { color-scheme: light; }
   [data-theme='dark']  { color-scheme: dark; }
   :root {
     --text-color: light-dark(oklch(35% 0.01 90), oklch(85% 0.01 250));
   }
   ```
   The existing theme script keeps working untouched — it already sets `data-theme`. Baseline-supported in all evergreen browsers since 2024.
2. **OKLCH color tokens** replacing the HSL soup: define each hue once (`--hue-brand: 95`), derive steps with consistent lightness/chroma ramps. Kills the 9-step hand-tuned grey/dark scales.
3. **Fluid type scale**: replace the 7 fixed `--font-size-*` steps with `clamp()`-based steps; drop the `--bp-*` breakpoint *tokens* (custom properties don't work in media queries anyway — they're dead weight today) in favor of a couple of named container/media queries.
4. **Semantic layer**: keep component code speaking `--text-color`, `--surface`, `--surface-raised`, `--accent`, `--code-*` — only the primitive layer changes. This is what makes the restyle safe: components don't need edits to get the new look, only the token sheet changes.
5. **Reconsider the dark-mode `img` filter** — replace the blanket brightness/contrast filter with per-image handling or `filter: brightness(.85)` only on photographic images.
6. **Cascade layers**: `@layer reset, tokens, base, components` to make the global/scoped interaction explicit.

## Code blocks (the one real migration decision in styling)

Current CSS targets Prism `.token.*` classes. Astro's default highlighter is **Shiki**, which inlines colors as `style=""` attributes — the existing token-variable theming would go dead. Options:

1. **Shiki with `themes: { light, dark }` dual themes** (recommended): pick two built-in themes, wire to `[data-theme]` with the documented CSS snippet. Best highlight quality, zero custom token CSS to maintain — the old `--code-*` vars retire.
2. **Shiki `css-variables` theme**: keeps theming in your own custom properties (`--astro-code-token-keyword` etc.) — closest to today's approach, map old values across.
3. **`syntaxHighlight: 'prism'`**: keeps today's CSS working verbatim. Fine as a temporary parity setting during migration, then switch to 1.

Pragmatic sequence: Prism during migration (pixel parity), Shiki dual themes in the restyle.

⚠️ Astro 7 note: core markdown moved to the Sätteri pipeline; MDX keeps its own processor and both still expose Shiki config, but verify the exact `markdown.syntaxHighlight` / `mdx()` options against the **v7** docs rather than pre-7 blog posts when implementing.

## What the restyle should *not* change

- Theme script mechanism and `data-theme` contract (Playwright `page-theme.spec.ts` pins it).
- Class names / DOM structure emitted by the 12 MDX-facing components — MDX content renders through them, and their CSS-module files are the one place the old styling pattern survives.
- Font strategy (self-hosted variable Inter + `font-display: swap`) — already best practice; optionally add `<link rel="preload">` in `Base.astro`.

## Suggested execution order (Phase 7, after migration is green)

1. Delete legacy selectors + dedupe tokens (no visual change intended; snapshot-verified).
2. Introduce the semantic token layer, aliasing current values (no visual change).
3. Swap primitive values to the new OKLCH/`light-dark()` system — this is the actual redesign commit, reviewed against screenshots per page in both themes.
4. Move component styles into scoped `<style>` blocks opportunistically as components get touched — not a big-bang rewrite.
5. Switch code blocks to Shiki dual themes; delete `--code-*` token CSS.
