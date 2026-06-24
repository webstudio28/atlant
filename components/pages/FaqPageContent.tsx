import { getTranslations } from "next-intl/server";
import { db } from "@/db";
import { faqItems } from "@/db/schema";
import { asc } from "drizzle-orm";
import PageHero from "./PageHero";
import Faq from "@/components/home/Faq";
import { PageCtaSection } from "./sections/PageSections";

export default async function FaqPageContent({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "faq" });
  const items = await db.select().from(faqItems).orderBy(asc(faqItems.displayOrder));

  return (
    <>
      <PageHero
        label={t("label")}
        title={t("title")}
        subtitle={locale === "bg" ? "Отговори на най-често задаваните въпроси" : "Answers to the most frequently asked questions"}
      />
      <div className="bg-[#F4F4F2]">
        <Faq items={items} locale={locale} />
      </div>
      <PageCtaSection locale={locale} />
    </>
  );
}
