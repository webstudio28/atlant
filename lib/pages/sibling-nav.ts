import { getLocalizedContent } from "./content";
import { NAV_SERVICE_LINKS, PAGE_REGISTRY } from "./registry";
import type { PageSection } from "./types";

const HUB_IDS = new Set([
  "transportni-uslugi",
  "skladovi-uslugi",
  "premestvane",
  "tovaro-raztovarni-uslugi",
]);

const SIBLING_HEADINGS: Record<
  string,
  { bg: { label: string; heading: string }; en: { label: string; heading: string }; ru: { label: string; heading: string } }
> = {
  transport: {
    bg: { label: "Направления", heading: "Други транспортни решения" },
    en: { label: "Directions", heading: "Other transport solutions" },
    ru: { label: "Направления", heading: "Другие транспортные решения" },
  },
  warehouse: {
    bg: { label: "Направления", heading: "Други складови решения" },
    en: { label: "Directions", heading: "Other warehouse solutions" },
    ru: { label: "Направления", heading: "Другие складские решения" },
  },
  relocations: {
    bg: { label: "Направления", heading: "Други решения за преместване" },
    en: { label: "Directions", heading: "Other relocation solutions" },
    ru: { label: "Направления", heading: "Другие решения для переезда" },
  },
  loading: {
    bg: { label: "Направления", heading: "Други товаро-разтоварни услуги" },
    en: { label: "Directions", heading: "Other loading & unloading services" },
    ru: { label: "Направления", heading: "Другие погрузочно-разгрузочные услуги" },
  },
};

function hubIdForGroup(group: keyof typeof NAV_SERVICE_LINKS): string {
  const mainSlug = NAV_SERVICE_LINKS[group].main.join("/");
  return PAGE_REGISTRY.find((p) => p.slug.join("/") === mainSlug)?.id ?? "";
}

function currentHref(pageId: string): string {
  const def = PAGE_REGISTRY.find((p) => p.id === pageId);
  return def ? `/${def.slug.join("/")}` : "";
}

/** True for child service pages (not the four main hubs). */
export function isServiceSubPage(pageId: string): boolean {
  const page = PAGE_REGISTRY.find((p) => p.id === pageId);
  return !!(page?.parentGroup && !HUB_IDS.has(pageId));
}

/** Sub-service row links from the parent hub, excluding the current page. */
export function getSiblingSubServicesSection(pageId: string, locale: string): PageSection | null {
  const page = PAGE_REGISTRY.find((p) => p.id === pageId);
  if (!page?.parentGroup || HUB_IDS.has(pageId)) return null;

  const group = page.parentGroup;
  const hubId = hubIdForGroup(group);
  const hubContent = getLocalizedContent(hubId, locale);
  const hubSubSection = hubContent?.sections.find((s) => s.type === "sub-services");
  if (!hubSubSection || hubSubSection.type !== "sub-services") return null;

  const selfHref = currentHref(pageId);
  const items = hubSubSection.items.filter((item) => item.href !== selfHref);
  if (!items.length) return null;

  const headings =
    SIBLING_HEADINGS[group][locale === "en" ? "en" : locale === "ru" ? "ru" : "bg"];
  return {
    type: "sub-services",
    variant: "minimal",
    label: headings.label,
    heading: headings.heading,
    items,
  };
}
