# Task: Fix Playwright e2e webServer against Astro 7 preview

**Status:** Blocked — `pnpm test.e2e` cannot run at all
**Found during:** Phase 0/3 type-check cleanup, 2026-09-14

## Problem

Astro 7.3.2's `astro preview` always detaches into a self-managed background
process (trackable via `astro preview status` / `stop` / `logs`), even
without `--background`. `playwright.config.ts`'s `webServer.command: 'npm run
preview'` expects a command that blocks in the foreground; the `npm run
preview` wrapper process exits immediately once the detached server is up,
so Playwright sees its child process die and reports:

```
Error: Process from config.webServer exited early.
```

The server itself is healthy — confirmed manually (`curl localhost:4173/`
returns 200 while the detached process is alive) — this is purely a
process-lifecycle mismatch between Playwright's webServer model and Astro
7's preview command.

Port was also misconfigured (`astro.config.mjs` had no `server`/`preview`
port, defaulting to 4321 against Playwright's hardcoded 4173) — this part is
already fixed via `server: { port: 4173 }, preview: { port: 4173 }` in
`astro.config.mjs`. The detach issue remains.

## Fix

Change `playwright.config.ts`'s `webServer.command` to something that stays
in the foreground and serves `dist/`, instead of `astro preview`. Options:

- A static file server (`npx serve dist -l 4173`, or similar) — simplest,
  decouples e2e from Astro's preview process model entirely.
- Investigate whether a newer/older Astro CLI flag restores foreground
  blocking behavior for `preview`.

## Acceptance

- `pnpm test.e2e` runs against a live server without manual intervention
- No orphaned `astro preview` processes left behind after the test run
  (check with `astro preview status`)
