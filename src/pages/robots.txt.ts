import type { APIRoute } from "astro";
import { SITE } from "../lib/site";

export const GET: APIRoute = () => {
  const sitemap = `${SITE.origin}/sitemap-index.xml`;
  const body = `# Tried This Week
# AI assistants and search crawlers are welcome.
# See also: ${SITE.origin}/llms.txt

User-agent: *
Allow: /

User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: Googlebot
Allow: /

User-agent: Anthropic-AI
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Claude-Web
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Applebot
Allow: /

User-agent: Applebot-Extended
Allow: /

User-agent: CCBot
Allow: /

User-agent: Bytespider
Allow: /

Sitemap: ${sitemap}
`;
  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
