import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Atlant Logistics",
  description: "Reliable logistics partner",
  icons: {
    icon: "/images/favicon.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
