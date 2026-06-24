import Image from "next/image";
import Link from "next/link";
import { getTransportServiceIcon } from "@/lib/pages/service-icons";
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
  const src = getTransportServiceIcon(href);
  if (!src) return null;
  return <Image src={src} alt="" width={size} height={size} className="object-contain" />;
}

function RowChevron({ className = "" }: { className?: string }) {
  return (
    <span className={`text-[#F26A21] transition-colors group-hover:text-[#d45a18] ${className}`} aria-hidden="true">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="sm:h-7 sm:w-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
      </svg>
    </span>
  );
}

export function SubServicesSection({
  locale,
  label,
  heading,
  items,
}: {
  locale: string;
  label?: string;
  heading: string;
  items: SubServiceItem[];
}) {
  return (
    <section className="bg-[#F4F4F2] py-20">
      <div className="section-wrap">
        <div className="mb-12">
          {label && <SectionLabel>{label}</SectionLabel>}
          <SectionTitle>{heading}</SectionTitle>
        </div>

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
      </div>
    </section>
  );
}
