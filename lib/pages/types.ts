export type PageSection =
  | {
      type: "intro-split";
      paragraphs: string[];
      image?: string;
    }
  | {
      type: "direction-cards";
      label?: string;
      heading: string;
      items: { title: string; lines: string[]; href?: string }[];
    }
  | {
      type: "feature-grid";
      label?: string;
      heading: string;
      subtitle?: string;
      items: { title: string; text: string }[];
    }
  | {
      type: "article";
      label?: string;
      heading: string;
      paragraphs: string[];
      bullets?: string[];
      variant?: "white" | "muted";
    }
  | {
      type: "checklist-panel";
      heading: string;
      intro?: string;
      items: string[];
      variant?: "white" | "muted";
    }
  | {
      type: "highlight-box";
      heading: string;
      items: string[];
    }
  | {
      type: "related-services";
      heading: string;
      items: { title: string; href: string }[];
    };

export interface PageContent {
  meta: { title: string; description: string };
  hero: { label: string; title: string; subtitle?: string };
  heroImage?: string;
  sections: PageSection[];
}

export interface PageDefinition {
  id: string;
  slug: string[];
  kind: "content" | "contact" | "faq" | "gallery-photo" | "gallery-video" | "legal-privacy" | "legal-terms";
  parentGroup?: "transport" | "warehouse" | "relocations" | "loading";
  navLabelBg?: string;
  navLabelEn?: string;
}
