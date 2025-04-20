import type { APIRoute } from "astro";
import { SITE } from "@config";

const robots = `
User-agent: Googlebot
Disallow: /nogooglebot/
Disallow: /cdn-cgi/
Disallow: /~lalebahc/
Disallow: /stream/
User-agent: *
Allow: /

Sitemap: ${new URL("sitemap-index.xml", SITE.website).href}
`.trim();

export const GET: APIRoute = () =>
  new Response(robots, {
    headers: { "Content-Type": "text/plain" },
  });
