export type PageSection =
  | {
      type: "intro-split";
      paragraphs: string[];
      image?: string;
    }
  | {
      type: "intro-accent";
      label?: string;
      heading: string;
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
      type: "sub-services";
      label?: string;
      heading: string;
      items: { title: string; lines: string[]; href?: string }[];
      variant?: "rows" | "minimal";
    }
  | {
      type: "feature-grid";
      label?: string;
      heading: string;
      subtitle?: string;
      items: { title: string; text: string }[];
    }
  | {
      type: "partners";
      heading: string;
      viewLabel?: string;
      preset?: "about-us-references";
      items?: { name: string; logo: string; document: string }[];
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
      type: "service-topics";
      label?: string;
      heading: string;
      topics: {
        title: string;
        intro?: string;
        points: { title: string; text: string }[];
        footer?: string[];
      }[];
    }
  | {
      type: "related-services";
      heading: string;
      items: { title: string; href: string }[];
    }
  | {
      type: "photo-gallery";
      preset: "about-us";
      heading?: string;
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
