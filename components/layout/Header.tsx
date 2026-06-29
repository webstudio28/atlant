"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import MobileMenu from "./MobileMenu";
import LanguageSwitcher from "./LanguageSwitcher";
import { NAV_SERVICE_LINKS } from "@/lib/pages/registry";
import { getServiceIcon } from "@/lib/pages/service-icons";

const NAV_GROUPS = [
  { groupKey: "transport" as const, ...NAV_SERVICE_LINKS.transport },
  { groupKey: "warehouse" as const, ...NAV_SERVICE_LINKS.warehouse },
  { groupKey: "relocations" as const, ...NAV_SERVICE_LINKS.relocations },
  { groupKey: "loading" as const, ...NAV_SERVICE_LINKS.loading },
];

function formatPhone(phone: string) {
  const digits = phone.replace(/\D/g, "");
  if (digits.startsWith("359") && digits.length >= 12) {
    return `+359 ${digits.slice(3, 6)} ${digits.slice(6, 9)} ${digits.slice(9, 12)}`;
  }
  return phone;
}

export default function Header({ locale, phone }: { locale: string; phone: string }) {
  const t = useTranslations("nav");
  const isBg = locale === "bg";
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const hrefFor = (parts: readonly string[]) => `/${locale}/${parts.join("/")}`;
  const displayPhone = formatPhone(phone);

  return (
    <>
      <header
        id="site-header"
        className={scrolled ? "scrolled" : ""}
        style={{ background: scrolled ? undefined : "rgba(26,30,33,0.0)" }}
      >
        <div className="header-bar-wrap">
          <div className="header-bar">
            <Link href={`/${locale}`} className="flex items-center no-underline flex-shrink-0">
              <Image
                src="/images/logo.webp"
                alt="Atlant Logistics"
                width={400}
                height={144}
                className="logo-mark"
                priority
              />
            </Link>

            <div className="header-end">
              <nav className="desktop-nav" aria-label="Main navigation">
                {NAV_GROUPS.map((group) => (
                  <div key={group.groupKey} className="nav-dropdown">
                    <Link href={hrefFor(group.main)} className="nav-link nav-dropdown-trigger">
                      {t(`servicesSubmenu.${group.groupKey}`)}
                      <svg
                        className="nav-dropdown-chevron"
                        width="12"
                        height="12"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="#F26A21"
                        strokeWidth="2.5"
                        aria-hidden="true"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
                      </svg>
                    </Link>

                    <div
                      className="nav-dropdown-panel"
                      role="navigation"
                      aria-label={t(`servicesSubmenu.${group.groupKey}`)}
                    >
                      <ul className="nav-dropdown-subs">
                        <li>
                          <Link
                            href={hrefFor(group.main)}
                            className="nav-dropdown-sub-link-accent"
                          >
                            {t("seeAllFor", { title: t(`servicesSubmenu.${group.groupKey}`) })}
                          </Link>
                        </li>
                        {group.items.map((item) => {
                          const itemPath = `/${item.href.join("/")}`;
                          const iconSrc = getServiceIcon(itemPath);

                          return (
                            <li key={item.href.join("/")}>
                              <Link href={hrefFor(item.href)}>
                                {iconSrc && (
                                  <Image
                                    src={iconSrc}
                                    alt=""
                                    width={36}
                                    height={36}
                                    className="nav-dropdown-sub-icon"
                                    aria-hidden
                                  />
                                )}
                                <span>{isBg ? item.bg : item.en}</span>
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                ))}
                <Link href={`/${locale}/about-us`} className="nav-link">
                  {t("about")}
                </Link>
                <Link href={`/${locale}/contacts`} className="nav-link">
                  {t("contacts")}
                </Link>

                <a href={`tel:${phone}`} className="header-phone-link">
                  <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="#F26A21" strokeWidth="2" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  {displayPhone}
                </a>

                <LanguageSwitcher locale={locale} />

                <button
                  type="button"
                  className="btn-primary header-inquiry-btn js-inquiry-trigger"
                  data-inquiry
                >
                  {t("inquiry")}
                </button>
              </nav>

              <div className="header-mobile-actions">
                <a
                  href={`tel:${phone}`}
                  className="header-mobile-phone"
                  aria-label={`Call ${displayPhone}`}
                >
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#F26A21" strokeWidth="2" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="header-mobile-phone-text">{displayPhone}</span>
                </a>

                <LanguageSwitcher locale={locale} />

                <button
                  id="hamburger"
                  type="button"
                  aria-label="Menu"
                  aria-expanded={mobileOpen}
                  aria-controls="mobile-menu"
                  onClick={() => setMobileOpen(true)}
                >
                  <svg width="24" height="24" fill="none" stroke="#fff" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <MobileMenu
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        locale={locale}
        phone={phone}
        navGroups={NAV_GROUPS}
      />
    </>
  );
}
