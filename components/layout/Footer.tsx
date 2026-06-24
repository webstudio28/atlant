import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

interface SiteSettings {
  phone_display?: string;
  phone_secondary?: string;
  address?: string;
  email?: string;
  company_since?: string;
}

export default function Footer({
  locale,
  settings,
  showCta = false,
}: {
  locale: string;
  settings: SiteSettings;
  showCta?: boolean;
}) {
  const t = useTranslations("footer");
  const tCta = useTranslations("cta");
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      {showCta && (
        <section
          id="cta"
          className="cta-section"
          style={{
            background:
              "linear-gradient(90deg,#2a2f33 0%,#353a3e 16%,#3a4044 30%,#353a3e 52%,#2a2f33 72%,#23282b 86%,#1a1e21 100%)",
          }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse 65% 100% at 100% 50%, rgba(0,0,0,0.26) 0%, transparent 50%)" }}
          />
          <div className="footer-cta-inner">
            <div className="inline-flex items-center gap-2.5 font-['Sofia_Sans_Condensed',sans-serif] text-[16px] font-[700] tracking-[0.18em] uppercase text-[#F26A21] mb-4">
              <span className="block w-5 h-px bg-[#F26A21]" />
              Atlant Logistics
            </div>
            <h2
              className="font-['Sofia_Sans_Condensed',sans-serif] text-[clamp(34px,5.5vw,60px)] font-[800] leading-[1.08] tracking-[0.02em] text-white mb-5"
            >
              <span className="text-[#F26A21]">{tCta("intro")}</span>{" "}
              <span className="text-white">{tCta("titleAccent")}</span>
            </h2>
            <span className="block w-20 h-0.5 mb-6" style={{ background: "linear-gradient(to right, #F26A21 0%, transparent 100%)" }} />
            <p className="text-[20px] text-white/85 max-w-[520px] mb-10 leading-[1.6]">
              {tCta("subtitle")}
            </p>
            <div className="footer-cta-actions">
              <button
                type="button"
                className="btn-primary js-inquiry-trigger"
                data-inquiry
              >
                {tCta("ctaPrimary")}
              </button>
              {settings.phone_display && (
                <a
                  href={`tel:${settings.phone_display?.replace(/[\s\/]/g, "")}`}
                  className="cta-phone-btn inline-flex items-center gap-2 bg-white/12 text-white font-['Sofia_Sans_Condensed',sans-serif] text-[16px] font-[700] tracking-[0.06em] px-6 py-3 rounded-xl border-2 border-white/28 no-underline transition-all hover:bg-white/20 hover:-translate-y-0.5"
                >
                  {settings.phone_display}
                </a>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Footer main */}
      <div className="footer-main">
        <div className="footer-inner">
          {/* Grid */}
          <div className="footer-grid">
            {/* Brand column */}
            <div className="footer-brand">
              <div className="mb-5 flex justify-center md:justify-start">
                <Image src="/images/footer-logo.webp" alt="Atlant Logistics" width={180} height={54} className="h-12 w-auto object-contain" />
              </div>
              <p className="text-[16px] text-white/50 leading-[1.7] max-w-[280px] mb-6 mx-auto md:mx-0">
                {t("description")}
              </p>
              <div className="font-['Sofia_Sans_Condensed',sans-serif] text-[13px] tracking-[0.12em] uppercase text-[#F26A21] mb-2">
                {t("tagline")}
              </div>
              <span className="fade-line w-[120px] block h-px mx-auto md:mx-0" />
            </div>

            {/* Services */}
            <div>
              <div className="font-['Sofia_Sans_Condensed',sans-serif] text-[16px] font-[700] tracking-[0.14em] uppercase text-white/88 mb-5 pb-2.5 border-b-2 border-[#F26A21] inline-block">
                {t("servicesTitle")}
              </div>
              <ul className="list-none p-0 m-0 flex flex-col gap-2.5">
                {[
                  { label: t("transport"), href: "/transportni-uslugi" },
                  { label: t("warehousing"), href: "/skladovi-uslugi" },
                  { label: t("relocations"), href: "/premestvane" },
                  { label: t("loading"), href: "/tovaro-raztovarni-uslugi" },
                ].map(({ label, href }) => (
                  <li key={href}>
                    <Link href={`/${locale}${href}`} className="text-[16px] text-white/55 no-underline flex items-center gap-1.5 transition-colors hover:text-[#F26A21]">
                      <span className="text-[#F26A21] text-[12px]">&#9654;</span>
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <div className="font-['Sofia_Sans_Condensed',sans-serif] text-[16px] font-[700] tracking-[0.14em] uppercase text-white/88 mb-5 pb-2.5 border-b-2 border-[#F26A21] inline-block">
                {t("companyTitle")}
              </div>
              <ul className="list-none p-0 m-0 flex flex-col gap-2.5">
                {[
                  { labelKey: "about", href: "/for-us" },
                  { labelKey: "contacts", href: "/contacts" },
                ].map(({ labelKey, href }) => (
                  <li key={href}>
                    <Link href={`/${locale}${href}`} className="text-[16px] text-white/55 no-underline flex items-center gap-1.5 transition-colors hover:text-[#F26A21]">
                      <span className="text-[#F26A21] text-[12px]">&#9654;</span>
                      {t(labelKey as "transport")}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contacts */}
            <div>
              <ul className="list-none p-0 m-0 flex flex-col gap-3.5">
                {settings.phone_display && (
                  <li className="flex gap-3 items-start">
                    <svg width="16" height="16" fill="none" stroke="#F26A21" strokeWidth="2" viewBox="0 0 24 24" className="flex-shrink-0 mt-0.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span className="text-[16px] text-white/60 leading-[1.5]">
                      {settings.phone_display}
                      {settings.phone_secondary && <><br />{settings.phone_secondary}</>}
                    </span>
                  </li>
                )}
                {settings.address && (
                  <li className="flex gap-3 items-start">
                    <svg width="16" height="16" fill="none" stroke="#F26A21" strokeWidth="2" viewBox="0 0 24 24" className="flex-shrink-0 mt-0.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="text-[16px] text-white/60 leading-[1.5]">{settings.address}</span>
                  </li>
                )}
                {settings.email && (
                  <li className="flex gap-3 items-start">
                    <svg width="16" height="16" fill="none" stroke="#F26A21" strokeWidth="2" viewBox="0 0 24 24" className="flex-shrink-0 mt-0.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span className="text-[16px] text-white/60">{settings.email}</span>
                  </li>
                )}
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="footer-bottom flex justify-between items-center py-5 flex-wrap gap-3">
            <span className="text-[15px] text-white/30 font-['Sofia_Sans',sans-serif]">
              &copy; {currentYear} Atlant {t("rights")}
            </span>
            <span className="text-[15px] text-white/30 font-['Sofia_Sans_Condensed',sans-serif] tracking-[0.08em] uppercase">
              ISO 9001 · FEDEMAC · BAP
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
