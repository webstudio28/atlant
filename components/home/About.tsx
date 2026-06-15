import { useTranslations } from "next-intl";
import Image from "next/image";

export default function About() {
  const t = useTranslations("about");

  return (
    <section id="about" className="py-24 relative bg-white">
      <div className="max-w-[1280px] mx-auto px-8 relative">
        {/* Section header */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2.5 font-['Sofia_Sans_Condensed',sans-serif] text-[14px] font-[700] tracking-[0.18em] uppercase text-[#F26A21] mb-3">
            {t("label")}
          </div>
          <h2 className="font-['Sofia_Sans_Condensed',sans-serif] text-[clamp(34px,4.5vw,54px)] font-[800] leading-[1.1] tracking-[0.02em] text-[#52595D]">
            {t("titleText")}
            <span className="text-[#F26A21]">{t("titleAccent")}</span>
            <Image
              src="/images/about-us-logo.webp"
              alt=""
              width={72}
              height={72}
              className="inline-block ml-3 w-[0.7em] h-[0.7em] object-contain align-middle"
              loading="lazy"
              aria-hidden
            />
          </h2>
        </div>

        {/* Layout: image left, text right */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-12 lg:gap-16 items-start">
          {/* Image */}
          <div className="rounded-xl overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.12)]">
            <Image
              src="/images/about-us.webp"
              alt="Atlant Logistics team"
              width={1200}
              height={800}
              className="w-full h-auto object-cover"
              loading="lazy"
            />
          </div>

          {/* Content */}
          <div className="flex flex-col gap-6">
            <p className="text-[18px] text-[#52595D] leading-[1.7] m-0">
              {t("p1")}
            </p>
            <p className="text-[18px] text-[#52595D] leading-[1.7] m-0 hidden md:block">
              {t("p2")}
            </p>

            {/* Certifications highlight */}
            <div className="bg-[#F4F4F2] rounded-xl p-6 border border-[rgba(82,89,93,0.1)]">
              <h3 className="font-['Sofia_Sans_Condensed',sans-serif] text-[18px] font-[800] text-[#52595D] tracking-[0.06em] uppercase mb-4">
                {t("certsTitle")}
              </h3>
              <ul className="list-none m-0 p-0 flex flex-col gap-2.5">
                {[t("cert1"), t("cert2"), t("cert3")].map((cert, i) => (
                  <li key={i} className="text-[rgba(82,89,93,0.88)] text-[16px] leading-[1.55] flex items-start gap-2">
                    <span className="text-[#F26A21] mt-1 flex-shrink-0">✓</span>
                    <span dangerouslySetInnerHTML={{ __html: cert.replace(/ISO 9001|FEDEMAC|БАП|BAP/, "<strong>$&</strong>") }} />
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA */}
            <div>
              <button
                className="bg-[#F26A21] text-white font-['Sofia_Sans_Condensed',sans-serif] text-[19px] font-[700] tracking-[0.08em] uppercase px-10 py-4 rounded-xl border-2 border-[#F26A21] transition-all hover:bg-[#d45a18] hover:border-[#d45a18] hover:-translate-y-0.5 cursor-pointer js-inquiry-trigger"
                data-inquiry
              >
                {t("cta")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
