import fs from "fs";
import path from "path";

const ROOT = path.resolve(import.meta.dirname, "..");
const pagesDir = path.join(ROOT, "data", "pages");

/** @type {Record<string, { type: "meta" } | { type: "introPara"; index?: number }>} */
const RULES = {
  "transportni-uslugi": { type: "introPara", index: 0 },
  "avtomobilen-transport": { type: "meta" },
  "vazdushen-transport": { type: "meta" },
  "morski-transport": { type: "meta" },
  "zhelezopaten-transport": { type: "meta" },
  "specilalizirano-premestvane-i-transport": { type: "meta" },
  "skladovi-uslugi": { type: "introPara", index: 0 },
  "skladovi-uslugi-korporativno": { type: "meta" },
  "skladovi-uslugi-individualno": { type: "meta" },
  premestvane: { type: "introPara", index: 1 },
  "premestvane-na-doma": { type: "meta" },
  "premestvane-na-ofis": { type: "meta" },
  "premestvane-mezhdunarodno": { type: "meta" },
  "specializirano-premestvane": { type: "meta" },
  "premestvane-industrialno": { type: "meta" },
  "tovaro-raztovarni-uslugi": { type: "introPara", index: 0 },
  "hamalski-uslugi": { type: "meta" },
  "tovaro-raztovarni-pomoshten": { type: "meta" },
};

function findIntro(sections) {
  return sections.find((s) => s.type === "intro-split" || s.type === "intro-accent");
}

function processLocale(localeData, rule) {
  const intro = findIntro(localeData.sections);
  let subtitle = "";

  if (rule.type === "meta") {
    subtitle = localeData.meta.description?.trim() ?? "";
  } else if (rule.type === "introPara" && intro?.paragraphs?.length) {
    const idx = rule.index ?? 0;
    subtitle = intro.paragraphs[idx]?.trim() ?? "";
    if (subtitle && intro.paragraphs[idx] === subtitle) {
      intro.paragraphs = intro.paragraphs.filter((_, i) => i !== idx);
      if (intro.paragraphs.length === 0) {
        localeData.sections = localeData.sections.filter((s) => s !== intro);
      }
    }
  }

  if (!subtitle) return;

  localeData.hero.subtitle = subtitle;
  localeData.meta.description = subtitle;
}

for (const [id, rule] of Object.entries(RULES)) {
  const file = path.join(pagesDir, `${id}.json`);
  const data = JSON.parse(fs.readFileSync(file, "utf8"));
  processLocale(data.bg, rule);
  processLocale(data.en, rule);
  fs.writeFileSync(file, JSON.stringify(data, null, 2) + "\n");
  console.log(id, "→", data.bg.hero.subtitle?.slice(0, 80) + "...");
}
