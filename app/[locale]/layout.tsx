import type { Metadata } from "next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import CookieConsentShell from "@/components/cookie/CookieConsentShell";
import { defaultOpenGraph, defaultTwitter } from "@/lib/site-metadata";
import "../globals.css";
import "../home-sections.css";

export const metadata: Metadata = {
  title: "Atlant Logistics",
  description: "Reliable logistics partner",
  openGraph: defaultOpenGraph,
  twitter: defaultTwitter,
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning data-scroll-behavior="smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Sofia+Sans+Condensed:wght@400;600;700;800;900&family=Sofia+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className="font-['Sofia_Sans',system-ui,sans-serif] text-[18px] antialiased"
        style={{ background: "#F4F4F2", color: "#2a2f33" }}
      >
        <NextIntlClientProvider messages={messages} locale={locale}>
          <CookieConsentShell locale={locale}>{children}</CookieConsentShell>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
