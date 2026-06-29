import { PARTNER_REFERENCES } from "@/lib/pages/partner-references";

export type HomeLogoStripItem = {
  id: string;
  logo?: string;
  labelBg?: string;
  labelEn?: string;
};

/** Same partners as the About Us references section */
export const HOME_LOGO_STRIP: HomeLogoStripItem[] = PARTNER_REFERENCES.map(({ id, logo, nameBg, nameEn }) => ({
  id,
  logo,
  labelBg: nameBg,
  labelEn: nameEn,
}));

export function homeLogoStripLabel(item: HomeLogoStripItem, locale: string) {
  if (locale === "bg") return item.labelBg ?? item.labelEn ?? item.id;
  return item.labelEn ?? item.labelBg ?? item.id;
}
