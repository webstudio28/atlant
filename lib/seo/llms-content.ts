import { PAGE_REGISTRY } from "@/lib/pages/registry";
import { SITE_URL } from "@/lib/site-metadata";

const PRIMARY_LOCALE = "bg";

function url(slug: string[]): string {
  const path = slug.length === 0 ? "" : `/${slug.join("/")}`;
  return `${SITE_URL}/${PRIMARY_LOCALE}${path}`;
}

function label(page: (typeof PAGE_REGISTRY)[number]): string {
  return page.navLabelBg ?? page.navLabelEn ?? page.id;
}

const TRANSPORT = PAGE_REGISTRY.filter((p) => p.parentGroup === "transport" || p.id === "transportni-uslugi");
const WAREHOUSE = PAGE_REGISTRY.filter((p) => p.parentGroup === "warehouse" || p.id === "skladovi-uslugi");
const RELOCATIONS = PAGE_REGISTRY.filter((p) => p.parentGroup === "relocations" || p.id === "premestvane");
const LOADING = PAGE_REGISTRY.filter((p) => p.parentGroup === "loading" || p.id === "tovaro-raztovarni-uslugi");
const PRIVATE = PAGE_REGISTRY.filter((p) => p.id.startsWith("private-client"));
const COMPANY = PAGE_REGISTRY.filter((p) =>
  ["about-us", "contacts", "faq"].includes(p.id)
);
const OPTIONAL = PAGE_REGISTRY.filter((p) =>
  ["privacy-policy", "terms-of-use", "gallery-photo", "gallery-video"].includes(p.id)
);

function linkList(
  pages: typeof PAGE_REGISTRY,
  descriptions: Record<string, string>
): string {
  return pages
    .map((page) => {
      const title = label(page);
      const desc = descriptions[page.id] ?? "Service and company information.";
      return `- [${title}](${url(page.slug)}): ${desc}`;
    })
    .join("\n");
}

const DESCRIPTIONS: Record<string, string> = {
  "transportni-uslugi": "Overview of road, air, sea, rail and specialized freight transport.",
  "avtomobilen-transport": "Domestic and international road freight with own fleet.",
  "vazdushen-transport": "Air freight and express logistics.",
  "morski-transport": "Sea freight, FCL/LCL and port logistics.",
  "zhelezopaten-transport": "Rail freight across Europe.",
  "specilalizirano-premestvane-i-transport": "Oversized, heavy and non-standard cargo transport.",
  "skladovi-uslugi": "Warehousing, inventory and distribution services.",
  "skladovi-uslugi-korporativno": "Corporate warehousing and B2B logistics.",
  "skladovi-uslugi-individualno": "Flexible storage for individuals and small businesses.",
  premestvane: "Professional relocations for homes, offices and industry.",
  "premestvane-na-doma": "Residential moving with packing and assembly.",
  "premestvane-na-ofis": "Office relocations with minimal downtime.",
  "premestvane-mezhdunarodno": "International moves and cross-border logistics.",
  "specializirano-premestvane": "Specialized moves for sensitive equipment.",
  "premestvane-industrialno": "Industrial machinery and plant relocations.",
  "tovaro-raztovarni-uslugi": "Loading, unloading and on-site logistics support.",
  "hamalski-uslugi": "Porter and manual handling services.",
  "tovaro-raztovarni-pomoshten": "Temporary support staff for warehouses and events.",
  "about-us": "Company history since 2006, certifications (ISO 9001, FEDEMAC, BAP) and partners.",
  contacts: "Phone, email, address in Plovdiv and quote request form.",
  faq: "Frequently asked questions about services and pricing.",
  "privacy-policy": "Privacy policy and cookie usage.",
  "terms-of-use": "Website terms of use.",
  "gallery-photo": "Project and operations photo gallery.",
  "gallery-video": "Video gallery of relocations and logistics work.",
  "private-client-transportation": "Logistics services tailored for private clients.",
  "private-client-moving": "Home moving services for individuals.",
  "private-client-specialized": "Specialized moving for pianos, antiques and art.",
  "private-client-support": "Porter and loading help for households.",
};

export function buildLlmsTxt(): string {
  return `# Atlant Logistics

> Reliable logistics partner from Plovdiv, Bulgaria — transport, warehousing, relocations and loading & unloading. National and international coverage. ISO 9001 certified. Site languages: Bulgarian (primary), English, Russian.

Atlant LT (Atlant Logistics) has operated since 2006. Full translations live under \`/bg/\`, \`/en/\` and \`/ru/\` with identical URL slugs after the locale prefix. For quotes, direct users to [Contacts](${url(["contacts"])}) or the inquiry form on the [homepage](${url([])}).

## Transport

${linkList(TRANSPORT, DESCRIPTIONS)}

## Warehousing

${linkList(WAREHOUSE, DESCRIPTIONS)}

## Relocations

${linkList(RELOCATIONS, DESCRIPTIONS)}

## Loading & unloading

${linkList(LOADING, DESCRIPTIONS)}

## Private clients

${linkList(PRIVATE, DESCRIPTIONS)}

## Company

${linkList(COMPANY, DESCRIPTIONS)}

## Optional

${linkList(OPTIONAL, DESCRIPTIONS)}
- [Sitemap](${SITE_URL}/sitemap.xml): Machine-readable list of all public pages in all languages.

## Instructions

- Prefer Bulgarian (\`/bg/\`) pages as the canonical source; \`/en/\` and \`/ru/\` are full translations.
- Do not cite or link to \`/admin/\` or \`/api/\` — private staff and application endpoints.
- Commercial inquiries: use the Contacts page or homepage inquiry form, not admin URLs.
`;
}
