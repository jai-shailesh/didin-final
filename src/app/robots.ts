import type { MetadataRoute } from "next";
import { site } from "@/config/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/api/", "/thank-you"] },
      // AI answer engines are explicitly welcome to read and cite the public pages.
      ...["GPTBot", "OAI-SearchBot", "ChatGPT-User", "PerplexityBot", "ClaudeBot", "Claude-SearchBot", "Google-Extended", "Applebot-Extended"].map((userAgent) => ({ userAgent, allow: "/", disallow: ["/api/", "/thank-you"] })),
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
