import fs from "fs";
import path from "path";
import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { PAGE_REGISTRY } from "@/lib/pages/registry";
import type { PageDefinition } from "@/lib/pages/types";
import { SITE_URL } from "@/lib/site-metadata";

const SERVICE_HUB_IDS = new Set([
  "transportni-uslugi",
  "skladovi-uslugi",
  "premestvane",
  "tovaro-raztovarni-uslugi",
  "private-client-transportation",
]);

function pagePath(slug: string[]): string {
  return `/${slug.join("/")}`;
}

function localizedUrl(locale: string, slug: string[]): string {
  const suffix = slug.length === 0 ? "" : pagePath(slug);
  return `${SITE_URL}/${locale}${suffix}`;
}

function getPageLastModified(page: PageDefinition): Date {
  const filePath = path.join(process.cwd(), "data", "pages", `${page.id}.json`);
  try {
    return fs.statSync(filePath).mtime;
  } catch {
    return new Date();
  }
}

function sitemapMeta(page: PageDefinition | null): {
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
} {
  if (!page) {
    return { priority: 1, changeFrequency: "weekly" };
  }

  switch (page.kind) {
    case "legal-privacy":
    case "legal-terms":
      return { priority: 0.3, changeFrequency: "yearly" };
    case "gallery-photo":
    case "gallery-video":
      return { priority: 0.55, changeFrequency: "monthly" };
    case "contact":
    case "faq":
      return { priority: 0.85, changeFrequency: "monthly" };
    default:
      if (SERVICE_HUB_IDS.has(page.id)) {
        return { priority: 0.9, changeFrequency: "weekly" };
      }
      if (page.parentGroup) {
        return { priority: 0.75, changeFrequency: "monthly" };
      }
      return { priority: 0.8, changeFrequency: "monthly" };
  }
}

function languageAlternates(slug: string[]): NonNullable<MetadataRoute.Sitemap[number]["alternates"]> {
  const languages = Object.fromEntries(
    routing.locales.map((locale) => [locale, localizedUrl(locale, slug)])
  );
  return {
    languages: {
      ...languages,
      "x-default": localizedUrl(routing.defaultLocale, slug),
    },
  };
}

export function buildSitemapEntries(): MetadataRoute.Sitemap {
  const pages: Array<{ slug: string[]; page: PageDefinition | null }> = [
    { slug: [], page: null },
    ...PAGE_REGISTRY.map((page) => ({ slug: page.slug, page })),
  ];

  return pages.flatMap(({ slug, page }) => {
    const { priority, changeFrequency } = sitemapMeta(page);
    const lastModified = page ? getPageLastModified(page) : new Date();

    return routing.locales.map((locale) => ({
      url: localizedUrl(locale, slug),
      lastModified,
      changeFrequency,
      priority,
      alternates: languageAlternates(slug),
    }));
  });
}
