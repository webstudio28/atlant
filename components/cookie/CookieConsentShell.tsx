import { db } from "@/db";
import { siteSettings } from "@/db/schema";
import { CookieConsentProvider } from "./CookieConsent";

export default async function CookieConsentShell({
  locale,
  children,
}: {
  locale: string;
  children: React.ReactNode;
}) {
  const settings = await db.select().from(siteSettings);
  const email = settings.find((s) => s.key === "email")?.value;

  return (
    <CookieConsentProvider locale={locale} contactEmail={email}>
      {children}
    </CookieConsentProvider>
  );
}
