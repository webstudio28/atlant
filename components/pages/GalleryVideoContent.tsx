import { getTranslations } from "next-intl/server";
import PageHero from "./PageHero";
import { SectionLabel, SectionTitle, PageCtaSection } from "./sections/PageSections";

export default async function GalleryVideoContent({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "pages.gallery" });

  return (
    <>
      <PageHero label={t("label")} title={t("videoTitle")} subtitle={t("videoSubtitle")} />
      <section className="py-20 bg-[#F4F4F2]">
        <div className="section-wrap text-center">
          <SectionLabel>{t("label")}</SectionLabel>
          <SectionTitle>{t("videoTitle")}</SectionTitle>
          <div className="mt-10 bg-white rounded-xl border border-[rgba(82,89,93,0.1)] p-12 md:p-16 card-lift max-w-[640px] mx-auto">
            <p className="text-[18px] text-[#52595D] leading-[1.7] m-0">{t("videoEmpty")}</p>
          </div>
        </div>
      </section>
      <PageCtaSection locale={locale} />
    </>
  );
}
