import { useTranslations } from "next-intl";
import Image from "next/image";

export default function Hero() {
  const t = useTranslations("hero");

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero.webp"
          alt=""
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
      </div>

      {/* Dark overlay */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background:
            "linear-gradient(105deg, rgba(26,30,33,0.88) 0%, rgba(26,30,33,0.72) 55%, rgba(26,30,33,0.45) 100%)",
        }}
      />

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[180px] z-[1]"
        style={{ background: "linear-gradient(to top, #1a1e21 0%, transparent 100%)" }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-[1280px] mx-auto px-8 w-full pt-[120px] pb-20">
        {/* Pre-heading tagline */}
        <div className="inline-flex items-center gap-2.5 font-['Sofia_Sans_Condensed',sans-serif] text-[14px] font-[700] tracking-[0.18em] uppercase text-[#F26A21] mb-4">
          <span className="block w-6 h-px" style={{ background: "linear-gradient(to right, transparent 0%, #F26A21 100%)" }} />
          <span>{t("tagline")}</span>
          <span className="block w-6 h-px" style={{ background: "linear-gradient(to left, transparent 0%, #F26A21 100%)" }} />
        </div>

        {/* H1 */}
        <h1
          className="font-['Sofia_Sans_Condensed',sans-serif] text-[clamp(54px,8vw,100px)] font-[900] text-white leading-[1.0] tracking-[0.01em] max-w-[820px] mb-6 flex flex-col items-start gap-[0.1em]"
        >
          <span className="block sm:whitespace-nowrap">
            <span>{t("titleLine1Pre")}</span>
            <span>{t("titleLine1Main")}</span>
          </span>
          <span className="text-[#F26A21]">{t("titleAccent")}</span>
        </h1>

        {/* Subtitle */}
        <p className="font-['Sofia_Sans',sans-serif] text-[21px] font-[400] text-white/75 max-w-[520px] leading-[1.6] mb-9">
          {t("subtitle")}
        </p>

        {/* CTA buttons */}
        <div className="flex gap-4 flex-wrap items-center">
          <button
            className="bg-[#F26A21] text-white font-['Sofia_Sans_Condensed',sans-serif] text-[19px] font-[700] tracking-[0.08em] uppercase px-10 py-4 rounded-xl border-2 border-[#F26A21] transition-all hover:bg-[#d45a18] hover:border-[#d45a18] hover:-translate-y-0.5 cursor-pointer js-inquiry-trigger"
            data-inquiry
          >
            {t("ctaPrimary")}
          </button>
          <a
            href="#services"
            className="bg-transparent text-white font-['Sofia_Sans_Condensed',sans-serif] text-[19px] font-[700] tracking-[0.08em] uppercase px-10 py-4 rounded-xl border-2 border-white no-underline transition-all hover:bg-white/15 hover:-translate-y-0.5"
          >
            {t("ctaSecondary")}
          </a>
        </div>
      </div>
    </section>
  );
}
