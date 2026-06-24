import Image from "next/image";

export default function PageHero({
  label,
  title,
  subtitle,
  image,
}: {
  label: string;
  title: string;
  subtitle?: string;
  image?: string;
}) {
  return (
    <section className="relative min-h-[420px] flex items-end overflow-hidden pt-[72px]">
      {image && (
        <div className="absolute inset-0 z-0">
          <Image src={image} alt="" fill className="object-cover object-center" priority sizes="100vw" />
        </div>
      )}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background: image
            ? "linear-gradient(105deg, rgba(26,30,33,0.92) 0%, rgba(26,30,33,0.78) 55%, rgba(26,30,33,0.55) 100%)"
            : "linear-gradient(90deg,#2a2f33 0%,#353a3e 16%,#3a4044 30%,#353a3e 52%,#2a2f33 72%,#23282b 86%,#1a1e21 100%)",
        }}
      />
      <div className="relative z-10 max-w-[1280px] mx-auto px-8 w-full py-20">
        <div className="inline-flex items-center gap-2.5 font-['Sofia_Sans_Condensed',sans-serif] text-[14px] font-[700] tracking-[0.18em] uppercase text-[#F26A21] mb-4">
          <span className="block w-5 h-px bg-[#F26A21]" />
          {label}
        </div>
        <h1 className="font-['Sofia_Sans_Condensed',sans-serif] text-[clamp(36px,6vw,64px)] font-[800] leading-[1.08] tracking-[0.02em] text-white mb-4 max-w-[900px]">
          {title}
        </h1>
        {subtitle && (
          <>
            <span className="block w-20 h-0.5 mb-5" style={{ background: "linear-gradient(to right, #F26A21 0%, transparent 100%)" }} />
            <p className="text-[19px] text-white/80 max-w-[640px] leading-[1.65] m-0">{subtitle}</p>
          </>
        )}
      </div>
    </section>
  );
}
