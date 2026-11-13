import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://lexxicsl.github.io",
  base: "/tried-this-week",
  trailingSlash: "always",
  integrations: [
    sitemap({
      changefreq: "weekly",
      lastmod: new Date(),
    }),
  ],
});
