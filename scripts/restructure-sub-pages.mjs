import { execSync } from "child_process";
import fs from "fs";
import path from "path";

const SUB_PAGES = [
  "avtomobilen-transport",
  "vazdushen-transport",
  "morski-transport",
  "zhelezopaten-transport",
  "specilalizirano-premestvane-i-transport",
  "skladovi-uslugi-korporativno",
  "skladovi-uslugi-individualno",
  "premestvane-na-doma",
  "premestvane-na-ofis",
  "premestvane-mezhdunarodno",
  "specializirano-premestvane",
  "premestvane-industrialno",
  "hamalski-uslugi",
  "tovaro-raztovarni-pomoshten",
];

function loadOriginal(pageId) {
  const rel = `data/pages/${pageId}.json`;
  try {
    const raw = execSync(`git show HEAD:${rel}`, { encoding: "utf8" });
    return JSON.parse(raw);
  } catch {
    const filePath = path.join(process.cwd(), rel);
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  }
}

function isEmptyTipsArticle(section) {
  return (
    section.type === "article" &&
    (section.heading === "Полезни съвети по темата" ||
      section.heading === "Useful tips on the topic") &&
    !section.paragraphs?.length &&
    !section.bullets?.length
  );
}

function articleToTopic(section) {
  const { heading, paragraphs = [], bullets = [] } = section;
  const paras = [...paragraphs];

  if (bullets.length > 0) {
    const intro = paras.shift() ?? undefined;
    const points = bullets.map((title, i) => ({
      title,
      text: paras[i] ?? "",
    }));
    const footer = paras.slice(bullets.length).filter(Boolean);
    return {
      title: heading,
      ...(intro ? { intro } : {}),
      points: points.filter((p) => p.title),
      ...(footer.length ? { footer } : {}),
    };
  }

  if (paras.length <= 1) {
    return {
      title: heading,
      ...(paras[0] ? { intro: paras[0] } : {}),
      points: [],
    };
  }

  return {
    title: heading,
    intro: paras[0],
    points: [],
    footer: paras.slice(1),
  };
}

function transformLocale(localeContent) {
  const sections = localeContent.sections;
  const introSplit = sections.find((s) => s.type === "intro-split");
  const articles = sections.filter(
    (s) => s.type === "article" && !isEmptyTipsArticle(s)
  );
  const tipsShell = sections.find((s) => isEmptyTipsArticle(s));

  const out = [];

  if (introSplit?.paragraphs?.length) {
    out.push({
      type: "intro-accent",
      heading: localeContent.hero.subtitle ?? localeContent.hero.title,
      paragraphs: introSplit.paragraphs,
    });
  }

  if (articles.length) {
    out.push({
      type: "service-topics",
      ...(tipsShell?.label ? { label: tipsShell.label } : { label: "Полезни съвети" }),
      heading: tipsShell?.heading ?? articles[0].label ?? "Полезни съвети по темата",
      topics: articles.map(articleToTopic),
    });
  }

  return out;
}

for (const pageId of SUB_PAGES) {
  const data = loadOriginal(pageId);
  const transformed = {
    bg: {
      ...data.bg,
      sections: transformLocale(data.bg),
    },
    en: {
      ...data.en,
      sections: transformLocale(data.en),
    },
  };

  const outPath = path.join(process.cwd(), "data", "pages", `${pageId}.json`);
  fs.writeFileSync(outPath, JSON.stringify(transformed, null, 2) + "\n");
  console.log(`OK ${pageId}`);
}
