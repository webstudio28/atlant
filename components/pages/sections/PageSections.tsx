import Image from "next/image";
import Link from "next/link";
import { pickLocale } from "@/lib/i18n/locale-text";

export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2.5 font-['Sofia_Sans_Condensed',sans-serif] text-[14px] font-[700] tracking-[0.18em] uppercase text-[#F26A21] mb-3">
      <span className="block w-5 h-px bg-[#F26A21]" />
      {children}
    </div>
  );
}

export function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-['Sofia_Sans_Condensed',sans-serif] text-[clamp(28px,4vw,40px)] font-[800] text-[#52595D] tracking-[0.02em] mb-3 leading-[1.12]">
      {children}
    </h2>
  );
}

function SectionIntro({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[18px] text-[#52595D]/85 leading-[1.7] m-0 max-w-[720px]">{children}</p>
  );
}

function InfoCard({
  children,
  accent = "corner",
}: {
  children: React.ReactNode;
  accent?: "corner" | "left" | "numbered";
  index?: number;
}) {
  return (
    <div className="relative bg-white rounded-xl border border-[rgba(82,89,93,0.1)] p-6 card-lift h-full">
      {accent === "corner" && (
        <span className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#F26A21] rounded-tl-xl" />
      )}
      {accent === "left" && (
        <span className="absolute top-0 left-0 bottom-0 w-1 bg-[#F26A21] rounded-l-xl" />
      )}
      <div className={accent === "left" ? "pl-3" : ""}>{children}</div>
    </div>
  );
}

function pickArticleLayout(paragraphs: string[], bullets?: string[]) {
  const bulletCount = bullets?.length ?? 0;
  const paraCount = paragraphs.length;
  if (bulletCount >= 3 && paraCount <= 1) return "bullet-grid";
  if (bulletCount >= 1 && paraCount >= 2) return "mixed";
  if (paraCount >= 3) return "para-grid";
  if (paraCount === 2 && bulletCount === 0) return "para-duo-full";
  if (bulletCount >= 1) return "bullet-grid";
  return "single";
}

export function IntroSplitSection({
  paragraphs,
  image,
  reverse = false,
}: {
  paragraphs: string[];
  image?: string;
  reverse?: boolean;
}) {
  if (!paragraphs.length) return null;
  const lead = paragraphs[0];
  const rest = paragraphs.slice(1);

  return (
    <section className="py-20 bg-white">
      <div className="section-wrap">
        {lead && (
          <div className="mb-12 max-w-[800px]">
            <SectionIntro>{lead}</SectionIntro>
          </div>
        )}
        {(image || rest.length > 0) && (
          <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center ${reverse ? "lg:[direction:rtl] lg:*:[direction:ltr]" : ""}`}>
            {image && (
              <div className="rounded-xl overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.12)]">
                <Image src={image} alt="" width={1200} height={800} className="w-full h-auto object-cover aspect-[4/3]" />
              </div>
            )}
            {rest.length > 0 && (
              <div className={`flex flex-col gap-5 ${!image ? "lg:col-span-2" : ""}`}>
                {rest.map((p, i) => (
                  <InfoCard key={i} accent="left">
                    <p className="text-[17px] text-[#52595D] leading-[1.75] m-0">{p}</p>
                  </InfoCard>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

export function DirectionCardsSection({
  locale,
  label,
  heading,
  items,
}: {
  locale: string;
  label?: string;
  heading: string;
  items: { title: string; lines: string[]; href?: string }[];
}) {
  return (
    <section className="py-20 bg-[#F4F4F2]">
      <div className="section-wrap">
        <div className="mb-12">
          {label && <SectionLabel>{label}</SectionLabel>}
          <SectionTitle>{heading}</SectionTitle>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, i) => {
            const inner = (
              <div className="relative bg-white rounded-xl border border-[rgba(82,89,93,0.1)] p-6 card-lift h-full flex flex-col overflow-hidden">
                <span className="absolute top-3 right-4 font-['Sofia_Sans_Condensed',sans-serif] text-[48px] font-[900] leading-none text-[rgba(82,89,93,0.06)] select-none">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#F26A21] rounded-tl-xl" />
                <h3 className="font-['Sofia_Sans_Condensed',sans-serif] text-[22px] font-[800] text-[#F26A21] tracking-[0.04em] uppercase mb-3 relative z-10">
                  {item.title}
                </h3>
                <div className="flex flex-col gap-1.5 relative z-10 flex-1">
                  {item.lines.map((line, j) => (
                    <p key={j} className="text-[17px] text-[#52595D] leading-[1.5] m-0 font-medium">
                      {line}
                    </p>
                  ))}
                </div>
                {item.href && (
                  <span className="mt-4 text-[14px] font-['Sofia_Sans_Condensed',sans-serif] font-[700] tracking-[0.06em] uppercase text-[#52595D]/60 group-hover:text-[#F26A21]">
                    {pickLocale(locale, {
                      bg: "Виж повече →",
                      en: "Learn more →",
                      ru: "Подробнее →",
                    })}
                  </span>
                )}
              </div>
            );
            return item.href ? (
              <Link key={item.title} href={`/${locale}${item.href}`} className="no-underline group">
                {inner}
              </Link>
            ) : (
              <div key={item.title}>{inner}</div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function FeatureGridSection({
  label,
  heading,
  subtitle,
  items,
}: {
  label?: string;
  heading: string;
  subtitle?: string;
  items: { title: string; text: string }[];
}) {
  return (
    <section className="py-20 bg-[#F4F4F2]">
      <div className="section-wrap">
        <div className="mb-12">
          {label && <SectionLabel>{label}</SectionLabel>}
          <SectionTitle>{heading}</SectionTitle>
          {subtitle && <SectionIntro>{subtitle}</SectionIntro>}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, i) => (
            <div key={item.title} className="relative bg-white rounded-xl border border-[rgba(82,89,93,0.1)] p-6 card-lift overflow-hidden">
              <span className="absolute top-3 right-4 font-['Sofia_Sans_Condensed',sans-serif] text-[56px] font-[900] leading-none text-[rgba(82,89,93,0.06)] select-none">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#F26A21] rounded-tl-xl" />
              <span className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#F26A21] rounded-br-xl" />
              <h4 className="font-['Sofia_Sans_Condensed',sans-serif] text-[18px] font-[800] text-[#52595D] tracking-[0.04em] uppercase mb-2 relative z-10 leading-[1.2]">
                {item.title}
              </h4>
              {item.text && (
                <p className="text-[16px] text-[#52595D] leading-[1.55] m-0 relative z-10">{item.text}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ComparisonTableSection({
  label,
  heading,
  subtitle,
  columns,
  rows,
}: {
  label?: string;
  heading: string;
  subtitle?: string;
  columns: [string, string, string];
  rows: { criterion: string; left: string; right: string }[];
}) {
  const [criterionLabel, leftLabel, rightLabel] = columns;

  return (
    <section className="py-20 bg-[#F4F4F2]">
      <div className="section-wrap">
        <div className="mb-10">
          {label && <SectionLabel>{label}</SectionLabel>}
          <SectionTitle>{heading}</SectionTitle>
          {subtitle && <SectionIntro>{subtitle}</SectionIntro>}
        </div>

        <div className="rounded-xl border border-[rgba(82,89,93,0.1)] bg-white shadow-[0_8px_32px_rgba(0,0,0,0.06)] overflow-hidden">
          <div className="overflow-x-auto [-webkit-overflow-scrolling:touch]">
            <table className="w-full min-w-[720px] border-collapse text-left">
              <thead>
                <tr className="bg-[#52595D] text-white">
                  <th
                    scope="col"
                    className="px-5 py-4 font-['Sofia_Sans_Condensed',sans-serif] text-[14px] font-[800] tracking-[0.08em] uppercase min-w-[180px]"
                  >
                    {criterionLabel}
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-4 font-['Sofia_Sans_Condensed',sans-serif] text-[14px] font-[800] tracking-[0.08em] uppercase min-w-[240px] border-l border-white/10"
                  >
                    {leftLabel}
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-4 font-['Sofia_Sans_Condensed',sans-serif] text-[14px] font-[800] tracking-[0.08em] uppercase min-w-[240px] border-l border-white/10"
                  >
                    {rightLabel}
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, index) => (
                  <tr
                    key={row.criterion}
                    className={`border-b border-[rgba(82,89,93,0.08)] last:border-b-0 ${
                      index % 2 === 1 ? "bg-[#F4F4F2]/50" : "bg-white"
                    }`}
                  >
                    <th
                      scope="row"
                      className="px-5 py-4 align-top font-['Sofia_Sans_Condensed',sans-serif] text-[15px] font-[800] tracking-[0.03em] uppercase text-[#52595D] leading-[1.35]"
                    >
                      {row.criterion}
                    </th>
                    <td className="px-5 py-4 align-top text-[16px] text-[#52595D] leading-[1.65] border-l border-[rgba(82,89,93,0.08)]">
                      {row.left}
                    </td>
                    <td className="px-5 py-4 align-top text-[16px] text-[#52595D]/90 leading-[1.65] border-l border-[rgba(82,89,93,0.08)]">
                      {row.right}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ArticleSection({
  label,
  heading,
  paragraphs,
  bullets,
  variant = "white",
}: {
  label?: string;
  heading: string;
  paragraphs: string[];
  bullets?: string[];
  variant?: "white" | "muted";
}) {
  const bg = variant === "muted" ? "bg-[#F4F4F2]" : "bg-white";
  const layout = pickArticleLayout(paragraphs, bullets);
  const hasIntro = layout !== "para-duo-full" && paragraphs.length > 0;
  const intro = hasIntro ? paragraphs[0] : null;
  const bodyParagraphs = hasIntro ? paragraphs.slice(1) : paragraphs;

  return (
    <section className={`py-20 ${bg}`}>
      <div className="section-wrap">
        <div className="mb-10">
          {label && <SectionLabel>{label}</SectionLabel>}
          <SectionTitle>{heading}</SectionTitle>
          {intro && <SectionIntro>{intro}</SectionIntro>}
        </div>

        {layout === "para-duo-full" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {paragraphs.map((p, i) => (
              <InfoCard key={i} accent="left">
                <p className="text-[17px] text-[#52595D] leading-[1.7] m-0">{p}</p>
              </InfoCard>
            ))}
          </div>
        )}

        {layout === "bullet-grid" && bullets && bullets.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {bullets.map((item, i) => (
              <InfoCard key={i} accent="corner">
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#F26A21] text-white font-['Sofia_Sans_Condensed',sans-serif] font-[800] text-[14px] flex items-center justify-center">
                    {i + 1}
                  </span>
                  <p className="text-[17px] text-[#52595D] leading-[1.6] m-0 pt-0.5">{item}</p>
                </div>
              </InfoCard>
            ))}
          </div>
        )}

        {layout === "mixed" && (
          <div className="flex flex-col gap-6">
            {bodyParagraphs.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {bodyParagraphs.map((p, i) => (
                  <InfoCard key={i} accent="left">
                    <p className="text-[17px] text-[#52595D] leading-[1.7] m-0">{p}</p>
                  </InfoCard>
                ))}
              </div>
            )}
            {bullets && bullets.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {bullets.map((item, i) => (
                  <div key={i} className="flex items-start gap-3 bg-white rounded-lg border border-[rgba(82,89,93,0.08)] p-4">
                    <span className="text-[#F26A21] font-bold flex-shrink-0">✓</span>
                    <span className="text-[17px] text-[#52595D] leading-[1.6]">{item}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {layout === "para-grid" && bodyParagraphs.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {bodyParagraphs.map((p, i) => (
              <InfoCard key={i} accent={i === 0 ? "left" : "corner"}>
                <p className="text-[17px] text-[#52595D] leading-[1.7] m-0">{p}</p>
              </InfoCard>
            ))}
          </div>
        )}

        {layout === "single" && bullets && bullets.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-[900px]">
            {bullets.map((item, i) => (
              <div key={i} className="flex items-start gap-3 bg-[#F4F4F2] rounded-lg p-4">
                <span className="text-[#F26A21] font-bold flex-shrink-0">✓</span>
                <span className="text-[17px] text-[#52595D] leading-[1.6]">{item}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export function ChecklistPanelSection({
  heading,
  intro,
  items,
  variant = "muted",
}: {
  heading: string;
  intro?: string;
  items: string[];
  variant?: "white" | "muted";
}) {
  const bg = variant === "muted" ? "bg-[#F4F4F2]" : "bg-white";
  return (
    <section className={`py-20 ${bg}`}>
      <div className="section-wrap">
        <div className="mb-10">
          <SectionTitle>{heading}</SectionTitle>
          {intro && <SectionIntro>{intro}</SectionIntro>}
        </div>
        <ul className="list-none m-0 p-0 grid grid-cols-1 md:grid-cols-2 gap-4">
          {items.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-[17px] text-[#52595D] leading-[1.6] bg-white rounded-xl border border-[rgba(82,89,93,0.1)] p-5 card-lift">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#F26A21] text-white font-['Sofia_Sans_Condensed',sans-serif] font-[800] text-[14px] flex items-center justify-center">
                {i + 1}
              </span>
              <span className="pt-1">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function HighlightBoxSection({ heading, items }: { heading: string; items: string[] }) {
  return (
    <section className="py-20 bg-[#F4F4F2]">
      <div className="section-wrap">
        <div className="mb-10">
          <SectionTitle>{heading}</SectionTitle>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((item, i) => (
            <div key={i} className="bg-white rounded-xl border border-[rgba(82,89,93,0.1)] p-6 card-lift flex items-start gap-3">
              <span className="flex-shrink-0 w-9 h-9 rounded-lg bg-[#F26A21]/10 text-[#F26A21] font-['Sofia_Sans_Condensed',sans-serif] font-[800] text-[18px] flex items-center justify-center">
                ✓
              </span>
              <p className="text-[17px] text-[#52595D] leading-[1.6] m-0">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function RelatedServicesSection({
  locale,
  heading,
  items,
}: {
  locale: string;
  heading: string;
  items: { title: string; href: string }[];
}) {
  return (
    <section className="py-16 bg-white border-t border-[rgba(82,89,93,0.1)]">
      <div className="section-wrap">
        <SectionLabel>{heading}</SectionLabel>
        <div className="flex flex-wrap gap-3 mt-4">
          {items.map((item) => (
            <Link
              key={item.href}
              href={`/${locale}${item.href}`}
              className="inline-flex items-center gap-2 bg-[#F4F4F2] hover:bg-[#F26A21] hover:text-white text-[#52595D] font-['Sofia_Sans_Condensed',sans-serif] text-[15px] font-[700] tracking-[0.06em] uppercase px-5 py-2.5 rounded-xl border border-[rgba(82,89,93,0.12)] no-underline transition-colors"
            >
              {item.title}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function PageCtaSection({ locale }: { locale: string }) {
  const copy = pickLocale(locale, {
    bg: {
      ready: "Готови сте за ",
      accent: "персонална оферта?",
      sub: "Свържете се с нас за консултация или оферта.",
      quote: "Поискай оферта",
      contacts: "Контакти",
    },
    en: {
      ready: "Ready for ",
      accent: "a personalized quote?",
      sub: "Contact us and we will respond within the working day.",
      quote: "Request a Quote",
      contacts: "Contacts",
    },
    ru: {
      ready: "Готовы к ",
      accent: "персональному предложению?",
      sub: "Свяжитесь с нами для консультации или расчёта стоимости.",
      quote: "Запросить предложение",
      contacts: "Контакты",
    },
  });
  return (
    <section
      className="py-16"
      style={{
        background: "linear-gradient(90deg,#2a2f33 0%,#353a3e 30%,#3a4044 50%,#2a2f33 100%)",
      }}
    >
      <div className="section-wrap flex flex-col items-center text-center md:flex-row md:items-center md:justify-between md:text-left gap-6">
        <div>
          <p className="font-['Sofia_Sans_Condensed',sans-serif] text-[clamp(24px,3vw,32px)] font-[800] text-white m-0 leading-[1.2]">
            {copy.ready}
            <span className="text-[#F26A21]">{copy.accent}</span>
          </p>
          <p className="text-white/70 text-[17px] mt-2 mb-0 max-w-[480px] mx-auto md:mx-0">
            {copy.sub}
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5 shrink-0">
          <button
            type="button"
            className="bg-[#F26A21] text-white font-['Sofia_Sans_Condensed',sans-serif] text-[14px] font-bold tracking-[0.06em] uppercase px-5 py-2.5 rounded-lg border-2 border-[#F26A21] transition-all hover:bg-[#d45a18] hover:border-[#d45a18] cursor-pointer js-inquiry-trigger"
            data-inquiry
          >
            {copy.quote}
          </button>
          <Link
            href={`/${locale}/contacts`}
            className="inline-flex items-center bg-white/12 text-white font-['Sofia_Sans_Condensed',sans-serif] text-[14px] font-bold tracking-[0.06em] uppercase px-5 py-2.5 rounded-lg border-2 border-white/28 no-underline transition-all hover:bg-white/20"
          >
            {copy.contacts}
          </Link>
        </div>
      </div>
    </section>
  );
}
