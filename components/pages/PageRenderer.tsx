import type { PageContent, PageSection } from "@/lib/pages/types";
import { getSiblingSubServicesSection } from "@/lib/pages/sibling-nav";
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
import { ServiceTopicsSection } from "./sections/ServiceTopicsSection";
import { SubServicesSection } from "./sections/SubServicesSection";

function renderSection(section: PageSection, locale: string, index: number) {
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
          image={section.image}
        />
      );
    case "direction-cards":
      return <DirectionCardsSection key={index} locale={locale} label={section.label} heading={section.heading} items={section.items} />;
    case "sub-services":
      return <SubServicesSection key={index} locale={locale} label={section.label} heading={section.heading} items={section.items} />;
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
          heading={section.heading}
          topics={section.topics}
        />
      );
    case "related-services":
      return <RelatedServicesSection key={index} locale={locale} heading={section.heading} items={section.items} />;
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
      {sections.map((section, i) => renderSection(section, locale, i))}
      <PageCtaSection locale={locale} />
    </>
  );
}
