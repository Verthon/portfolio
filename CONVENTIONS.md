# CONVENTIONS

Code rules not already enforced automatically. Prettier runs on every agent edit (`.claude/settings.json`); the git pre-commit hook re-checks format, lint, and types on staged files.

Writing and MDX rules live in `CONTENT.md`.

## Files and naming

kebab-case for files and folders. A component is a folder with `<name>.tsx` plus an optional `<name>.module.css`. A test sits next to its source as `<name>.spec.ts`.

## Module layout

`domain/models/` holds types only and imports from no other layer. `application/services/` holds logic, `application/hooks/` holds Qwik resources. `infrastructure/` holds MDX loading, permalinks, storage, browser APIs. `components/` holds the section's Qwik components.

Import across modules with the `~/` alias, never a relative path that leaves the current folder.

## TypeScript

Use `type`, not `interface`. Prefer arrow functions assigned to a `const`. Export components as `export default component$(...)`.

## Styling

CSS Modules only. Import the named class, not the module as a namespace object. Token values live in `src/global.css`; `DESIGN.md` explains which token to reach for and why. Never hardcode a color.

## Testing

Vitest for units (`pnpm test.unit.ci`), Playwright for e2e (`pnpm test.e2e`). `tests/a11y-per-page.spec.ts` runs axe on every page, so a new page must pass it.

## Commits

The human authors the commits. Agents stage nothing and commit nothing unless asked.

Subject line is `type: lowercase summary` — `feat` for a new capability or content, `chore` for everything else.
