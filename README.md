# Tried This Week

A weekly hands-on AI tool lab for indie game makers who vibe-code. Each issue installs three AI tools in Godot, Unity, or a web-game stack, then publishes a keep-or-drop verdict plus commercial-use and store-disclosure notes.

Live site (GitHub Pages): [https://lexxicsl.github.io/tried-this-week/](https://lexxicsl.github.io/tried-this-week/)

The first lab issue is not out yet. This repository is the v1 site: pitch, methodology, disclosures, issues archive, and a Beehiiv newsletter signup.

## Local development

Requires Node 24.

```bash
npm ci
npm run dev
```

Other scripts: `npm run build`, `npm run preview`, `npm run check`.

The site is configured as a project Pages site, so local and production URLs use the `/tried-this-week/` base path.

## What is in v1

- Home, Issues, About (methodology), and Disclosures pages
- SEO: titles, meta descriptions, canonical URLs, Open Graph tags, `sitemap.xml`, `robots.txt`, and JSON-LD for Organization, WebSite, and FAQPage
- `public/llms.txt` for AI assistants, semantic HTML, and a robots policy that allows major AI crawlers
- A GitHub Actions workflow that typechecks, builds, checks links, runs Lighthouse, and deploys to GitHub Pages
- A Beehiiv newsletter embed on the home page (`src/components/Signup.astro`), with a site-wide Beehiiv attribution script in `src/layouts/Base.astro`

## Newsletter

The home page signup is a Beehiiv embed (`data-newsletter-provider="beehiiv"`). The public publication is [triedthisweek.beehiiv.com](https://triedthisweek.beehiiv.com). Signups are processed by Beehiiv; see the Disclosures page.

## Adding a lab issue later

Put Markdown in `src/content/issues/` only for issues built from real tests (or clearly labeled Reported items with sources). Do not mark a tool Tried unless it was actually installed. Then add an Astro content collection in `src/content.config.ts` and an issue template page. Article JSON-LD should be added when the first issue is published.

## Custom domain

After `triedthisweek.com` (or another domain) is purchased and DNS is pointed at GitHub Pages:

1. Add `public/CNAME` with the domain.
2. In `astro.config.mjs`, set `site` to `https://triedthisweek.com` and remove `base`.
3. Update `src/lib/site.ts`, `public/llms.txt`, and any hardcoded origin URLs.
4. In the GitHub repo: Settings → Pages → set the custom domain and enable HTTPS.

## Enabling GitHub Pages

If the first deploy does not go live on its own, open the repo Settings → Pages and set Source to **GitHub Actions**, then re-run the *Build, check, and deploy* workflow.
