import { useTranslations } from "next-intl";
import Image from "next/image";

interface ServiceItem {
  id: number;
  labelBg: string;
  labelEn: string;
  displayOrder: number;
}

interface Service {
  id: number;
  slug: string;
  titleBg: string;
  titleEn: string;
  descriptionBg: string;
  descriptionEn: string;
  imagePath: string;
  imageAltBg: string;
  imageAltEn: string;
  displayOrder: number;
  items: ServiceItem[];
}

export default function Services({
  services,
  locale,
}: {
  services: Service[];
  locale: string;
}) {
  const t = useTranslations("services");
  const isBg = locale === "bg";

  return (
    <section id="services" className="bg-[#F4F4F2] py-24">
      <div className="max-w-[1280px] mx-auto px-8">
        {/* Section header */}
        <div className="mb-14">
          <div className="inline-flex items-center gap-2.5 font-['Sofia_Sans_Condensed',sans-serif] text-[14px] font-[700] tracking-[0.18em] uppercase text-[#F26A21] mb-3">
            {t("label")}
          </div>
          <h2 className="font-['Sofia_Sans_Condensed',sans-serif] text-[clamp(32px,4vw,44px)] font-[800] text-[#52595D] tracking-[0.02em] mb-3">
            {t("title")}
          </h2>
          <p className="text-[19px] text-[#52595D] max-w-[520px] m-0 leading-[1.6]">
            {t("subtitle")}
          </p>
        </div>

        {/* Cards - horizontal scroll on mobile */}
        <div className="-mx-4 overflow-x-auto overscroll-x-contain no-scrollbar pb-5 md:mx-0 md:overflow-visible md:pb-0">
          <div className="flex gap-4 w-max px-4 md:grid md:grid-cols-[repeat(auto-fit,minmax(280px,1fr))] md:gap-6 md:w-auto md:px-0">
            {services.map((service) => {
              const title = isBg ? service.titleBg : service.titleEn;
              const description = isBg ? service.descriptionBg : service.descriptionEn;
              const imageAlt = isBg ? service.imageAltBg : service.imageAltEn;

              return (
                <article
                  key={service.id}
                  id={`service-${service.slug}`}
                  className="bg-white border border-[rgba(82,89,93,0.1)] p-3 rounded-xl shadow-[0_2px_12px_rgba(0,0,0,0.05)] flex flex-col gap-0 card-lift flex-shrink-0 w-[min(82vw,300px)] md:w-auto scroll-mt-[88px]"
                >
                  {/* Image */}
                  <div className="aspect-[4/3] overflow-hidden bg-[#E8E9E6] rounded-lg flex-shrink-0">
                    <Image
                      src={service.imagePath}
                      alt={imageAlt}
                      width={800}
                      height={600}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>

                  {/* Body */}
                  <div className="pt-[18px] px-0 pb-2.5 mt-4 border-t border-[rgba(82,89,93,0.1)] flex-1">
                    <h3 className="font-['Sofia_Sans_Condensed',sans-serif] text-[19px] font-[800] text-[#52595D] tracking-[0.04em] uppercase mb-2 leading-[1.2]">
                      {title}
                    </h3>
                    <p className="text-[16px] text-[#52595D] leading-[1.55] mb-3">
                      {description}
                    </p>
                    <ul className="list-none m-0 p-0 flex flex-col gap-1.5 items-start">
                      {service.items.map((item) => (
                        <li
                          key={item.id}
                          className="font-['Sofia_Sans_Condensed',sans-serif] text-[17px] font-[600] tracking-[0.03em] text-[#F26A21] leading-[1.35] underline underline-offset-[3px] decoration-[rgba(242,106,33,0.55)] cursor-pointer transition-colors hover:text-[#d45a18] hover:decoration-[#d45a18]"
                        >
                          {isBg ? item.labelBg : item.labelEn}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
