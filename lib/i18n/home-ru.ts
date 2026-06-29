import homeRu from "@/data/home-ru.json";

type HomeRuService = {
  title: string;
  description: string;
  imageAlt: string;
};

const faqByQuestionBg = new Map(
  homeRu.faq.map((item) => [item.questionBg, item]),
);

export function homeServiceText(
  slug: string,
  locale: string,
  field: "title" | "description" | "imageAlt",
  fallback: { bg: string; en: string },
): string {
  if (locale === "ru") {
    const entry = homeRu.services[slug as keyof typeof homeRu.services] as HomeRuService | undefined;
    return entry?.[field] ?? fallback.en;
  }
  return locale === "en" ? fallback.en : fallback.bg;
}

export function homeServiceItemLabel(
  slug: string,
  locale: string,
  labelBg: string,
  labelEn: string,
): string {
  if (locale === "ru") {
    const group = homeRu.serviceItems[slug as keyof typeof homeRu.serviceItems];
    return group?.[labelBg as keyof typeof group] ?? labelEn;
  }
  return locale === "en" ? labelEn : labelBg;
}

export function homeFaqText(
  item: { questionBg: string; questionEn: string; answerBg: string; answerEn: string },
  locale: string,
  field: "question" | "answer",
): string {
  if (locale === "ru") {
    const ru = faqByQuestionBg.get(item.questionBg);
    if (field === "question") return ru?.questionRu ?? item.questionEn;
    return ru?.answerRu ?? item.answerEn;
  }
  if (locale === "en") {
    return field === "question" ? item.questionEn : item.answerEn;
  }
  return field === "question" ? item.questionBg : item.answerBg;
}
