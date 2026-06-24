import fs from "fs";
import path from "path";

const ROOT = path.resolve(import.meta.dirname, "..");
const outFile = path.join(ROOT, "local_docs", "old-angular-pages-content-map-bg.txt");
const pagesDir = path.join(ROOT, "data", "pages");
const bg = JSON.parse(fs.readFileSync(path.join(ROOT, "messages", "bg.json"), "utf8"));
const seed = JSON.parse(fs.readFileSync(path.join(ROOT, "db", "seed-data.json"), "utf8"));
const galleryTs = fs.readFileSync(path.join(ROOT, "lib", "pages", "gallery.ts"), "utf8");
const photos = [...galleryTs.matchAll(/"(\/images\/gallery\/[^"]+)"/g)].map((m) => m[1]);

const pageOrder = [
  ["Транспорт", "transportni-uslugi", "/transportni-uslugi"],
  ["Транспорт", "avtomobilen-transport", "/avtomobilen-transport"],
  ["Транспорт", "vazdushen-transport", "/vazdushen-transport"],
  ["Транспорт", "morski-transport", "/morski-transport"],
  ["Транспорт", "zhelezopaten-transport", "/zhelezopaten-transport"],
  ["Транспорт", "specilalizirano-premestvane-i-transport", "/specilalizirano-premestvane-i-transport"],
  ["Склад", "skladovi-uslugi", "/skladovi-uslugi"],
  ["Склад", "skladovi-uslugi-korporativno", "/skladovi-uslugi/korporativno"],
  ["Склад", "skladovi-uslugi-individualno", "/skladovi-uslugi/individualno"],
  ["Премествания", "premestvane", "/premestvane"],
  ["Премествания", "premestvane-na-doma", "/premestvane/na-doma"],
  ["Премествания", "premestvane-na-ofis", "/premestvane/na-ofis"],
  ["Премествания", "premestvane-mezhdunarodno", "/premestvane/mezhdunarodno"],
  ["Премествания", "specializirano-premestvane", "/specializirano-premestvane"],
  ["Премествания", "premestvane-industrialno", "/premestvane/industrialno"],
  ["Товарене", "tovaro-raztovarni-uslugi", "/tovaro-raztovarni-uslugi"],
  ["Товарене", "hamalski-uslugi", "/hamalski-uslugi"],
  ["Товарене", "tovaro-raztovarni-pomoshten", "/tovaro-raztovarni-uslugi/pomoshten"],
  ["Компания", "about-us", "/about-us"],
  ["Частни клиенти", "private-client-transportation", "/private-client-transportation"],
  ["Частни клиенти", "private-client-moving", "/private-client-transportation/moving"],
  ["Частни клиенти", "private-client-specialized", "/private-client-transportation/specialized-moving"],
  ["Частни клиенти", "private-client-support", "/private-client-transportation/support-staff"],
];

const L = [];
const w = (s = "") => L.push(s);
const trim = (s) => String(s ?? "").replace(/\s+/g, " ").trim();
const get = (id) => JSON.parse(fs.readFileSync(path.join(pagesDir, `${id}.json`), "utf8")).bg;

function flat(obj, p = "") {
  const rows = [];
  for (const [k, v] of Object.entries(obj || {})) {
    const key = p ? `${p}.${k}` : k;
    if (v && typeof v === "object" && !Array.isArray(v)) rows.push(...flat(v, key));
    else rows.push([key, v]);
  }
  return rows;
}

function sec(sec, n) {
  const head = sec.heading || sec.label || sec.type;
  w(`${n}. [${sec.type}] ${head}`);
  if (sec.label && sec.heading && sec.label !== sec.heading) w(`   етикет: ${trim(sec.label)}`);
  if (sec.subtitle) w(`   подзаглавие: ${trim(sec.subtitle)}`);
  if (sec.intro) w(`   въведение: ${trim(sec.intro)}`);
  if (sec.image) w(`   снимка: ${sec.image}`);
  if (sec.paragraphs?.length) sec.paragraphs.forEach((p) => w(`   ${trim(p)}`));
  const bullets = sec.bullets || (sec.items?.every?.((x) => typeof x === "string") ? sec.items : null);
  if (bullets?.length) bullets.forEach((b) => w(`   - ${trim(b)}`));
  if (Array.isArray(sec.items) && sec.items.some((x) => x && typeof x === "object")) {
    sec.items.forEach((it, i) => {
      const t = trim(it.title || "");
      const href = it.href ? ` -> ${it.href}` : "";
      w(`   ${i + 1}) ${t}${href}`);
      if (it.text) w(`      ${trim(it.text)}`);
      if (it.lines?.length) it.lines.forEach((ln) => w(`      ${trim(ln)}`));
    });
  }
}

function page([group, id, url]) {
  const p = get(id);
  w("");
  w(`> ${p.hero.title}  (${url})`);
  w(`  група: ${group} | id: ${id}`);
  w(`  hero: [${trim(p.hero.label)}] ${trim(p.hero.title)}`);
  if (p.hero.subtitle) w(`  подзаглавие: ${trim(p.hero.subtitle)}`);
  w(`  meta: ${trim(p.meta.title)}`);
  if (p.meta.description) w(`  описание: ${trim(p.meta.description)}`);
  p.sections.forEach((s, i) => sec(s, i + 1));
}

w("АТЛАНТ ЛОГИСТИКС - КАРТА НА СЪДЪРЖАНИЕТО (САМО БГ)");
w(`Генерирано: ${new Date().toISOString().slice(0, 10)}`);
w("Компактен формат - пълни данни, без английски дубликати.");

w("\n== ИНДЕКС ==");
for (const row of pageOrder) {
  const p = get(row[1]);
  w(`${row[2]}  |  ${p.hero.title}`);
}
w("/contacts  |  Контакти");
w("/faq  |  ЧЗВ");
w("/galery/photo  |  Фото галерия");
w("/galery/video  |  Видео галерия");
w("/privacy-policy  |  Политика за поверителност");
w("/terms-of-use  |  Условия за ползване");

w("\n== ШАБЛОНИ ==");
w("hero -> intro-split -> direction-cards / checklist / feature-grid -> article(и) -> related-services -> CTA");
w("типове: intro-split, direction-cards, feature-grid, article, checklist-panel, highlight-box, related-services");
w("CTA (всички content страници): Готови за персонална оферта? | Свържете се с нас... | Запитване за цена");

w("\n== НАЧАЛО / ГЛОБАЛНО ==");
const global = {
  nav: bg.nav,
  hero: bg.hero,
  trust: bg.trust,
  services: bg.services,
  about: bg.about,
  why: bg.why,
  faq: bg.faq,
  cta: bg.cta,
  footer: bg.footer,
  inquiry: bg.inquiry,
  meta: bg.meta,
};
for (const [k, v] of flat(global)) w(`${k}: ${trim(v)}`);

w("\n  Услуги (карти на начална):");
(seed.services || []).forEach((s, i) => {
  w(`  ${i + 1}. ${s.titleBg} (${s.slug}) - ${trim(s.descriptionBg)}`);
  (seed.serviceItems?.[s.slug] || []).forEach((it) => w(`     - ${it.bg}`));
});

w("\n== СТРАНИЦИ ==");
pageOrder.forEach((row) => page(row));

w("\n== СПЕЦИАЛНИ СТРАНИЦИ ==");

w("\n> Контакти  (/contacts)");
for (const [k, v] of flat(bg.pages.contact)) w(`  ${k}: ${trim(v)}`);
w("  динамични данни:");
(seed.settings || []).filter((s) => s.groupName === "contact").forEach((s) => w(`  ${s.label}: ${s.value}`));
w("  оформление: hero -> 3 карти (тел/имейл/адрес) -> панел запитване -> CTA");

w("\n> ЧЗВ  (/faq)");
w(`  hero: [${bg.faq.label}] ${bg.faq.title}`);
w("  подзаглавие: Отговори на най-често задаваните въпроси");
(seed.faqs || []).forEach((f, i) => {
  w(`  ${i + 1}. В: ${trim(f.questionBg)}`);
  w(`     О: ${trim(f.answerBg)}`);
});

w("\n> Галерия");
for (const [k, v] of flat(bg.pages.gallery)) w(`  ${k}: ${trim(v)}`);
w(`  снимки (${photos.length}): ${photos.join(", ")}`);

w("\n> Политика за поверителност");
for (const [k, v] of flat(bg.pages.privacy)) w(`  ${k}: ${trim(v)}`);

w("\n> Условия за ползване");
for (const [k, v] of flat(bg.pages.terms)) w(`  ${k}: ${trim(v)}`);

fs.mkdirSync(path.dirname(outFile), { recursive: true });
fs.writeFileSync(outFile, L.join("\n"), "utf8");
console.log(outFile);
console.log(`${L.length} lines`);
