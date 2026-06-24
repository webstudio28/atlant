import type { PageDefinition } from "./types";

/** Slug path (joined with /) → page definition */
export const PAGE_REGISTRY: PageDefinition[] = [
  // Transport
  { id: "transportni-uslugi", slug: ["transportni-uslugi"], kind: "content", parentGroup: "transport", navLabelBg: "Транспортни услуги", navLabelEn: "Transport Services" },
  { id: "avtomobilen-transport", slug: ["avtomobilen-transport"], kind: "content", parentGroup: "transport", navLabelBg: "Автомобилен транспорт", navLabelEn: "Road Transport" },
  { id: "vazdushen-transport", slug: ["vazdushen-transport"], kind: "content", parentGroup: "transport", navLabelBg: "Въздушен транспорт", navLabelEn: "Air Transport" },
  { id: "morski-transport", slug: ["morski-transport"], kind: "content", parentGroup: "transport", navLabelBg: "Морски транспорт", navLabelEn: "Sea Transport" },
  { id: "zhelezopaten-transport", slug: ["zhelezopaten-transport"], kind: "content", parentGroup: "transport", navLabelBg: "Железопътен транспорт", navLabelEn: "Rail Transport" },
  { id: "specilalizirano-premestvane-i-transport", slug: ["specilalizirano-premestvane-i-transport"], kind: "content", parentGroup: "transport", navLabelBg: "Специализиран транспорт", navLabelEn: "Specialized Transport" },
  // Warehouse
  { id: "skladovi-uslugi", slug: ["skladovi-uslugi"], kind: "content", parentGroup: "warehouse", navLabelBg: "Складови услуги", navLabelEn: "Warehouse Services" },
  { id: "skladovi-uslugi-korporativno", slug: ["skladovi-uslugi", "korporativno"], kind: "content", parentGroup: "warehouse", navLabelBg: "Корпоративно", navLabelEn: "Corporate" },
  { id: "skladovi-uslugi-individualno", slug: ["skladovi-uslugi", "individualno"], kind: "content", parentGroup: "warehouse", navLabelBg: "Индивидуално", navLabelEn: "Individual" },
  // Relocations
  { id: "premestvane", slug: ["premestvane"], kind: "content", parentGroup: "relocations", navLabelBg: "Премествания", navLabelEn: "Relocations" },
  { id: "premestvane-na-doma", slug: ["premestvane", "na-doma"], kind: "content", parentGroup: "relocations", navLabelBg: "На дома", navLabelEn: "Home" },
  { id: "premestvane-na-ofis", slug: ["premestvane", "na-ofis"], kind: "content", parentGroup: "relocations", navLabelBg: "На офиса", navLabelEn: "Office" },
  { id: "premestvane-mezhdunarodno", slug: ["premestvane", "mezhdunarodno"], kind: "content", parentGroup: "relocations", navLabelBg: "Международно", navLabelEn: "International" },
  { id: "specializirano-premestvane", slug: ["specializirano-premestvane"], kind: "content", parentGroup: "relocations", navLabelBg: "Специализирано", navLabelEn: "Specialized" },
  { id: "premestvane-industrialno", slug: ["premestvane", "industrialno"], kind: "content", parentGroup: "relocations", navLabelBg: "Индустриално", navLabelEn: "Industrial" },
  // Loading
  { id: "tovaro-raztovarni-uslugi", slug: ["tovaro-raztovarni-uslugi"], kind: "content", parentGroup: "loading", navLabelBg: "Товаро-разтоварни услуги", navLabelEn: "Loading & Unloading" },
  { id: "hamalski-uslugi", slug: ["hamalski-uslugi"], kind: "content", parentGroup: "loading", navLabelBg: "Хамалски услуги", navLabelEn: "Porter Services" },
  { id: "tovaro-raztovarni-pomoshten", slug: ["tovaro-raztovarni-uslugi", "pomoshten"], kind: "content", parentGroup: "loading", navLabelBg: "Помощен персонал", navLabelEn: "Support Staff" },
  // Company
  { id: "about-us", slug: ["about-us"], kind: "content", navLabelBg: "За нас", navLabelEn: "About Us" },
  { id: "contacts", slug: ["contacts"], kind: "contact", navLabelBg: "Контакти", navLabelEn: "Contacts" },
  { id: "faq", slug: ["faq"], kind: "faq", navLabelBg: "ЧЗВ", navLabelEn: "FAQ" },
  { id: "gallery-photo", slug: ["galery", "photo"], kind: "gallery-photo" },
  { id: "gallery-video", slug: ["galery", "video"], kind: "gallery-video" },
  { id: "privacy-policy", slug: ["privacy-policy"], kind: "legal-privacy" },
  { id: "terms-of-use", slug: ["terms-of-use"], kind: "legal-terms" },
  // Private clients
  { id: "private-client-transportation", slug: ["private-client-transportation"], kind: "content" },
  { id: "private-client-moving", slug: ["private-client-transportation", "moving"], kind: "content" },
  { id: "private-client-specialized", slug: ["private-client-transportation", "specialized-moving"], kind: "content" },
  { id: "private-client-support", slug: ["private-client-transportation", "support-staff"], kind: "content" },
];

const slugIndex = new Map(PAGE_REGISTRY.map((p) => [p.slug.join("/"), p]));

export function resolvePage(slugParts: string[]): PageDefinition | undefined {
  return slugIndex.get(slugParts.join("/"));
}

export function pageHref(slug: string[]): string {
  return `/${slug.join("/")}`;
}

/** Sub-service pages and selected content pages use the shorter hero. */
export function usesCompactHero(page: PageDefinition): boolean {
  return !!page.parentGroup || page.id === "about-us";
}

/** Nav structure for header — maps to real page URLs */
export const NAV_SERVICE_LINKS = {
  transport: {
    main: ["transportni-uslugi"],
    items: [
      { href: ["avtomobilen-transport"], bg: "Автомобилен транспорт", en: "Road Transport" },
      { href: ["vazdushen-transport"], bg: "Въздушен транспорт", en: "Air Transport" },
      { href: ["morski-transport"], bg: "Морски транспорт", en: "Sea Transport" },
      { href: ["zhelezopaten-transport"], bg: "Железопътен транспорт", en: "Rail Transport" },
      { href: ["specilalizirano-premestvane-i-transport"], bg: "Специализиран транспорт", en: "Specialized Transport" },
    ],
  },
  warehouse: {
    main: ["skladovi-uslugi"],
    items: [
      { href: ["skladovi-uslugi", "korporativno"], bg: "Корпоративно", en: "Corporate" },
      { href: ["skladovi-uslugi", "individualno"], bg: "Индивидуално", en: "Individual" },
    ],
  },
  relocations: {
    main: ["premestvane"],
    items: [
      { href: ["premestvane", "na-doma"], bg: "На дома", en: "Home" },
      { href: ["premestvane", "na-ofis"], bg: "На офиса", en: "Office" },
      { href: ["premestvane", "mezhdunarodno"], bg: "Международно", en: "International" },
      { href: ["specializirano-premestvane"], bg: "Специализирано", en: "Specialized" },
      { href: ["premestvane", "industrialno"], bg: "Индустриално", en: "Industrial" },
    ],
  },
  loading: {
    main: ["tovaro-raztovarni-uslugi"],
    items: [
      { href: ["hamalski-uslugi"], bg: "Хамалски услуги", en: "Porter Services" },
      { href: ["tovaro-raztovarni-uslugi", "pomoshten"], bg: "Помощен персонал", en: "Support Staff" },
    ],
  },
} as const;

export const HERO_IMAGES: Record<string, string> = {
  "transportni-uslugi": "/images/pages/headers/transportni_uslugi.png",
  "avtomobilen-transport": "/images/pages/headers/transportni_uslugi.png",
  "vazdushen-transport": "/images/pages/headers/transportni_uslugi.png",
  "morski-transport": "/images/pages/headers/transportni_uslugi.png",
  "zhelezopaten-transport": "/images/pages/headers/transportni_uslugi.png",
  "specilalizirano-premestvane-i-transport": "/images/pages/headers/transportni_uslugi.png",
  "skladovi-uslugi": "/images/pages/headers/skladovi_uslugi.png",
  "skladovi-uslugi-korporativno": "/images/pages/headers/skladovi_uslugi.png",
  "skladovi-uslugi-individualno": "/images/pages/headers/skladovi_uslugi.png",
  "premestvane": "/images/pages/headers/premestvania.png",
  "premestvane-na-doma": "/images/pages/headers/premestvania.png",
  "premestvane-na-ofis": "/images/pages/headers/premestvania.png",
  "premestvane-mezhdunarodno": "/images/pages/headers/premestvania.png",
  "specializirano-premestvane": "/images/pages/headers/premestvania.png",
  "premestvane-industrialno": "/images/pages/headers/premestvania.png",
  "tovaro-raztovarni-uslugi": "/images/pages/headers/tovaro_rastovarni_uslugi.png",
  "hamalski-uslugi": "/images/pages/headers/tovaro_rastovarni_uslugi.png",
  "tovaro-raztovarni-pomoshten": "/images/pages/headers/tovaro_rastovarni_uslugi.png",
  "about-us": "/images/about.png",
  contacts: "/images/pages/contact.webp",
  faq: "/images/pages/contact.webp",
};

export function getAllPageSlugs(): string[][] {
  return PAGE_REGISTRY.map((p) => p.slug);
}
