import type { PageContent, PageSection } from "@/lib/pages/types";
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

function renderSection(section: PageSection, locale: string, index: number) {
  switch (section.type) {
    case "intro-split":
      return <IntroSplitSection key={index} paragraphs={section.paragraphs} image={section.image} reverse={index % 2 === 1} />;
    case "direction-cards":
      return <DirectionCardsSection key={index} locale={locale} label={section.label} heading={section.heading} items={section.items} />;
    case "feature-grid":
      return <FeatureGridSection key={index} label={section.label} heading={section.heading} subtitle={section.subtitle} items={section.items} />;
    case "article":
      return <ArticleSection key={index} label={section.label} heading={section.heading} paragraphs={section.paragraphs} bullets={section.bullets} variant={section.variant} />;
    case "checklist-panel":
      return <ChecklistPanelSection key={index} heading={section.heading} intro={section.intro} items={section.items} variant={section.variant} />;
    case "highlight-box":
      return <HighlightBoxSection key={index} heading={section.heading} items={section.items} />;
    case "related-services":
      return <RelatedServicesSection key={index} locale={locale} heading={section.heading} items={section.items} />;
    default:
      return null;
  }
}

export default function PageRenderer({ content, locale }: { content: PageContent; locale: string }) {
  return (
    <>
      {content.sections.map((section, i) => renderSection(section, locale, i))}
      <PageCtaSection locale={locale} />
    </>
  );
}
