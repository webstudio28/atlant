import type { MetadataRoute } from "next";
import { AI_CRAWLER_AGENTS, CRAWL_DISALLOW_PATHS } from "@/lib/seo/crawl-rules";
import { SITE_URL } from "@/lib/site-metadata";

const disallow = [...CRAWL_DISALLOW_PATHS];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow,
      },
      ...AI_CRAWLER_AGENTS.map((userAgent) => ({
        userAgent,
        allow: "/",
        disallow,
      })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
