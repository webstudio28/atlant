import Image from "next/image";
import { getTranslations } from "next-intl/server";
import PageHero from "./PageHero";
import { GALLERY_PHOTOS } from "@/lib/pages/gallery";
import { SectionLabel, SectionTitle } from "./sections/PageSections";

export default async function GalleryPhotoContent({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "pages.gallery" });

  return (
    <>
      <PageHero label={t("label")} title={t("photoTitle")} subtitle={t("photoSubtitle")} />
      <section className="py-20 bg-[#F4F4F2]">
        <div className="section-wrap">
          <SectionLabel>{t("label")}</SectionLabel>
          <SectionTitle>{locale === "bg" ? "Нашата работа в кадри" : "Our work in pictures"}</SectionTitle>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-10">
            {GALLERY_PHOTOS.map((src, i) => (
              <div
                key={src}
                className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.08)] card-lift bg-white border border-[rgba(82,89,93,0.08)]"
              >
                <Image src={src} alt={`${t("photoAlt")} ${i + 1}`} fill className="object-cover" sizes="(max-width:768px) 50vw, 25vw" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
