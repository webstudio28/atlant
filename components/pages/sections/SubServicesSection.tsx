import Image from "next/image";
import Link from "next/link";
import { getServiceIcon } from "@/lib/pages/service-icons";
import { SectionLabel, SectionTitle } from "./PageSections";

export type SubServiceItem = {
  title: string;
  lines: string[];
  href?: string;
};

function localeHref(locale: string, href?: string) {
  return href ? `/${locale}${href}` : undefined;
}

function ServiceIcon({ href, size = 72 }: { href?: string; size?: number }) {
  const src = getServiceIcon(href);
  if (!src) return null;
  return <Image src={src} alt="" width={size} height={size} className="object-contain" />;
}

function RowChevron({ className = "", size = 22 }: { className?: string; size?: number }) {
  return (
    <span className={`text-[#F26A21] transition-colors group-hover:text-[#d45a18] ${className}`} aria-hidden="true">
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
      </svg>
    </span>
  );
}

function SubServiceRows({ locale, items }: { locale: string; items: SubServiceItem[] }) {
  return (
    <div className="flex flex-col gap-4">
      {items.map((item) => {
        const row = (
          <div className="group relative flex items-start gap-4 rounded-xl border border-[rgba(82,89,93,0.1)] bg-white p-5 card-lift sm:items-center sm:gap-8 sm:p-6">
            <div className="flex h-[72px] w-[72px] shrink-0 items-center justify-center rounded-xl bg-[#F4F4F2] sm:h-[88px] sm:w-[88px]">
              <ServiceIcon href={item.href} />
            </div>
            <div className="min-w-0 flex-1 pr-6 pb-6 sm:pr-0 sm:pb-0">
              <h3 className="mb-1 font-['Sofia_Sans_Condensed',sans-serif] text-[22px] font-[800] tracking-[0.04em] text-[#F26A21] uppercase">
                {item.title}
              </h3>
              <div className="flex flex-wrap gap-x-3 gap-y-0.5">
                {item.lines.map((line, j) => (
                  <p key={j} className="m-0 text-[16px] leading-[1.45] text-[#52595D]/90">
                    {line}
                  </p>
                ))}
              </div>
            </div>
            {item.href && (
              <>
                <RowChevron className="absolute bottom-4 right-4 sm:hidden" />
                <RowChevron className="hidden shrink-0 sm:block" />
              </>
            )}
          </div>
        );
        const href = localeHref(locale, item.href);
        return href ? (
          <Link key={item.title} href={href} className="no-underline">
            {row}
          </Link>
        ) : (
          <div key={item.title}>{row}</div>
        );
      })}
    </div>
  );
}

function SubServiceMinimalCards({ locale, items }: { locale: string; items: SubServiceItem[] }) {
  return (
    <div className="sub-services-scroll no-scrollbar -mx-4 overflow-x-auto overscroll-x-contain px-4 pb-1 md:mx-0 md:overflow-visible md:px-0 md:pb-0">
      <div className="flex w-max gap-3 md:w-full md:grid md:grid-cols-2 md:gap-4 lg:grid-cols-3">
        {items.map((item) => {
          const card = (
            <div className="group flex h-full w-[min(72vw,220px)] flex-col gap-2.5 rounded-lg border border-[rgba(82,89,93,0.12)] bg-white p-4 transition-colors hover:border-[#F26A21]/35 md:w-auto">
              <div className="flex items-center justify-between gap-2">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center">
                  <ServiceIcon href={item.href} size={36} />
                </div>
                {item.href && <RowChevron className="shrink-0 opacity-80" size={18} />}
              </div>
              <h3 className="m-0 font-['Sofia_Sans_Condensed',sans-serif] text-[16px] font-[800] leading-[1.15] tracking-[0.03em] text-[#52595D] uppercase transition-colors group-hover:text-[#F26A21]">
                {item.title}
              </h3>
              {item.lines.length > 0 && (
                <div className="mt-auto flex flex-col gap-0.5">
                  {item.lines.map((line, j) => (
                    <p key={j} className="m-0 text-[13px] leading-[1.4] text-[#52595D]/75">
                      {line}
                    </p>
                  ))}
                </div>
              )}
            </div>
          );
          const href = localeHref(locale, item.href);
          return href ? (
            <Link key={item.title} href={href} className="no-underline">
              {card}
            </Link>
          ) : (
            <div key={item.title}>{card}</div>
          );
        })}
      </div>
    </div>
  );
}

export function SubServicesSection({
  locale,
  label,
  heading,
  items,
  variant = "rows",
}: {
  locale: string;
  label?: string;
  heading: string;
  items: SubServiceItem[];
  variant?: "rows" | "minimal";
}) {
  return (
    <section
      className={`py-20 ${variant === "minimal" ? "bg-[#E9E5DF]" : "bg-[#F4F4F2]"}`}
    >
      <div className="section-wrap">
        <div className="mb-10 md:mb-12">
          {label && <SectionLabel>{label}</SectionLabel>}
          <SectionTitle>{heading}</SectionTitle>
        </div>

        {variant === "minimal" ? (
          <SubServiceMinimalCards locale={locale} items={items} />
        ) : (
          <SubServiceRows locale={locale} items={items} />
        )}
      </div>
    </section>
  );
}
