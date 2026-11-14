import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://lexxicsl.github.io",
  base: "/tried-this-week",
  trailingSlash: "always",
  integrations: [
    sitemap({
      // /kit/ stays out of the sitemap (and is noindex) until checkout is live.
      // Remove this filter when CHECKOUT_URL in src/pages/kit.astro is real.
      filter: (page) => !page.includes("/kit/"),
      changefreq: "weekly",
      lastmod: new Date(),
    }),
  ],
});
