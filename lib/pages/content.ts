import fs from "fs";
import path from "path";
import type { PageContent } from "./types";

export type LocalizedPageBundle = { bg: PageContent; en: PageContent; ru: PageContent };

const cache = new Map<string, LocalizedPageBundle>();

export function loadPageContent(pageId: string): LocalizedPageBundle | null {
  const filePath = path.join(process.cwd(), "data", "pages", `${pageId}.json`);
  if (!fs.existsSync(filePath)) return null;

  const useCache = process.env.NODE_ENV !== "development";
  if (useCache && cache.has(pageId)) return cache.get(pageId)!;

  const raw = JSON.parse(fs.readFileSync(filePath, "utf8")) as LocalizedPageBundle;
  if (useCache) cache.set(pageId, raw);
  return raw;
}

export function getLocalizedContent(pageId: string, locale: string): PageContent | null {
  const data = loadPageContent(pageId);
  if (!data) return null;
  if (locale === "en") return data.en;
  if (locale === "ru") return data.ru;
  return data.bg;
}
