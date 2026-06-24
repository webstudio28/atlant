"use client";

import { usePathname, useRouter } from "next/navigation";
import { Globe } from "lucide-react";
import { useEffect, useRef, useState, useTransition } from "react";
import { LOCALE_OPTIONS } from "@/lib/i18n/locales";

export default function LanguageSwitcher({ locale }: { locale: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onPointerDown = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  const switchLocale = (newLocale: string) => {
    if (newLocale === locale) {
      setOpen(false);
      return;
    }

    const segments = pathname.split("/");
    segments[1] = newLocale;
    const newPath = segments.join("/") || `/${newLocale}`;

    setOpen(false);
    startTransition(() => {
      router.replace(newPath);
    });
  };

  return (
    <div
      ref={rootRef}
      className={`lang-switcher${open ? " open" : ""}`}
    >
      <button
        type="button"
        className="lang-switcher-trigger"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label="Select language"
        disabled={isPending}
      >
        <Globe size={18} strokeWidth={2} aria-hidden="true" />
      </button>

      <div className="lang-switcher-panel" role="listbox" aria-label="Languages">
        {LOCALE_OPTIONS.map((option) => (
          <button
            key={option.code}
            type="button"
            role="option"
            aria-selected={option.code === locale}
            className={`lang-switcher-option${option.code === locale ? " is-active" : ""}`}
            onClick={() => switchLocale(option.code)}
            disabled={isPending}
          >
            <span>{option.label}</span>
            <span className="lang-switcher-code">{option.code}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
