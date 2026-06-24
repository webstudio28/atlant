import { useTranslations } from "next-intl";
import Image from "next/image";

const BENEFIT_ICONS = [
  "/images/ekspeditivnost.webp",
  "/images/support.webp",
  "/images/sigurnost.webp",
  "/images/pricing.webp",
];

export default function WhyUs() {
  const t = useTranslations("why");

  const benefits = [
    { title: t("benefit1Title"), text: t("benefit1Text"), icon: BENEFIT_ICONS[0] },
    { title: t("benefit2Title"), text: t("benefit2Text"), icon: BENEFIT_ICONS[1] },
    { title: t("benefit3Title"), text: t("benefit3Text"), icon: BENEFIT_ICONS[2] },
    { title: t("benefit4Title"), text: t("benefit4Text"), icon: BENEFIT_ICONS[3] },
  ];

  return (
    <section id="why">
      <div className="section-wrap">
        <div className="section-intro">
          <div className="section-label">{t("label")}</div>
          <h2>{t("title")}</h2>
          <p style={{ maxWidth: 500 }}>{t("subtitle")}</p>
          <span
            className="fade-line-sm"
            style={{
              background:
                "linear-gradient(to right, transparent 0%, #52595D 30%, #52595D 70%, transparent 100%)",
              opacity: 0.3,
            }}
          />
        </div>

        <div className="why-grid-f">
          {benefits.map((benefit, i) => (
            <div key={benefit.title} className="why-card-f card-lift">
              <span className="why-deco-index" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="why-deco-corner why-deco-corner--tl" aria-hidden="true" />
              <span className="why-deco-corner why-deco-corner--br" aria-hidden="true" />
              <div className="why-card-inner">
                <div className="icon-circle">
                  <Image
                    src={benefit.icon}
                    alt=""
                    width={40}
                    height={40}
                    className="why-benefit-icon"
                    loading="lazy"
                    aria-hidden
                  />
                </div>
                <div>
                  <h4 className="why-benefit-title">{benefit.title}</h4>
                  <p className="why-benefit-text">{benefit.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
