import fs from "fs";
import path from "path";

const ROOT = path.resolve(import.meta.dirname, "..");
const pagesDir = path.join(ROOT, "data", "pages");

const TITLES = {
  "transportni-uslugi": {
    bg: "Транспортни услуги и спедиция",
    en: "Transportation Services & Forwarding",
    image: "/images/pages/headers/transportni_uslugi.png",
  },
  "avtomobilen-transport": {
    bg: "Автомобилен транспорт",
    en: "Road Transport",
    image: "/images/pages/headers/transportni_uslugi.png",
  },
  "vazdushen-transport": {
    bg: "Въздушен транспорт",
    en: "Air Transport",
    image: "/images/pages/headers/transportni_uslugi.png",
  },
  "morski-transport": {
    bg: "Морски транспорт",
    en: "Sea Transport",
    image: "/images/pages/headers/transportni_uslugi.png",
  },
  "zhelezopaten-transport": {
    bg: "Железопътен транспорт",
    en: "Rail Transport",
    image: "/images/pages/headers/transportni_uslugi.png",
  },
  "specilalizirano-premestvane-i-transport": {
    bg: "Специализиран транспорт",
    en: "Specialized Transport",
    image: "/images/pages/headers/transportni_uslugi.png",
  },
  "skladovi-uslugi": {
    bg: "Складови услуги и съхранение",
    en: "Warehousing Services & Storage",
    image: "/images/pages/headers/skladovi_uslugi.png",
  },
  "skladovi-uslugi-korporativno": {
    bg: "Корпоративно складиране",
    en: "Corporate Warehousing and Storage",
    image: "/images/pages/headers/skladovi_uslugi.png",
  },
  "skladovi-uslugi-individualno": {
    bg: "Индивидуално складиране",
    en: "Personal Storage",
    image: "/images/pages/headers/skladovi_uslugi.png",
  },
  premestvane: {
    bg: "Премествания",
    en: "Relocations",
    image: "/images/pages/headers/premestvania.png",
  },
  "premestvane-na-doma": {
    bg: "Преместване на дома",
    en: "Home Relocation",
    image: "/images/pages/headers/premestvania.png",
  },
  "premestvane-na-ofis": {
    bg: "Преместване на офиса",
    en: "Office Relocation",
    image: "/images/pages/headers/premestvania.png",
  },
  "premestvane-mezhdunarodno": {
    bg: "Международно преместване",
    en: "International Relocation",
    image: "/images/pages/headers/premestvania.png",
  },
  "specializirano-premestvane": {
    bg: "Специализирано преместване",
    en: "Specialized Relocation",
    image: "/images/pages/headers/premestvania.png",
  },
  "premestvane-industrialno": {
    bg: "Индустриално преместване",
    en: "Industrial Relocation",
    image: "/images/pages/headers/premestvania.png",
  },
  "tovaro-raztovarni-uslugi": {
    bg: "Товаро-разтоварни услуги",
    en: "Loading & Unloading Services",
    image: "/images/pages/headers/tovaro_rastovarni_uslugi.png",
  },
  "hamalski-uslugi": {
    bg: "Хамалски услуги",
    en: "Handling Crew",
    image: "/images/pages/headers/tovaro_rastovarni_uslugi.png",
  },
  "tovaro-raztovarni-pomoshten": {
    bg: "Помощен персонал",
    en: "Temporary Crew",
    image: "/images/pages/headers/tovaro_rastovarni_uslugi.png",
  },
};

for (const [id, { bg, en }] of Object.entries(TITLES)) {
  const file = path.join(pagesDir, `${id}.json`);
  const data = JSON.parse(fs.readFileSync(file, "utf8"));
  data.bg.hero.title = bg;
  data.en.hero.title = en;
  delete data.bg.hero.subtitle;
  delete data.en.hero.subtitle;
  data.bg.meta.title = `${bg} | Atlant Logistics`;
  data.en.meta.title = `${en} | Atlant Logistics`;
  fs.writeFileSync(file, JSON.stringify(data, null, 2) + "\n");
  console.log("Updated", id);
}

console.log("\nHero images by group:");
const byImage = {};
for (const [id, { image }] of Object.entries(TITLES)) {
  (byImage[image] ??= []).push(id);
}
console.log(JSON.stringify(byImage, null, 2));
