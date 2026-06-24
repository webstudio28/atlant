import fs from "fs";
import path from "path";

const ROOT = path.resolve(import.meta.dirname, "..");
const OLD_BG = JSON.parse(fs.readFileSync(path.join(ROOT, "local_docs/atlantlogistics.com/atlantlogistics.com/assets/i18n/bg.json"), "utf8"));
const OLD_EN = JSON.parse(fs.readFileSync(path.join(ROOT, "local_docs/atlantlogistics.com/atlantlogistics.com/assets/i18n/en.json"), "utf8"));
const MP_BG = OLD_BG.MainPages ?? {};
const MP_EN = OLD_EN.MainPages ?? {};

function clean(text) {
  if (!text || typeof text !== "string") return "";
  return text
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<a[^>]*href="[^"]*#\/([^"]*)"[^>]*>([^<]*)<\/a>/gi, "$2")
    .replace(/<a[^>]*>([^<]*)<\/a>/gi, "$1")
    .replace(/<[^>]+>/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function vals(source, prefix) {
  const re = new RegExp(`^${prefix}(\\d+(?:\\.\\d+)?)$`);
  return Object.keys(source)
    .filter((k) => re.test(k))
    .sort((a, b) => parseFloat(a.replace(prefix, "")) - parseFloat(b.replace(prefix, "")))
    .map((k) => clean(source[k]))
    .filter(Boolean);
}

function v(source, prefix, n) {
  return clean(source[`${prefix}${n}`] ?? "");
}

function isQuestion(text) {
  return text.length < 120 && (text.endsWith("?") || text.endsWith(":"));
}

function groupArticles(paragraphs, startIdx = 0) {
  const sections = [];
  let i = startIdx;
  while (i < paragraphs.length) {
    const p = paragraphs[i];
    if (p.includes("Полезни съвети") || p.includes("Useful tips") || (isQuestion(p) && paragraphs[i + 1])) {
      const heading = p.includes("Полезни съвети") || p.includes("Useful tips") ? p : p;
      const start = p.includes("Полезни съвети") || p.includes("Useful tips") ? i + 1 : i;
      let j = start;
      const body = [];
      const bullets = [];
      if (!p.includes("Полезни съвети") && !p.includes("Useful tips")) {
        j = i + 1;
      } else {
        sections.push({ type: "article", label: "Полезни съвети", heading: p, paragraphs: [], bullets: [], variant: sections.length % 2 ? "muted" : "white" });
        i = start;
        continue;
      }
      const h = p.includes("Полезни съвети") ? paragraphs[start] : p;
      const hIdx = p.includes("Полезни съвети") ? start : i;
      j = hIdx + 1;
      while (j < paragraphs.length) {
        const cur = paragraphs[j];
        if (isQuestion(cur) && body.length > 0) break;
        if (cur.includes("Полезни съвети") || cur.includes("Useful tips")) break;
        if (cur.length < 140 && !cur.endsWith(".") && paragraphs[j + 1]?.length > 80) {
          bullets.push(cur);
        } else {
          body.push(cur);
        }
        j++;
      }
      sections.push({
        type: "article",
        heading: h,
        paragraphs: body,
        bullets: bullets.length ? bullets : undefined,
        variant: sections.length % 2 ? "muted" : "white",
      });
      i = j;
      continue;
    }
    if (isQuestion(p)) {
      const body = [];
      const bullets = [];
      let j = i + 1;
      while (j < paragraphs.length && !isQuestion(paragraphs[j]) && !paragraphs[j].includes("Полезни съвети")) {
        const cur = paragraphs[j];
        if (cur.length < 120 && !cur.endsWith(".") && bullets.length < 12) bullets.push(cur);
        else body.push(cur);
        j++;
      }
      sections.push({ type: "article", heading: p, paragraphs: body, bullets: bullets.length ? bullets : undefined, variant: sections.length % 2 ? "muted" : "white" });
      i = j;
      continue;
    }
    i++;
  }
  return sections;
}

function buildTransport(bg, en) {
  const sections = [
    {
      type: "intro-split",
      paragraphs: [v(bg, "bct", 2), v(bg, "bct", 3)].filter(Boolean),
      image: "/images/pages/transport.webp",
    },
    {
      type: "direction-cards",
      label: "Направления",
      heading: v(bg, "bct", 4) || "Пет основни направления",
      items: [
        { title: v(bg, "bct", 5), lines: [v(bg, "bct", 6), v(bg, "bct", 7)].filter(Boolean), href: "/avtomobilen-transport" },
        { title: v(bg, "bct", 8), lines: [v(bg, "bct", 9), v(bg, "bct", 10)].filter(Boolean), href: "/vazdushen-transport" },
        { title: v(bg, "bct", 11), lines: [v(bg, "bct", 12), v(bg, "bct", 13)].filter(Boolean), href: "/morski-transport" },
        { title: v(bg, "bct", 14), lines: [v(bg, "bct", 15), v(bg, "bct", 16)].filter(Boolean), href: "/zhelezopaten-transport" },
        { title: v(bg, "bct", 17), lines: [v(bg, "bct", 18), v(bg, "bct", 19)].filter(Boolean), href: "/specilalizirano-premestvane-i-transport" },
      ],
    },
    ...groupArticles(vals(bg, "bct").slice(19)),
  ];
  const enSections = [
    { type: "intro-split", paragraphs: [v(en, "bct", 2), v(en, "bct", 3)].filter(Boolean), image: "/images/pages/transport.webp" },
    {
      type: "direction-cards",
      label: "Directions",
      heading: v(en, "bct", 4) || "Five main directions",
      items: [
        { title: v(en, "bct", 5), lines: [v(en, "bct", 6), v(en, "bct", 7)].filter(Boolean), href: "/avtomobilen-transport" },
        { title: v(en, "bct", 8), lines: [v(en, "bct", 9), v(en, "bct", 10)].filter(Boolean), href: "/vazdushen-transport" },
        { title: v(en, "bct", 11), lines: [v(en, "bct", 12), v(en, "bct", 13)].filter(Boolean), href: "/morski-transport" },
        { title: v(en, "bct", 14), lines: [v(en, "bct", 15), v(en, "bct", 16)].filter(Boolean), href: "/zhelezopaten-transport" },
        { title: v(en, "bct", 17), lines: [v(en, "bct", 18), v(en, "bct", 19)].filter(Boolean), href: "/specilalizirano-premestvane-i-transport" },
      ],
    },
    ...groupArticles(vals(en, "bct").slice(19)),
  ];
  return { sections, enSections };
}

function buildWarehouse(bg, en) {
  const sections = [
    { type: "intro-split", paragraphs: [v(bg, "wrs", 2), v(bg, "wrs", 3)].filter(Boolean), image: "/images/pages/warehouse.webp" },
    {
      type: "checklist-panel",
      heading: v(bg, "wrs", 4),
      items: [v(bg, "wrs", 5), v(bg, "wrs", 6), v(bg, "wrs", 7)].filter(Boolean),
      variant: "muted",
    },
    {
      type: "direction-cards",
      heading: "Типове складиране",
      items: [
        { title: v(bg, "wrs", 9), lines: [v(bg, "wrs", 10), v(bg, "wrs", 11)].filter(Boolean), href: "/skladovi-uslugi/korporativno" },
        { title: v(bg, "wrs", 12), lines: [v(bg, "wrs", 13), v(bg, "wrs", 14)].filter(Boolean), href: "/skladovi-uslugi/individualno" },
      ],
    },
    ...groupArticles(vals(bg, "wrs").slice(14)),
  ];
  const enSections = [
    { type: "intro-split", paragraphs: [v(en, "wrs", 2), v(en, "wrs", 3)].filter(Boolean), image: "/images/pages/warehouse.webp" },
    { type: "checklist-panel", heading: v(en, "wrs", 4), items: [v(en, "wrs", 5), v(en, "wrs", 6), v(en, "wrs", 7)].filter(Boolean), variant: "muted" },
    {
      type: "direction-cards",
      heading: "Storage types",
      items: [
        { title: v(en, "wrs", 9), lines: [v(en, "wrs", 10), v(en, "wrs", 11)].filter(Boolean), href: "/skladovi-uslugi/korporativno" },
        { title: v(en, "wrs", 12), lines: [v(en, "wrs", 13), v(en, "wrs", 14)].filter(Boolean), href: "/skladovi-uslugi/individualno" },
      ],
    },
    ...groupArticles(vals(en, "wrs").slice(14)),
  ];
  return { sections, enSections };
}

function buildRelocations(bg, en) {
  const sections = [
    { type: "intro-split", paragraphs: [v(bg, "pre", 1), v(bg, "pre", 2)].filter(Boolean), image: "/images/pages/relocation.webp" },
    {
      type: "checklist-panel",
      heading: v(bg, "pre", 2),
      items: [v(bg, "pre", 3), v(bg, "pre", 4), v(bg, "pre", 5), v(bg, "pre", 6), v(bg, "pre", 7)].filter(Boolean),
      variant: "white",
    },
    {
      type: "feature-grid",
      label: v(bg, "pre", 8),
      heading: v(bg, "pre", 8),
      items: [
        { title: v(bg, "pre", 9), text: v(bg, "pre", 10) },
        { title: v(bg, "pre", 11), text: v(bg, "pre", 12) },
        { title: v(bg, "pre", 13), text: v(bg, "pre", 14) },
        { title: v(bg, "pre", 15), text: "" },
      ].filter((x) => x.title),
    },
    {
      type: "direction-cards",
      heading: "Видове премествания",
      items: [
        { title: v(bg, "pre", 17), lines: [v(bg, "pre", 18), v(bg, "pre", 19)].filter(Boolean), href: "/premestvane/na-doma" },
        { title: v(bg, "pre", 20), lines: [v(bg, "pre", 21), v(bg, "pre", 22)].filter(Boolean), href: "/premestvane/na-ofis" },
        { title: v(bg, "pre", 23), lines: [v(bg, "pre", 24), v(bg, "pre", 25)].filter(Boolean), href: "/premestvane/mezhdunarodno" },
        { title: v(bg, "pre", 26), lines: [v(bg, "pre", 27), v(bg, "pre", 28)].filter(Boolean), href: "/specializirano-premestvane" },
        { title: v(bg, "pre", 29), lines: [v(bg, "pre", 30), v(bg, "pre", 31)].filter(Boolean), href: "/premestvane/industrialno" },
      ],
    },
    ...groupArticles(vals(bg, "pre").slice(31)),
  ];
  const enSections = [
    { type: "intro-split", paragraphs: [v(en, "pre", 1), v(en, "pre", 2)].filter(Boolean), image: "/images/pages/relocation.webp" },
    { type: "checklist-panel", heading: v(en, "pre", 2), items: [v(en, "pre", 3), v(en, "pre", 4), v(en, "pre", 5), v(en, "pre", 6), v(en, "pre", 7)].filter(Boolean), variant: "white" },
    {
      type: "feature-grid",
      label: v(en, "pre", 8),
      heading: v(en, "pre", 8),
      items: [
        { title: v(en, "pre", 9), text: v(en, "pre", 10) },
        { title: v(en, "pre", 11), text: v(en, "pre", 12) },
        { title: v(en, "pre", 13), text: v(en, "pre", 14) },
      ].filter((x) => x.title),
    },
    {
      type: "direction-cards",
      heading: "Relocation types",
      items: [
        { title: v(en, "pre", 17), lines: [v(en, "pre", 18), v(en, "pre", 19)].filter(Boolean), href: "/premestvane/na-doma" },
        { title: v(en, "pre", 20), lines: [v(en, "pre", 21), v(en, "pre", 22)].filter(Boolean), href: "/premestvane/na-ofis" },
        { title: v(en, "pre", 23), lines: [v(en, "pre", 24), v(en, "pre", 25)].filter(Boolean), href: "/premestvane/mezhdunarodno" },
        { title: v(en, "pre", 26), lines: [v(en, "pre", 27), v(en, "pre", 28)].filter(Boolean), href: "/specializirano-premestvane" },
        { title: v(en, "pre", 29), lines: [v(en, "pre", 30), v(en, "pre", 31)].filter(Boolean), href: "/premestvane/industrialno" },
      ],
    },
    ...groupArticles(vals(en, "pre").slice(31)),
  ];
  return { sections, enSections };
}

function buildLoading(bg, en) {
  const sections = [
    { type: "intro-split", paragraphs: [v(bg, "tru", 2), v(bg, "tru", 3)].filter(Boolean), image: "/images/pages/loading.webp" },
    {
      type: "direction-cards",
      heading: v(bg, "tru", 4),
      items: [
        { title: v(bg, "tru", 5), lines: [v(bg, "tru", "6.1"), v(bg, "tru", "6.2"), v(bg, "tru", "6.3")].filter(Boolean), href: "/hamalski-uslugi" },
        { title: v(bg, "tru", 7), lines: [v(bg, "tru", "8.1"), v(bg, "tru", "8.2")].filter(Boolean), href: "/tovaro-raztovarni-uslugi/pomoshten" },
      ],
    },
    ...groupArticles(vals(bg, "tru").slice(10)),
  ];
  const enSections = [
    { type: "intro-split", paragraphs: [v(en, "tru", 2), v(en, "tru", 3)].filter(Boolean), image: "/images/pages/loading.webp" },
    {
      type: "direction-cards",
      heading: v(en, "tru", 4),
      items: [
        { title: v(en, "tru", 5), lines: [v(en, "tru", "6.1"), v(en, "tru", "6.2")].filter(Boolean), href: "/hamalski-uslugi" },
        { title: v(en, "tru", 7), lines: [v(en, "tru", "8.1"), v(en, "tru", "8.2")].filter(Boolean), href: "/tovaro-raztovarni-uslugi/pomoshten" },
      ],
    },
    ...groupArticles(vals(en, "tru").slice(10)),
  ];
  return { sections, enSections };
}

function buildSubPage(bg, en, prefix, image, related) {
  const allBg = vals(bg, prefix);
  const allEn = vals(en, prefix);
  const introEnd = allBg.findIndex((p, i) => i > 1 && (p.includes("Полезни съвети") || p.includes("Заяви")));
  const introParas = introEnd > 0 ? allBg.slice(1, Math.min(introEnd, 5)) : allBg.slice(1, 4);
  const sections = [
    { type: "intro-split", paragraphs: introParas, image },
    ...groupArticles(allBg.slice(introEnd > 0 ? introEnd : 4)),
  ];
  if (related?.length) {
    sections.push({ type: "related-services", heading: "Свързани услуги", items: related });
  }
  const enIntroEnd = allEn.findIndex((p, i) => i > 1 && (p.includes("Useful tips") || p.includes("Request")));
  const enIntro = enIntroEnd > 0 ? allEn.slice(1, Math.min(enIntroEnd, 5)) : allEn.slice(1, 4);
  const enSections = [
    { type: "intro-split", paragraphs: enIntro.length ? enIntro : introParas, image },
    ...groupArticles(allEn.slice(enIntroEnd > 0 ? enIntroEnd : 4)),
  ];
  if (related?.length) {
    enSections.push({ type: "related-services", heading: "Related services", items: related });
  }
  return { sections, enSections };
}

const BUILDERS = {
  "transportni-uslugi": () => buildTransport(MP_BG, MP_EN),
  "skladovi-uslugi": () => buildWarehouse(MP_BG, MP_EN),
  premestvane: () => buildRelocations(MP_BG, MP_EN),
  "tovaro-raztovarni-uslugi": () => buildLoading(MP_BG, MP_EN),
};

const SUB_PAGES = [
  { id: "avtomobilen-transport", prefix: "auto", image: "/images/pages/transport.webp", related: [{ title: "Транспортни услуги", href: "/transportni-uslugi" }] },
  { id: "vazdushen-transport", prefix: "air", image: "/images/pages/transport.webp", related: [{ title: "Транспортни услуги", href: "/transportni-uslugi" }] },
  { id: "morski-transport", prefix: "sea", image: "/images/pages/transport.webp", related: [{ title: "Транспортни услуги", href: "/transportni-uslugi" }] },
  { id: "zhelezopaten-transport", prefix: "rail", image: "/images/pages/transport.webp", related: [{ title: "Транспортни услуги", href: "/transportni-uslugi" }] },
  { id: "specilalizirano-premestvane-i-transport", prefix: "special", image: "/images/pages/transport.webp", related: [{ title: "Транспортни услуги", href: "/transportni-uslugi" }] },
  { id: "skladovi-uslugi-korporativno", prefix: "corser", image: "/images/pages/warehouse.webp", related: [{ title: "Складови услуги", href: "/skladovi-uslugi" }] },
  { id: "skladovi-uslugi-individualno", prefix: "indsklad", image: "/images/pages/warehouse.webp", related: [{ title: "Складови услуги", href: "/skladovi-uslugi" }] },
  { id: "premestvane-na-doma", prefix: "dom", image: "/images/pages/relocation.webp", related: [{ title: "Премествания", href: "/premestvane" }] },
  { id: "premestvane-na-ofis", prefix: "office", image: "/images/pages/relocation.webp", related: [{ title: "Премествания", href: "/premestvane" }] },
  { id: "premestvane-mezhdunarodno", prefix: "intl", image: "/images/pages/relocation.webp", related: [{ title: "Премествания", href: "/premestvane" }] },
  { id: "specializirano-premestvane", prefix: "specprem", image: "/images/pages/relocation.webp", related: [{ title: "Премествания", href: "/premestvane" }] },
  { id: "premestvane-industrialno", prefix: "industrprem", image: "/images/pages/relocation.webp", related: [{ title: "Премествания", href: "/premestvane" }] },
  { id: "hamalski-uslugi", prefix: "hamalski", image: "/images/pages/loading.webp", related: [{ title: "Товаро-разтоварни", href: "/tovaro-raztovarni-uslugi" }] },
  { id: "tovaro-raztovarni-pomoshten", prefix: "pomoshen", image: "/images/pages/loading.webp", related: [{ title: "Товаро-разтоварни", href: "/tovaro-raztovarni-uslugi" }] },
];

const META = {
  "transportni-uslugi": { bg: "Транспортни услуги", en: "Transport Services" },
  "avtomobilen-transport": { bg: "Автомобилен транспорт", en: "Road Transport" },
  "vazdushen-transport": { bg: "Въздушен транспорт", en: "Air Transport" },
  "morski-transport": { bg: "Морски транспорт", en: "Sea Transport" },
  "zhelezopaten-transport": { bg: "Железопътен транспорт", en: "Rail Transport" },
  "specilalizirano-premestvane-i-transport": { bg: "Специализиран транспорт", en: "Specialized Transport" },
  "skladovi-uslugi": { bg: "Складови услуги", en: "Warehouse Services" },
  "skladovi-uslugi-korporativno": { bg: "Корпоративно складиране", en: "Corporate Warehousing" },
  "skladovi-uslugi-individualno": { bg: "Индивидуално складиране", en: "Individual Storage" },
  premestvane: { bg: "Премествания", en: "Relocations" },
  "premestvane-na-doma": { bg: "Преместване на дома", en: "Home Relocation" },
  "premestvane-na-ofis": { bg: "Преместване на офиса", en: "Office Relocation" },
  "premestvane-mezhdunarodno": { bg: "Международно преместване", en: "International Relocation" },
  "specializirano-premestvane": { bg: "Специализирано преместване", en: "Specialized Relocation" },
  "premestvane-industrialno": { bg: "Индустриално преместване", en: "Industrial Relocation" },
  "tovaro-raztovarni-uslugi": { bg: "Товаро-разтоварни услуги", en: "Loading & Unloading" },
  "hamalski-uslugi": { bg: "Хамалски услуги", en: "Porter Services" },
  "tovaro-raztovarni-pomoshten": { bg: "Помощен персонал", en: "Support Staff" },
  "private-client-transportation": { bg: "Услуги за частни клиенти", en: "Private Client Services" },
  "private-client-moving": { bg: "Преместване за частни клиенти", en: "Private Relocation" },
  "private-client-specialized": { bg: "Специализирано преместване", en: "Specialized Moving" },
  "private-client-support": { bg: "Помощен персонал", en: "Support Staff" },
};

function makePage(id, sections, enSections, subtitleBg, subtitleEn) {
  const m = META[id];
  return {
    bg: {
      meta: { title: `${m.bg} | Atlant Logistics`, description: subtitleBg?.slice(0, 160) ?? "" },
      hero: { label: "Atlant Logistics", title: m.bg, subtitle: subtitleBg },
      sections,
    },
    en: {
      meta: { title: `${m.en} | Atlant Logistics`, description: (subtitleEn || subtitleBg)?.slice(0, 160) ?? "" },
      hero: { label: "Atlant Logistics", title: m.en, subtitle: subtitleEn || subtitleBg },
      sections: enSections,
    },
  };
}

const OUT = path.join(ROOT, "data/pages");
fs.mkdirSync(OUT, { recursive: true });

for (const [id, builder] of Object.entries(BUILDERS)) {
  const { sections, enSections } = builder();
  const prefix = id === "transportni-uslugi" ? "bct" : id === "skladovi-uslugi" ? "wrs" : id === "premestvane" ? "pre" : "tru";
  const p = vals(MP_BG, prefix);
  fs.writeFileSync(OUT + `/${id}.json`, JSON.stringify(makePage(id, sections, enSections, p[1], vals(MP_EN, prefix)[1]), null, 2));
  console.log("Wrote", id);
}

for (const sp of SUB_PAGES) {
  const { sections, enSections } = buildSubPage(MP_BG, MP_EN, sp.prefix, sp.image, sp.related);
  const p = vals(MP_BG, sp.prefix);
  fs.writeFileSync(OUT + `/${sp.id}.json`, JSON.stringify(makePage(sp.id, sections, enSections, p[0] || p[1], vals(MP_EN, sp.prefix)[0]), null, 2));
  console.log("Wrote", sp.id);
}

const aboutBg = OLD_BG.AboutUs ?? {};
fs.writeFileSync(
  OUT + "/for-us.json",
  JSON.stringify(
    {
      bg: {
        meta: { title: "За нас | Atlant Logistics", description: aboutBg.p1?.slice(0, 160) ?? "" },
        hero: { label: "За нас", title: "За нас", subtitle: "Доказан партньор в логистиката от 2006 г." },
        sections: [
          { type: "intro-split", paragraphs: [aboutBg.p1, aboutBg.p2].filter(Boolean), image: "/images/about-us.webp" },
          { type: "highlight-box", heading: "Сертификати и членства", items: ["ISO 9001 – сертифицирана система за управление на качеството", "FEDEMAC (Европейската федерация на асоциациите за преместване)", "Българска асоциация по премествания (БАП)"] },
          { type: "article", heading: "Нашата история", paragraphs: [aboutBg.p3].filter(Boolean), variant: "muted" },
        ],
      },
      en: {
        meta: { title: "About Us | Atlant Logistics", description: "Trusted logistics partner since 2006." },
        hero: { label: "About Us", title: "About Us", subtitle: "A proven logistics partner since 2006." },
        sections: [
          {
            type: "intro-split",
            paragraphs: [
              "Atlant LT was founded in 2006 in Plovdiv, specialized in professional relocations and loading services. The company developed its own fleet, obtained an international freight license, and expanded into transport and forwarding.",
              "The company built warehouse services up to 5,000 sq.m and corporate and industrial relocation capabilities, including partnerships with companies like IKEA.",
            ],
            image: "/images/about-us.webp",
          },
          { type: "highlight-box", heading: "Certifications & memberships", items: ["ISO 9001 certified quality management", "FEDEMAC – European Federation of Removals Associations", "Bulgarian Association for Relocations (BAP)"] },
          {
            type: "article",
            heading: "Today",
            paragraphs: [
              "Atlant Logistics & Relocations offers full logistics and door-to-door relocation services, ISO 9001 certified, nationwide and internationally.",
            ],
            variant: "muted",
          },
        ],
      },
    },
    null,
    2
  )
);

// Private client pages
const privateSpecs = [
  { id: "private-client-transportation", heroBg: "Услуги за частни клиенти", heroEn: "Private Client Services", textBg: "Пълен набор от логистични и преместващи услуги за частни клиенти.", textEn: "Full logistics and relocation services for private clients." },
  { id: "private-client-moving", prefix: "dom" },
  { id: "private-client-specialized", prefix: "specprem" },
  { id: "private-client-support", prefix: "pomoshen" },
];
for (const p of privateSpecs) {
  if (p.prefix) {
    const { sections, enSections } = buildSubPage(MP_BG, MP_EN, p.prefix, "/images/pages/relocation.webp", []);
    fs.writeFileSync(OUT + `/${p.id}.json`, JSON.stringify(makePage(p.id, sections, enSections, vals(MP_BG, p.prefix)[0], vals(MP_EN, p.prefix)[0]), null, 2));
  } else {
    fs.writeFileSync(
      OUT + `/${p.id}.json`,
      JSON.stringify({
        bg: { meta: { title: `${p.heroBg} | Atlant Logistics`, description: p.textBg }, hero: { label: "Частни клиенти", title: p.heroBg, subtitle: p.textBg }, sections: [{ type: "intro-split", paragraphs: [p.textBg], image: "/images/pages/relocation.webp" }, { type: "related-services", heading: "Услуги", items: [{ title: "Преместване на дома", href: "/private-client-transportation/moving" }, { title: "Специализирано", href: "/private-client-transportation/specialized-moving" }, { title: "Помощен персонал", href: "/private-client-transportation/support-staff" }] }] },
        en: { meta: { title: `${p.heroEn} | Atlant Logistics`, description: p.textEn }, hero: { label: "Private Clients", title: p.heroEn, subtitle: p.textEn }, sections: [{ type: "intro-split", paragraphs: [p.textEn], image: "/images/pages/relocation.webp" }, { type: "related-services", heading: "Services", items: [{ title: "Home moving", href: "/private-client-transportation/moving" }, { title: "Specialized", href: "/private-client-transportation/specialized-moving" }, { title: "Support staff", href: "/private-client-transportation/support-staff" }] }] },
      }, null, 2)
    );
  }
  console.log("Wrote", p.id);
}

console.log("Done.");
