"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import MobileMenu from "./MobileMenu";
import LanguageSwitcher from "./LanguageSwitcher";

const NAV_SERVICES = [
  {
    groupKey: "transport" as const,
    anchor: "#service-transport",
    items: [
      { bgKey: "\u0410\u0432\u0442\u043e\u043c\u043e\u0431\u0438\u043b\u0435\u043d \u0442\u0440\u0430\u043d\u0441\u043f\u043e\u0440\u0442" },
      { bgKey: "\u0412\u044a\u0437\u0434\u0443\u0448\u0435\u043d \u0442\u0440\u0430\u043d\u0441\u043f\u043e\u0440\u0442" },
      { bgKey: "\u041c\u043e\u0440\u0441\u043a\u0438 \u0442\u0440\u0430\u043d\u0441\u043f\u043e\u0440\u0442" },
      { bgKey: "\u0416\u0435\u043b\u0435\u0437\u043e\u043f\u044a\u0442\u0435\u043d \u0442\u0440\u0430\u043d\u0441\u043f\u043e\u0440\u0442" },
      { bgKey: "\u0421\u043f\u0435\u0446\u0438\u0430\u043b\u0438\u0437\u0438\u0440\u0430\u043d \u0442\u0440\u0430\u043d\u0441\u043f\u043e\u0440\u0442" },
    ],
  },
  {
    groupKey: "warehouse" as const,
    anchor: "#service-warehouse",
    items: [
      { bgKey: "\u041a\u043e\u0440\u043f\u043e\u0440\u0430\u0442\u0438\u0432\u043d\u043e" },
      { bgKey: "\u0418\u043d\u0434\u0438\u0432\u0438\u0434\u0443\u0430\u043b\u043d\u043e" },
    ],
  },
  {
    groupKey: "relocations" as const,
    anchor: "#service-relocations",
    items: [
      { bgKey: "\u041d\u0430 \u0434\u043e\u043c\u0430" },
      { bgKey: "\u041d\u0430 \u043e\u0444\u0438\u0441\u0430" },
      { bgKey: "\u041c\u0435\u0436\u0434\u0443\u043d\u0430\u0440\u043e\u0434\u043d\u043e" },
      { bgKey: "\u0421\u043f\u0435\u0446\u0438\u0430\u043b\u0438\u0437\u0438\u0440\u0430\u043d\u043e" },
      { bgKey: "\u0418\u043d\u0434\u0443\u0441\u0442\u0440\u0438\u0430\u043b\u043d\u043e" },
    ],
  },
  {
    groupKey: "loading" as const,
    anchor: "#service-loading",
    items: [
      { bgKey: "\u0425\u0430\u043c\u0430\u043b\u0441\u043a\u0438 \u0443\u0441\u043b\u0443\u0433\u0438" },
      { bgKey: "\u041f\u043e\u043c\u043e\u0449\u0435\u043d \u043f\u0435\u0440\u0441\u043e\u043d\u0430\u043b" },
    ],
  },
];

export default function Header({ locale, phone }: { locale: string; phone: string }) {
  const t = useTranslations("nav");
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const navLinkClass = `text-white/80 hover:text-white font-['Sofia_Sans',sans-serif] text-[15px] font-medium transition-colors ${scrolled ? "!text-[#1a1e21] hover:!text-[#F26A21]" : ""}`;
  const phoneClass = `text-white/65 hover:text-white font-['Sofia_Sans',sans-serif] text-[15px] font-medium no-underline flex items-center gap-1.5 transition-colors ${scrolled ? "!text-[#52595D] hover:!text-[#F26A21]" : ""}`;

  return (
    <>
      <header
        id="site-header"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white shadow-[0_4px_20px_rgba(0,0,0,0.11)]"
            : "bg-[rgba(26,30,33,0.0)]"
        }`}
      >
        <div className="max-w-[1280px] mx-auto px-8 w-full">
          <div className="flex items-center justify-between w-full min-h-[72px] gap-3">
            {/* Logo */}
            <Link href={`/${locale}`} className="flex items-center no-underline flex-shrink-0">
              <Image
                src="/images/logo.webp"
                alt="Atlant Logistics"
                width={160}
                height={58}
                className="h-12 w-auto object-contain rounded-md"
                priority
              />
            </Link>

            <div className="flex items-center gap-2 ml-auto">
              {/* Desktop Nav */}
              <nav className="hidden lg:flex items-center gap-8">
                {/* Services dropdown */}
                <div className="relative" ref={dropdownRef}>
                  <button
                    className={`${navLinkClass} flex items-center gap-1 cursor-pointer bg-none border-none`}
                    onMouseEnter={() => setDropdownOpen(true)}
                    onMouseLeave={() => setDropdownOpen(false)}
                    onClick={() => setDropdownOpen((v) => !v)}
                    aria-expanded={dropdownOpen}
                  >
                    {t("services")}
                    <svg
                      width="14" height="14" fill="none" viewBox="0 0 24 24"
                      stroke="#F26A21" strokeWidth="2.5"
                      className={`transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
                    </svg>
                  </button>

                  {/* Dropdown panel */}
                  <div
                    className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[720px] bg-white rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.14)] border border-[rgba(82,89,93,0.08)] transition-all duration-200 z-50 ${
                      dropdownOpen ? "opacity-100 pointer-events-auto translate-y-0" : "opacity-0 pointer-events-none -translate-y-2"
                    }`}
                    onMouseEnter={() => setDropdownOpen(true)}
                    onMouseLeave={() => setDropdownOpen(false)}
                  >
                    <div className="grid grid-cols-4 gap-0 p-5">
                      {NAV_SERVICES.map((group) => (
                        <div key={group.groupKey} className="pr-4">
                          <Link
                            href={`/${locale}${group.anchor}`}
                            className="block font-['Sofia_Sans_Condensed',sans-serif] text-[13px] font-[800] tracking-[0.1em] uppercase text-[#52595D] mb-2 no-underline hover:text-[#F26A21] transition-colors"
                            onClick={() => setDropdownOpen(false)}
                          >
                            {t(`servicesSubmenu.${group.groupKey}`)}
                          </Link>
                          <ul className="list-none p-0 m-0 flex flex-col gap-1.5">
                            {group.items.map((item) => (
                              <li key={item.bgKey}>
                                <Link
                                  href={`/${locale}${group.anchor}`}
                                  className="text-[14px] text-[rgba(82,89,93,0.78)] no-underline hover:text-[#F26A21] transition-colors block"
                                  onClick={() => setDropdownOpen(false)}
                                >
                                  {item.bgKey}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <Link href={`/${locale}#about`} className={navLinkClass}>{t("about")}</Link>
                <Link href={`/${locale}#cta`} className={navLinkClass}>{t("contacts")}</Link>

                {/* Phone */}
                <a href={`tel:${phone}`} className={phoneClass}>
                  <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="#F26A21" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  {phone.replace("+359", "+359 ").replace(/(\d{3})(\d{3})(\d{3})$/, "$1 $2 $3")}
                </a>

                {/* Language switcher */}
                <LanguageSwitcher locale={locale} scrolled={scrolled} />

                {/* CTA button */}
                <button
                  className="bg-[#F26A21] text-white font-['Sofia_Sans_Condensed',sans-serif] text-[15px] font-[700] tracking-[0.08em] uppercase px-6 py-2.5 rounded-xl border-2 border-[#F26A21] transition-all hover:bg-[#d45a18] hover:border-[#d45a18] hover:-translate-y-px cursor-pointer js-inquiry-trigger"
                  data-inquiry
                >
                  {t("inquiry")}
                </button>
              </nav>

              {/* Mobile: phone + hamburger */}
              <div className="flex lg:hidden items-center gap-2">
                <a href={`tel:${phone}`} className="flex items-center gap-1.5 text-white/88 text-[14px] font-[600] font-['Sofia_Sans',sans-serif] no-underline">
                  <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="#F26A21" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>{phone}</span>
                </a>
                <LanguageSwitcher locale={locale} scrolled={scrolled} />
                <button
                  className="bg-none border-none cursor-pointer p-0 line-height-0"
                  aria-label="Menu"
                  aria-expanded={mobileOpen}
                  onClick={() => setMobileOpen(true)}
                >
                  <svg width="24" height="24" fill="none" stroke={scrolled ? "#1a1e21" : "#fff"} strokeWidth="2" viewBox="0 0 24 24">
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
        navServices={NAV_SERVICES}
      />
    </>
  );
}
