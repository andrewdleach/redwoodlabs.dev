# Nuxt migration — design

**Date:** 2026-10-16
**Status:** Approved in conversation; pending written-spec review

## Goal

Move redwoodlabs.dev from Vue + Vite (`vite-ssg`, Nuxt UI used standalone) to Nuxt 4 so new pages — blog posts, project write-ups, and one-off pages — can be added without hand-maintaining SEO plumbing.

## Constraints

- The current homepage looks identical after the migration (light, dark, mobile).
- Every SEO property currently in production is preserved: prerendered HTML, title, meta description, canonical, Open Graph / Twitter tags, `Person` JSON-LD, `robots.txt`, `sitemap.xml`.
- Dark mode follows the system preference with no flash of the wrong theme.
- Fully static output, hosted on Vercel. No server runtime.
- **Only true content.** No placeholder posts, no invented project write-ups.
- Existing URLs (`/`, `/resume.pdf`, `/profile-picture.jpeg`) are unchanged.

## Stack

| Concern | Choice |
|---|---|
| Framework | `nuxt` 4.x, built with `nuxt generate` |
| UI / styling | `@nuxt/ui` 4.x (Tailwind v4, color mode, prose components) |
| Content | `@nuxt/content` 3.x, Markdown files in the repo |
| SEO | `@nuxtjs/sitemap`, `@nuxtjs/robots`, `nuxt-schema-org` (not the full `@nuxtjs/seo` bundle) |
| Type checking | `nuxi typecheck` (keeps `vue-tsc` + `typescript` as dev deps) |

## Structure

```
app/
  app.vue                  layout shell (shared main container + footer)
  app.config.ts            ui.colors.primary = 'purple'
  assets/css/main.css      tailwind + @nuxt/ui imports
  pages/
    index.vue              homepage (current design)
    projects/[slug].vue    project write-up
    blog/index.vue         post list
    blog/[slug].vue        post
  utils/profile.ts         name, title, location, bio, links, work history
content/
  projects/family-connect.md
  blog/                    (empty)
content.config.ts          collection schemas
public/                    profile-picture.jpeg, resume.pdf, favicon.ico
nuxt.config.ts
```

## Content model

**`projects` collection** (`content/projects/*.md`, type `page`):

| Field | Type | Notes |
|---|---|---|
| `name` | string | required |
| `url` | string (URL) | required; external site |
| `tagline` | string | required |
| `status` | `'Live' \| 'Beta' \| 'Building'` | required |
| `order` | number | sort order on homepage, ascending |

Body is optional. `family-connect.md` ships with frontmatter only (name, url `https://familyconnect.dev`, tagline "Keep your whole family in the loop — no app required.", status `Building`, order 1).

**`blog` collection** (`content/blog/*.md`, type `page`):

| Field | Type | Notes |
|---|---|---|
| `title` | string | required |
| `description` | string | required; used for meta description |
| `date` | date | required; sort descending |
| `draft` | boolean | optional, default `false` |

## Behavior rules

1. **Project card link target.** A card links to `/projects/<slug>` only when that project's Markdown has a non-empty body; otherwise it links to the project's external `url` (opening in a new tab, as today).
2. **Project pages are only generated for projects with a body.** `/projects/<slug>` for a body-less project returns 404 and is absent from the sitemap.
3. **Blog visibility.** The homepage shows a "Blog" link to `/blog` only when at least one non-draft post exists. `/blog` itself is not generated (and not in the sitemap) while zero published posts exist.
4. **Drafts.** Posts with `draft: true` render in `nuxt dev` and are excluded from production builds, listings, and the sitemap.
5. **Single source of truth.** Profile facts (name, job title, location, bio, LinkedIn URL, work history) live only in `app/utils/profile.ts`. The homepage and the `Person` schema both read from it; `worksFor` is derived from the current (first) job.

## SEO

- `site` config: `url: 'https://www.redwoodlabs.dev'`, `name: 'Andrew Leach'`. Canonical and absolute URLs derive from this.
- Homepage head matches production exactly: title `Andrew Leach - Senior Software Engineer`, the current description, `og:*` and `twitter:*` tags, `og:image` `https://www.redwoodlabs.dev/profile-picture.jpeg`, `twitter:card` `summary`.
- Per-page title/description via `useSeoMeta` from frontmatter.
- `Person` identity via `nuxt-schema-org` with the same fields as today (name, url, image, jobTitle, worksFor, address Seattle/WA/US, sameAs LinkedIn). Blog posts emit `BlogPosting` (headline, datePublished, author → Person).
- `robots.txt`: production indexable with sitemap reference; non-production Vercel builds `noindex`.
- `sitemap.xml`: generated from prerendered routes.

## Removed

`index.html`, `src/` (contents migrated into `app/`), `vite.config.ts`, `vite-ssg`, `@vitejs/plugin-vue`, `tsconfig.app.json` / `tsconfig.node.json` (replaced by Nuxt-generated tsconfig), `public/robots.txt`, `public/sitemap.xml`, the inline dark-mode script, and `vercel.json`.

The leftover `.codesandbox/` and `.devcontainer/` configs are out of scope and left untouched.

## Verification

1. **Head parity:** diff the `<head>` SEO tags of the new prerendered `/` against current production; every tag listed above is present with identical values (JSON-LD compared as parsed JSON, key order ignored).
2. **Content parity:** visible text of `/` matches production.
3. **Generated files:** `robots.txt` and `sitemap.xml` exist; sitemap contains only `/` at migration time.
4. **Visual parity:** desktop (1280px) and phone (390px) screenshots in light and dark, compared with current production.
5. **Conditional-logic test (local only, never committed):** add one published post, one draft post, and a body to `family-connect.md`; confirm rules 1–4 (links appear, draft excluded, pages generated, sitemap updated). Revert.
6. **Preview deploy:** inspect the Vercel preview (HTML, robots `noindex` on preview) before merging to `master`.
7. **Rollback:** Vercel instant rollback to the current production deployment if production regresses.

## Out of scope

Writing any posts or project write-ups, one-off pages (`/about` etc.), RSS feed, generated OG images, Nuxt Studio, analytics.
