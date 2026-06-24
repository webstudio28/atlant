import { useTranslations } from "next-intl";
import Image from "next/image";

export default function Hero() {
  const t = useTranslations("hero");

  return (
    <section id="hero">
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

      <div
        className="absolute inset-0 z-[1]"
        style={{
          background:
            "linear-gradient(105deg, rgba(26,30,33,0.88) 0%, rgba(26,30,33,0.72) 55%, rgba(26,30,33,0.45) 100%)",
        }}
      />

      <div
        className="hero-bottom-fade absolute bottom-0 left-0 right-0 h-[180px] z-[1]"
        style={{ background: "linear-gradient(to top, #1a1e21 0%, transparent 100%)" }}
      />

      <div className="hero-inner">
        <div className="section-label hero-tagline">
          <span className="hero-tagline-text">{t("tagline")}</span>
        </div>

        <h1 className="hero-title">
          <span className="hero-title-line1">
            <span className="hero-title-pre">{t("titleLine1Pre")}</span>
            <span className="hero-title-main">{t("titleLine1Main")}</span>
          </span>
          <span className="hero-title-accent">{t("titleAccent")}</span>
        </h1>

        <p className="hero-subtitle">{t("subtitle")}</p>

        <div className="hero-cta">
          <button
            type="button"
            className="btn-primary js-inquiry-trigger"
            data-inquiry
          >
            {t("ctaPrimary")}
          </button>
          <a href="#services" className="btn-outline-white">
            {t("ctaSecondary")}
          </a>
        </div>
      </div>
    </section>
  );
}
