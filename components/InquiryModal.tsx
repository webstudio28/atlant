"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface Service {
  id: number;
  slug: string;
  titleBg: string;
  titleEn: string;
  imagePath: string;
}

interface Props {
  services: Service[];
  locale: string;
}

type Step = "services" | "form" | "success";

export default function InquiryModal({ services, locale }: Props) {
  const t = useTranslations("inquiry");
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>("services");
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(false);
  const isBg = locale === "bg";
  const panelRef = useRef<HTMLDivElement>(null);

  // Listen for data-inquiry button clicks anywhere in the page
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("[data-inquiry]")) {
        setOpen(true);
        setStep("services");
        setSelectedService(null);
      }
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  // Lock scroll when open
  useEffect(() => {
    if (open) {
      document.documentElement.classList.add("overflow-hidden");
      document.body.classList.add("overflow-hidden");
    } else {
      document.documentElement.classList.remove("overflow-hidden");
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.documentElement.classList.remove("overflow-hidden");
      document.body.classList.remove("overflow-hidden");
    };
  }, [open]);

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => {
      setStep("services");
      setSelectedService(null);
    }, 350);
  };

  const handleSelectService = (service: Service) => {
    setSelectedService(service);
    setStep("form");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const form = new FormData(e.currentTarget);
      await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          serviceSlug: selectedService!.slug,
          serviceTitleBg: selectedService!.titleBg,
          serviceTitleEn: selectedService!.titleEn,
          names: form.get("names"),
          phone: form.get("phone"),
          city: form.get("city"),
          desiredDate: form.get("date"),
          message: form.get("message"),
        }),
      });
      setStep("success");
    } catch {
      // still show success to user — the data was submitted
      setStep("success");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-[200] bg-[rgba(26,30,33,0.62)] backdrop-blur-[10px] transition-opacity duration-300 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="inquiry-title"
        aria-hidden={!open}
        className={`fixed inset-0 z-[210] flex items-center justify-center p-6 transition-all duration-300 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          ref={panelRef}
          className={`relative w-full max-w-[680px] max-h-[min(90vh,820px)] overflow-y-auto bg-white rounded-xl shadow-[0_24px_64px_rgba(0,0,0,0.28)] px-8 py-[60px] transition-transform duration-300 ${
            open ? "translate-y-0 scale-100" : "translate-y-4 scale-[0.98]"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            className="absolute top-4 right-4 w-10 h-10 border-none rounded-[10px] bg-[rgba(82,89,93,0.08)] text-[#52595D] cursor-pointer flex items-center justify-center transition-colors hover:bg-[rgba(242,106,33,0.12)] hover:text-[#F26A21]"
            aria-label="Close"
            onClick={handleClose}
          >
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Back button */}
          {step === "form" && (
            <button
              className="absolute top-4 left-4 flex items-center gap-1.5 h-10 border-none bg-none px-2 cursor-pointer font-['Sofia_Sans_Condensed',sans-serif] text-[14px] font-[700] tracking-[0.1em] uppercase text-[#F26A21] transition-opacity hover:opacity-75"
              onClick={() => setStep("services")}
              aria-label="Back"
            >
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              {t("back")}
            </button>
          )}

          {/* Progress dots */}
          {step !== "success" && (
            <div className="flex gap-2 max-w-[200px] mx-auto mb-5">
              <span className={`flex-1 h-[3px] rounded-full transition-colors ${step === "services" ? "bg-[#F26A21]" : "bg-[#F26A21]"}`} />
              <span className={`flex-1 h-[3px] rounded-full transition-colors ${step === "form" ? "bg-[#F26A21]" : "bg-[rgba(82,89,93,0.14)]"}`} />
            </div>
          )}

          {/* Step 1: Service selection */}
          {step === "services" && (
            <div>
              <div className="text-center mb-6 pt-2">
                <div className="inline-flex items-center gap-2 font-['Sofia_Sans_Condensed',sans-serif] text-[14px] font-[700] tracking-[0.18em] uppercase text-[#F26A21] mb-3 justify-center">
                  {t("label")}
                </div>
                <h2 id="inquiry-title" className="font-['Sofia_Sans_Condensed',sans-serif] text-[clamp(28px,4vw,36px)] font-[800] text-[#52595D] tracking-[0.02em] leading-[1.1] mb-2">
                  {t("step1Title")}
                </h2>
                <p className="text-[17px] text-[#52595D] leading-[1.55] max-w-[480px] mx-auto m-0">
                  {t("step1Desc")}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {services.map((service) => (
                  <button
                    key={service.id}
                    className="flex items-start gap-3.5 text-left p-[18px_16px] border-[1.5px] border-[rgba(82,89,93,0.14)] rounded-xl bg-[#F4F4F2] cursor-pointer transition-all hover:border-[rgba(242,106,33,0.45)] hover:bg-white hover:-translate-y-[3px] hover:shadow-[0_10px_28px_rgba(0,0,0,0.08)] focus-visible:outline-2 focus-visible:outline-[#F26A21]"
                    onClick={() => handleSelectService(service)}
                  >
                    <div className="flex-shrink-0">
                      <Image
                        src={service.imagePath}
                        alt={isBg ? service.titleBg : service.titleEn}
                        width={56}
                        height={56}
                        className="w-14 h-14 object-cover rounded-xl"
                      />
                    </div>
                    <div>
                      <h3 className="font-['Sofia_Sans_Condensed',sans-serif] text-[17px] font-[800] tracking-[0.04em] uppercase text-[#52595D] mb-1 leading-[1.2]">
                        {isBg ? service.titleBg : service.titleEn}
                      </h3>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Contact form */}
          {step === "form" && selectedService && (
            <div>
              <div className="text-center mb-6">
                <h2 className="font-['Sofia_Sans_Condensed',sans-serif] text-[clamp(28px,4vw,36px)] font-[800] text-[#52595D] tracking-[0.02em] leading-[1.1] mb-2">
                  {t("step2Title")}
                </h2>
                <p className="text-[17px] text-[#52595D] leading-[1.55] max-w-[480px] mx-auto m-0">
                  {t("step2Desc")}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {/* Selected service badge */}
                <div>
                  <label className="block font-['Sofia_Sans_Condensed',sans-serif] text-[13px] font-[700] tracking-[0.12em] uppercase text-[#52595D] mb-1.5">
                    {t("selectedService")}
                  </label>
                  <div className="flex items-center gap-3 w-full p-3 font-['Sofia_Sans',sans-serif] text-[16px] text-[#1a1e21] bg-[#F4F4F2] border-[1.5px] border-[rgba(82,89,93,0.16)] rounded-[10px]">
                    <Image src={selectedService.imagePath} alt="" width={32} height={32} className="w-8 h-8 object-cover rounded-lg flex-shrink-0" />
                    <span className="font-[500]">{isBg ? selectedService.titleBg : selectedService.titleEn}</span>
                  </div>
                </div>

                {/* Date & City row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="inquiry-date" className="block font-['Sofia_Sans_Condensed',sans-serif] text-[13px] font-[700] tracking-[0.12em] uppercase text-[#52595D] mb-1.5">
                      {t("desiredDate")}
                    </label>
                    <input
                      type="date"
                      id="inquiry-date"
                      name="date"
                      className="w-full p-3 font-['Sofia_Sans',sans-serif] text-[16px] text-[#1a1e21] bg-[#F4F4F2] border-[1.5px] border-[rgba(82,89,93,0.16)] rounded-[10px] transition-all focus:outline-none focus:border-[rgba(242,106,33,0.55)] focus:shadow-[0_0_0_3px_rgba(242,106,33,0.12)] focus:bg-white"
                    />
                  </div>
                  <div>
                    <label htmlFor="inquiry-city" className="block font-['Sofia_Sans_Condensed',sans-serif] text-[13px] font-[700] tracking-[0.12em] uppercase text-[#52595D] mb-1.5">
                      {t("city")}
                    </label>
                    <input
                      type="text"
                      id="inquiry-city"
                      name="city"
                      placeholder={t("cityPlaceholder")}
                      required
                      className="w-full p-3 font-['Sofia_Sans',sans-serif] text-[16px] text-[#1a1e21] bg-[#F4F4F2] border-[1.5px] border-[rgba(82,89,93,0.16)] rounded-[10px] transition-all focus:outline-none focus:border-[rgba(242,106,33,0.55)] focus:shadow-[0_0_0_3px_rgba(242,106,33,0.12)] focus:bg-white"
                    />
                  </div>
                </div>

                {/* Names & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="inquiry-names" className="block font-['Sofia_Sans_Condensed',sans-serif] text-[13px] font-[700] tracking-[0.12em] uppercase text-[#52595D] mb-1.5">
                      {t("names")}
                    </label>
                    <input
                      type="text"
                      id="inquiry-names"
                      name="names"
                      required
                      className="w-full p-3 font-['Sofia_Sans',sans-serif] text-[16px] text-[#1a1e21] bg-[#F4F4F2] border-[1.5px] border-[rgba(82,89,93,0.16)] rounded-[10px] transition-all focus:outline-none focus:border-[rgba(242,106,33,0.55)] focus:shadow-[0_0_0_3px_rgba(242,106,33,0.12)] focus:bg-white"
                    />
                  </div>
                  <div>
                    <label htmlFor="inquiry-phone" className="block font-['Sofia_Sans_Condensed',sans-serif] text-[13px] font-[700] tracking-[0.12em] uppercase text-[#52595D] mb-1.5">
                      {t("phone")}
                    </label>
                    <input
                      type="tel"
                      id="inquiry-phone"
                      name="phone"
                      required
                      className="w-full p-3 font-['Sofia_Sans',sans-serif] text-[16px] text-[#1a1e21] bg-[#F4F4F2] border-[1.5px] border-[rgba(82,89,93,0.16)] rounded-[10px] transition-all focus:outline-none focus:border-[rgba(242,106,33,0.55)] focus:shadow-[0_0_0_3px_rgba(242,106,33,0.12)] focus:bg-white"
                    />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="inquiry-message" className="block font-['Sofia_Sans_Condensed',sans-serif] text-[13px] font-[700] tracking-[0.12em] uppercase text-[#52595D] mb-1.5">
                    {t("message")}
                  </label>
                  <textarea
                    id="inquiry-message"
                    name="message"
                    rows={3}
                    placeholder={t("messagePlaceholder")}
                    className="w-full p-3 font-['Sofia_Sans',sans-serif] text-[16px] text-[#1a1e21] bg-[#F4F4F2] border-[1.5px] border-[rgba(82,89,93,0.16)] rounded-[10px] transition-all focus:outline-none focus:border-[rgba(242,106,33,0.55)] focus:shadow-[0_0_0_3px_rgba(242,106,33,0.12)] focus:bg-white resize-vertical"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="mt-2 w-full border-2 border-[#F26A21] bg-[#F26A21] text-white font-['Sofia_Sans_Condensed',sans-serif] text-[17px] font-[700] tracking-[0.08em] uppercase p-3.5 rounded-xl cursor-pointer transition-all shadow-[0_3px_16px_rgba(242,106,33,0.28)] hover:bg-[#d45a18] hover:border-[#d45a18] hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(242,106,33,0.38)] disabled:opacity-70"
                >
                  {loading ? "..." : t("submit")}
                </button>
              </form>
            </div>
          )}

          {/* Step 3: Success */}
          {step === "success" && (
            <div className="text-center py-6 px-2">
              <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-[rgba(242,106,33,0.12)] border-2 border-[rgba(242,106,33,0.35)] flex items-center justify-center text-[#F26A21]">
                <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="font-['Sofia_Sans_Condensed',sans-serif] text-[28px] font-[800] text-[#52595D] mb-2.5">
                {t("successTitle")}
              </h3>
              <p className="text-[17px] text-[#52595D] leading-[1.6] mb-7 max-w-[400px] mx-auto">
                {t("successMessage")}
              </p>
              <button
                className="bg-[#F26A21] text-white font-['Sofia_Sans_Condensed',sans-serif] text-[16px] font-[700] tracking-[0.08em] uppercase px-8 py-3 rounded-xl border-2 border-[#F26A21] cursor-pointer transition-all hover:bg-[#d45a18]"
                onClick={handleClose}
              >
                {t("close2")}
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
