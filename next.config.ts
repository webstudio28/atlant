import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  images: {
    // In local dev, bypass /_next/image caching so image edits appear immediately.
    unoptimized: process.env.NODE_ENV === "development",
    formats: ["image/webp"],
  },
};

export default withNextIntl(nextConfig);
