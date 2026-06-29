import type { Metadata } from "next";
import { siteMetadata } from "@/lib/site-metadata";
import "./globals.css";

export const metadata: Metadata = {
  ...siteMetadata,
  title: "Atlant Logistics",
  description: "Reliable logistics partner",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
