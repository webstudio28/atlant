import fs from "fs";
import path from "path";

const ROOT = path.resolve(import.meta.dirname, "..");
const PAGES_DIR = path.join(ROOT, "data/pages");
const OLD_BG_PATH = path.join(ROOT, "local_docs/_old_site_bg_i18n.json");
const OLD_RU_PATH = path.join(
  ROOT,
  "local_docs/atlantlogistics.com/atlantlogistics.com/assets/i18n/ru.json"
);
const OVERRIDES_PATH = path.join(ROOT, "scripts/ru-page-overrides.json");

const SKIP_KEYS = new Set(["type", "href", "image", "variant", "id", "preset"]);
const SKIP_VALUES = new Set(["Atlant Logistics"]);
const BG_CYRILLIC = /[\u0400-\u04FF]/;

function norm(text) {
  if (!text || typeof text !== "string") return "";
  return text.replace(/\s+/g, " ").trim();
}

function cleanHtml(text) {
  return norm(
    String(text)
      .replace(/<br\s*\/?>/gi, "\n")
      .replace(/<a[^>]*href="[^"]*#\/([^"]*)"[^>]*>([^<]*)<\/a>/gi, "$2")
      .replace(/<a[^>]*>([^<]*)<\/a>/gi, "$1")
      .replace(/<[^>]+>/g, "")
  );
}

function buildBgToRu() {
  const bg = JSON.parse(fs.readFileSync(OLD_BG_PATH, "utf8")).MainPages ?? {};
  const ru = JSON.parse(fs.readFileSync(OLD_RU_PATH, "utf8")).MainPages ?? {};
  const map = {};
  for (const key of Object.keys(bg)) {
    const b = cleanHtml(bg[key]);
    const r = cleanHtml(ru[key]);
    if (b && r) map[b] = r;
  }
  return map;
}

function loadOverrides() {
  if (!fs.existsSync(OVERRIDES_PATH)) return {};
  return JSON.parse(fs.readFileSync(OVERRIDES_PATH, "utf8"));
}

function translateSegment(segment, bgToRu, overrides) {
  const n = norm(segment);
  if (!n) return segment;
  if (overrides[n] !== undefined) return overrides[n];
  if (bgToRu[n]) return bgToRu[n];
  return null;
}

function applyTemplates(text, translateFn) {
  const t = norm(text);
  if (!t) return text;

  let m = t.match(/^Всичко, което трябва да знаете за (.+)$/);
  if (m) return `Всё, что нужно знать о ${translateFn(m[1])}`;

  m = t.match(/^Всичко, което трябва да знаете при избора на (.+)$/);
  if (m) return `Всё, что нужно знать при выборе ${m[1]}`;

  m = t.match(/^(.+) \| Atlant Logistics$/);
  if (m) return `${translateFn(m[1])} | Atlant Logistics`;

  if (t === "Полезни съвети") return "Полезные советы";

  return null;
}

function sentenceSplitTranslate(text, bgToRu, overrides) {
  const parts = text.split(/(?<=[.!?;])\s+/);
  if (parts.length <= 1) return null;

  const translated = parts.map((part) => {
    const n = norm(part);
    if (!n) return part;
    if (overrides[n] !== undefined) return overrides[n];
    if (bgToRu[n]) return bgToRu[n];
    return part;
  });

  if (translated.some((p, i) => p !== parts[i])) {
    return translated.join(" ");
  }
  return null;
}

function translateString(value, bgToRu, overrides, pathStack, warnings) {
  if (typeof value !== "string") return value;
  if (SKIP_VALUES.has(value) || value.startsWith("/")) return value;

  const original = value;
  const n = norm(value);
  let resolved = false;
  let result = null;

  if (overrides[n] !== undefined || overrides[value] !== undefined) {
    result = overrides[n] ?? overrides[value];
    resolved = true;
  } else if (bgToRu[n]) {
    result = bgToRu[n];
    resolved = true;
  } else {
    const templated = applyTemplates(value, (inner) => {
      const innerN = norm(inner);
      if (overrides[innerN] !== undefined) return overrides[innerN];
      if (bgToRu[innerN]) return bgToRu[innerN];
      return sentenceSplitTranslate(inner, bgToRu, overrides) ?? inner;
    });
    if (templated != null) {
      result = templated;
      resolved = true;
    } else {
      const split = sentenceSplitTranslate(value, bgToRu, overrides);
      if (split != null) {
        result = split;
        resolved = split !== value;
      }
    }
  }

  if (result == null) result = value;

  if (
    !resolved &&
    result === original &&
    BG_CYRILLIC.test(original) &&
    !SKIP_VALUES.has(original) &&
    !original.startsWith("/")
  ) {
    warnings.push(pathStack.join("."));
  }

  return result;
}

function walkNode(node, key, bgToRu, overrides, pathStack, warnings) {
  if (SKIP_KEYS.has(key)) return node;

  if (typeof node === "string") {
    return translateString(node, bgToRu, overrides, pathStack, warnings);
  }

  if (Array.isArray(node)) {
    return node.map((item, i) =>
      walkNode(item, String(i), bgToRu, overrides, [...pathStack, String(i)], warnings)
    );
  }

  if (node && typeof node === "object") {
    const out = {};
    for (const [k, v] of Object.entries(node)) {
      out[k] = walkNode(v, k, bgToRu, overrides, [...pathStack, k], warnings);
    }
    return out;
  }

  return node;
}

function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

function main() {
  const bgToRu = buildBgToRu();
  const overrides = loadOverrides();
  const files = fs
    .readdirSync(PAGES_DIR)
    .filter((f) => f.endsWith(".json"))
    .sort();

  let updated = 0;
  const allWarnings = [];

  for (const file of files) {
    const filePath = path.join(PAGES_DIR, file);
    const page = JSON.parse(fs.readFileSync(filePath, "utf8"));

    if (!page.bg) {
      console.warn(`Skip ${file}: no bg block`);
      continue;
    }

    const warnings = [];
    const ru = walkNode(deepClone(page.bg), "bg", bgToRu, overrides, ["ru"], warnings);
    page.ru = ru;
    fs.writeFileSync(filePath, JSON.stringify(page, null, 2) + "\n", "utf8");
    updated++;
    allWarnings.push(...warnings.map((w) => `${file}: ${w}`));
  }

  const uniqueWarnings = [...new Set(allWarnings)];
  console.log(`Updated ${updated} page files.`);
  console.log(`Remaining untranslated strings: ${uniqueWarnings.length}`);
  if (uniqueWarnings.length) {
    console.log("Warnings:");
    for (const w of uniqueWarnings.slice(0, 50)) console.log(`  - ${w}`);
    if (uniqueWarnings.length > 50) {
      console.log(`  ... and ${uniqueWarnings.length - 50} more`);
    }
  }
}

main();
