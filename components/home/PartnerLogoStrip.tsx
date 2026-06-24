import { getTranslations } from "next-intl/server";
import { PartnerLogoStripMarquee } from "./PartnerLogoStripMarquee";

export default async function PartnerLogoStrip({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "partnersStrip" });

  return <PartnerLogoStripMarquee heading={t("heading")} locale={locale} />;
}
