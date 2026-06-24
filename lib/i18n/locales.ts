import { routing } from "@/i18n/routing";

export const LOCALE_LABELS: Record<(typeof routing.locales)[number], string> = {
  bg: "Български",
  en: "English",
};

export const LOCALE_OPTIONS = routing.locales.map((code) => ({
  code,
  label: LOCALE_LABELS[code],
}));
