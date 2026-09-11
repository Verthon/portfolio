# Token & color cleanup

Audit re-run **2026-09-11** against `src/global.css` (69 declared custom properties) and 33 `.module.css` consumers. Every count below was measured on the current working tree, not carried over from a prior session.

**Framework:** Nathan Curtis / EightShapes ordered levels — namespace → base (category / property / concept) → modifiers (variant / state / scale / mode) — plus the tier split raw value → primitive/generic → semantic/alias → component. Sources: [Naming Tokens in Design Systems](https://medium.com/eightshapes-llc/naming-tokens-in-design-systems-9e86c7444676), [Reimagining a Token Taxonomy](https://medium.com/eightshapes-llc/reimagining-a-token-taxonomy-462d35b2b033). Naming shape compared against [Open Props](https://open-props.style/) — read for its naming, not installed.

**Assessed and rejected:** installing a token skill pack. The only credible candidate is `murphytrueman/design-system-ops` (MIT, ~180★) — 40 skills aimed at production design-system governance, overbuilt for a 69-token blog. No vetted CSS-Modules-aware token skill exists. Hand-written beats installed here. Do not reopen this.

**Good news:** zero hardcoded colors in any `.module.css`. Every color already resolves through a token. The problem is which tier those tokens sit in, not whether they exist.

**Decisions already made** (do not re-ask):

- Type scale: **adopt**. Add the missing steps, repoint all 35 literals.
- Spacing: **adopt**, same treatment — `--space-*` tokens on the scale DESIGN.md already declares.

---

## 1 — `--black-color` is broken and ships to production (P0, do first)

`src/global.css:111`

```css
--black-color: hsl(0, 0, 0%);
```

Unitless `0` is invalid in the saturation slot, so the **entire declaration is dropped**. All six consumers resolve `var(--black-color)` to nothing and silently inherit:

- `src/home/components/hero/hero.module.css:10` — hero name
- `src/home/components/hero/hero.module.css:42`
- `src/common/components/footer/footer.module.css:34` — footer icons
- `src/common/components/nav-item/nav-item.module.css:13` — nav items
- `src/common/components/not-found-page-content/not-found-page-content.module.css:6` — 404 page
- `src/common/components/not-found-page-content/not-found-page-content.module.css:39`

This is not a naming problem. It is a broken token that the "no hardcoded colors" cleanliness hid.

The mechanical fix is `hsl(0, 0%, 0%)` — **do not apply it.** DESIGN.md:261 states "Body text never goes to pure black." Restoring a pure-black token reintroduces a value the design system forbids. Resolve this as part of item 2 by replacing all six references with `--text-strong`, then delete `--black-color` entirely.

---

## 2 — Tier structure is inverted (P1, the actual cleanup)

Exactly **two** semantic tokens exist — `--text-color` and `--heading-color` (`global.css:163-164`) — and they are the only two that alias rather than hold a raw value. Everything else is a primitive.

Measured consequence: **29 direct primitive references from component CSS.** Curtis calls this tier leakage. DESIGN.md:268 already forbids it ("reach for the semantic token; only drop to a raw ramp step when there is no semantic equivalent") — but there is almost never a semantic equivalent, so the rule is unfollowable as written.

### 2.1 Add these five semantic tokens

Define in `:root`, remap in the existing `[data-theme='dark']` block:

| New semantic token                 | Light value                                        | Dark value                         | Absorbs                                  |
| :--------------------------------- | :------------------------------------------------- | :--------------------------------- | :--------------------------------------- |
| `--surface`                        | `var(--white-color)`                               | `var(--dark-color-800)`            | 5 refs — page/hero background            |
| `--text-strong`                    | `var(--dark-color-600)`                            | `var(--grey-color-100)`            | 6 refs — replaces broken `--black-color` |
| `--text-meta`                      | `var(--dark-color-300)`                            | `var(--grey-color-200)`            | 4 refs — article / dev-bite date lines   |
| `--border-subtle`                  | `var(--grey-color-200)`                            | `var(--dark-color-400)`            | 4 refs — footer hairline, card rules     |
| `--link-wash` + `--link-underline` | `var(--primary-color-50)` / `var(--primary-color)` | inherited (already theme-remapped) | 8 refs — inline link treatment           |

Six tokens across five concerns, absorbing **27 of the 29 leaks**. The remaining 2 (`badge.module.css:11` primary-100 background, `footer-socials.module.css:13` dark-700) are genuinely one-off — leave them or judge at the time.

### 2.2 Repoint the leaked references

```
hero.module.css:5      --white-color      -> --surface
hero.module.css:10     --black-color      -> --text-strong
hero.module.css:14     --dark-color-800   -> (delete, see 2.3)
hero.module.css:16     --white-color      -> (delete, see 2.3)
hero.module.css:42     --black-color      -> --text-strong
hero.module.css:77     --grey-color       -> --text-meta
observatory/.../content.module.css:89,90   -> --link-wash / --link-underline
observatory/.../list.module.css:29         -> (delete, see 2.3)
dev-bites/.../dev-bite-content.module.css:89,90 -> --link-wash / --link-underline
dev-bites/.../dev-bite-content.module.css:105   --grey-color-400 -> --border-subtle
dev-bites/.../dev-bite-item.module.css:23  --dark-color-300   -> --text-meta
dev-bites/.../dev-bite-item.module.css:27  --grey-color-200   -> (delete, see 2.3)
blog/.../article-item.module.css:23        --dark-color-300   -> --text-meta
blog/.../article-item.module.css:27        --grey-color-200   -> (delete, see 2.3)
blog/.../article-content.module.css:75,76  -> --link-wash / --link-underline
common/.../footer.module.css:3             --grey-color-200   -> --border-subtle
common/.../footer.module.css:8             --dark-color-400   -> (delete, see 2.3)
common/.../footer.module.css:34            --black-color      -> --text-strong
common/.../nav-item.module.css:13          --black-color      -> --text-strong
common/.../not-found-page-content.module.css:6,39  --black-color -> --text-strong
common/.../footer-socials.module.css:21    --white-color      -> (delete, see 2.3)
common/.../link.module.css:4,5             -> --link-wash / --link-underline
```

### 2.3 Delete the component-level dark-theme overrides

The leakage is _why_ seven component files carry their own `[data-theme='dark']` blocks — each hand-patches a value that a semantic token would remap once. With `--surface`, `--text-strong`, `--text-meta` and `--border-subtle` defined, all seven delete themselves:

- `src/home/components/hero/hero.module.css:13` — re-declares the page background and text color `global.css` already sets on `body`
- `src/home/components/hero/hero.module.css:76`
- `src/observatory/components/list/list.module.css:28`
- `src/dev-bites/components/dev-bite-item/dev-bite-item.module.css:26` — patches date color by hand
- `src/blog/components/article-item/article-item.module.css:26` — same
- `src/common/components/footer/footer.module.css:7`
- `src/common/components/footer-socials/footer-socials.module.css:20`

**This is the cleanup the whole task is actually for.** Items 1, 3 and 5 are hygiene; this is the structural fix.

---

## 3 — Naming: drop `-color`, collapse the duplicates (P1)

Do this **after** item 2 — renaming tokens you are about to delete is wasted work.

### 3.1 The `-color` suffix carries zero information

Curtis's base level is category + property + concept. In `--primary-color`, `primary` is the concept and `color` is the property — but every token in the file is a color, so the property is dead weight. Open Props writes `--gray-6`, `--blue-0`, never `--gray-color-6`.

You pay twice: `--primary-color-800` spends 20 characters to say "primary 800", and it forces the ugly bare-concept form (`--grey-color`, `--dark-color`) for the unnumbered step. **24 of 69 tokens carry the dead suffix.**

Rename `--<name>-color[-<step>]` → `--<name>[-<step>]` across `global.css` and all consumers.

### 3.2 Fix the ramp collisions

Three conflicting conventions in one ramp:

```css
--grey-color: hsl(206.7, 11.7%, 80.1%); /* global.css:150 — bare */
--grey-color-600: hsl(
  206.7,
  11.7%,
  80.1%
); /* global.css:151 — identical value, second name */
--dark-color: hsl(
  60,
  3.1%,
  25.1%
); /* global.css:158 — bare, value BETWEEN -500 and -600 */
```

- `--grey-color` / `--grey-color-600` are **exact duplicates**, and both are in use — `hero.module.css:77` takes the bare form, `list.module.css:29` the numbered one. Collapse to `--grey-600`. (Both call sites are already being repointed to `--text-meta` in 2.2, so this may resolve itself.)
- `--dark-color` holds 25.1%, which slots between `--dark-color-500` (27.75%) and `--dark-color-600` (20.6%) — an unnumbered rung in the middle of the ramp. It is also **dead, zero usages**. Delete it.

The grey ramp runs 50→800 skipping 700; the dark ramp runs 100→800 complete. Curtis's scale modifier is fine at 50/100/200 — but it must be one scheme with no bare-name escape hatch.

---

## 4 — Adopt the type scale (P2) — DECIDED

**35 literal `font-size` declarations** across the modules, against a `--font-size-*` scale where **6 of 7 steps are dead** (only `--font-size-sm` is used, 3 times). Four literal values have no corresponding token. DESIGN.md describes a system the CSS never adopted.

Replace the current 7 steps with:

```css
--font-size-xs: 0.75rem;
--font-size-sm: 0.875rem;
--font-size-md: 1rem;
--font-size-lg: 1.125rem; /* new — absorbs 1.1rem, see below */
--font-size-xl: 1.25rem;
--font-size-2xl: 1.5rem;
--font-size-3xl: 1.75rem;
--font-size-4xl: 2rem;
--font-size-5xl: 2.25rem; /* new */
```

Note the renumbering: the old `--font-size-xxl` (1.75rem) and `--font-size-2xl` (2rem) are replaced by `-3xl` and `-4xl`. Neither old name is in use, so nothing breaks.

**Collapse `1.1rem` and `1.125rem` into `--font-size-lg`.** They are 2px apart at root size — two tokens for an invisible difference is exactly the kind of scale pollution this cleanup is removing. Off-scale consumers:

```
hero.module.css:34          1.1rem   -> --font-size-lg
hero.module.css:89          1.1rem   -> --font-size-lg
nav-item.module.css:12      1.1rem   -> --font-size-lg
dev-bite-item.module.css:34 1.125rem -> --font-size-lg
article-item.module.css:34  1.125rem -> --font-size-lg
nav-item.module.css:16      1.4rem   -> --font-size-xl (1.25rem) or --font-size-2xl (1.5rem) — judgment call, single usage
hero.module.css:47,53,60    2.25rem  -> --font-size-5xl
observatory/header.module.css:9   2.25rem -> --font-size-5xl
dev-bite-header.module.css:9      2.25rem -> --font-size-5xl
article-header.module.css:9       2.25rem -> --font-size-5xl
```

`1.4rem` is the only genuine judgment call — one usage, sits between two steps. Pick one, do not add a token for it.

Then repoint the remaining on-scale literals (`2rem`×5, `1rem`×5, `0.875rem`×4, `1.25rem`×3, `0.75rem`×3, `1.75rem`×2, `1.5rem`×1) to their matching tokens. Target: **35 literals → 0.**

Update the typography section of DESIGN.md to match the final step names.

---

## 5 — Adopt spacing tokens (P2) — DECIDED

**No spacing tokens exist at all**, though DESIGN.md:115 declares a 4/8/16/32/48/64px scale. There are ~84 literal rem values on `padding` / `margin` / `gap` in the modules, most of them already on that scale.

Add, matching the scale DESIGN.md already documents:

```css
--space-xs: 0.25rem; /*  4px */
--space-sm: 0.5rem; /*  8px */
--space-md: 1rem; /* 16px */
--space-lg: 2rem; /* 32px */
--space-xl: 3rem; /* 48px */
--space-2xl: 4rem; /* 64px */
```

On-scale literal counts these absorb: `1rem`×17, `2rem`×13, `0.5rem`×13, `3rem`×10, `4rem`×3, `0.25rem`×5.

Values above the scale — `8rem`×6, `6rem`×2, `5rem`×4 — are page-level layout, not component spacing. Either extend the scale (`--space-3xl: 5rem`, `--space-4xl: 6rem`, `--space-5xl: 8rem`) or leave them literal and say so in DESIGN.md. Pick one and be consistent; do not leave it ambiguous.

Off-scale outliers, each needs a call:

```
list.module.css:12              margin-bottom: 1.25rem    -> --space-md (1rem) or --space-lg
list.module.css:24              margin-inline-start: 0.3rem -> --space-xs (0.25rem)
dev-bite-content.module.css:109 padding: 0.75rem 1rem ...  -> --space-sm / --space-md
dev-bite-item.module.css:33     gap: 0.875rem              -> --space-md
article-item.module.css:33      gap: 0.875rem              -> --space-md
nav.module.css:10               gap: 0.75rem               -> --space-sm or --space-md
```

Six outliers, all within a few px of a real step. Snap them to the scale rather than adding tokens.

---

## 6 — Delete the phantom tokens (P3)

Two different failure modes, both residue from a previous project.

### 6.1 Component tokens for components that do not exist

All zero usages. DESIGN.md itself admits "the site has almost no buttons", and there are no shadows in the content flow by design.

```
--button-padding-xxs, -xs, -sm, -md, -lg   (global.css:138-142)
--shadow, --shadow-light                    (global.css:135-136)
--error-box-color, --error-box-text-color   (global.css:113-114)
--success-text                              (global.css:115)
--default-radius                            (global.css:116)
```

Also dead in the ramps: `--grey-color-50`, `--grey-color-300`, `--grey-color-500`, `--grey-color-800`, `--dark-color-100`, `--dark-color-200`, `--dark-color-500`, `--dark-color`, `--secondary-color`, `--secondary-color-800`, `--info-color`, `--info-color-900`, `--danger-color`, `--primary-color-900`.

Keep the ramp steps only if you intend the ramp to be complete and documented as such — otherwise delete. Do not keep a step "just in case"; that is how you got 37 dead tokens.

### 6.2 Breakpoint tokens are unusable by construction

6 of 8 unused. The two that _are_ referenced sit inside `@media`, where custom properties **do not resolve** — so these never match:

- `src/common/components/nav-item/nav-item.module.css:6` — `@media screen and (min-width: var(--bp-xxlarge))`
- `src/common/components/nav-item/nav-item.module.css:15` — `@media screen and (min-width: var(--bp-xsmall))`

This is dead _code_, not just dead tokens — two style blocks that have never applied. Deleting them changes rendering; check what those blocks were meant to do before removing, and either hardcode the breakpoint value or drop the rule deliberately.

DESIGN.md documents this limitation correctly and the CSS then violates it twice. Either delete all `--bp-*` tokens and hardcode breakpoints, or keep them solely as documentation and say so explicitly.

---

## Order of work

1. **Item 1** folded into item 2 — six components render the wrong color today.
2. **Item 2** — add the semantic tier, repoint 27 refs, delete 7 component `[data-theme]` blocks.
3. **Item 3** — drop `-color`, collapse `--grey-color` → `--grey-600`, delete `--dark-color`.
4. **Item 4** — adopt the type scale, 35 literals → 0.
5. **Item 5** — adopt spacing tokens.
6. **Item 6** — delete phantom tokens and the two dead media queries.

Rationale for 2-before-3: renaming tokens you are about to delete is wasted work. Rationale for 6-last: it is the only item where deleting changes rendering (the media queries), so do it when nothing else is in flight.

Items 1-3 are mechanical and touch ~15 files.

## Verification

After each item:

```bash
pnpm test.unit.ci
pnpm test.e2e          # tests/a11y-per-page.spec.ts runs axe on every page
```

Contrast matters here — `--text-meta` and `--text-strong` change rendered colors in both themes, and axe checks contrast. Re-run the a11y suite after item 2, not just at the end.

Dead-token check:

```bash
for t in $(grep -oE '^\s+--[a-z0-9-]+' src/global.css | tr -d ' ' | sort -u); do
  n=$(grep -roh "var($t)" src --include="*.css" | wc -l | tr -d ' ')
  [ "$n" = "0" ] && echo "DEAD: $t"
done
```

Should print nothing when the task is complete, except for tokens you deliberately kept and documented.

## Also update

`DESIGN.md` — the "Semantic vs. palette tokens" section (line 264) currently describes a two-token semantic tier and instructs readers to drop to raw ramp steps. After item 2 that advice is wrong. Rewrite it to list the full semantic tier and state that dropping to a ramp step is a bug, not a fallback.
