import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { NAV_SERVICE_LINKS } from "@/lib/pages/registry";

interface ServiceItem {
  id: number;
  labelBg: string;
  labelEn: string;
  displayOrder: number;
}

interface Service {
  id: number;
  slug: string;
  titleBg: string;
  titleEn: string;
  descriptionBg: string;
  descriptionEn: string;
  imagePath: string;
  imageAltBg: string;
  imageAltEn: string;
  displayOrder: number;
  items: ServiceItem[];
}

export default function Services({
  services,
  locale,
}: {
  services: Service[];
  locale: string;
}) {
  const t = useTranslations("services");
  const tNav = useTranslations("nav");
  const isBg = locale === "bg";

  return (
    <section id="services">
      <div className="section-wrap">
        <div className="section-intro">
          <div className="section-label">{t("label")}</div>
          <h2>{t("title")}</h2>
          <p>{t("subtitle")}</p>
        </div>

        <div className="services-scroll">
          <div className="services-grid">
            {services.map((service) => {
              const title = isBg ? service.titleBg : service.titleEn;
              const description = isBg ? service.descriptionBg : service.descriptionEn;
              const imageAlt = isBg ? service.imageAltBg : service.imageAltEn;
              const navGroup = NAV_SERVICE_LINKS[service.slug as keyof typeof NAV_SERVICE_LINKS];
              const mainHref = navGroup ? `/${locale}/${navGroup.main.join("/")}` : null;

              const navItems = navGroup?.items ?? [];

              return (
                <article
                  key={service.id}
                  id={`service-${service.slug}`}
                  className="service-card card-lift"
                >
                  {mainHref ? (
                    <Link href={mainHref} className="service-card-img-wrap">
                      <Image
                        src={service.imagePath}
                        alt={imageAlt}
                        width={800}
                        height={600}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </Link>
                  ) : (
                    <div className="service-card-img-wrap">
                      <Image
                        src={service.imagePath}
                        alt={imageAlt}
                        width={800}
                        height={600}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  )}

                  <div className="service-card-body">
                    <h3>
                      {mainHref ? <Link href={mainHref}>{title}</Link> : title}
                    </h3>
                    <p className="service-card-desc">{description}</p>
                    <ul className="service-subs">
                      {service.items.map((item, index) => {
                        const navItem = navItems[index];
                        const itemHref = navItem
                          ? `/${locale}/${navItem.href.join("/")}`
                          : null;
                        const label = isBg ? item.labelBg : item.labelEn;

                        return (
                          <li key={item.id}>
                            {itemHref ? <Link href={itemHref}>{label}</Link> : label}
                          </li>
                        );
                      })}
                    </ul>
                    {mainHref && (
                      <Link href={mainHref} className="service-card-see-all">
                        {tNav("seeAll")}
                      </Link>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
