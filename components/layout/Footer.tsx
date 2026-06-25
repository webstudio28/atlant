import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import CookieFooterLinks from "@/components/cookie/CookieFooterLinks";

interface SiteSettings {
  phone_display?: string;
  phone_secondary?: string;
  address?: string;
  email?: string;
  facebook?: string;
  instagram?: string;
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
              {(settings.facebook || settings.instagram) && (
                <div className="flex items-center justify-center md:justify-start gap-3 mt-5">
                  {settings.facebook && (
                    <a
                      href={settings.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Facebook"
                      className="flex items-center justify-center w-9 h-9 rounded-full border border-white/20 text-white/55 no-underline transition-colors hover:text-[#F26A21] hover:border-[#F26A21]"
                    >
                      <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                    </a>
                  )}
                  {settings.instagram && (
                    <a
                      href={settings.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Instagram"
                      className="flex items-center justify-center w-9 h-9 rounded-full border border-white/20 text-white/55 no-underline transition-colors hover:text-[#F26A21] hover:border-[#F26A21]"
                    >
                      <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                      </svg>
                    </a>
                  )}
                </div>
              )}
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
                  { labelKey: "about", href: "/about-us" },
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
                    <a href={`mailto:${settings.email}`} className="text-[16px] text-white/60 no-underline hover:text-[#F26A21] transition-colors">{settings.email}</a>
                  </li>
                )}
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="footer-bottom flex flex-col gap-3 py-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-col gap-2 sm:gap-1">
              <span className="text-[15px] text-white/30 font-['Sofia_Sans',sans-serif]">
                &copy; {currentYear} Atlant {t("rights")}
              </span>
              <CookieFooterLinks locale={locale} />
            </div>
            <span className="text-[15px] text-white/30 font-['Sofia_Sans_Condensed',sans-serif] tracking-[0.08em] uppercase">
              ISO 9001 · FEDEMAC · BAP
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
