"use client";

import { usePathname, useRouter } from "next/navigation";
import { useTransition } from "react";

export default function LanguageSwitcher({
  locale,
  scrolled,
}: {
  locale: string;
  scrolled?: boolean;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const switchLocale = (newLocale: string) => {
    // Replace current locale prefix with new one
    const segments = pathname.split("/");
    segments[1] = newLocale;
    const newPath = segments.join("/");
    startTransition(() => {
      router.replace(newPath);
    });
  };

  const otherLocale = locale === "bg" ? "en" : "bg";
  const buttonClass = `font-['Sofia_Sans_Condensed',sans-serif] text-[13px] font-[700] tracking-[0.1em] uppercase px-2 py-1 rounded border transition-all cursor-pointer ${
    scrolled
      ? "text-[#52595D] border-[rgba(82,89,93,0.3)] hover:border-[#F26A21] hover:text-[#F26A21]"
      : "text-white/70 border-white/30 hover:border-[#F26A21] hover:text-[#F26A21]"
  } ${isPending ? "opacity-50" : ""}`;

  return (
    <button
      className={buttonClass}
      onClick={() => switchLocale(otherLocale)}
      disabled={isPending}
      aria-label={`Switch to ${otherLocale.toUpperCase()}`}
    >
      {otherLocale.toUpperCase()}
    </button>
  );
}
