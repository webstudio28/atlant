"use client";

import Link from "next/link";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useTranslations } from "next-intl";
import {
  clearStoredConsent,
  notifyConsentChange,
  notifyConsentReset,
  readStoredConsent,
  storeConsent,
  type CookieConsentApi,
  type CookieConsentState,
} from "@/lib/cookie-consent";

type CookieConsentContextValue = {
  consent: CookieConsentState | null;
  acceptAll: () => void;
  savePreferences: (analyticsGranted: boolean) => void;
  openPreferences: () => void;
  openPrivacy: () => void;
  reset: () => void;
};

const CookieConsentContext = createContext<CookieConsentContextValue | null>(null);

export function useCookieConsent() {
  const ctx = useContext(CookieConsentContext);
  if (!ctx) {
    throw new Error("useCookieConsent must be used within CookieConsentProvider");
  }
  return ctx;
}

function useScrollLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return;
    document.documentElement.classList.add("overflow-hidden");
    document.body.classList.add("overflow-hidden");
    return () => {
      document.documentElement.classList.remove("overflow-hidden");
      document.body.classList.remove("overflow-hidden");
    };
  }, [locked]);
}

function ModalShell({
  open,
  onClose,
  title,
  children,
  closeLabel,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  closeLabel: string;
}) {
  useScrollLock(open);

  return (
    <div
      className={`fixed inset-0 z-[150] flex items-center justify-center p-4 transition-opacity duration-200 ${
        open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
      aria-modal="true"
      role="dialog"
      aria-labelledby="cookie-modal-title"
      hidden={!open}
    >
      <div
        className="absolute inset-0 bg-[rgba(26,30,33,0.62)] backdrop-blur-[6px]"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="relative flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-black/5">
        <div className="flex items-center justify-between border-b border-[#e8e8e6] px-6 py-5">
          <h2
            id="cookie-modal-title"
            className="font-['Sofia_Sans_Condensed',sans-serif] text-[22px] font-[800] uppercase tracking-[0.06em] text-[#52595D]"
          >
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 text-[#52595D]/70 transition-colors hover:bg-[#F4F4F2] hover:text-[#2a2f33] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F26A21]/50"
            aria-label={closeLabel}
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="overflow-y-auto px-6 py-5 text-[16px] leading-relaxed text-[#52595D]">{children}</div>
      </div>
    </div>
  );
}

function PreferenceRow({
  title,
  description,
  checked,
  disabled,
  onChange,
  statusLabel,
}: {
  title: string;
  description: string;
  checked: boolean;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
  statusLabel: string;
}) {
  return (
    <div
      className={`flex items-start justify-between gap-4 rounded-xl border p-4 ${
        disabled ? "border-[#F26A21]/15 bg-[#F4F4F2]/80" : "border-[#e8e8e6] bg-white"
      }`}
    >
      <div>
        <div className="font-['Sofia_Sans_Condensed',sans-serif] text-[17px] font-[700] tracking-[0.04em] text-[#52595D]">
          {title}
        </div>
        <div className="mt-1 text-[15px] text-[#52595D]/75">{description}</div>
      </div>
      <label className="inline-flex shrink-0 select-none items-center gap-2">
        <input
          type="checkbox"
          checked={checked}
          disabled={disabled}
          onChange={onChange ? (e) => onChange(e.target.checked) : undefined}
          className="h-5 w-5 accent-[#F26A21] disabled:opacity-70"
        />
        <span className="text-[14px] text-[#52595D]/70">{statusLabel}</span>
      </label>
    </div>
  );
}

export function CookieConsentProvider({
  locale,
  contactEmail,
  children,
}: {
  locale: string;
  contactEmail?: string;
  children: ReactNode;
}) {
  const t = useTranslations("cookieConsent");
  const [ready, setReady] = useState(false);
  const [consent, setConsent] = useState<CookieConsentState | null>(null);
  const [showBanner, setShowBanner] = useState(false);
  const [preferencesOpen, setPreferencesOpen] = useState(false);
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(true);
  const listenersRef = useRef<Array<(consent: CookieConsentState) => void>>([]);
  const apiRef = useRef<CookieConsentApi | null>(null);

  const applyConsent = useCallback((next: CookieConsentState) => {
    storeConsent(next);
    setConsent(next);
    setShowBanner(false);
    notifyConsentChange(next.analytics);
    listenersRef.current.forEach((fn) => {
      try {
        fn(next);
      } catch {
        // ignore listener errors
      }
    });
  }, []);

  const acceptAll = useCallback(() => {
    applyConsent({ analytics: "granted" });
  }, [applyConsent]);

  const savePreferences = useCallback(
    (analyticsGranted: boolean) => {
      applyConsent({ analytics: analyticsGranted ? "granted" : "denied" });
      setPreferencesOpen(false);
    },
    [applyConsent]
  );

  const openPreferences = useCallback(() => {
    setShowBanner(false);
    setAnalyticsEnabled(consent ? consent.analytics === "granted" : true);
    setPreferencesOpen(true);
  }, [consent]);

  const openPrivacy = useCallback(() => {
    setShowBanner(false);
    setPrivacyOpen(true);
  }, []);

  const reset = useCallback(() => {
    clearStoredConsent();
    setConsent(null);
    setShowBanner(true);
    notifyConsentReset();
  }, []);

  useEffect(() => {
    const stored = readStoredConsent();
    setConsent(stored);
    setShowBanner(!stored);
    if (stored) notifyConsentChange(stored.analytics);
    setReady(true);
  }, []);

  useEffect(() => {
    const api: CookieConsentApi = {
      get: () => consent,
      set: (next) => applyConsent(next),
      open: openPreferences,
      reset,
      onChange: (fn) => {
        if (typeof fn !== "function") return () => {};
        listenersRef.current.push(fn);
        return () => {
          listenersRef.current = listenersRef.current.filter((x) => x !== fn);
        };
      },
    };
    apiRef.current = api;
    window.CookieConsent = api;
    return () => {
      delete window.CookieConsent;
    };
  }, [applyConsent, consent, openPreferences, reset]);

  const contextValue = useMemo(
    () => ({
      consent,
      acceptAll,
      savePreferences,
      openPreferences,
      openPrivacy,
      reset,
    }),
    [acceptAll, consent, openPreferences, openPrivacy, reset, savePreferences]
  );

  return (
    <CookieConsentContext.Provider value={contextValue}>
      {children}

      {ready && (
      <div
        className={`fixed inset-x-0 bottom-0 z-[130] p-4 transition-opacity duration-200 ${
          showBanner ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        role="dialog"
        aria-label={t("ariaBanner")}
        aria-live="polite"
        hidden={!showBanner}
      >
        <div className="mx-auto max-w-5xl rounded-2xl border border-[#F26A21]/15 bg-white p-4 shadow-xl md:p-5">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <p className="text-[15px] leading-relaxed text-[#52595D] md:text-[16px]">
              {t("bannerText")}{" "}
              <button
                type="button"
                onClick={openPrivacy}
                className="font-medium text-[#F26A21] underline underline-offset-2 transition-colors hover:text-[#d45a18]"
              >
                {t("privacyPolicy")}
              </button>
            </p>
            <div className="flex shrink-0 flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
              <button type="button" onClick={acceptAll} className="btn-primary px-5 py-2.5 text-[15px]">
                {t("accept")}
              </button>
              <button
                type="button"
                onClick={openPreferences}
                className="px-2 py-2 text-[15px] font-['Sofia_Sans_Condensed',sans-serif] font-[700] tracking-[0.06em] uppercase text-[#52595D]/80 transition-colors hover:text-[#F26A21]"
              >
                {t("settings")}
              </button>
            </div>
          </div>
        </div>
      </div>
      )}

      <ModalShell
        open={preferencesOpen}
        onClose={() => setPreferencesOpen(false)}
        title={t("preferencesTitle")}
        closeLabel={t("closeModal")}
      >
        <div className="space-y-5">
          <p className="text-[15px] text-[#52595D]/85">{t("preferencesIntro")}</p>

          <div className="space-y-3">
            <PreferenceRow
              title={t("necessary")}
              description={t("necessaryDesc")}
              checked
              disabled
              statusLabel={t("enabled")}
            />
            <PreferenceRow
              title={t("googleAds")}
              description={t("googleAdsDesc")}
              checked
              disabled
              statusLabel={t("alwaysEnabled")}
            />
            <PreferenceRow
              title={t("analytics")}
              description={t("analyticsDesc")}
              checked={analyticsEnabled}
              onChange={setAnalyticsEnabled}
              statusLabel={t("enabled")}
            />
          </div>

          <div className="flex flex-col gap-2 pt-2 sm:flex-row sm:flex-wrap">
            <button
              type="button"
              onClick={() => savePreferences(analyticsEnabled)}
              className="btn-primary px-5 py-2.5 text-[15px]"
            >
              {t("save")}
            </button>
            <button
              type="button"
              onClick={() => {
                setPreferencesOpen(false);
                openPrivacy();
              }}
              className="inline-flex items-center justify-center rounded-xl border-2 border-[#52595D]/20 px-5 py-2.5 font-['Sofia_Sans_Condensed',sans-serif] text-[15px] font-[700] tracking-[0.06em] uppercase text-[#52595D] transition-colors hover:border-[#F26A21]/40 hover:text-[#F26A21]"
            >
              {t("privacyPolicy")}
            </button>
            <button
              type="button"
              onClick={() => setPreferencesOpen(false)}
              className="inline-flex items-center justify-center rounded-xl border-2 border-[#52595D]/20 px-5 py-2.5 font-['Sofia_Sans_Condensed',sans-serif] text-[15px] font-[700] tracking-[0.06em] uppercase text-[#52595D] transition-colors hover:border-[#F26A21]/40 hover:text-[#F26A21]"
            >
              {t("close")}
            </button>
          </div>
        </div>
      </ModalShell>

      <ModalShell
        open={privacyOpen}
        onClose={() => setPrivacyOpen(false)}
        title={t("privacyModalTitle")}
        closeLabel={t("closeModal")}
      >
        <div className="space-y-4 text-[15px]">
          <p>{t("privacyModalP1")}</p>
          <ul className="list-disc space-y-2 pl-5">
            <li>{t("privacyModalLi1")}</li>
            <li>{t("privacyModalLi2")}</li>
            <li>{t("privacyModalLi3")}</li>
          </ul>
          <p>
            {t("privacyModalP2")}{" "}
            <a
              href="https://policies.google.com/privacy"
              className="font-medium text-[#F26A21] underline underline-offset-2 hover:text-[#d45a18]"
              target="_blank"
              rel="noopener noreferrer"
            >
              Google Privacy Policy
            </a>
            .
          </p>
          <div className="flex flex-col gap-2 pt-2 sm:flex-row sm:flex-wrap">
            <button
              type="button"
              onClick={() => {
                setPrivacyOpen(false);
                openPreferences();
              }}
              className="inline-flex items-center justify-center rounded-xl border-2 border-[#52595D]/20 px-5 py-2.5 font-['Sofia_Sans_Condensed',sans-serif] text-[15px] font-[700] tracking-[0.06em] uppercase text-[#52595D] transition-colors hover:border-[#F26A21]/40 hover:text-[#F26A21]"
            >
              {t("cookieSettingsBtn")}
            </button>
            <Link
              href={`/${locale}/privacy-policy`}
              className="inline-flex items-center justify-center rounded-xl border-2 border-[#52595D]/20 px-5 py-2.5 font-['Sofia_Sans_Condensed',sans-serif] text-[15px] font-[700] tracking-[0.06em] uppercase text-[#52595D] no-underline transition-colors hover:border-[#F26A21]/40 hover:text-[#F26A21]"
            >
              {t("fullPrivacyPolicy")}
            </Link>
            <button type="button" onClick={() => setPrivacyOpen(false)} className="btn-primary px-5 py-2.5 text-[15px]">
              {t("close")}
            </button>
          </div>
          {contactEmail && (
            <p className="text-[#52595D]/70">
              {t("contact")}{" "}
              <a href={`mailto:${contactEmail}`} className="text-[#F26A21] hover:underline">
                {contactEmail}
              </a>
            </p>
          )}
        </div>
      </ModalShell>
    </CookieConsentContext.Provider>
  );
}

declare global {
  interface Window {
    CookieConsent?: CookieConsentApi;
  }
}
