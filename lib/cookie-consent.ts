export const COOKIE_NAME = "atlant_cookie_consent_v1";
export const SIX_MONTHS_SECONDS = 60 * 60 * 24 * 183;

export type AnalyticsConsent = "granted" | "denied";

export type CookieConsentState = {
  analytics: AnalyticsConsent;
};

function isSecureContext(): boolean {
  return typeof window !== "undefined" && window.location.protocol === "https:";
}

export function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const all = document.cookie ? document.cookie.split(";") : [];
  for (const part of all) {
    const trimmed = part.trim();
    if (!trimmed) continue;
    if (trimmed.startsWith(`${name}=`)) {
      return decodeURIComponent(trimmed.slice(name.length + 1));
    }
  }
  return null;
}

export function setCookie(name: string, value: string, maxAgeSeconds: number): void {
  let cookie = `${name}=${encodeURIComponent(value)}; Max-Age=${maxAgeSeconds}; Path=/; SameSite=Lax`;
  if (isSecureContext()) cookie += "; Secure";
  document.cookie = cookie;
}

export function deleteCookie(name: string): void {
  setCookie(name, "", 0);
}

export function parseConsent(raw: string | null): CookieConsentState | null {
  if (!raw) return null;
  const parts = raw.split("=");
  if (parts.length !== 2) return null;
  if (parts[0] !== "analytics") return null;
  if (parts[1] !== "granted" && parts[1] !== "denied") return null;
  return { analytics: parts[1] };
}

export function serializeConsent(consent: CookieConsentState): string | null {
  const val = consent?.analytics;
  if (val !== "granted" && val !== "denied") return null;
  return `analytics=${val}`;
}

export function readStoredConsent(): CookieConsentState | null {
  return parseConsent(getCookie(COOKIE_NAME));
}

export function storeConsent(consent: CookieConsentState): void {
  const raw = serializeConsent(consent);
  if (!raw) return;
  setCookie(COOKIE_NAME, raw, SIX_MONTHS_SECONDS);
}

export function clearStoredConsent(): void {
  deleteCookie(COOKIE_NAME);
}

export function notifyConsentChange(analytics: AnalyticsConsent): void {
  window.dispatchEvent(
    new CustomEvent("cookieconsent:change", { detail: { analytics } })
  );
  if (analytics === "granted") {
    window.dispatchEvent(new CustomEvent("cookieconsent:analytics-granted"));
  } else {
    window.dispatchEvent(new CustomEvent("cookieconsent:analytics-denied"));
  }
}

export function notifyConsentReset(): void {
  window.dispatchEvent(new CustomEvent("cookieconsent:reset"));
}

export type CookieConsentApi = {
  get: () => CookieConsentState | null;
  set: (consent: CookieConsentState) => void;
  open: () => void;
  reset: () => void;
  onChange: (fn: (consent: CookieConsentState) => void) => () => void;
};
