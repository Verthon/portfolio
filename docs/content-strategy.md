# Content strategy - sordyl.dev

What the blog is arguing about me, and where the evidence is thin. Positioning
for the senior/architect market, not a publishing schedule.

Last reviewed: 2026-09-12.

## Premise

The architect role is shifting away from drawing diagrams and writing all the
code, toward supervising automated processes and designing the structures that
let machines work on a codebase. Four pillars. The blog should show evidence of
all four.

A pillar is proven by a post with my own numbers, my own trade-off, or a
decision I had to defend - not by a post that explains the topic well.

## 1. Harness engineering

Teaching an agent to work to a standard: designing, configuring and improving
the environment models work in. Evidence looks like a harness I built, the
quality gates in it, and what it caught.

Anchor: `blog/prompt-as-string-production-liability` - prompt as a typed,
testable function; hard asserts vs soft checks; a scheduled run against
held-out real tickets to catch behavior drift between model versions.

## 2. System architecture and quality modelling

Agents write most of the implementation; judging whether the result meets the
quality attributes stays human. Evidence looks like an attribute named up
front, then measured.

Anchors: `blog/api-surface-challenges` (every export is a commitment; Hyrum's
Law; modifiability with a cost), `blog/webpack-to-rsbuild-migration` (scripts
package as a seam chosen so the bundler could be swapped without coordinating
30+ teams), `blog/design-system-pitfalls`.

Well covered. `docs/architecture/drivers.md` orders the attributes for this
repo and is unpublished - a candidate, not a gap.

## 3. SDLC optimisation

How software gets built is part of the architecture; a bad process produces
defects and cost. Evidence looks like the loop instrumented before it was
optimised.

Anchors: `dev-bites/vitest-doctor-faster-test-config` (CI 263s -> 115s, 615
files 293s -> 45s locally), `blog/webpack-to-rsbuild-migration` (~20-30% CI
compute, zero rollbacks - and a candid section on failing to capture a
baseline).

Strongest differentiated pillar. The measurement-failure admission carries more
weight than the win.

## 4. Trend analysis

Reading technology trajectories when practices go stale in months, and making
strategic calls from that reading.

The Observatory format is itself the evidence: every note states a Status and a
Recommendation, which makes this a repeatable practice rather than an opinion.

Anchor: `observatory/playwright-component-testing` - "Experimental (since
2022)", recommendation is don't adopt, backed by linked issues and community
threads.

**Gap:** covered for build tooling, empty on the AI axis. Nothing on open vs
commercial models, local vs cloud, or how that choice constrains a system later.
