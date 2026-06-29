const NAV_RU_BY_HREF: Record<string, string> = {
  "avtomobilen-transport": "Автотранспорт",
  "vazdushen-transport": "Воздушный транспорт",
  "morski-transport": "Морской транспорт",
  "zhelezopaten-transport": "Железнодорожный транспорт",
  "specilalizirano-premestvane-i-transport": "Специализированный транспорт",
  "skladovi-uslugi/korporativno": "Корпоративное хранение",
  "skladovi-uslugi/individualno": "Индивидуальное хранение",
  "premestvane/na-doma": "Переезд дома",
  "premestvane/na-ofis": "Переезд офиса",
  "premestvane/mezhdunarodno": "Международный переезд",
  "specializirano-premestvane": "Специализированный переезд",
  "premestvane/industrialno": "Индустриальный переезд",
  "hamalski-uslugi": "Услуги грузчиков",
  "tovaro-raztovarni-uslugi/pomoshten": "Подсобный персонал",
};

export function navServiceItemLabel(
  item: { bg: string; en: string; href: readonly string[] },
  locale: string,
): string {
  if (locale === "bg") return item.bg;
  if (locale === "ru") {
    return NAV_RU_BY_HREF[item.href.join("/")] ?? item.en;
  }
  return item.en;
}
