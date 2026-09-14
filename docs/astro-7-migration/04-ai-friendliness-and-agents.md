# AI-Friendliness Assessment & Agent/Skill Plan

How well this repo works *with* AI tooling today, how the Astro migration changes that, and which agents/skills are worth having before, during and after.

> **Stale as of 2026-09-13.** Written before the `.llm/` → `.agents/skills/`
> migration. `.llm/` no longer exists: agents are now skills in
> `.agents/skills/{content-review,seo,tech-audit,grill}`, symlinked into
> `.claude/skills/`. That closes weaknesses 3 and 4 below and makes the
> "convert to native subagents" section largely done. `blog-context.md` and
> `pre-publish.md` did not survive the move — if their content still matters,
> it needs a home.
>
> `llms.txt` and RSS (the last section) are no longer parked behind the
> migration — `docs/geo-basics-task.md` owns them, with a fallback date.

## Current state — what exists

| Asset | Status |
| --- | --- |
| `AGENTS.md` (canonical) + `CLAUDE.md` → `@AGENTS.md` | ✅ Right pattern: one source of truth, tool-agnostic |
| ~~`.llm/agents/`~~ → `.agents/skills/` | ✅ Now first-class skills, invoked as `/content-review`, `/seo`, `/tech-audit`, `/grill` |
| ~~`.llm/context/blog-context.md`~~ | ❌ Did not survive the migration. `CONTEXT.md` + `docs/content-strategy.md` cover most of it |
| ~~`.llm/checklists/pre-publish.md`~~ | ❌ Gone. `CONTENT.md` "Before publishing" is the remaining stub; still nothing enforces it |
| Guardrails in AGENTS.md | ✅ "Never rewrite content without approval; propose diffs" — exactly right for a solo-author blog |

## Assessment

### Strengths

1. **Content is maximally AI-legible**: colocated MDX, one folder per post, frontmatter with consistent fields, slug = folder name. An agent can enumerate, read, and reason about the entire content corpus with a single glob.
2. **Agent instructions are versioned prose**, not tribal knowledge. The rules section prevents the classic failure mode (agent "improves" your writing).
3. **Small, typed codebase** — fits comfortably in one context window.

### Weaknesses (ranked)

1. **Frontmatter schema has three competing sources of truth**: the runtime type-guard in `mdx-file.ts` (checks 4 fields), the YAML block documented in `content-reviewer.md` (10 fields), and the de-facto shape in the files themselves. An agent can't know which wins. *The migration fixes this for free*: `src/content.config.ts` Zod schemas become the single, machine-readable, build-enforced contract — agents should be pointed there.
2. **Qwik is a low-training-data framework.** `component$`, `Slot`, `$` serialization rules, `routeLoader$` — models hallucinate against Qwik far more than against Astro, which is heavily represented in training data and has first-class docs. The migration is itself the biggest AI-friendliness upgrade available to this repo.
3. ~~**Path bug in all three agent files**~~ — resolved; the files moved and the references went with them.
4. ~~**Agents aren't wired into any harness.**~~ — resolved; they are skills in `.agents/skills/`, symlinked into `.claude/skills/`, invoked as `/content-review`, `/seo`, `/tech-audit`, `/grill`.
5. **No CI enforcement**: audits and the pre-publish checklist run only when the author remembers. Frontmatter validity isn't checked in CI at all today (the type-guard only runs when the listing code executes).
6. **No `llms.txt`** or machine-oriented content index for *consumers* of the site (AI crawlers/answer engines). Now tracked in `docs/geo-basics-task.md` item 4, with the caveat that no provider has committed to consuming it.
7. ~~**`blog-context.md` will lie after the migration**~~ — moot, the file is gone. The risk transferred to `AGENTS.md` / `CONTEXT.md`, which still say nothing about the stack.

## Agent & skill plan

### For the migration itself (temporary)

| Tool | Form | Job |
| --- | --- | --- |
| URL/meta parity checker | plain script (`scripts/verify-parity.ts`) — deterministic checks should be scripts, not agents | Diff built HTML file list + `<head>` of sample posts against the Phase-0 baseline |
| Migration executor | your coding agent following `02-migration-plan.md` phase by phase, one PR per phase | The plan doc *is* the agent instruction — that's why it's structured as numbered, verifiable steps |
| Reviewer | existing code-review tooling on each phase PR | Catch Qwik-isms leaking into Preact ports (`class` vs `className` is fine in Preact; `Slot`, `$` are not) |

### Permanent, post-migration (mostly done — retargeting is what's left)

The move already happened: `.agents/skills/` is the tool-agnostic source,
`.claude/skills/` symlinks it. What remains is retargeting each skill's globs
and checks at cutover:

1. **`seo`** — update globs from `src/routes/**` to `src/content/**`; drop the "required fields exist" checks (Zod now fails the build for those) and keep the *quality* checks (title length, AI-slop words, heading hierarchy, description keyword fit).
2. **`content-review`** — replace its inline YAML schema with "the schema is `src/content.config.ts`; review against it"; keeps voice/structure/consistency checks.
3. **`tech-audit`** — retarget to Astro: check for unused `client:` directives (JS creep), missing `alt`s, oversized images in `public/blogImages`, broken internal links from collections.
4. **New: `pre-publish` skill** (`/pre-publish <slug>`) — the checklist it was meant to run is gone, so this now means writing the gate from scratch: build, seo-auditor on the one file, content-reviewer, link check, OG preview. Turns the unenforced checklist into a gate.
5. **New: `new-post` skill** (`/new-post <section> <title>`) — scaffolds the folder + `index.mdx` with the exact frontmatter and wrapper-component skeleton for that section, pulled from the Zod schema. Removes the main source of frontmatter drift.

### CI (agents shouldn't do what CI can)

- `astro build` in CI now validates every frontmatter field via Zod — free, deterministic, replaces the type-guard unit tests.
- Add `astro check` + link checker to the existing GitHub Actions workflow.
- Keep Playwright a11y-per-page as the accessibility gate (already exists — genuinely good).

### For AI consumers of the published site

**Owned by `docs/geo-basics-task.md` (items 4 and 5) as of 2026-09-13** — they
are no longer parked behind this migration, because parking them here once
already cost six months. That doc sets a fallback: if the migration has not
started by 2026-12-13, they get built in Qwik and the rework gets eaten.

The Astro versions stay trivial and are still the preferred path:

- **`llms.txt`** at build time from the three collections — title, description, URL per entry. An Astro endpoint (`src/pages/llms.txt.ts` → `getCollection()`); no integration dependency needed.
- **RSS** (`@astrojs/rss`) — same data, one more consumer surface; the site currently 404s on `/rss.xml`, `/feed.xml` and `/index.xml`.

## Documentation updates required at cutover

1. `AGENTS.md`: content locations (`src/content/**/index.mdx`), new commands (`astro dev/build`), note that frontmatter schema lives in `src/content.config.ts`.
2. ~~`.llm/context/blog-context.md`~~ — gone. Instead: check `CONTEXT.md`, `CONVENTIONS.md` and each skill in `.agents/skills/` for Qwik-specific assumptions.
3. Add one paragraph to `AGENTS.md` about the component split: "`.astro` everywhere, except the 12 MDX-facing components which are Preact `.tsx` and must keep their exact paths" — this is precisely the kind of non-obvious invariant agents will otherwise "fix".
