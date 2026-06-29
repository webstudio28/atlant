import type { Metadata } from "next";

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://atlant.bg";

export const DEFAULT_OG_IMAGE = {
  url: "/images/og-image.png",
  width: 614,
  height: 410,
  alt: "Atlant Logistics",
} as const;

export const defaultOpenGraph: NonNullable<Metadata["openGraph"]> = {
  type: "website",
  siteName: "Atlant Logistics",
  images: [DEFAULT_OG_IMAGE],
};

export const defaultTwitter: NonNullable<Metadata["twitter"]> = {
  card: "summary_large_image",
  images: [DEFAULT_OG_IMAGE.url],
};

export const siteMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  openGraph: defaultOpenGraph,
  twitter: defaultTwitter,
};
