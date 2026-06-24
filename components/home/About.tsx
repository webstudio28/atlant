import { useTranslations } from "next-intl";
import Image from "next/image";

export default function About() {
  const t = useTranslations("about");

  return (
    <section id="about">
      <div className="dec-bg" aria-hidden="true" />
      <div className="section-wrap">
        <div className="about-inner">
          <div className="about-header">
            <div className="section-label about-section-label">{t("label")}</div>
            <h2>
              <span className="about-title-text">
                {t("titleText")}
                <span className="about-title-accent">{t("titleAccent")}</span>
              </span>
              <Image
                src="/images/about-us-logo.webp"
                alt=""
                width={72}
                height={72}
                className="about-title-icon"
                loading="lazy"
                aria-hidden
              />
            </h2>
          </div>

          <div className="about-layout">
            <div className="about-media">
              <div className="about-media-inner">
                <Image
                  src="/images/about-us.webp"
                  alt="Atlant Logistics team"
                  width={1200}
                  height={800}
                  className="w-full h-full min-h-[280px] object-cover"
                  loading="lazy"
                />
              </div>
            </div>

            <div className="about-content">
              <div className="about-content-body">
                <p className="about-text">{t("p1")}</p>
                <p className="about-text about-text-mobile-hide">{t("p2")}</p>

                <div className="about-highlight">
                  <h3 className="about-highlight-title">{t("certsTitle")}</h3>
                  <ul className="about-certs-list">
                    {[t("cert1"), t("cert2"), t("cert3")].map((cert, i) => (
                      <li
                        key={i}
                        dangerouslySetInnerHTML={{
                          __html: cert.replace(
                            /ISO 9001|FEDEMAC|БАП|BAP/,
                            "<strong>$&</strong>"
                          ),
                        }}
                      />
                    ))}
                  </ul>
                </div>
              </div>

              <div className="about-cta-wrap">
                <button
                  type="button"
                  className="btn-primary js-inquiry-trigger"
                  data-inquiry
                >
                  {t("cta")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
