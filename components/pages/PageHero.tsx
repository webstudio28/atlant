import Image from "next/image";

export default function PageHero({
  label,
  title,
  subtitle,
  image,
  compact = false,
}: {
  label: string;
  title: string;
  subtitle?: string;
  image?: string;
  compact?: boolean;
}) {
  const content = (
    <>
      {!compact && (
        <div className="inline-flex items-center gap-2.5 font-['Sofia_Sans_Condensed',sans-serif] text-[14px] font-[700] tracking-[0.18em] uppercase text-[#F26A21] mb-4">
          <span className="block w-5 h-px bg-[#F26A21]" />
          {label}
        </div>
      )}
      <h1
        className={`font-['Sofia_Sans_Condensed',sans-serif] font-[800] leading-[1.08] tracking-[0.02em] text-white max-w-[900px] [text-shadow:0_1px_12px_rgba(0,0,0,0.35)] ${
          compact
            ? "text-[clamp(32px,5vw,56px)] mb-0"
            : "text-[clamp(36px,6vw,64px)] mb-4"
        }`}
      >
        {title}
      </h1>
      {subtitle && (
        <>
          {!compact && (
            <span
              className="block w-20 h-0.5 mb-5"
              style={{ background: "linear-gradient(to right, #F26A21 0%, transparent 100%)" }}
            />
          )}
          <p
            className={`text-white/80 max-w-[640px] leading-[1.65] m-0 [text-shadow:0_1px_8px_rgba(0,0,0,0.3)] ${
              compact ? "mt-3 text-[15px] md:text-[16px]" : "text-[19px]"
            }`}
          >
            {subtitle}
          </p>
        </>
      )}
    </>
  );

  return (
    <section
      className={
        compact
          ? "relative min-h-[min(320px,50vh)] md:min-h-[340px]"
          : "relative flex min-h-[min(420px,70vh)] items-center md:min-h-[460px]"
      }
    >
      {image && (
        <div className="absolute inset-0 z-0 overflow-hidden">
          <Image src={image} alt="" fill className="object-cover object-center" priority sizes="100vw" />
        </div>
      )}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background: image
            ? compact
              ? "linear-gradient(105deg, rgba(26,30,33,0.78) 0%, rgba(26,30,33,0.62) 55%, rgba(26,30,33,0.46) 100%)"
              : "linear-gradient(105deg, rgba(26,30,33,0.92) 0%, rgba(26,30,33,0.78) 55%, rgba(26,30,33,0.55) 100%)"
            : "linear-gradient(90deg,#2a2f33 0%,#353a3e 16%,#3a4044 30%,#353a3e 52%,#2a2f33 72%,#23282b 86%,#1a1e21 100%)",
        }}
      />
      {compact ? (
        <div
          className="absolute inset-x-0 bottom-0 z-10 flex items-center pb-5 min-[900px]:pb-7"
          style={{ top: "var(--site-header-h)" }}
        >
          <div className="section-wrap w-full -translate-y-1 min-[900px]:-translate-y-1.5">{content}</div>
        </div>
      ) : (
        <div className="relative z-10 section-wrap w-full py-10 pt-[88px] md:py-14 md:pt-[104px]">{content}</div>
      )}
    </section>
  );
}
