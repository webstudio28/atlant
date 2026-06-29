import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { db } from "@/db";
import { services, serviceItems, faqItems, siteSettings } from "@/db/schema";
import { eq, asc } from "drizzle-orm";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import TrustStrip from "@/components/home/TrustStrip";
import Services from "@/components/home/Services";
import About from "@/components/home/About";
import WhyUs from "@/components/home/WhyUs";
import Faq from "@/components/home/Faq";
import PartnerLogoStrip from "@/components/home/PartnerLogoStrip";
import InquiryModal from "@/components/InquiryModal";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import { DEFAULT_OG_IMAGE, defaultTwitter } from "@/lib/site-metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });

  return {
    title: t("homeTitle"),
    description: t("homeDescription"),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        bg: "/bg",
        en: "/en",
      },
    },
    openGraph: {
      title: t("homeTitle"),
      description: t("homeDescription"),
      locale: locale === "bg" ? "bg_BG" : "en_US",
      type: "website",
      images: [DEFAULT_OG_IMAGE],
    },
    twitter: {
      ...defaultTwitter,
      title: t("homeTitle"),
      description: t("homeDescription"),
    },
  };
}

async function getSiteData() {
  // Fetch all data in parallel
  const [allServices, allFaqItems, allSettings] = await Promise.all([
    db.select().from(services).orderBy(asc(services.displayOrder)),
    db.select().from(faqItems).orderBy(asc(faqItems.displayOrder)),
    db.select().from(siteSettings),
  ]);

  // Fetch service items for each service
  const allServiceItems = await db
    .select()
    .from(serviceItems)
    .orderBy(asc(serviceItems.displayOrder));

  // Group items by serviceId
  const itemsByServiceId: Record<number, typeof allServiceItems> = {};
  for (const item of allServiceItems) {
    if (!itemsByServiceId[item.serviceId]) {
      itemsByServiceId[item.serviceId] = [];
    }
    itemsByServiceId[item.serviceId].push(item);
  }

  const servicesWithItems = allServices.map((s) => ({
    ...s,
    items: itemsByServiceId[s.id] ?? [],
  }));

  // Convert settings array to key/value map
  const settingsMap: Record<string, string> = {};
  for (const s of allSettings) {
    settingsMap[s.key] = s.value;
  }

  return { services: servicesWithItems, faqItems: allFaqItems, settings: settingsMap };
}

// JSON-LD LocalBusiness structured data
function JsonLd({ settings }: { settings: Record<string, string> }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Atlant Logistics & Relocations",
    description:
      "Reliable logistics partner – transport, warehousing, relocations and loading & unloading services.",
    url: "https://atlant.bg",
    telephone: settings.phone_main,
    address: {
      "@type": "PostalAddress",
      streetAddress: "156 B bul. Vasil Aprilov",
      addressLocality: "Plovdiv",
      addressCountry: "BG",
    },
    openingHours: "Mo-Fr 08:00-18:00",
    email: settings.email,
    sameAs: [settings.facebook, settings.instagram].filter(Boolean),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const { services: servicesData, faqItems: faqData, settings } = await getSiteData();

  return (
    <>
      <JsonLd settings={settings} />

      <Header locale={locale} phone={settings.phone_main ?? "+359899107525"} />

      <main>
        <Hero />

        <div className="relative site-main-bg">
          <TrustStrip settings={settings} />
          <Services services={servicesData} locale={locale} />
          <About />
          <WhyUs />
          <Faq items={faqData} locale={locale} />
          <PartnerLogoStrip locale={locale} />
        </div>
      </main>

      <Footer locale={locale} settings={settings} showCta />

      <WhatsAppFloat whatsapp={settings.whatsapp ?? "359899107525"} />

      {/* Inquiry modal (client component, listens to data-inquiry clicks) */}
      <InquiryModal services={servicesData} locale={locale} />
    </>
  );
}
