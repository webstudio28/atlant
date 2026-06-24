import type { MetadataRoute } from "next";
import { getAllPageSlugs } from "@/lib/pages/registry";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://atlant.bg";
const locales = ["bg", "en"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["/", ...getAllPageSlugs().map((slug) => `/${slug.join("/")}`)];

  return pages.flatMap((page) =>
    locales.map((locale) => ({
      url: `${baseUrl}/${locale}${page === "/" ? "" : page}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: page === "/" ? 1.0 : 0.8,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, `${baseUrl}/${l}${page === "/" ? "" : page}`])
        ),
      },
    }))
  );
}
