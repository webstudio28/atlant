import { useTranslations } from "next-intl";
import Image from "next/image";

const BENEFIT_ICONS = [
  "/images/ekspeditivnost.webp",
  "/images/support.webp",
  "/images/sigurnost.webp",
  "/images/pricing.webp",
];

export default function WhyUs() {
  const t = useTranslations("why");

  const benefits = [
    { title: t("benefit1Title"), text: t("benefit1Text"), icon: BENEFIT_ICONS[0] },
    { title: t("benefit2Title"), text: t("benefit2Text"), icon: BENEFIT_ICONS[1] },
    { title: t("benefit3Title"), text: t("benefit3Text"), icon: BENEFIT_ICONS[2] },
    { title: t("benefit4Title"), text: t("benefit4Text"), icon: BENEFIT_ICONS[3] },
  ];

  return (
    <section id="why" className="bg-[#F4F4F2] py-24">
      <div className="max-w-[1280px] mx-auto px-8">
        {/* Section header */}
        <div className="mb-14">
          <div className="inline-flex items-center gap-2.5 font-['Sofia_Sans_Condensed',sans-serif] text-[14px] font-[700] tracking-[0.18em] uppercase text-[#F26A21] mb-3">
            {t("label")}
          </div>
          <h2 className="font-['Sofia_Sans_Condensed',sans-serif] text-[clamp(32px,4vw,44px)] font-[800] text-[#52595D] tracking-[0.02em] mb-3">
            {t("title")}
          </h2>
          <p className="text-[19px] text-[#52595D] max-w-[500px] m-0 leading-[1.6]">
            {t("subtitle")}
          </p>
          <span className="fade-line-sm mt-4" />
        </div>

        {/* Benefits grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, i) => (
            <div
              key={benefit.title}
              className="relative bg-white rounded-xl border border-[rgba(82,89,93,0.1)] p-6 card-lift overflow-hidden"
            >
              {/* Number decoration */}
              <span className="absolute top-3 right-4 font-['Sofia_Sans_Condensed',sans-serif] text-[56px] font-[900] leading-[1] text-[rgba(82,89,93,0.06)] select-none pointer-events-none">
                {String(i + 1).padStart(2, "0")}
              </span>
              {/* Corner decorations */}
              <span className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#F26A21] rounded-tl-xl" />
              <span className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#F26A21] rounded-br-xl" />

              <div className="relative z-10 flex flex-col gap-3">
                {/* Icon */}
                <div className="w-[56px] h-[56px] rounded-xl overflow-hidden bg-[#F4F4F2] flex items-center justify-center">
                  <Image
                    src={benefit.icon}
                    alt={benefit.title}
                    width={56}
                    height={56}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div>
                  <h4 className="font-['Sofia_Sans_Condensed',sans-serif] text-[20px] font-[800] text-[#52595D] tracking-[0.04em] uppercase mb-1.5 leading-[1.2]">
                    {benefit.title}
                  </h4>
                  <p className="text-[16px] text-[#52595D] leading-[1.55] m-0">
                    {benefit.text}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
