import { getTranslations } from "next-intl/server";
import PageHero from "./PageHero";
import { ArticleSection, PageCtaSection } from "./sections/PageSections";

export default async function LegalPageContent({
  locale,
  type,
}: {
  locale: string;
  type: "privacy" | "terms";
}) {
  const t = await getTranslations({ locale, namespace: type === "privacy" ? "pages.privacy" : "pages.terms" });
  const keys = ["p1", "p2", "p3", "p4", "p5", "p6", "p7"] as const;
  const paragraphs = keys.map((k) => t(k)).filter(Boolean);
  const mid = Math.ceil(paragraphs.length / 2);

  return (
    <>
      <PageHero label="Atlant Logistics" title={t("title")} />
      <ArticleSection heading={t("title")} paragraphs={paragraphs.slice(0, mid)} variant="white" />
      {paragraphs.length > mid && (
        <ArticleSection heading={locale === "bg" ? "Допълнително" : "Additional"} paragraphs={paragraphs.slice(mid)} variant="muted" />
      )}
      <PageCtaSection locale={locale} />
    </>
  );
}
