import Image from "next/image";
import { SectionLabel, SectionTitle } from "./PageSections";

export function IntroAccentSection({
  label,
  heading,
  paragraphs,
  image,
}: {
  label?: string;
  heading: string;
  paragraphs: string[];
  image?: string;
}) {
  if (!paragraphs.length) return null;

  return (
    <section className="bg-white py-20">
      <div className="section-wrap">
        <div className="mb-10">
          {label && <SectionLabel>{label}</SectionLabel>}
          <SectionTitle>{heading}</SectionTitle>
        </div>

        <div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-2 lg:gap-14">
          {image && (
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.12)] lg:order-2 lg:aspect-auto lg:h-full lg:min-h-0">
              <Image
                src={image}
                alt=""
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover object-center lg:object-bottom"
              />
            </div>
          )}
          <div className={`relative h-full rounded-xl border border-[rgba(82,89,93,0.1)] bg-[#F4F4F2] p-8 ${image ? "lg:order-1" : "lg:col-span-2"}`}>
            <span className="absolute top-6 bottom-6 left-0 w-1 rounded-r bg-[#F26A21]" />
            <div className="flex flex-col gap-6 pl-5">
              {paragraphs.map((p, i) => (
                <p
                  key={i}
                  className={`m-0 leading-[1.75] text-[#52595D] ${i === 0 ? "text-[19px] font-medium md:text-[20px]" : "text-[17px] text-[#52595D]/90"}`}
                >
                  {p}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
