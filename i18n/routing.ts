import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["bg", "en", "ru"],
  defaultLocale: "bg",
  localePrefix: "always",
  localeDetection: false,
});
