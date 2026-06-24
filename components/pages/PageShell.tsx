import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import InquiryModal from "@/components/InquiryModal";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import { db } from "@/db";
import { services, serviceItems, siteSettings } from "@/db/schema";
import { asc, eq } from "drizzle-orm";

async function getSiteData() {
  const [allServices, allSettings] = await Promise.all([
    db.select().from(services).orderBy(asc(services.displayOrder)),
    db.select().from(siteSettings),
  ]);

  const servicesWithItems = await Promise.all(
    allServices.map(async (s) => {
      const items = await db
        .select()
        .from(serviceItems)
        .where(eq(serviceItems.serviceId, s.id))
        .orderBy(asc(serviceItems.displayOrder));
      return { ...s, items };
    })
  );

  const settings = Object.fromEntries(allSettings.map((s) => [s.key, s.value]));

  return {
    services: servicesWithItems,
    settings: settings as Record<string, string>,
  };
}

export default async function PageShell({
  locale,
  children,
}: {
  locale: string;
  children: React.ReactNode;
}) {
  const { services: servicesData, settings } = await getSiteData();

  return (
    <>
      <Header locale={locale} phone={settings.phone_main ?? "+359899107525"} />
      <main>{children}</main>
      <Footer locale={locale} settings={settings} />
      <WhatsAppFloat whatsapp={settings.whatsapp ?? "359899107525"} />
      <InquiryModal services={servicesData} locale={locale} />
    </>
  );
}
