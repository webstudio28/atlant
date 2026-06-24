import type { PageContent, PageSection } from "@/lib/pages/types";
import { getSiblingSubServicesSection, isServiceSubPage } from "@/lib/pages/sibling-nav";
import {
  ArticleSection,
  ChecklistPanelSection,
  DirectionCardsSection,
  FeatureGridSection,
  HighlightBoxSection,
  IntroSplitSection,
  PageCtaSection,
  RelatedServicesSection,
} from "./sections/PageSections";
import { IntroAccentSection } from "./sections/IntroAccentSection";
import { PARTNER_REFERENCES } from "@/lib/pages/partner-references";
import { PartnersSection } from "./sections/PartnersSection";
import { PhotoGallerySection } from "./sections/PhotoGallerySection";
import { ServiceTopicsSection } from "./sections/ServiceTopicsSection";
import { SubServicesSection } from "./sections/SubServicesSection";

function serviceTopicsHeading(content: PageContent, locale: string, pageId?: string, fallback?: string) {
  if (!pageId || !isServiceSubPage(pageId)) return fallback ?? "";
  const name = content.hero.title;
  return locale === "en"
    ? `Everything you need to know about ${name}`
    : `Всичко, което трябва да знаете за ${name}`;
}

function renderSection(
  section: PageSection,
  locale: string,
  index: number,
  pageId: string | undefined,
  content: PageContent,
) {
  switch (section.type) {
    case "intro-split":
      return <IntroSplitSection key={index} paragraphs={section.paragraphs} image={section.image} reverse={index % 2 === 1} />;
    case "intro-accent":
      return (
        <IntroAccentSection
          key={index}
          label={section.label}
          heading={section.heading}
          paragraphs={section.paragraphs}
          image={pageId && isServiceSubPage(pageId) ? undefined : section.image}
        />
      );
    case "direction-cards":
      return <DirectionCardsSection key={index} locale={locale} label={section.label} heading={section.heading} items={section.items} />;
    case "sub-services":
      return (
        <SubServicesSection
          key={index}
          locale={locale}
          label={section.label}
          heading={section.heading}
          items={section.items}
          variant={section.variant}
        />
      );
    case "partners": {
      const items =
        section.preset === "about-us-references"
          ? PARTNER_REFERENCES.map((partner) => ({
              name: locale === "bg" ? partner.nameBg : partner.nameEn,
              logo: partner.logo,
              document: partner.document,
            }))
          : (section.items ?? []);

      return (
        <PartnersSection
          key={index}
          heading={section.heading}
          items={items}
          viewLabel={section.viewLabel ?? (locale === "bg" ? "Виж документа" : "View document")}
          expandLabel={locale === "bg" ? "Виж всички партньори" : "View all partners"}
          collapseLabel={locale === "bg" ? "Покажи по-малко" : "Show fewer"}
        />
      );
    }
    case "feature-grid":
      return <FeatureGridSection key={index} label={section.label} heading={section.heading} subtitle={section.subtitle} items={section.items} />;
    case "article":
      return <ArticleSection key={index} label={section.label} heading={section.heading} paragraphs={section.paragraphs} bullets={section.bullets} variant={section.variant} />;
    case "checklist-panel":
      return <ChecklistPanelSection key={index} heading={section.heading} intro={section.intro} items={section.items} variant={section.variant} />;
    case "highlight-box":
      return <HighlightBoxSection key={index} heading={section.heading} items={section.items} />;
    case "service-topics":
      return (
        <ServiceTopicsSection
          key={index}
          label={section.label}
          heading={serviceTopicsHeading(content, locale, pageId, section.heading)}
          topics={section.topics}
        />
      );
    case "related-services":
      return <RelatedServicesSection key={index} locale={locale} heading={section.heading} items={section.items} />;
    case "photo-gallery":
      return (
        <PhotoGallerySection
          key={index}
          preset={section.preset}
          heading={section.heading}
          locale={locale}
        />
      );
    default:
      return null;
  }
}

export default function PageRenderer({
  content,
  locale,
  pageId,
}: {
  content: PageContent;
  locale: string;
  pageId?: string;
}) {
  const siblings = pageId ? getSiblingSubServicesSection(pageId, locale) : null;
  const sections = siblings ? [...content.sections, siblings] : content.sections;

  return (
    <>
      {sections.map((section, i) => renderSection(section, locale, i, pageId, content))}
      <PageCtaSection locale={locale} />
    </>
  );
}
