import { Fragment } from "react";
import { useTranslations } from "next-intl";

interface SiteSettings {
  company_since?: string;
  warehouse_area?: string;
  pallet_spaces?: string;
  certifications?: string;
}

export default function TrustStrip({ settings }: { settings: SiteSettings }) {
  const t = useTranslations("trust");
  const sinceYear = settings.company_since
    ? new Date().getFullYear() - parseInt(settings.company_since, 10)
    : 20;

  const stats = [
    {
      num: settings.warehouse_area || "5 000 м²",
      label: t("warehouseArea"),
    },
    {
      num: settings.pallet_spaces || "10 000+",
      label: t("palletSpaces"),
    },
    {
      num: settings.certifications || "ISO 9001",
      label: t("certification"),
    },
    {
      num: t("national"),
      label: t("coverage"),
    },
  ];

  return (
    <section id="trust" aria-label={t("ariaLabel")}>
      <div className="trust-band-wrap">
        <div className="trust-band-inner">
          <p className="trust-band-years">
            <span className="trust-band-strong">
              {sinceYear} {t("yearsExperience")}
            </span>
          </p>

          <p className="trust-band-stats">
            {stats.map((stat, index) => (
              <Fragment key={stat.label}>
                {index > 0 && (
                  <span className="trust-band-dot" aria-hidden="true">
                    ·
                  </span>
                )}
                <span className="trust-band-stat-item">
                  <span className="trust-band-stat-num">{stat.num}</span>
                  <span className="trust-band-stat-label">{stat.label}</span>
                </span>
              </Fragment>
            ))}
          </p>
        </div>
      </div>
    </section>
  );
}
