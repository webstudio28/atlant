"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { useEffect, useState } from "react";

type NavGroup = {
  groupKey: "transport" | "warehouse" | "relocations" | "loading";
  main: readonly string[];
  items: readonly { href: readonly string[]; bg: string; en: string }[];
};

interface Props {
  open: boolean;
  onClose: () => void;
  locale: string;
  phone: string;
  navGroups: NavGroup[];
}

export default function MobileMenu({ open, onClose, locale, phone, navGroups }: Props) {
  const t = useTranslations("nav");
  const tInquiry = useTranslations("inquiry");
  const isBg = locale === "bg";
  const [servicesOpen, setServicesOpen] = useState(false);
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const handleClose = () => {
    onClose();
    setServicesOpen(false);
    setExpandedGroups({});
  };

  const hrefFor = (parts: readonly string[]) => `/${locale}/${parts.join("/")}`;

  return (
    <>
      <div
        className={`fixed inset-0 z-[150] bg-[rgba(26,30,33,0.55)] transition-opacity duration-300 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={handleClose}
        aria-hidden="true"
      />

      <nav
        className={`fixed top-0 right-0 w-full h-full h-dvh z-[160] bg-[#F4F4F2] flex flex-col transition-transform duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)] overflow-y-auto ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!open}
        aria-label="Mobile menu"
      >
        <div className="flex justify-end items-center flex-shrink-0 p-[18px_16px] border-b border-[rgba(82,89,93,0.12)]">
          <button className="bg-none border-none cursor-pointer p-2" aria-label="Close menu" onClick={handleClose}>
            <svg width="24" height="24" fill="none" stroke="#1a1e21" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center text-center px-4 py-8 gap-0 w-full">
          <div className="w-full max-w-[320px] border-b border-[rgba(82,89,93,0.12)]">
            <button
              className="flex items-center justify-center gap-2.5 w-full py-4 border-none bg-none cursor-pointer font-['Sofia_Sans_Condensed',sans-serif] text-[25px] font-[600] tracking-[0.08em] uppercase text-[#1a1e21] text-center"
              aria-expanded={servicesOpen}
              onClick={() => setServicesOpen((v) => !v)}
            >
              <span>{t("services")}</span>
              <svg className={`transition-transform duration-300 ${servicesOpen ? "rotate-180" : ""}`} width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="#F26A21" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
              </svg>
            </button>

            <div className="overflow-hidden transition-all duration-400" style={{ maxHeight: servicesOpen ? "600px" : "0px" }}>
              <div className="pb-3">
                {navGroups.map((group) => (
                  <div key={group.groupKey} className="border-t border-[rgba(82,89,93,0.1)]">
                    <button
                      className="flex items-center justify-center gap-2 w-full py-3.5 border-none bg-none cursor-pointer font-['Sofia_Sans_Condensed',sans-serif] text-[17px] font-[800] tracking-[0.05em] uppercase text-[#52595D] text-center"
                      onClick={() => setExpandedGroups((prev) => ({ ...prev, [group.groupKey]: !prev[group.groupKey] }))}
                      aria-expanded={!!expandedGroups[group.groupKey]}
                    >
                      <span>{t(`servicesSubmenu.${group.groupKey}`)}</span>
                      <svg className={`w-3.5 h-3.5 transition-transform duration-300 ${expandedGroups[group.groupKey] ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="#F26A21" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
                      </svg>
                    </button>
                    <div className="overflow-hidden transition-all duration-300" style={{ maxHeight: expandedGroups[group.groupKey] ? "320px" : "0px" }}>
                      <ul className="list-none m-0 p-0 flex flex-col items-center gap-2 pb-3">
                        <li>
                          <Link href={hrefFor(group.main)} className="font-['Sofia_Sans',sans-serif] text-[14px] font-[600] text-[#52595D] no-underline" onClick={handleClose}>
                            {isBg ? "Всички услуги" : "All services"}
                          </Link>
                        </li>
                        {group.items.map((item) => (
                          <li key={item.href.join("/")}>
                            <Link
                              href={hrefFor(item.href)}
                              className="font-['Sofia_Sans_Condensed',sans-serif] text-[15px] font-[600] text-[#F26A21] no-underline underline underline-offset-[3px] decoration-[rgba(242,106,33,0.45)] text-center"
                              onClick={handleClose}
                            >
                              {isBg ? item.bg : item.en}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <Link href={`/${locale}/about-us`} className="block w-full max-w-[320px] py-4 border-b border-[rgba(82,89,93,0.12)] font-['Sofia_Sans_Condensed',sans-serif] text-[25px] font-[600] tracking-[0.08em] uppercase text-[#1a1e21] no-underline text-center" onClick={handleClose}>
            {t("about")}
          </Link>
          <Link href={`/${locale}/contacts`} className="block w-full max-w-[320px] py-4 border-b border-[rgba(82,89,93,0.12)] font-['Sofia_Sans_Condensed',sans-serif] text-[25px] font-[600] tracking-[0.08em] uppercase text-[#1a1e21] no-underline text-center" onClick={handleClose}>
            {t("contacts")}
          </Link>
          <a href={`tel:${phone}`} className="flex items-center justify-center gap-2.5 w-full max-w-[320px] py-4 border-b border-[rgba(82,89,93,0.12)] text-[#52595D] font-['Sofia_Sans',sans-serif] text-[18px] font-[500] no-underline" onClick={handleClose}>
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#F26A21" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            {phone}
          </a>

          <button
            className="mt-7 block w-full max-w-[320px] bg-[#F26A21] text-white font-['Sofia_Sans_Condensed',sans-serif] text-[18px] font-[700] tracking-[0.08em] uppercase px-6 py-3.5 rounded-xl border-2 border-[#F26A21] text-center cursor-pointer transition-all hover:bg-[#d45a18] js-inquiry-trigger"
            data-inquiry
            onClick={handleClose}
          >
            {tInquiry("step1Title")}
          </button>
        </div>
      </nav>
    </>
  );
}
