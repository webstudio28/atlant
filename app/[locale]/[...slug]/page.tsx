import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { getLocalizedContent } from "@/lib/pages/content";
import { HERO_IMAGES, getAllPageSlugs, resolvePage, usesCompactHero } from "@/lib/pages/registry";
import PageShell from "@/components/pages/PageShell";
import PageHero from "@/components/pages/PageHero";
import PageRenderer from "@/components/pages/PageRenderer";
import ContactPageContent from "@/components/pages/ContactPageContent";
import FaqPageContent from "@/components/pages/FaqPageContent";
import GalleryPhotoContent from "@/components/pages/GalleryPhotoContent";
import GalleryVideoContent from "@/components/pages/GalleryVideoContent";
import LegalPageContent from "@/components/pages/LegalPageContent";
import { db } from "@/db";
import { siteSettings } from "@/db/schema";
import { DEFAULT_OG_IMAGE, defaultOpenGraph, defaultTwitter } from "@/lib/site-metadata";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    getAllPageSlugs().map((slug) => ({
      locale,
      slug,
    }))
  );
}

async function getSettings() {
  const rows = await db.select().from(siteSettings);
  return Object.fromEntries(rows.map((r) => [r.key, r.value])) as Record<string, string>;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string[] }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const page = resolvePage(slug);
  if (!page) return {};

  if (page.kind === "content") {
    const content = getLocalizedContent(page.id, locale);
    if (!content) return {};
    return {
      title: content.meta.title,
      description: content.meta.description,
      alternates: {
        canonical: `/${locale}/${slug.join("/")}`,
        languages: { bg: `/bg/${slug.join("/")}`, en: `/en/${slug.join("/")}` },
      },
      openGraph: {
        ...defaultOpenGraph,
        title: content.meta.title,
        description: content.meta.description,
        locale: locale === "bg" ? "bg_BG" : "en_US",
        images: [DEFAULT_OG_IMAGE],
      },
      twitter: {
        ...defaultTwitter,
        title: content.meta.title,
        description: content.meta.description,
      },
    };
  }

  const titles: Record<string, { bg: string; en: string }> = {
    contact: { bg: "Контакти | Atlant Logistics", en: "Contacts | Atlant Logistics" },
    faq: { bg: "ЧЗВ | Atlant Logistics", en: "FAQ | Atlant Logistics" },
    "gallery-photo": { bg: "Галерия | Atlant Logistics", en: "Gallery | Atlant Logistics" },
    "gallery-video": { bg: "Видео | Atlant Logistics", en: "Video | Atlant Logistics" },
    "legal-privacy": { bg: "Политика за поверителност | Atlant Logistics", en: "Privacy Policy | Atlant Logistics" },
    "legal-terms": { bg: "Условия за ползване | Atlant Logistics", en: "Terms of Use | Atlant Logistics" },
  };

  const t = titles[page.kind] ?? titles.contact;
  const title = locale === "en" ? t.en : t.bg;
  return {
    title,
    alternates: {
      canonical: `/${locale}/${slug.join("/")}`,
      languages: { bg: `/bg/${slug.join("/")}`, en: `/en/${slug.join("/")}` },
    },
    openGraph: {
      ...defaultOpenGraph,
      title,
      locale: locale === "bg" ? "bg_BG" : "en_US",
      images: [DEFAULT_OG_IMAGE],
    },
    twitter: {
      ...defaultTwitter,
      title,
    },
  };
}

export default async function DynamicPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string[] }>;
}) {
  const { locale, slug } = await params;
  const page = resolvePage(slug);
  if (!page) notFound();

  const settings = await getSettings();

  let inner: React.ReactNode;

  switch (page.kind) {
    case "contact":
      inner = <ContactPageContent locale={locale} settings={settings} />;
      break;
    case "faq":
      inner = <FaqPageContent locale={locale} />;
      break;
    case "gallery-photo":
      inner = <GalleryPhotoContent locale={locale} />;
      break;
    case "gallery-video":
      inner = <GalleryVideoContent locale={locale} />;
      break;
    case "legal-privacy":
      inner = <LegalPageContent locale={locale} type="privacy" />;
      break;
    case "legal-terms":
      inner = <LegalPageContent locale={locale} type="terms" />;
      break;
    case "content": {
      const content = getLocalizedContent(page.id, locale);
      if (!content) notFound();
      const heroImage = HERO_IMAGES[page.id];
      inner = (
        <>
          <PageHero
            compact={usesCompactHero(page)}
            label={content.hero.label}
            title={content.hero.title}
            subtitle={content.hero.subtitle}
            image={heroImage}
          />
          <PageRenderer content={content} locale={locale} pageId={page.id} />
        </>
      );
      break;
    }
    default:
      notFound();
  }

  return <PageShell locale={locale}>{inner}</PageShell>;
}
