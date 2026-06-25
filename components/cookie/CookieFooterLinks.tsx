"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { useCookieConsent } from "./CookieConsent";

export default function CookieFooterLinks({ locale }: { locale: string }) {
  const t = useTranslations("footer");
  const { openPreferences } = useCookieConsent();

  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
      <Link
        href={`/${locale}/privacy-policy`}
        className="text-[15px] text-white/30 no-underline transition-colors hover:text-[#F26A21]"
      >
        {t("privacyPolicy")}
      </Link>
      <button
        type="button"
        onClick={openPreferences}
        className="border-0 bg-transparent p-0 text-[15px] text-white/30 transition-colors hover:text-[#F26A21] cursor-pointer font-['Sofia_Sans',sans-serif]"
      >
        {t("cookieSettings")}
      </button>
    </div>
  );
}
