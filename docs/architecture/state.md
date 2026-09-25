# As-is state - sordyl.dev

Where the repo stands against `drivers.md`. One line per gap, no prose.

Last checked: 2026-09-25.

| Driver                 | Status                                     | Gap                                       |
| ---------------------- | ------------------------------------------ | ----------------------------------------- |
| Accessibility          | axe runs per sitemap URL, both themes      | manual keyboard/SR pass not done. oxlint a11y covers 7 rules ([0003](./decisions/0003-oxlint-over-eslint.md)) |
| Performance            | responsive AVIF images ([0005](./decisions/0005-images-through-astro-assets.md)), immutable-cached assets, PostHog field vitals ([0006](./decisions/0006-core-web-vitals-are-measured-not-gated.md)) | no lab LCP/CLS runner. Field p75 needs traffic |
| URL stability          | `trailingSlash`, `lastmod`, `check-links` gate the build ([0002](./decisions/0002-published-urls-do-not-break.md)) | accepted: a deliberate delete or rename passes the build. No Search Console |
| Machine discovery      | JSON-LD on all 3 sections, `@id`s build-checked. RSS at `/rss.xml`, build-checked | observatory emits `BlogPosting` for a tracking note. Changing it on indexed pages is a deliberate call |
| Cheap publish loop     | skills in `.agents/skills/`                | no corpus index for content triage        |
| Agent context budget   | migration folder folded into ADRs 2026-09-16 | —                                       |

## GEO

Declined, not missing. Do not re-propose without the trigger named.

- **No `llms.txt`.** Google documents it as unnecessary for AI features and no provider has committed to reading it ([0007](./decisions/0007-ai-crawler-policy.md)).
- **No markdown alternates (`/<section>/<slug>.md`).** No named consumer, and agents that want markdown convert the HTML themselves. If one appears, serve `entry.body` from a route.
- **Posts stay MDX.** `.md` loses AVIF (`<Picture />` is unavailable) and 64 hand-set heading ids would change.
- **No `og:image`.** It is not a ranking signal and posts are not shared. Revisit with one static image if they start being shared.
