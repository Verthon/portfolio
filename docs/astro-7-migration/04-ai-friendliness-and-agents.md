# AI-Friendliness Assessment & Agent/Skill Plan

How well this repo works *with* AI tooling today, how the Astro migration changes that, and which agents/skills are worth having before, during and after.

## Current state — what exists

| Asset | Status |
| --- | --- |
| `AGENTS.md` (canonical) + `CLAUDE.md` → `@AGENTS.md` | ✅ Right pattern: one source of truth, tool-agnostic |
| `.llm/agents/` — seo-auditor, content-reviewer, tech-auditor | ✅ Exists, plain markdown, invoked manually ("Read X and run") |
| `.llm/context/blog-context.md` | ✅ Author/niche/brand context — genuinely useful for content agents |
| `.llm/checklists/pre-publish.md` | ✅ Exists, ❌ nothing enforces it |
| Guardrails in AGENTS.md | ✅ "Never rewrite content without approval; propose diffs" — exactly right for a solo-author blog |

## Assessment

### Strengths

1. **Content is maximally AI-legible**: colocated MDX, one folder per post, frontmatter with consistent fields, slug = folder name. An agent can enumerate, read, and reason about the entire content corpus with a single glob.
2. **Agent instructions are versioned prose**, not tribal knowledge. The rules section prevents the classic failure mode (agent "improves" your writing).
3. **Small, typed codebase** — fits comfortably in one context window.

### Weaknesses (ranked)

1. **Frontmatter schema has three competing sources of truth**: the runtime type-guard in `mdx-file.ts` (checks 4 fields), the YAML block documented in `content-reviewer.md` (10 fields), and the de-facto shape in the files themselves. An agent can't know which wins. *The migration fixes this for free*: `src/content.config.ts` Zod schemas become the single, machine-readable, build-enforced contract — agents should be pointed there.
2. **Qwik is a low-training-data framework.** `component$`, `Slot`, `$` serialization rules, `routeLoader$` — models hallucinate against Qwik far more than against Astro, which is heavily represented in training data and has first-class docs. The migration is itself the biggest AI-friendliness upgrade available to this repo.
3. **Path bug in all three agent files**: they say `Read llm/context/blog-context.md` — the directory is `.llm/` (leading dot). Agents following instructions literally hit a missing file.
4. **Agents aren't wired into any harness.** They're prompt files requiring manual invocation. Claude Code supports native subagents (`.claude/agents/*.md` with frontmatter: model, tools allowlist) and skills — the current files are one frontmatter block away from being first-class.
5. **No CI enforcement**: audits and the pre-publish checklist run only when the author remembers. Frontmatter validity isn't checked in CI at all today (the type-guard only runs when the listing code executes).
6. **No `llms.txt`** or machine-oriented content index for *consumers* of the site (AI crawlers/answer engines) — relevant given the blog's "AI-augmented engineering" positioning.
7. **`blog-context.md` will lie after the migration** ("Stack: Qwik City + MDX") — stale context is worse than none for agents.

## Agent & skill plan

### For the migration itself (temporary)

| Tool | Form | Job |
| --- | --- | --- |
| URL/meta parity checker | plain script (`scripts/verify-parity.ts`) — deterministic checks should be scripts, not agents | Diff built HTML file list + `<head>` of sample posts against the Phase-0 baseline |
| Migration executor | your coding agent following `02-migration-plan.md` phase by phase, one PR per phase | The plan doc *is* the agent instruction — that's why it's structured as numbered, verifiable steps |
| Reviewer | existing code-review tooling on each phase PR | Catch Qwik-isms leaking into Preact ports (`class` vs `className` is fine in Preact; `Slot`, `$` are not) |

### Permanent, post-migration (convert `.llm/agents/` → native subagents)

Keep `.llm/` as the tool-agnostic source and add thin `.claude/agents/` wrappers, or move wholesale — either way, add frontmatter:

1. **`seo-auditor`** — read-only tools; update globs from `src/routes/**` to `src/content/**`; drop the "required fields exist" checks (Zod now fails the build for those) and keep the *quality* checks (title length, AI-slop words, heading hierarchy, description keyword fit).
2. **`content-reviewer`** — replace its inline YAML schema with "the schema is `src/content.config.ts`; review against it"; keeps voice/structure/consistency checks.
3. **`tech-auditor`** — retarget to Astro: check for unused `client:` directives (JS creep), missing `alt`s, oversized images in `public/blogImages`, broken internal links from collections.
4. **New: `pre-publish` skill** (`/pre-publish <slug>`) — runs the checklist in `.llm/checklists/pre-publish.md` end-to-end: build, seo-auditor on the one file, content-reviewer, link check, OG preview. Turns the unenforced checklist into a gate.
5. **New: `new-post` skill** (`/new-post <section> <title>`) — scaffolds the folder + `index.mdx` with the exact frontmatter and wrapper-component skeleton for that section, pulled from the Zod schema. Removes the main source of frontmatter drift.

### CI (agents shouldn't do what CI can)

- `astro build` in CI now validates every frontmatter field via Zod — free, deterministic, replaces the type-guard unit tests.
- Add `astro check` + link checker to the existing GitHub Actions workflow.
- Keep Playwright a11y-per-page as the accessibility gate (already exists — genuinely good).

### For AI consumers of the published site

- Generate **`llms.txt`** (+ optionally `llms-full.txt`) at build time from the three collections — title, description, URL per entry. Trivial with an Astro endpoint (`src/pages/llms.txt.ts` → `getCollection()`); no integration dependency needed.
- Consider an RSS feed (`@astrojs/rss`) while at it — same data, one more consumer surface; the site currently has none.

## Documentation updates required at cutover

1. `AGENTS.md`: content locations (`src/content/**/index.mdx`), new commands (`astro dev/build`), note that frontmatter schema lives in `src/content.config.ts`.
2. `.llm/context/blog-context.md`: stack line → "Astro 7 + MDX"; fix the `llm/` → `.llm/` path bug in all three agent files while touching them.
3. Add one paragraph to `AGENTS.md` about the component split: "`.astro` everywhere, except the 12 MDX-facing components which are Preact `.tsx` and must keep their exact paths" — this is precisely the kind of non-obvious invariant agents will otherwise "fix".
