# redwoodlabs.dev

Personal site for Andrew Leach. Nuxt 4 + Nuxt UI + Nuxt Content, statically generated and hosted on Vercel.

## Commands

```bash
pnpm dev        # local dev server (drafts visible)
pnpm build      # static site in .output/public
pnpm test       # build, then run tests/ against the output
pnpm typecheck
```

## Content

- **Projects:** `content/projects/<slug>.md`. Frontmatter: `name`, `url`, `tagline`, `status` (`Live` | `Beta` | `Building`), `order`. Add body text to get a `/projects/<slug>` page; without a body, the card links to `url`.
- **Blog:** `content/blog/<slug>.md`. Frontmatter: `title`, `description`, `date`, optional `draft: true`. The Blog link and `/blog` appear once a non-draft post exists.
- **Profile facts** (title, bio, work history, links): `app/utils/profile.ts`.
