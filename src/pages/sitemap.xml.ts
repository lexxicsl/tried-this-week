import type { APIRoute } from "astro";
import { SITE } from "../lib/site";

// Conventional /sitemap.xml alias. Astro's sitemap integration emits sitemap-index.xml.
export const GET: APIRoute = () => {
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${SITE.origin}/sitemap-0.xml</loc>
  </sitemap>
</sitemapindex>
`;
  return new Response(body, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
};
