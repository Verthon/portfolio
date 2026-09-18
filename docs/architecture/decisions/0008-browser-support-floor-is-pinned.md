# 0008 — The browser support floor is pinned, not inherited

Decided 2026-09-18.

## Decision

The supported floor is **Chrome 107, Edge 107, Firefox 104, Safari 16.0**, declared
once in `astro.config.mjs` and applied to both JavaScript and CSS:

```js
const BROWSER_TARGET = ['chrome107', 'edge107', 'firefox104', 'safari16']

vite: {
  build: { target: BROWSER_TARGET, sourcemap: ANALYZE },
  css: { target: BROWSER_TARGET },
}
```

These are the versions Vite 8's default `build.target` of
[`'baseline-widely-available'`](https://vite.dev/config/build-options.html#build-target)
resolved to on the day this was written. The floor did not move. Only its
*declaration* did.

Astro has no browser-target option of its own; its config reference for
[`vite`](https://docs.astro.build/en/reference/configuration-reference/#vite)
defers to vite.dev. `tsconfig.json`'s `"target": "ES2020"` governs type-checking
and `tsc` emit only — Astro bundles through Vite and ignores it. So before this,
nothing in the repo stated what the site supports.

## Why pin rather than inherit the default

`'baseline-widely-available'` is a *moving* target. It re-resolves as Baseline
advances with each Vite release, so `pnpm update` could raise the floor with no
diff, no changelog entry here, and no test that would notice. For a site where
*published URLs don't break* is a driver, a supported-browser floor that changes
without a commit is the wrong shape.

## What pinning caught

This was expected to be a no-op. It was not. The JS output is byte-identical
(all three `dist/_astro/*.js` hashes unchanged — and per ADR 0006 none of them
are referenced by any page anyway), but the CSS grew 5,844 → 5,988 bytes, and
every byte of that difference was a real bug being shipped:

| Emitted before | Emitted now | Why it mattered |
| --- | --- | --- |
| `@media (width>=768px)` | `@media (min-width:768px)` | Range syntax is Safari **16.4**, not 16.0 |
| `[data-theme=dark]{…&img{…}}` | `[data-theme=dark] img{…}` | Bare `&` nesting is Safari **17** |
| `text-decoration:` | `-webkit-text-decoration:` + unprefixed | Safari shorthand prefix |

The first two were live failures on Safari 16.0–16.3. An unsupported at-rule
prelude invalidates the whole block, so on those versions **every responsive
breakpoint was dropped** (mobile layout at all widths) and the
`[data-theme="dark"]` custom-property block was discarded (dark mode lost its
tokens).

The cause is the opposite of the obvious one. The source is conservative —
every media query in `src/` is hand-written as `(min-width: 768px)`, and
`grep -rn 'width *[<>]=' src/` is empty. **Lightning CSS was rewriting correct
CSS into newer syntax as a minification win**, because the unpinned default let
it believe the floor was high enough. The default was internally inconsistent:
it claimed Safari 16.0 and emitted Safari 16.4+ output.

`src/styles/global.css:171` is the one piece of genuine nesting in source (an
`img` rule inside `[data-theme="dark"]`); it now flattens instead of emitting `&`.

## What this costs

144 bytes of CSS, once, on a file that is already inlined per page. Against a
dark mode and a responsive layout that actually work on a browser we claim to
support, this is not a trade worth thinking about.

The real cost is that the floor is now a number someone has to revisit
deliberately. That is the point, but it does mean it will go stale — it is a
literal, so it will never rise on its own. Revisit when there is traffic data to
justify raising it, not on a schedule.

## What this does not do

**It is a transform target, not a lint.** It downlevels what it can; it does not
warn when source uses something below the floor. Nothing in the build fails if a
component starts using `:has()` or `color-mix()` — they would simply be emitted
as-is and break in Safari 16. As of this decision the output contains no
`:has()`, `color-mix()`, `light-dark()`, `oklch()`, `@container`, or `@layer`, so
there is headroom, but no guard.

This is the same posture as ADR 0006: measured, not gated. A CSS-feature
tripwire on `dist/` would fit the `src/build-checks/` shape if one is ever
wanted.

## What else was considered

**`@vitejs/plugin-legacy`** — the `nomodule` + polyfill path for genuinely old
browsers. Rejected without much thought: it ships a duplicate legacy bundle into
every visitor's cache, directly against the *Core Web Vitals stay high* driver,
to serve a population this site has no evidence of having.

**A single coarse literal (`target: 'es2022'`)** — easier to read, but it
constrains JS syntax only and says nothing about CSS, so `css.target` would need
a separate value and the two could silently drift apart. Given that every problem
found here was a CSS problem, one shared constant is the safer shape.

**Raising the floor to the 2024 line** (Safari 17, Chrome 111) — would unlock
`:has()`, `color-mix()`, `@container` and `light-dark()` as safe to use. Deferred:
none of them are used today, and there is no analytics data to justify dropping
Safari 16 yet. That data is the missing input, not the decision.
