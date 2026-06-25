import { getTranslations } from "next-intl/server";
import PageHero from "./PageHero";
import { SectionLabel, SectionTitle, PageCtaSection } from "./sections/PageSections";

export default async function ContactPageContent({
  locale,
  settings,
}: {
  locale: string;
  settings: Record<string, string>;
}) {
  const t = await getTranslations({ locale, namespace: "pages.contact" });

  const infoCards = [
    settings.phone_display && { label: locale === "bg" ? "Телефон" : "Phone", value: settings.phone_display, href: `tel:${settings.phone_display.replace(/[\s/]/g, "")}` },
    settings.email && { label: "Email", value: settings.email, href: `mailto:${settings.email}` },
    settings.address && { label: locale === "bg" ? "Адрес" : "Address", value: settings.address },
    settings.facebook && { label: "Facebook", value: locale === "bg" ? "Последвайте ни" : "Follow us", href: settings.facebook, external: true },
    settings.instagram && { label: "Instagram", value: locale === "bg" ? "Последвайте ни" : "Follow us", href: settings.instagram, external: true },
  ].filter(Boolean) as { label: string; value: string; href?: string; external?: boolean }[];

  return (
    <>
      <PageHero label={t("label")} title={t("title")} subtitle={t("subtitle")} image="/images/pages/contact.webp" />
      <section className="py-20 bg-white">
        <div className="section-wrap">
          <SectionLabel>{t("infoTitle")}</SectionLabel>
          <SectionTitle>{locale === "bg" ? "Как да ни намерите" : "How to reach us"}</SectionTitle>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 mb-12">
            {infoCards.map((card) => (
              <div key={card.label} className="bg-[#F4F4F2] rounded-xl border border-[rgba(82,89,93,0.1)] p-6 card-lift">
                <p className="font-['Sofia_Sans_Condensed',sans-serif] text-[13px] font-[700] tracking-[0.14em] uppercase text-[#F26A21] mb-2 m-0">{card.label}</p>
                {card.href ? (
                  <a
                    href={card.href}
                    className="text-[18px] text-[#52595D] no-underline hover:text-[#F26A21] leading-[1.5]"
                    {...(card.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  >
                    {card.value}
                  </a>
                ) : (
                  <p className="text-[18px] text-[#52595D] m-0 leading-[1.5]">{card.value}</p>
                )}
              </div>
            ))}
          </div>
          <div className="bg-white rounded-xl border-2 border-[#F26A21]/20 p-8 md:p-10 shadow-[0_4px_24px_rgba(242,106,33,0.08)] flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h3 className="font-['Sofia_Sans_Condensed',sans-serif] text-[26px] font-[800] text-[#52595D] m-0 mb-2">{t("ctaTitle")}</h3>
              <p className="text-[17px] text-[#52595D] leading-[1.65] m-0 max-w-[480px]">{t("ctaText")}</p>
              <p className="text-[15px] text-[#52595D]/60 mt-4 mb-0">{t("hours")}</p>
            </div>
            <button
              className="bg-[#F26A21] text-white font-['Sofia_Sans_Condensed',sans-serif] text-[16px] font-[700] tracking-[0.08em] uppercase px-8 py-3.5 rounded-xl border-2 border-[#F26A21] transition-all hover:bg-[#d45a18] cursor-pointer js-inquiry-trigger flex-shrink-0"
              data-inquiry
            >
              {t("ctaButton")}
            </button>
          </div>
        </div>
      </section>
      <PageCtaSection locale={locale} />
    </>
  );
}
