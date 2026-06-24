import fs from "fs";
import path from "path";
import type { PageContent } from "./types";

const cache = new Map<string, { bg: PageContent; en: PageContent }>();

export function loadPageContent(pageId: string): { bg: PageContent; en: PageContent } | null {
  if (cache.has(pageId)) return cache.get(pageId)!;

  const filePath = path.join(process.cwd(), "data", "pages", `${pageId}.json`);
  if (!fs.existsSync(filePath)) return null;

  const raw = JSON.parse(fs.readFileSync(filePath, "utf8")) as { bg: PageContent; en: PageContent };
  cache.set(pageId, raw);
  return raw;
}

export function getLocalizedContent(pageId: string, locale: string): PageContent | null {
  const data = loadPageContent(pageId);
  if (!data) return null;
  return locale === "en" ? data.en : data.bg;
}
