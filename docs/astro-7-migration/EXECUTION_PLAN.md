# Astro 7 Migration — Execution Plan

**Status:** Ready to execute  
**Approach:** Single switch, main-branch commits (no feature branches)  
**Timeline:** ~7–10 working days, one phase per commit cycle

---

## Overview

The migration moves `sordyl.dev` from Qwik City 1.19 to Astro 7, using Preact for the 12 MDX-facing components (zero JavaScript to the browser) and `.astro` for everything else. Content lives in collections; URLs do not change; all three sections (blog, dev-bites, observatory) survive intact.

Each phase below ends in a buildable, testable state. Commits land directly to `master` once tests pass; no staging branches.

---

## Phase 0: Baseline (∼1 hour)

**Commit message prefix:** `chore: baseline URLs and meta for Astro migration`

**Who commits:** You (human author)

### Steps

1. **Capture URL inventory**
   ```bash
   pnpm build
   find dist -name '*.html' | sort > docs/astro-7-migration/url-baseline.txt
   ```

2. **Capture meta parity baseline**  
   Save the rendered `<head>` section of three representative posts (one per section) to `docs/astro-7-migration/meta-baseline.txt` for diffing after Phase 4. Include:
   - One featured blog post (most complex frontmatter)
   - One dev bite
   - One observatory note

3. **Verify Playwright suite is green**
   ```bash
   pnpm test.e2e
   ```

4. **Add smoke test** (in `tests/` alongside existing specs)
   - Assert every baseline URL returns 200
   - Assert every post page contains an `<h1>` (heading presence gate)

### Acceptance
- `url-baseline.txt` exists and contains 31+ HTML files
- All Playwright tests pass
- Smoke test added and passes

---

## Phase 1: Scaffold (∼1 hour)

**Commit message prefix:** `chore: Astro 7 scaffolding and core config`

**Who commits:** You (human author)

### Steps

1. **Init Astro in a scratch location, then copy in**
   ```bash
   cd /tmp && pnpm create astro@latest astro-scaffold
   # Choose: minimal template, yes to TypeScript, no to git init, no to install
   cd /tmp/astro-scaffold
   ```
   Copy `astro.config.mjs`, `tsconfig.json`, `.gitignore` updates into the repo's root.

2. **Install integrations**
   ```bash
   pnpm astro add mdx preact
   ```
   Do NOT add Netlify adapter; we ship `output: 'static'` with plain `netlify.toml`.

3. **Configure `astro.config.mjs`**
   ```javascript
   export default defineConfig({
     site: 'https://sordyl.dev',
     trailingSlash: 'never',
     output: 'static',
     integrations: [
       mdx({
         syntaxHighlight: 'prism', // or shiki with CSS vars; see styling doc
         optimize: true,
       }),
       preact({
         compat: true, // Allows class syntax in Preact components
       }),
     ],
   });
   ```

4. **Update `tsconfig.json`**
   ```json
   {
     "compilerOptions": {
       "paths": {
         "~/*": ["./src/*"]
       }
     }
   }
   ```

5. **Update `package.json` scripts** (preview only; don't run yet)
   ```json
   {
     "scripts": {
       "dev": "astro dev",
       "build": "astro build",
       "preview": "astro preview",
       "fmt": "prettier --write 'src/**/*.{ts,tsx,astro,md,mdx}'",
       "lint": "eslint 'src/**/*.{ts,tsx,astro}'"
     }
   }
   ```

6. **Create a stub `src/pages/index.astro`** (enough to pass `astro build`)
   ```astro
   ---
   ---
   <html>
     <head><title>Home</title></head>
     <body>Placeholder</body>
   </html>
   ```

7. **Move `src/global.css` to `src/styles/global.css`**  
   Keep all design tokens; they're framework-agnostic.

### Acceptance
- `astro build` succeeds
- `dist/index.html` exists (even if it's the stub)
- TypeScript compiles with no errors
- `pnpm install` resolves all new deps

### Lockfile Handling
**Commit `pnpm-lock.yaml` with all other changes.** It locks exact versions and is required for reproducible builds.

```bash
git add .
git commit -m "chore: Astro 7 scaffolding and core config"
```

---

## Phase 2: Content Collections (∼2 hours)

**Commit message prefix:** `feat: migrate content to Astro collections`

**Who commits:** You (human author)

### Steps

1. **Create `src/content/` directory**
   ```bash
   mkdir -p src/content/{blog,dev-bites,observatory}
   ```

2. **Move MDX files with git to preserve history**
   ```bash
   git mv src/routes/blog/* src/content/blog/
   git mv src/routes/dev-bites/* src/content/dev-bites/
   git mv src/routes/observatory/* src/content/observatory/
   ```
   **Critical:** Use `git mv`, not `cp` + `rm`. This preserves blame history.

3. **Create `src/content.config.ts`**
   ```typescript
   import { defineCollection, z } from 'astro:content';
   import { glob } from 'astro/loaders';

   const blog = defineCollection({
     loader: glob({
       base: './src/content/blog',
       pattern: '**/index.mdx',
       generateId: ({ entry }) => entry.replace('/index.mdx', ''),
     }),
     schema: z.object({
       title: z.string(),
       description: z.string(),
       date: z.coerce.date(),
       excerpt: z.string(),
       tags: z.string(), // comma-separated, as today
       published: z.boolean().default(false),
       article_type: z.enum(['featured', 'regular']).default('regular'),
       value_proposition: z.string().optional(),
       og_title: z.string().optional(),
       og_description: z.string().optional(),
     }),
   });

   const devBites = defineCollection({
     loader: glob({
       base: './src/content/dev-bites',
       pattern: '**/index.mdx',
       generateId: ({ entry }) => entry.replace('/index.mdx', ''),
     }),
     schema: z.object({
       title: z.string(),
       description: z.string(),
       date: z.coerce.date(),
       excerpt: z.string(),
       tags: z.string(),
       published: z.boolean().default(false),
       dev_bite_type: z.enum(['featured', 'regular']).default('regular'),
       last_updated: z.coerce.date().optional(),
       og_title: z.string().optional(),
       og_description: z.string().optional(),
     }),
   });

   const observatory = defineCollection({
     loader: glob({
       base: './src/content/observatory',
       pattern: '**/index.mdx',
       generateId: ({ entry }) => entry.replace('/index.mdx', ''),
     }),
     schema: z.object({
       title: z.string(),
       description: z.string(),
       date: z.coerce.date(),
       excerpt: z.string(),
       tags: z.string(),
       published: z.boolean().default(false),
       status: z.string(),
       recommendation: z.string(),
       og_title: z.string().optional(),
       og_description: z.string().optional(),
     }),
   });

   export const collections = { blog, devBites, observatory };
   ```

4. **Update `astro.config.mjs`** to enable collections
   ```javascript
   import { defineConfig } from 'astro/config';
   import mdx from '@astrojs/mdx';
   import preact from '@astrojs/preact';

   export default defineConfig({
     site: 'https://sordyl.dev',
     trailingSlash: 'never',
     output: 'static',
     integrations: [
       mdx({ syntaxHighlight: 'prism', optimize: true }),
       preact({ compat: true }),
     ],
   });
   ```

5. **Verify no MDX files were edited**  
   ```bash
   git diff src/content/
   # Should show only renames, no content changes
   ```

### Acceptance
- `astro build` succeeds without errors on frontmatter
- All 31 MDX files are in `src/content/` with untouched contents
- `src/content.config.ts` passes TypeScript check
- No files show as edited, only renamed

---

## Phase 3: Components (∼1–2 days)

**Commit message(s):** Multiple; see substeps

**Who commits:** You (human author)

### 3a: Port MDX-facing Preact components

**Commit prefix:** `feat: port MDX components to Preact`

Port these 12 components from Qwik to Preact (keep paths and CSS module names identical):

**Common:**
- `src/common/components/heading/heading.tsx`
- `src/common/components/alert/alert.tsx`

**Blog:**
- `src/blog/components/article-wrapper/article-wrapper.tsx`
- `src/blog/components/article-header/article-header.tsx`
- `src/blog/components/article-content/article-content.tsx`
- `src/blog/components/article-image/article-image.tsx`

**Dev Bites:**
- `src/dev-bites/components/dev-bite-wrapper/dev-bite-wrapper.tsx`
- `src/dev-bites/components/dev-bite-header/dev-bite-header.tsx`
- `src/dev-bites/components/dev-bite-content/dev-bite-content.tsx`

**Observatory:**
- `src/observatory/components/wrapper/wrapper.tsx`
- `src/observatory/components/header/header.tsx`
- `src/observatory/components/content/content.tsx`

**Per component:**
1. Remove `component$(...)` wrapper; convert to plain `export default function Component(props) { ... }`
2. Replace `<Slot />` with `{children}`
3. Replace `class` with `className` (Preact compatibility)
4. Import CSS module as `import styles from './component.module.css'`; use `styles.className`
5. Remove any `useSignal`, `useTask$`, `useResource$` (these components are all presentation)
6. Test: `import heading from '~/common/components/heading/heading'` should resolve

Commit each large component separately if it's > 100 lines of porting work; bundle smaller ones.

### 3b: Build shell components in `.astro`

**Commit prefix:** `feat: Astro shell components`

Create these `.astro` files (no Preact, no hydration):

**Base layout** (`src/layouts/Base.astro`):
```astro
---
import { AstroSeo } from 'astro-seo';

interface Props {
  title: string;
  description: string;
}

const { title, description } = Astro.props;
---

<!doctype html>
<html lang="en" data-theme="light">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>{title}</title>
    <meta name="description" content={description} />
    <link rel="icon" href="/favicon.ico" sizes="any" />
    <link rel="icon" href="/icon.svg" type="image/svg+xml" />
    <link rel="canonical" href={Astro.url} />
    <link rel="preload" href="/fonts/InterVar.woff2" as="font" type="font/woff2" crossorigin />
    <script is:inline>
      const theme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
      document.documentElement.dataset.theme = theme;
    </script>
    <link rel="stylesheet" href="/src/styles/global.css" />
  </head>
  <body>
    <slot />
  </body>
</html>
```

**Navigation** (`src/components/nav/nav.astro`):
Keep this minimal — just the header and nav structure. No server logic yet.

**Footer** (`src/components/footer/footer.astro`):
Footer markup.

**Article layout** (`src/layouts/Article.astro`):
```astro
---
interface Props {
  title: string;
  description: string;
  og_title?: string;
  og_description?: string;
  date: Date;
}

const { title, description, og_title, og_description, date } = Astro.props;
---

<meta property="og:type" content="article" />
<meta property="og:title" content={og_title || title} />
<meta property="og:description" content={og_description || description} />
<meta property="article:published_time" content={date.toISOString()} />
<article>
  <slot />
</article>
```

**404** (`src/pages/404.astro`):
Simple 404 page.

### 3c: Theme toggler as inline script

**Commit prefix:** `chore: theme toggler as Astro inline script`

Remove Qwik theme script; add a new `src/components/theme-toggler.astro`:
```astro
<button id="theme-toggle" aria-label="Toggle theme">
  <span class="icon-light">☀️</span>
  <span class="icon-dark">🌙</span>
</button>

<script is:inline>
  const toggle = document.getElementById('theme-toggle');
  toggle.addEventListener('click', () => {
    const current = document.documentElement.dataset.theme;
    const next = current === 'light' ? 'dark' : 'light';
    document.documentElement.dataset.theme = next;
    localStorage.setItem('theme', next);
  });
</script>
```

### Acceptance
- All 12 MDX components pass TypeScript check
- All `.astro` files have closed tags and valid syntax
- `astro build` succeeds
- `import heading from '~/common/components/heading/heading'` resolves in a test file
- Theme script runs without errors in browser

---

## Phase 4: Pages (∼4 hours)

**Commit message prefix:** `feat: collection-driven pages and listing routes`

**Who commits:** You (human author)

### 4a: Dynamic post pages

Create `src/pages/blog/[slug].astro`:
```astro
---
import { getCollection, render } from 'astro:content';
import Article from '~/layouts/Article.astro';
import Base from '~/layouts/Base.astro';

export async function getStaticPaths() {
  const posts = await getCollection('blog');
  return posts.map(post => ({
    params: { slug: post.id },
    props: { post },
  }));
}

const { post } = Astro.props;
const { Content } = await render(post);
---

<Base title={post.data.title} description={post.data.description}>
  <Article {...post.data}>
    <Content />
  </Article>
</Base>
```

Repeat for `src/pages/dev-bites/[slug].astro` and `src/pages/observatory/[slug].astro`.

### 4b: Listing pages

Create `src/pages/blog/index.astro`:
```astro
---
import { getCollection } from 'astro:content';
import Base from '~/layouts/Base.astro';

const allPosts = await getCollection('blog');
const featured = allPosts
  .filter(post => post.data.article_type === 'featured')
  .sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
const regular = allPosts
  .filter(post => post.data.article_type !== 'featured')
  .sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
---

<Base title="Blog" description="Technical posts on frontend, architecture, and DX">
  <h1>Blog</h1>
  {featured.length > 0 && (
    <section>
      <h2>Featured</h2>
      {featured.map(post => (
        <a href={`/blog/${post.id}`}>{post.data.title}</a>
      ))}
    </section>
  )}
  <section>
    {regular.map(post => (
      <a href={`/blog/${post.id}`}>{post.data.title}</a>
    ))}
  </section>
</Base>
```

Repeat for dev-bites and observatory sections.

### 4c: Homepage

Create `src/pages/index.astro`:
```astro
---
import { getCollection } from 'astro:content';
import Base from '~/layouts/Base.astro';

const blogs = await getCollection('blog');
const featured = blogs.filter(b => b.data.article_type === 'featured');
---

<Base title="Krzysztof Sordyl" description="Technical blog on frontend, architecture, and developer experience">
  <h1>Home</h1>
  <section>
    <h2>Featured</h2>
    {featured.map(post => (
      <a href={`/blog/${post.id}`}>{post.data.title}</a>
    ))}
  </section>
</Base>
```

### 4d: Static assets

- Copy `public/fonts/` → `public/fonts/`
- Copy `public/blogImages/` → `public/blogImages/`
- Ensure `public/robots.txt`, `public/_headers`, `public/manifest.json` exist
- Move/verify favicon files in `public/`

### Acceptance
- `astro build` succeeds
- `dist/blog/`, `dist/dev-bites/`, `dist/observatory/` exist with correct file counts
- `dist/blog/index.html` contains featured rail
- All baseline URLs from Phase 0 exist in `dist/`
- No 404 errors in build log

---

## Phase 4b: Discovery Surface (∼2 hours)

**Commit message prefix:** `feat: sitemap, RSS, llms.txt`

**Who commits:** You (human author)

### 4b-i: Sitemap

Add to `astro.config.mjs`:
```javascript
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://sordyl.dev',
  integrations: [
    // ... other integrations
    sitemap(),
  ],
});
```

Add to `src/layouts/Base.astro`:
```astro
<link rel="sitemap" href="/sitemap-index.xml" />
```

### 4b-ii: RSS

Create `src/pages/rss.xml.ts`:
```typescript
import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const blog = await getCollection('blog');
  const bites = await getCollection('devBites');
  const observatory = await getCollection('observatory');
  
  const all = [...blog, ...bites, ...observatory]
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime());

  return rss({
    title: 'sordyl.dev',
    description: 'Technical blog on frontend, architecture, and developer experience',
    site: context.site,
    items: all.map(post => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      link: `/${post.collection}/${post.id}/`,
    })),
  });
}
```

Add to `src/layouts/Base.astro`:
```astro
<link rel="alternate" type="application/rss+xml" href="/rss.xml" />
```

### 4b-iii: llms.txt

Create `src/pages/llms.txt.ts`:
```typescript
import { getCollection } from 'astro:content';

export async function GET(context) {
  const blog = await getCollection('blog');
  const bites = await getCollection('devBites');
  const observatory = await getCollection('observatory');
  
  const all = [...blog, ...bites, ...observatory]
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime());

  const lines = all.map(post => 
    `- ${post.data.title}: https://sordyl.dev/${post.collection}/${post.id}/\n  ${post.data.description}`
  ).join('\n\n');

  return new Response(lines, {
    headers: { 'Content-Type': 'text/plain' },
  });
}
```

### 4b-iv: Canonicals

Verify `src/layouts/Base.astro` has:
```astro
<link rel="canonical" href={Astro.url} />
```

Test: Build and verify `dist/rss.xml` and `dist/llms.txt` exist and parse correctly.

### Acceptance
- `dist/sitemap-index.xml` and `dist/sitemap-0.xml` exist
- `dist/rss.xml` is valid and contains all posts
- `dist/llms.txt` is valid and contains entries
- Canonicals point to the correct site URL

---

## Phase 5: Cleanup (∼2 hours)

**Commit message prefix:** `chore: remove Qwik and old infrastructure`

**Who commits:** You (human author)

### Steps

1. **Delete Qwik deps and config**
   ```bash
   rm -rf src/entry.* src/root.tsx src/service-worker.ts src/adapters/ src/*/application/ src/*/infrastructure/ src/*/domain/
   rm -f qwik.env.d.ts cypress/ .vscode/qwik*
   ```

2. **Update `package.json`**
   Remove these devDependencies:
   - `@builder.io/qwik`
   - `@builder.io/qwik-city`
   - `eslint-plugin-qwik`

   Add:
   - `@astrojs/rss` (if not already added)
   - `@astrojs/sitemap` (if not already added)
   - `@astrojs/check` (optional, for `astro check`)
   - `prettier-plugin-astro`

   Keep:
   - `@typescript-eslint/*`, `eslint`, `prettier`, `vitest`, `@playwright/test`, `knip`

3. **Update ESLint config**
   If using `.eslintrc.json`:
   ```json
   {
     "extends": ["eslint:recommended", "plugin:@typescript-eslint/recommended", "plugin:astro/recommended"],
     "parser": "@typescript-eslint/parser",
     "plugins": ["@typescript-eslint", "astro"],
     "overrides": [
       {
         "files": ["*.astro"],
         "parser": "astro-eslint-parser",
         "parserOptions": { "parser": "@typescript-eslint/parser" }
       }
     ]
   }
   ```

4. **Update `prettier.config.mjs`** to include Astro plugin
   ```javascript
   export default {
     plugins: ['prettier-plugin-astro'],
     overrides: [
       {
         files: '*.astro',
         options: { parser: 'astro' },
       },
     ],
   };
   ```

5. **Update CI workflow** (`.github/workflows/test.yml` or similar)
   Add:
   ```yaml
   - run: pnpm exec astro check
   ```
   alongside existing lint and build steps.

6. **Verify `knip` still works**
   ```bash
   pnpm scan.deadcode
   ```
   It should not report false positives on Astro files; if it does, update `knip.json`.

### Acceptance
- `pnpm install` succeeds
- No Qwik references in `package.json`
- ESLint passes on all Astro files
- Prettier formats `.astro` files correctly
- TypeScript compiles with no errors

---

## Phase 6: Verification & Cutover (∼4 hours)

**Commit message prefix:** `chore: migration verification and cutover`

**Who commits:** You (human author)

### 6a: URL parity

```bash
pnpm build
new_urls=$(find dist -name '*.html' | sort)
diff docs/astro-7-migration/url-baseline.txt <(echo "$new_urls")
```
Should show only additions (sitemap, RSS, llms.txt); no deletions.

### 6b: Run full test suite

```bash
pnpm test.unit.ci
pnpm test.e2e
```

**Expected failures:**
- Any test importing from `src/blog/application/services/` (deleted in Phase 2)
- Any test that hardcodes Qwik component selectors

**Fix:** Remove/update affected tests. The specs that verified `mdx-file.ts` and `article.ts` should be deleted (Zod + Astro now own that job).

### 6c: Meta parity diff

1. Build and serve locally: `pnpm dev`
2. Visit three sample posts (one per section)
3. Capture rendered `<head>` from each
4. Diff against `meta-baseline.txt` from Phase 0

**Expected changes:**
- `<meta name="generator" content="Astro">` appears
- `<link rel="sitemap">` and `<link rel="alternate">` now present
- Minor order changes (OK; semantics identical)

**Deal-breakers:**
- Missing OG meta tags
- Wrong canonical URL
- Missing title or description

### 6d: Lighthouse + visual smoke test

1. **Local preview**
   ```bash
   pnpm preview
   ```
   Open in browser, visit homepage, a blog post, a dev bite. Check:
   - Styling renders (no raw CSS variables visible)
   - Theme toggle works
   - Links navigate correctly
   - No console errors

2. **Lighthouse report**  
   (via DevTools) — target: all greens or 90+ on all metrics. Post-migration, the site should be static HTML + one inline script; no regressions expected.

### 6e: Deploy preview

Push to GitHub (or a temp branch if you're being cautious). Netlify should deploy automatically.

**Test on preview URL:**
- All pages render and have correct title/meta
- Theme persistence works
- PostHog events fire (check Network tab for `/ph/*` requests)
- No 404s in the deploy logs

### 6f: Rollback readiness

You've done nothing destructive:
- Old Qwik code is deleted, but `git log` has it all.
- If the migration fails, `git revert` the Phase 5 commit, then revert back through Phases 4, 3, 2, 1.
- Netlify will redeploy the previous build (the last working Qwik commit).

### Acceptance
- URL diff shows only additions (no lost URLs)
- Playwright tests pass
- Meta parity diff shows only cosmetic changes
- Lighthouse scores are 90+ (or match baseline)
- Netlify deploy preview is green
- PostHog events arrive

---

## Phase 7 (Post-Cutover): Enhanced A11y Suite (∼2 hours + fixes)

**Timeline:** Within 1 week after Phase 6 merge  
**Commit message prefix:** `chore: content-driven axe suite`

**Who commits:** You (human author)

**Why after, not during:** This phase will likely surface pre-existing violations on post pages. A migration diff is the wrong place to fix unrelated a11y issues.

### Steps

1. **Enumerate all post slugs**
   ```typescript
   import { getCollection } from 'astro:content';

   const allPosts = await getCollection('blog')
     .concat(await getCollection('devBites'))
     .concat(await getCollection('observatory'));
   
   export const allSlugs = allPosts.map(p => `/${p.collection}/${p.id}`);
   ```

2. **Generate one axe test per URL**
   ```typescript
   // tests/a11y-per-page.spec.ts
   import { test, expect } from '@playwright/test';
   import { injectAxe, getViolations } from 'axe-playwright';
   import { allSlugs } from '../src/routes';

   allSlugs.forEach(slug => {
     test(`a11y: ${slug}`, async ({ page }) => {
       await page.goto(`http://localhost:3000${slug}`);
       await injectAxe(page);
       const violations = await getViolations(page);
       expect(violations).toEqual([]);
     });
   });
   ```

3. **Run and fix violations**
   ```bash
   pnpm test.e2e
   ```

4. **Delete hard-coded URL list** in existing `a11y-per-page.spec.ts` (now auto-generated).

### Acceptance
- Axe passes on all 31+ post pages
- New posts are covered automatically (no maintenance)

---

## Dependency Changes Summary

**Remove:**
```json
"@builder.io/qwik": "1.19.1",
"@builder.io/qwik-city": "1.19.1",
"eslint-plugin-qwik": "1.12.0"
```

**Add:**
```json
"astro": "^7.0.0",
"@astrojs/mdx": "^4.0.0",
"@astrojs/preact": "^4.0.0",
"@astrojs/rss": "^4.0.0",
"@astrojs/sitemap": "^3.0.0",
"prettier-plugin-astro": "^0.14.0"
```

**Keep (unchanged):**
```json
"@typescript-eslint/*": "*",
"eslint": "*",
"prettier": "*",
"vitest": "*",
"@playwright/test": "*",
"knip": "*"
```

---

## Git Workflow

Each phase is **one or more commits**, landing directly to `master` as they're verified:

```
master
├─ 73c188c  [existing]
├─ NEW: 7xxxx  chore: baseline URLs and meta for Astro migration
├─ NEW: 8xxxx  chore: Astro 7 scaffolding and core config
├─ NEW: 9xxxx  feat: migrate content to Astro collections
├─ NEW: 1xxxx  feat: port MDX components to Preact
├─ NEW: 2xxxx  feat: Astro shell components
├─ NEW: 3xxxx  feat: collection-driven pages and listing routes
├─ NEW: 4xxxx  feat: sitemap, RSS, llms.txt
├─ NEW: 5xxxx  chore: remove Qwik and old infrastructure
├─ NEW: 6xxxx  chore: migration verification and cutover
└─ [future] chore: content-driven axe suite (Phase 7)
```

**No feature branches.** Each commit must pass:
- `pnpm install`
- `pnpm lint`
- `pnpm test.unit.ci`
- `pnpm build`
- Optionally: `pnpm test.e2e` (slower, so Phase 6 is the main E2E gate)

---

## Timeline & Effort

| Phase | Work | Est. | Cumulative |
|-------|------|------|-----------|
| 0 | Baseline | 1h | 1h |
| 1 | Scaffold | 1h | 2h |
| 2 | Collections | 2h | 4h |
| 3 | Components | 1–2d | 1–2d + 4h |
| 4 | Pages | 4h | 1–2d + 8h |
| 4b | Discovery | 2h | 1–2d + 10h |
| 5 | Cleanup | 2h | 1–2d + 12h |
| 6 | Verification | 4h | 1–2d + 16h |
| 7 | A11y suite | 2h + fixes | 1–2d + 18h + fixes |

**Total working days: 7–10 (depending on component porting speed and test fixes)**

---

## Success Criteria

✅ Phase 6 acceptance all met  
✅ All baseline URLs exist in `dist/`  
✅ Playwright suite passes (updated for Astro selectors)  
✅ Meta tags match baseline  
✅ Netlify deploy is green  
✅ PostHog events fire  
✅ Phase 7 a11y suite added and passing (within 1 week)  

---

## Fallback / Rollback

If a phase fails to build or tests break:

1. Identify which commit introduced the failure (`git bisect` if needed)
2. Fix in the current working tree (edit files, commit new fix)
3. If a revert is needed: `git revert <commit-hash>` and recommit the fix separately

The only irreversible action is merging to `master`. Since you're committing directly (no PRs), you're the safety gate — verify each phase works before moving to the next.

If a catastrophic issue emerges after Phase 6 merge, `git revert` the merge commit; Netlify redeploys the previous build.

---

## Notes for Implementation

1. **Component porting** (Phase 3) is the bottleneck. Preact's API is close to React (`useState` works, `class` → `className`), but each component must be read and ported carefully. Bundle small ports, tackle large ones separately.

2. **Astro's Rust compiler is strict.** Close every tag, watch whitespace around inline elements. The error messages are clear — run `astro build` frequently.

3. **Extensionless import paths** (`~/common/components/heading/heading`) work for `.tsx` files because TypeScript resolves them via `tsconfig.json` `paths`. They do not work for `.astro` files — this is why MDX components stay `.tsx`.

4. **Keep design tokens as-is.** `src/styles/global.css` has all custom properties; move it once (Phase 1 or 3) and don't touch it again.

5. **Netlify deploy.** The current `netlify.toml` assumes `command = "npm run build"` and `publish = "dist"`. Update to:
   ```toml
   command = "pnpm build"
   publish = "dist"
   ```

6. **PostHog proxy.** Ensure `public/_headers` still redirects `/ph/*` to PostHog's API. This is a Netlify netlify.toml feature or `_headers` rule — verify after Phase 1.

7. **Updated AGENTS.md:** Phase 5 cleanup should include updating `AGENTS.md` to reflect new content paths and Astro commands. Link to `src/content.config.ts` for the schema.

---

## Context Management (Critical for Single-Day Execution)

**Token budget: 70–100k max per session.** This migration will generate large diffs and file reads. To avoid runaway context:

1. **After Phase 2 (collections moved)**: `/clear` or start a fresh session. Everything from Phases 0–2 is committed; the new session picks up from master with a fresh context window.

2. **After Phase 4b (discovery surface)**: Consider another `/clear` if context is >60k tokens. Phases 3–4b are heavy on component diffs.

3. **Before Phase 5 (cleanup)**: Final `/clear` if needed. Everything is tested and committed by this point.

4. **Use `git show --stat <commit>` instead of reading full diffs.** When verifying a phase, check the commit summary rather than re-reading large files.

5. **Parallel work during Phase 3:** If the Claude session is hitting context limits while porting components, split work:
   - You port 6 components in your editor
   - Claude ports the other 6 in a separate session
   - Both commit separately; run tests once, together

This keeps each session lean and prevents the "million token session" trap.

---

## Next Steps

1. **Verify this plan** against your current state (run Phase 0 steps to confirm baseline).
2. **Schedule Phase 1** — can happen any day; takes 30 min.
3. **Block Phases 2–3** — largest block; 3–4 hours continuous, with `/clear` after Phase 2.
4. **Plan Phases 4–6** — 2.5–3 hours after Phase 3; full test run and Netlify preview validation.
5. **Commit Phase 7** within a week after merge to avoid regressions.

Questions or blockers? Reach out before starting Phase 0.

---

## Deferred / blocked work

Do not lose these — none are done yet, and none block `pnpm build` or
`pnpm type.check`, which is why they were set aside mid-migration instead of
fixed inline.

- [PHASE_4B.md](./PHASE_4B.md) — sitemap, RSS, llms.txt. Explicitly deferred
  until after Phase 6 cutover.
- ~~[task-playwright-e2e-webserver.md](./task-playwright-e2e-webserver.md)~~ —
  **Resolved 2026-09-14.** Confirmed by direct test: `astro preview` (7.3.2)
  really does detach into a background process by default — contradicts
  the current published CLI docs, which say foreground is default and
  `--background` is opt-in; don't trust that doc page over observed
  behavior on this version. Fixed per the task doc's own recommendation:
  `playwright.config.ts`'s `webServer.command` now runs `pnpm exec serve
  dist -l 4173` (added `serve` as a devDependency) instead of `astro
  preview`, decoupled entirely from Astro's preview process model.
  `test.e2e` script now runs `astro build && playwright test` so `dist/` is
  fresh. Full suite ran end-to-end: 138 passed, 8 failed — all 8 are
  `a11y-per-page.spec.ts` landmark violations on the four listing pages
  (`region`: "content not contained by landmarks"), which is exactly the
  pre-existing-violation risk Phase 7 already called out. Not content
  failures — `featured-articles.spec.ts` and `page-theme.spec.ts` both
  passed, confirming last phase's shell-wiring holds under real e2e.
- ~~[task-vitest-unit-glob.md](./task-vitest-unit-glob.md)~~ — **Resolved
  2026-09-14.** Added `vitest.config.ts` scoping `include` to
  `src/**/*.spec.ts` with `passWithNoTests: true` (Vitest 4 treats zero
  matches as a hard failure by default). `pnpm test.unit.ci` now exits 0;
  Playwright's own specs under `tests/` are untouched and still all
  discoverable via `pnpm exec playwright test --list` (146 tests, 4 files).
- ~~[task-wire-shell-components.md](./task-wire-shell-components.md)~~ —
  **Resolved 2026-09-14.** Nav, Footer, ThemeToggler are wired into
  `Base.astro`; knip no longer flags any of the three as unused. Homepage
  and section index pages render featured posts via a shared `ArticleCard`
  with the `data-featured-*` attributes and CTA text
  `tests/featured-articles.spec.ts` expects. ThemeToggler is a native
  `<select>` matching `tests/page-theme.spec.ts`. Confirmed green under a
  real Playwright run — see the e2e-webserver entry above.
- ~~[task-eslint-plugin-astro-esm.md](./task-eslint-plugin-astro-esm.md)~~ —
  **Resolved 2026-09-14.** The `.eslintrc.cjs`/legacy-config problem the
  task doc described was already stale — someone had started migrating to
  ESLint 10 flat config (`eslint.config.mjs` existed, untracked, Astro-only).
  The real failure was version skew: `@typescript-eslint/{parser,eslint-plugin}`
  were pinned at 7.18.0, but `eslint-plugin-astro@3.1.0`'s peer range
  requires `@typescript-eslint/parser >=8.61.0` — the mismatch surfaced as
  `TypeError: scopeManager.addGlobals is not a function`, not as a
  load-time plugin-resolution error. Fixed by bumping both to `^8` (landed
  at 8.70.0) and extending `eslint.config.mjs` to also lint `.ts`/`.tsx`
  via `@typescript-eslint`'s `flat/recommended`-equivalent rules (it was
  only linting `.astro` files before). That surfaced 15 real
  `no-explicit-any` errors — every ported Preact component (Phase 3a) had
  typed `children?: any`; fixed by importing Preact's own
  `ComponentChildren` type. `pnpm lint` is clean.
- Twitter card meta (`twitter:card`/`twitter:title`/`twitter:description`)
  and JSON-LD `BlogPosting` schema existed on every post in the pre-migration
  baseline (`meta-baseline.txt`) but are not yet emitted by the Astro build.
  Not a Phase 6c deal-breaker (only OG tags/canonical/title/description are
  named there), but a real parity gap. Deliberately deferred to `/seo` —
  structured data and social cards are exactly what that skill audits.
- **Found and fixed during Phase 6c, 2026-09-14:** the plan's own sample
  `Article.astro` (Phase 3b) emitted `og:*`/`article:published_time` meta
  tags as bare markup passed into `Base.astro`'s *default* slot — they
  rendered after `</header>`, inside `<body>`, which is invalid placement
  for OG tags and made them invisible to `<head>`-only scrapers. Also,
  `og:url` was never emitted at all (present on every baseline post), and
  `trailingSlash: 'never'` in `astro.config.mjs` produced a canonical
  without a trailing slash while pages still build to `.../index.html` —
  a real canonical regression against already-indexed URLs. Fixed by:
  switching to `trailingSlash: 'always'`; adding a `head` named slot to
  `Base.astro`; moving OG-tag emission to each `[slug].astro` page as a
  `<Fragment slot="head">` sibling of `<Article>` (a component's own
  internal `slot="head"` does NOT reach past its own immediate parent, per
  [Astro's named-slot docs](https://docs.astro.build/en/basics/astro-components/#named-slots) —
  it has to be authored at the call site); and adding the missing `og:url`.
  `Article.astro` is now a plain wrapper with no props.
