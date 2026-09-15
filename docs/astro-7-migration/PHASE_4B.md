# Phase 4b: Discovery Surface (Sitemap, RSS, llms.txt)

**Status:** Pending (defer until after Phase 6 cutover)  
**Timeline:** ~2 hours  
**Commit prefix:** `feat: sitemap, RSS, llms.txt`

## Overview

Add discovery surface endpoints to help search engines and LLMs discover and index content. These are static files generated at build time, not runtime endpoints.

## Tasks

- [ ] Install `@astrojs/sitemap` and `@astrojs/rss` dependencies
- [ ] Update `astro.config.mjs` to include sitemap integration
- [ ] Create `src/pages/rss.xml.ts` endpoint
  - Query all posts from blog, devBites, observatory collections
  - Sort by date (newest first)
  - Return RSS feed with title, description, pubDate, link
- [ ] Create `src/pages/llms.txt.ts` endpoint
  - Query all posts from all collections
  - Format as text with title, description, URL per line
  - Return with `Content-Type: text/plain`
- [ ] Update `src/layouts/Base.astro` to include discovery links
  - Add `<link rel="sitemap" href="/sitemap-index.xml" />`
  - Add `<link rel="alternate" type="application/rss+xml" href="/rss.xml" />`
- [ ] Build and verify:
  - `dist/sitemap-index.xml` and `dist/sitemap-0.xml` exist
  - `dist/rss.xml` is valid XML and contains all posts
  - `dist/llms.txt` is valid text and contains entries

## Acceptance

- ✅ `dist/sitemap-index.xml` and `dist/sitemap-0.xml` exist
- ✅ `dist/rss.xml` is valid and contains all posts
- ✅ `dist/llms.txt` is valid and contains entries
- ✅ Discovery links present in Base.astro head
- ✅ No build errors or warnings

## Notes

- Defer until Phase 6 is complete (after cutover verification)
- Dependencies are already in package.json from scaffold (Phase 1)
- If dependencies missing, install with `pnpm add -D @astrojs/sitemap @astrojs/rss`
