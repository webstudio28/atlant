import type { routing } from "@/i18n/routing";

export type AppLocale = (typeof routing.locales)[number];

export function pickLocale<T>(locale: string, texts: { bg: T; en: T; ru: T }): T {
  if (locale === "ru") return texts.ru;
  if (locale === "en") return texts.en;
  return texts.bg;
}

export function openGraphLocale(locale: string): string {
  if (locale === "ru") return "ru_RU";
  if (locale === "en") return "en_US";
  return "bg_BG";
}

export function isBulgarianLocale(locale: string): boolean {
  return locale === "bg";
}
