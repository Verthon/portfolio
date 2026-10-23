# A11y component testing — open

Leftovers from the UI review (closed 2026-10-23). Automated checks cover WCAG
2.2 AA only; design consistency stays a manual review.

## Research: component-level a11y checks

Two AA checks are worth automating: **2.5.8 Target Size (Minimum)**, 24×24px
([W3C](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html);
44px is 2.5.5, AAA), and **2.4.7 Focus Visible**: every focusable element
visible when focused at 375px.

Per-page e2e specs are heavy. The idea is to test the components instead:
unit/integration, plus Playwright component testing on top.

Questions:

- Does Playwright CT's new API (stable since 1.62, see
  `src/content/observatory/playwright-component-testing/`) mount `.astro`
  components, or only the Preact ones? Our note says "anything your dev server
  renders". Verify against an Astro + Preact setup.
- Which checks survive at component level? Target size does (a nav link is
  32px wherever it renders). Off-screen focus is a layout fact: the heading
  anchor is off-screen because of where the heading sits at 375px, so a
  component rendered in isolation may not reproduce it.
- Cost compared with folding both checks into `tests/a11y-per-page.spec.ts`,
  which already loads every page: no new page loads, only more assertions. Is
  "heavy" about runtime or about maintaining per-page specs?
- Run axe on mounted components too, or keep axe page-level only?

## Blocked on the research

**Heading anchor off-screen at 375px.** `.headingLink` sits at `x = -20px`
(`translateX(-150%)`) and its `:focus-visible` reveal is clipped. Touch users
never see it; keyboard users on narrow or zoomed (200–400%) layouts get focus
on an invisible link. Declined 2026-10-22 as rare, but it is a 2.4.7 AA failure,
so a focus check will flag it. Decide fix vs. exclusion when the checks are
designed.

## Not started

- **Table of contents.** The longest post has 10 h2/h3 headings; DESIGN.md has
  no slot for one. Needs UX research first.
- **Real-device checks** (no automation reaches these): font swap and theme
  flash on first paint; iOS Safari `select` styling and touch feel; image
  dimming in dark (`brightness(0.7) contrast(1.2)`) on a post with images.

## Done when

- The research has an answer and the two AA checks run in CI, or are rejected
  with a reason.
- The heading anchor is fixed or excluded from the focus check on purpose.
- Each "Not started" item is done or closed with a reason.
