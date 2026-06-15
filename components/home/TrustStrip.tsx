import { useTranslations } from "next-intl";

interface SiteSettings {
  company_since?: string;
  warehouse_area?: string;
  pallet_spaces?: string;
  certifications?: string;
}

export default function TrustStrip({ settings }: { settings: SiteSettings }) {
  const t = useTranslations("trust");
  const sinceYear = settings.company_since ? new Date().getFullYear() - parseInt(settings.company_since) : 20;

  return (
    <section
      id="trust"
      aria-label="Trust statistics"
      className="border-t border-[rgba(82,89,93,0.14)] border-b border-[rgba(82,89,93,0.14)] bg-[#EBECE9]"
    >
      <div className="max-w-[1280px] mx-auto px-8">
        <div className="flex flex-wrap items-center justify-between w-full gap-4 py-[22px] text-center">
          {/* Years */}
          <p className="flex flex-wrap items-center justify-center gap-0 m-0 font-['Sofia_Sans_Condensed',sans-serif] text-[21px] font-[600]">
            <strong className="text-[#3a4044]">{sinceYear}&nbsp;{t("yearsExperience")}</strong>
          </p>

          {/* Stats */}
          <p className="flex flex-wrap items-center justify-center gap-0 m-0 font-['Sofia_Sans_Condensed',sans-serif] text-[21px] font-[600] text-[#52595D]">
            <span className="flex flex-col items-center">
              <span className="text-[#F26A21] font-[700]">{settings.warehouse_area || "5 000 m²"}</span>
              <span className="text-[13px] font-[400] text-[#52595D]/70">{t("warehouseArea")}</span>
            </span>
            <span className="text-[rgba(82,89,93,0.45)] mx-4">·</span>
            <span className="flex flex-col items-center">
              <span className="text-[#F26A21] font-[700]">{settings.pallet_spaces || "10 000+"}</span>
              <span className="text-[13px] font-[400] text-[#52595D]/70">{t("palletSpaces")}</span>
            </span>
            <span className="text-[rgba(82,89,93,0.45)] mx-4">·</span>
            <span className="flex flex-col items-center">
              <span className="text-[#F26A21] font-[700]">{settings.certifications || "ISO 9001"}</span>
              <span className="text-[13px] font-[400] text-[#52595D]/70">{t("certification")}</span>
            </span>
            <span className="text-[rgba(82,89,93,0.45)] mx-4">·</span>
            <span className="flex flex-col items-center">
              <span className="text-[#F26A21] font-[700]">{t("national")}</span>
              <span className="text-[13px] font-[400] text-[#52595D]/70">{t("coverage")}</span>
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
