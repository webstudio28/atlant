import fs from "fs";
import path from "path";
import type { PageContent } from "./types";

const cache = new Map<string, { bg: PageContent; en: PageContent }>();

export function loadPageContent(pageId: string): { bg: PageContent; en: PageContent } | null {
  const filePath = path.join(process.cwd(), "data", "pages", `${pageId}.json`);
  if (!fs.existsSync(filePath)) return null;

  const useCache = process.env.NODE_ENV !== "development";
  if (useCache && cache.has(pageId)) return cache.get(pageId)!;

  const raw = JSON.parse(fs.readFileSync(filePath, "utf8")) as { bg: PageContent; en: PageContent };
  if (useCache) cache.set(pageId, raw);
  return raw;
}

export function getLocalizedContent(pageId: string, locale: string): PageContent | null {
  const data = loadPageContent(pageId);
  if (!data) return null;
  return locale === "en" ? data.en : data.bg;
}
