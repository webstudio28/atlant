import fs from "fs";
import path from "path";

const ROOT = path.resolve(import.meta.dirname, "..");
const pagesDir = path.join(ROOT, "data", "pages");

function patch(filename, sectionsByLocale) {
  const file = path.join(pagesDir, filename);
  const data = JSON.parse(fs.readFileSync(file, "utf8"));
  data.bg.sections = sectionsByLocale.bg;
  data.en.sections = sectionsByLocale.en;
  fs.writeFileSync(file, JSON.stringify(data, null, 2) + "\n");
  console.log("patched", filename);
}

function findSection(sections, type) {
  return sections.find((s) => s.type === type);
}

function articles(sections) {
  return sections.filter((s) => s.type === "article");
}

const SERVICE_TOPICS_LABEL = { bg: "Полезни съвети", en: "Useful tips" };

function skladoviSections(locale, oldSections) {
  const intro = findSection(oldSections, "intro-split");
  const cards = findSection(oldSections, "direction-cards");
  const arts = articles(oldSections);

  const isBg = locale === "bg";
  const combinedIntro = (intro?.paragraphs ?? []).join(" ");

  return [
    {
      type: "sub-services",
      label: isBg ? "Направления" : "Directions",
      heading: isBg
        ? "Два модела. Една надеждна логистична база."
        : "Two models. One reliable logistics base.",
      items: (cards?.items ?? []).map((item) => ({
        title: item.title,
        lines: item.lines,
        href: item.href,
      })),
    },
    {
      type: "intro-accent",
      label: isBg ? "Нашият подход" : "Our approach",
      heading: isBg
        ? "Складирането като контролирана част от веригата ви"
        : "Warehousing as a controlled part of your chain",
      paragraphs: [combinedIntro],
      image: intro?.image ?? "/images/pages/warehouse.webp",
    },
    {
      type: "service-topics",
      label: SERVICE_TOPICS_LABEL[locale],
      heading: isBg
        ? "Всичко, което трябва да знаете при избора на складово решение"
        : "Everything you need to know when choosing warehousing",
      topics: [
        {
          title: arts[0]?.heading?.replace(/:$/, "") ?? (isBg ? "Складова сигурност" : "Warehouse security"),
          intro: isBg
            ? "Сериозната складова сигурност не е само техника – тя е комбинация от системи, процедури и дисциплина:"
            : "Serious warehouse security is not just equipment – it combines systems, procedures, and discipline:",
          points: [
            {
              title: isBg ? "Техническа защита" : "Technical protection",
              text: arts[0]?.paragraphs?.[0] ?? "",
            },
            {
              title: isBg ? "Хигиена и контрол на средата" : "Hygiene and environment control",
              text: arts[0]?.paragraphs?.[1] ?? "",
            },
            {
              title: isBg ? "Застрахователно покритие" : "Insurance coverage",
              text: arts[0]?.paragraphs?.[2] ?? "",
            },
          ],
          footer: (arts[0]?.paragraphs ?? []).slice(3, 6),
        },
        {
          title: isBg
            ? "Как да изберете подходящо складово решение за вашия товар"
            : "How to choose the right storage solution for your cargo",
          intro: arts[1]?.paragraphs?.[0] ?? (isBg ? "Започнете с няколко практични въпроса:" : "Start with a few practical questions:"),
          points: [
            {
              title: isBg ? "Профил на стоката" : "Cargo profile",
              text: [arts[2]?.heading, ...(arts[2]?.paragraphs ?? [])].filter(Boolean).join(" "),
            },
            {
              title: isBg ? "Честота на достъп" : "Access frequency",
              text: (arts[3]?.paragraphs ?? []).join(" "),
            },
            {
              title: isBg ? "Ниво на проследимост" : "Traceability level",
              text: (arts[4]?.paragraphs ?? []).slice(0, 2).join(" "),
            },
          ],
          footer: (arts[4]?.paragraphs ?? []).slice(2),
        },
        {
          title: isBg
            ? "Защо хибридният модел на съхранение работи за реалния бизнес"
            : "Why the hybrid storage model works for real business",
          intro: isBg
            ? "Малко бизнеси имат само „еднотипна“ стока – обикновено има микс от стандартни и специални изисквания."
            : "Few businesses have only one type of goods – usually there is a mix of standard and special requirements.",
          points: (arts[5]?.bullets ?? []).map((title, i) => ({
            title,
            text: arts[5]?.paragraphs?.[i + 1] ?? "",
          })),
          footer: (arts[5]?.paragraphs ?? []).slice(-1),
        },
      ],
    },
  ];
}

function relocationComparisonPoints(paragraphs, isBg) {
  const start = paragraphs.findIndex(
    (p) => p === "Скорост" || p === "Speed" || p === "Planning and coordination",
  );
  if (start === -1) return [];
  const points = [];
  for (let i = start; i + 2 < paragraphs.length; i += 3) {
    const title = paragraphs[i];
    const pro = paragraphs[i + 1];
    const diy = paragraphs[i + 2];
    if (!title || !pro || !diy) break;
    if (title === "Критерий" || title === "Criterion") break;
    points.push({
      title,
      text: isBg
        ? `С професионален екип: ${pro} При самостоятелен вариант: ${diy}`
        : `With a professional crew: ${pro} When doing it yourself: ${diy}`,
    });
  }
  return points;
}

function premestvaneSections(locale, oldSections) {
  const intro = findSection(oldSections, "intro-split");
  const checklist = findSection(oldSections, "checklist-panel");
  const feature = findSection(oldSections, "feature-grid");
  const cards = findSection(oldSections, "direction-cards");
  const arts = articles(oldSections);

  const isBg = locale === "bg";
  const checklistText = (checklist?.items ?? []).join("; ");
  const combinedIntro = [intro?.paragraphs?.[0], checklist?.heading, checklistText]
    .filter(Boolean)
    .join(" ");

  const chooseArticle = arts[0];
  const redFlagsArticle = arts[1];
  const redFlagLines = (redFlagsArticle?.paragraphs ?? []).slice(0, 5);
  const comparisonPoints = relocationComparisonPoints(redFlagsArticle?.paragraphs ?? [], isBg);

  const choosePointText = [
    chooseArticle?.paragraphs?.[0],
    chooseArticle?.paragraphs?.[1],
    [chooseArticle?.paragraphs?.[2], chooseArticle?.paragraphs?.[3], chooseArticle?.paragraphs?.[4]]
      .filter(Boolean)
      .join(" "),
    chooseArticle?.paragraphs?.[5],
    chooseArticle?.paragraphs?.[6],
  ];

  return [
    {
      type: "sub-services",
      label: isBg ? "Направления" : "Directions",
      heading: isBg ? "Пет решения. Един координиран процес." : "Five solutions. One coordinated process.",
      items: (cards?.items ?? []).map((item) => ({
        title: item.title,
        lines: item.lines,
        href: item.href,
      })),
    },
    {
      type: "intro-accent",
      label: isBg ? "Нашият подход" : "Our approach",
      heading: isBg ? "Преместване като управляем проект" : "Relocation as a manageable project",
      paragraphs: [combinedIntro],
      image: intro?.image ?? "/images/pages/relocation.webp",
    },
    {
      type: "service-topics",
      label: SERVICE_TOPICS_LABEL[locale],
      heading: isBg
        ? "Всичко, което трябва да знаете при избора на фирма за преместване"
        : "Everything you need to know when choosing a moving company",
      topics: [
        {
          title: chooseArticle?.heading?.replace(/\?$/, "") ?? (isBg ? "Избор на фирма" : "Choosing a company"),
          intro: isBg
            ? "Правилният партньор се познава по опит, ясна оферта и поети отговорности:"
            : "The right partner stands out through experience, a clear offer, and assumed responsibilities:",
          points: (chooseArticle?.bullets ?? []).map((title, i) => ({
            title,
            text: choosePointText[i] ?? "",
          })),
          footer: (chooseArticle?.paragraphs ?? []).slice(7),
        },
        {
          title: isBg ? "Какво получавате с професионално преместване" : "What you get with professional relocation",
          intro: isBg
            ? "Единен процес от първия оглед до финалната подредба включва:"
            : "A single process from the first inspection to final setup includes:",
          points: (feature?.items ?? []).map((item) => ({
            title: item.title,
            text: item.text || "",
          })),
          footer: [],
        },
        {
          title: isBg
            ? "Червени флагове и разликата спрямо самостоятелното преместване"
            : "Red flags and how DIY moving compares",
          intro: isBg
            ? "Преди да изберете изпълнител, обърнете внимание на тези сигнали – и сравнете с реалната цена на „направи си сам“:"
            : "Before you choose a provider, watch for these signals – and compare them with the real cost of DIY:",
          points: [
            ...redFlagLines.map((line) => ({
              title: line,
              text: isBg
                ? "Ако видите това в офертата или комуникацията, потърсете писмени условия, договор и ясни отговорности."
                : "If you see this in the offer or communication, insist on written terms, a contract, and clear accountability.",
            })),
            ...comparisonPoints,
          ],
          footer: [
            isBg
              ? "Професионалното преместване не е само транспорт – то е координация, защита и предвидим график. Самостоятелният вариант често изглежда по-евтин, докато не се появят скрити разходи, забавяния и риск."
              : "Professional relocation is not just transport – it is coordination, protection, and a predictable schedule. DIY often looks cheaper until hidden costs, delays, and risk appear.",
          ],
        },
      ],
    },
  ];
}
function shortLoadingLines(locale, item) {
  const isBg = locale === "bg";
  if (item.href === "/hamalski-uslugi") {
    return isBg
      ? ["Камион на рампата -", "- екипът в действие"]
      : ["Truck at the ramp -", "- crew in action"];
  }
  if (item.href === "/tovaro-raztovarni-uslugi/pomoshten") {
    return isBg
      ? ["Пикът е тук -", "- хората по график"]
      : ["Peak season hits -", "- people on schedule"];
  }
  return item.lines?.slice(0, 2) ?? [];
}

function loadLocalePage(id, locale) {
  const file = path.join(pagesDir, `${id}.json`);
  return JSON.parse(fs.readFileSync(file, "utf8"))[locale].sections;
}

function tovaroSections(locale, oldSections) {
  const intro = findSection(oldSections, "intro-split");
  const cards = findSection(oldSections, "direction-cards");
  const mainArticle = articles(oldSections)[0];
  const hamalskiArts = articles(loadLocalePage("hamalski-uslugi", locale));
  const pomoshtenArts = articles(loadLocalePage("tovaro-raztovarni-pomoshten", locale));

  const isBg = locale === "bg";

  return [
    {
      type: "sub-services",
      label: isBg ? "Направления" : "Directions",
      heading: isBg ? "Два формата. Една ясна линия на изпълнение." : "Two formats. One clear execution line.",
      items: (cards?.items ?? []).map((item) => ({
        title: item.title,
        lines: shortLoadingLines(locale, item),
        href: item.href,
      })),
    },
    {
      type: "intro-accent",
      label: isBg ? "Нашият подход" : "Our approach",
      heading: isBg
        ? "Товаро-разтоварване с ред и отчетност"
        : "Loading and unloading with order and accountability",
      paragraphs: [(intro?.paragraphs ?? []).join(" ")],
      image: intro?.image ?? "/images/pages/loading.webp",
    },
    {
      type: "service-topics",
      label: SERVICE_TOPICS_LABEL[locale],
      heading: isBg
        ? "Всичко, което трябва да знаете при избора на товаро-разтоварна услуга"
        : "Everything you need to know when choosing loading/unloading services",
      topics: [
        {
          title: isBg ? "Хамалски услуги – кога и как" : "Handling crew – when and how",
          intro: isBg
            ? "Изборът между почасов и фиксиран модел зависи от яснотата на обема и достъпа:"
            : "Choosing hourly vs fixed pricing depends on how clear the volume and access are:",
          points: [
            {
              title: hamalskiArts[0]?.heading?.replace(/:$/, "") ?? (isBg ? "Почасово" : "Hourly"),
              text: (hamalskiArts[0]?.paragraphs ?? []).join(" "),
            },
            {
              title: hamalskiArts[1]?.heading?.replace(/:$/, "") ?? (isBg ? "По задание" : "Fixed job"),
              text: (hamalskiArts[1]?.paragraphs ?? []).join(" "),
            },
            {
              title: hamalskiArts[2]?.heading?.replace(/:$/, "") ?? (isBg ? "Бързо решение" : "Quick decision"),
              text: (hamalskiArts[2]?.paragraphs ?? []).join(" "),
            },
          ],
          footer: (hamalskiArts[3]?.paragraphs ?? []).slice(0, 2),
        },
        {
          title: isBg ? "Помощен персонал – кога и как" : "Support staff – when and how",
          intro: isBg
            ? "При пикове, инвентаризации или кампании бързото мащабиране на екипа е критично:"
            : "During peaks, inventories, or campaigns, scaling the team quickly is critical:",
          points: [
            {
              title: pomoshtenArts[0]?.heading?.replace(/:$/, "") ?? (isBg ? "Стартови норми" : "Starting norms"),
              text: (pomoshtenArts[0]?.paragraphs ?? []).join(" "),
            },
            {
              title: pomoshtenArts[1]?.heading ?? (isBg ? "Бърза сметка" : "Quick estimate"),
              text: (pomoshtenArts[1]?.paragraphs ?? []).join(" "),
            },
            {
              title: pomoshtenArts[2]?.heading ?? (isBg ? "Фактори извън нормата" : "Factors beyond norms"),
              text: (pomoshtenArts[2]?.paragraphs ?? []).join(" "),
            },
          ],
          footer: [],
        },
        {
          title: isBg ? "Какво включват нашите товаро-разтоварни услуги" : "What our loading/unloading services include",
          intro: isBg
            ? "Един партньор може да покрие целия оперативен цикъл около рампата и обекта:"
            : "One partner can cover the full operational cycle around the ramp and your site:",
          points: (mainArticle?.paragraphs ?? []).map((line) => ({
            title: line,
            text: isBg
              ? "Организирано изпълнение с екип, базова техника и ясен график – без хаос по линията."
              : "Organized execution with a team, basic equipment, and a clear schedule – without chaos along the line.",
          })),
          footer: [],
        },
      ],
    },
  ];
}

function buildFromFile(filename, transform) {
  const file = path.join(pagesDir, filename);
  const data = JSON.parse(fs.readFileSync(file, "utf8"));
  return {
    bg: transform("bg", data.bg.sections),
    en: transform("en", data.en.sections),
  };
}

const targets = [
  ["skladovi-uslugi.json", skladoviSections],
  ["premestvane.json", premestvaneSections],
  ["tovaro-raztovarni-uslugi.json", tovaroSections],
];

for (const [file, transform] of targets) {
  patch(file, buildFromFile(file, transform));
}

for (const file of targets.map(([f]) => f)) {
  const full = path.join(pagesDir, file);
  JSON.parse(fs.readFileSync(full, "utf8"));
  console.log("valid JSON:", file);
}
